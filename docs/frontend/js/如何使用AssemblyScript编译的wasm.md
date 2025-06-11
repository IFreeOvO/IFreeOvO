# 如何使用AssemblyScript编译的wasm

## 1.文件准备

创建`assembly`空目录。目录下创建`tsconfig.json`，文件内容为

```json
{
  "extends": "assemblyscript/std/assembly.json",
  "include": [
    "./**/*.ts"
  ]
}
```

添加完这个后，方便编译器识别`AssemblyScript`语法

## 2.编写`AssemblyScript`

`assembly`目录下，创建`index.ts`，内容如下：

```ts
export function add(a: i32, b: i32): i32 {
  return a + b;
}
```

## 3.添加编译脚本

在`package.json`里加入下面命令

```json
"scripts": {
    "asbuild:debug": "asc assembly/index.ts  --target debug",
    "asbuild:release": "asc assembly/index.ts --target release",
    "asbuild": "npm run asbuild:debug && npm run asbuild:release",
},
```

然后执行`npm run asbuild`编译。编译后会得到`wasm`、`wat`、`js`等格式文件

## 4.在项目里引入wasm

* 方式1

```js
const url = new URL('../build/release.wasm', import.meta.url)
const wasm =  await WebAssembly.instantiateStreaming(globalThis.fetch(url),{
    env: {
        abort: ()=> {}
    }
})
const add = wasm.instance.exports.add
```

* 方式2

```js
const url = new URL('../build/release.wasm', import.meta.url)
const wasm =  await WebAssembly.instantiate(await globalThis.WebAssembly.compileStreaming(
    globalThis.fetch(url)
),{
  env: {
    abort: ()=> {}
  }
})
const add = wasm.exports.add
```

* 方式3
同步导入

```js
import * as WASM from '../build/release.js'
const add = WASM.add
```

> 如果遇到`node:fs/promises`报错。在`../build/release.js`文件里搜索`node:fs/promises`。把函数内条件分支去掉，直接改成`return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url))`返回
