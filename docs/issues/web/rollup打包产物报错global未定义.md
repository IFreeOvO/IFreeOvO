# rollup打包产物报错global未定义

## 问题描述

在用rollup打包了包含`socket.io-client`库的项目后，其他项目引入这个打包产物会报错提示`global is not defined`。

查看源码，报错位置在`const globalThisShim = global;`这行。其实产物里有global的定义`window.global = window;`但是这行代码在`const globalThisShim = global;`之后执行，导致找不到`global`变量。

网上给的方案基本都是提前写个`<script>window.global = window;</script>`插入到脚本最前面执行。但是我打包的库是需要给其他项目用的。不能让每个使用者都自己加一下这个代码去修复，这个方案显得太low

## 问题定位

我根据代码追溯后发现，`const globalThisShim = global;`这行代码来自`socket.io-client`依赖里的`engine.io-client`的这个包。后来我想为什么`socket.io-client`这个库打包给别人用就没有出现`global is not defined`这个问题，难道是我打包配置不对。于是我去看`socket.io-client`源码仓库，巧的是这个库也是用rollup打包的。对比我和`socket.io-client`库的rollup打包配置，我终于现了问题所在。

## 解决方案

其实问题解决起来也简单，需要修改`@rollup/plugin-node-resolve`插件配置，加上一句`browser: true`告诉rollup打包产物要适配浏览器环境，这样`const globalThisShim =`就会被赋值成别的值，而不是`global`，也就完美消除了错误

```js
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
    plugins: [
        ...
        nodeResolve({
            browser: true,
        }),
        ...
    ]
}
```
