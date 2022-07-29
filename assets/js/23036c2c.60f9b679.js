"use strict";(self.webpackChunkts_rest=self.webpackChunkts_rest||[]).push([[124],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=o,f=d["".concat(s,".").concat(m)]||d[m]||u[m]||a;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7527:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>s,default:()=>d,frontMatter:()=>l,metadata:()=>c,toc:()=>p});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={sidebar_position:1},s="React",c={unversionedId:"tutorial-client/react",id:"tutorial-client/react",title:"React",description:"Installation",source:"@site/docs/tutorial-client/react.md",sourceDirName:"tutorial-client",slug:"/tutorial-client/react",permalink:"/docs/tutorial-client/react",editUrl:"https://github.com/ts-rest/ts-rest/docs/tutorial-client/react.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"React Query",permalink:"/docs/tutorial-client/react-query"},next:{title:"SWR",permalink:"/docs/tutorial-client/swr"}},p=[{value:"Installation",id:"installation",children:[],level:2},{value:"Complete Example",id:"complete-example",children:[],level:2}],u={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"react"},"React"),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("p",null,"Install @ts-rest/core"),(0,a.kt)("p",null,"npm"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @ts-rest/core\n")),(0,a.kt)("p",null,"yarn"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @ts-rest/core\n")),(0,a.kt)("h2",{id:"complete-example"},"Complete Example"),(0,a.kt)("p",null,"Zod is optional, but I recommend using it to validate your request bodies in the server implementation."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { initTsCont } from '@ts-rest/core';\nimport { z } from 'zod';\n\nconst c = initTsCont();\n\nexport type Post = {\n  id: string;\n  title: string;\n  description: string | null;\n  content: string | null;\n  published: boolean;\n  authorId: string;\n};\n\n// Three endpoints, two for posts, and one for health\nexport const router = c.router({\n  posts: c.router({\n    getPost: c.query({\n      method: 'GET',\n      path: ({ id }: { id: string }) => `/posts/${id}`,\n      response: c.response<Post | null>(),\n      query: null,\n    }),\n    getPosts: c.query({\n      method: 'GET',\n      path: () => '/posts',\n      response: c.response<Post[]>(),\n      query: z.object({\n        take: z.number().optional(),\n        skip: z.number().optional(),\n      }),\n    }),\n    createPost: c.mutation({\n      method: 'POST',\n      path: () => '/posts',\n      response: c.response<Post>(),\n      body: z.object({\n        title: z.string(),\n        content: z.string(),\n        published: z.boolean().optional(),\n        description: z.string().optional(),\n        authorId: z.string(),\n      }),\n    }),\n  }),\n  health: c.query({\n    method: 'GET',\n    path: () => '/health',\n    response: c.response<{ message: string }>(),\n    query: null,\n  }),\n});\n")))}d.isMDXComponent=!0}}]);