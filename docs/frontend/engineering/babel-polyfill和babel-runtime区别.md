# babel-polyfill和babel-runtime区别

## babel-polyfill做的事情

babel默认不会转换新的api如Array.from，Promise，Proxy等全局对象。需要通过babel-polyfill往全局对象和内置方法原型上添加方法来实现。缺点是会污染全局空间

```js
// babel配置
{
    presets:[
        ['@babel/preset-env', {
            useBuildIns: 'entry'
            corejs: {
                version: 3
            },
            target: '> 0.25%, not dead'
        }]
    ]
}
```

`useBuildIns:false`全量引入polyfill
`useBuildIns:entry`根据配置的浏览器兼容性引入polyfill。需要手动在入口手动添加`import '@babel/ployfill'`且需要指定`corejs`版本号.如果corejs为3,则引入需改成`import 'core-js/stable';import 'regenerator-runtime/runtime'`
`useBuildIns:useage`跟据浏览器兼容性和代码中使用到的api,来按需引入polyfill

## babel-runtime

解决`babel-polyfill`全局空间污染问题

# babel-plugin-transform-runtime

自动引入`babel-runtime`下的工具函数有这个插件后。预设里`useBuildIns`和`corejs`这部分代码可以不需要了

```js
{
    presets:[
        ['@babel/preset-env', {
            target: '> 0.25%, not dead'
        }]
    ],
    plugins:[
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 3,
                helpers: true, // 将公共的工具函数提取出来，如类的继承
                regenerator: true // 生成器语法工具提取成公共的
            }
        ]
    ]
}
```

## 最佳实践

`babel-runtime`适合类和组件库。`babel-polyfill`适合项目里用，因为polyfill体积小
