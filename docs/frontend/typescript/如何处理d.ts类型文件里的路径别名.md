# 如何d.ts类型文件里的路径别名

## 问题描述

最近在使用rollup打包库遇到一个问题：我用`export * from '@/utils'`在入口文件里导出`utils`里面所有对外暴露的函数。例如`utils`有函数a，我通过`import { a } from '包名'`方式使用`utils`文件里的函数a，会出现报错提示“无法找到模块里的函数a”。经过排查是打包后的`xx.d.ts`声明文件里`export * from '@/utils`这句话报错"找不到模块@/utils"。所以导致了`utils`文件里定义的函数a无法使用

## 解决方案

既然发现问题是出在打包环节，我于是去查看打包配置，发现我其实已经用`import alias from '@rollup/plugin-alias'`处理过一次别名，但是没有生效。查阅了一下资料，发现`@rollup/plugin-alias`只是对打包入口配置的相关文件进行别名处理，而`d.ts`是打包后的产物，也就不会进行处理。所以需要额外对`d.ts`文件打包处理下。最终解决问题的配置如下：

```ts
import { fileURLToPath, URL } from 'node:url'
import alias from '@rollup/plugin-alias'
import { dts } from 'rollup-plugin-dts'

export default [
    // 库的打包
    {
        ...
    },
    // 声明文件打包
    {
        input: './dist/index.d.ts',
        plugins: [
            alias({
                entries: { '@': fileURLToPath(new URL('./dist', import.meta.url)) },
            }),
            dts(),
        ],
        output: {
            file: 'dist/index.d.ts',
        },
    }
]
```
