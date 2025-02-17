import { AppRoute, AppRouter, isAppRoute } from '@ts-rest/core';
import {
  InfoObject,
  OpenAPIObject,
  OperationObject,
  PathsObject,
} from 'openapi3-ts';
import { ZodTypeAny } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const getPathsFromRouter = (
  router: AppRouter,
  pathHistory?: string[]
): { path: string; route: AppRoute; paths: string[] }[] => {
  const paths: { path: string; route: AppRoute; paths: string[] }[] = [];

  Object.keys(router).forEach((key) => {
    const value = router[key];

    if (isAppRoute(value)) {
      // Replace /posts/:id with /posts/{id} TODO: CHECK THIS WORKS
      const pathWithPathParams = value.path.replace(/:(\w+)/g, '{$1}');

      paths.push({
        path: pathWithPathParams,
        route: value,
        paths: pathHistory ?? [],
      });
    } else {
      paths.push(...getPathsFromRouter(value, [...(pathHistory ?? []), key]));
    }
  });

  return paths;
};

const isZodObject = (body: unknown): body is ZodTypeAny => {
  return (body as ZodTypeAny)?.safeParse !== undefined;
};

const getResponseSchemaFromZod = (response: unknown) => {
  const isZodObj = isZodObject(response);

  if (!isZodObj) {
    return null;
  }
  const schema = zodToJsonSchema(response, {
    name: 'zodObject',
    target: 'openApi3',
  });

  return schema.definitions['zodObject'];
};

export const generateOpenApi = (
  router: AppRouter,
  options: Omit<OpenAPIObject, 'paths' | 'openapi'> & { info: InfoObject }
): OpenAPIObject => {
  const paths = getPathsFromRouter(router);

  const mapMethod = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
    PATCH: 'patch',
  };

  const pathObject = paths.reduce((acc, path) => {
    const paramsFromPath = path.path
      .match(/{[^}]+}/g)
      ?.map((param) => param.slice(1, -1));

    const bodySchema =
      path.route?.method !== 'GET'
        ? getResponseSchemaFromZod(path.route.body)
        : null;

    const responses = Object.keys(path.route.responses).reduce((acc, key) => {
      const keyAsNumber = Number(key);

      const responseSchema = getResponseSchemaFromZod(
        path.route.responses[keyAsNumber]
      );

      return {
        ...acc,
        [keyAsNumber]: {
          description: `${keyAsNumber}`,
          ...(responseSchema
            ? {
                content: {
                  'application/json': {
                    schema: responseSchema,
                  },
                },
              }
            : {}),
        },
      };
    }, {});

    const newPath: OperationObject = {
      description: path.route.description,
      summary: path.route.summary,
      deprecated: path.route.deprecated,
      tags: path.paths,
      parameters: paramsFromPath?.map((param) => ({
        name: param,
        in: 'path',
        required: true,
      })),
      ...(bodySchema
        ? {
            requestBody: {
              description: 'Body',
              content: {
                'application/json': {
                  schema: bodySchema,
                },
              },
            },
          }
        : {}),
      responses,
    };

    acc[path.path] = {
      ...acc[path.path],
      [mapMethod[path.route.method]]: newPath,
    };

    return acc;
  }, {} as PathsObject);

  const document: OpenAPIObject = {
    openapi: '3.0.0',
    paths: pathObject,
    ...options,
  };

  return document;
};
