# eslint无法识别路径别名

## 问题描述

项目里引入`import xx from '@/xx` 时，eslint会报错`unable to resolve path to module '@/xx'`，这个报错来自eslint的`import/no-unresolved`规则。但是这个规则在开发中很有用，不建议通过关闭的方式解决。正确做法是能让eslint解析出这个路径，下面提供两种方式

## 非ts项目

* 安装`eslint-import-resolver-alias`插件

```shell
npm i eslint-import-resolver-alias -D
```

* 然后在`.eslintrc.js`文件里配置

```js
module.exports = {
     ...   
     settings: {
        "import/resolver": {
            alias: [["@", "./src"]],
        },
    },
    ...
}
```

## ts项目

* 安装`eslint-import-resolver-typescript`插件

```shell
npm i eslint-import-resolver-typescript -D
```

* 然后在`.eslintrc.js`文件里配置

```js
module.exports = {
     ...   
     settings: {
        "import/resolver": {
            typescript: {
                project: ['./tsconfig.json'], // 传入项目的tsconfig.json，eslint会自动解析tsconfig.json里配置的路径别名
            },
        },
    },
    ...
}
```
