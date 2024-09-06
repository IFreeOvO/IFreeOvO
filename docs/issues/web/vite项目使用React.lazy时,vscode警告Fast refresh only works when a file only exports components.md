# vite项目使用React.lazy时,vscode警告Fast refresh only works when a file only exports components

## 描述

在vite项目中，我在路由文件里使用`React.lazy`时，vscode编辑器会警告`Fast refresh only works when a file only exports components`。按照提示，我已经排查过`React.lazy`导入的文件，确认只导出了一个组件，但还是报了这个警告

## 复现场景

```tsx
// Login.ts
const Login: React.FC = () => {
    ...
}

export default Login
```

```tsx
// main.tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: token,
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    </React.StrictMode>,
)

```

```tsx
// router.tsx
const Login = lazy(() => import('@/pages/login'))

const router: Router = createHashRouter([
    {
        element: <Login />,
        path: '/',
    },
])

export default router
```

## 解决方案

修改`router.tsx`，改成导出组件

```tsx
// router.tsx
const Login = lazy(() => import('@/pages/login'))

const router: Router = createHashRouter([
    {
        element: <Login />,
        path: '/',
    },
])

export default const Routes: React.FC = () => {
    return <RouterProvider router={router} />
}
```

同时修改`main.tsx`的引入

```tsx
// main.tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: token,
            }}
        >
            <Routes></Routes>
        </ConfigProvider>
    </React.StrictMode>,
)
```
