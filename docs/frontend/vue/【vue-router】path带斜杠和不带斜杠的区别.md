# 【vue-router】path带斜杠和不带斜杠的区别

如果按下面进行配置，则实际路由为`/menuAdmin/menuList`

```js
 {
    path: '/menuAdmin',
    component: Layout,
    name: 'menuAdmin',
    meta: { title: '菜单管理', icon: 'example' },
    redirect: '/menuAdmin/menuList',
    children: [
      {
        path: 'menuList',   // path不带'/'
        name: 'menuList',
        component: () => import('@/views/menuAdmin/menuList/menuList'),
        meta: { title: '菜单列表', icon: 'table' },
        children: []
      }
    ]
 }
```

如果按下面进行配置，则实际路由为`/menuList`
```js
 {
    path: '/menuAdmin',
    component: Layout,
    name: 'menuAdmin',
    meta: { title: '菜单管理', icon: 'example' },
    redirect: '/menuAdmin/menuList',
    children: [
      {
        path: '/menuList',  // path带'/'
        name: 'menuList',
        component: () => import('@/views/menuAdmin/menuList/menuList'),
        meta: { title: '菜单列表', icon: 'table' },
        children: []
      }
    ]
 }
```

## 总结
&nbsp;&nbsp;&nbsp;&nbsp;两段代码的区别在于第九行的`path`参数是否带`/`，如果以`/`开头的话相当于写的是绝对路径，而不是以父路由为开头的相对路径