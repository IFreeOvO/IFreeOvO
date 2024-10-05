# react-router6使用React.lazy时,vscode警告Fast refresh only works when a file only exports components

## 问题环境

* react: v6
* react-router-dom: v6
* vite: v5

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

修改组件的导入方式

```tsx
// router.tsx
const router: Router = createHashRouter([
    {
        lazy: async () => {
            const Component = await import('@/pages/login')
            return { Component: Component.default }
        },
        path: '/',
    },
])

export default const Routes: React.FC = () => {
    return <RouterProvider router={router} />
}
```

## 参考文献

[react-router/issue](https://github.com/remix-run/react-router/discussions/10856)
[eslint-plugin-react-refresh/issue](https://github.com/ArnaudBarre/eslint-plugin-react-refresh/issues/25)
