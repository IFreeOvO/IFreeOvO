# react使用lazy加载组件在生产环境会报错Cannot assign to read only property _status of object \#\<Object>

## 问题描述

使用下面方式，设置路由路由懒加载

```tsx
// router.tsx
const Login = lazy(() => import('@/views/login'))
const baseRoutes: RouteObject[] = [
    {
        path: '',
        element: <Suspense fallback={<div>加载中...</div>}>
            <Login />
        </Suspense>,
    },
]

// use-router.ts
const [router, setRouter] = useImmer<Router>(createHashRouter(baseRoutes))
```

开发环境运行正常。但是打包编译后，在生产环境运行时，懒加载的组件加载失败，控制台报错`Cannot assign to read only property _status of object #<Object>`

## 分析原因

`useImmer`会把传入的数据`baseRoutes`冻结，变成不可修改的对象。`lazy`异步加载组件，等组件加载完时肯定还会修改路由，导致报错。但是为什么开发环境复现不了，这点还需要深入调研。

## 解决方案

这里有两种方案，一是用`useState`替换`useImmer`，二是去掉`lazy`改成同步加载路由。结合实际场景进行选择。
