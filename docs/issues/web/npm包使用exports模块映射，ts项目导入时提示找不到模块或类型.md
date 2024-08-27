# npm包使用exports模块映射，ts项目导入时提示找不到模块或类型

## 问题描述

在开发第三方库时，常常会在`package.json`里用到`exports`简化导入路径。例如我们有一个叫`pkg`的包，包里面有`dist/es/index.js`，
如果用户想使用`index.js`，导入时就要写成`import xx from 'pkg/dist/es/index.js'`，但是我们的`pkg`包如果做了了`exports`处理如下:

```json
"exports": {
    "./index.js":{
        "types": "./dist/index.d.ts",
        "import": "./dist/es/index.js"
    },
}
  
```

此时，用户直接使用`import xx from 'pkg/index.js`就等价于写`import xx from 'pkg/dist/es/index.js`。

在类似于上面的场景中，我遇到一个问题就是，我配置了`exports`，模块映射也检查没有问题，但是在ts项目里使用包里的模块，ts会报错“找不到模块或其相应的类型声明”

## 解决方案

* 方案1
在使用包的项目里，修改`tsconfig.json`配置：

```json
{
    "compilerOptions": {
        ...
        "module": "ESNext",
        "moduleResolution":"Bundler" // 关键在这个"模块解析策略"的配置
        ...
    }
}

```

这样ts就能正确解析到模块

* 方案2

在使用包的项目里，修改`tsconfig.json`配置：

```json
{
    "compilerOptions": {
        ...
        "paths": {
            "pkg/index.js": ["./node_modules/pkg/dist/es/index.d.js"]
        },
        ...
    }
}

```
