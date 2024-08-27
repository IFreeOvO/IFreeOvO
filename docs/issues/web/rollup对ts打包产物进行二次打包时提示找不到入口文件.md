# rollup对ts打包产物进行二次打包时提示找不到入口文件

这是打包ts库遇到的一个问题，预期是先打包完ts，再对打包后生成的所有`*.d.ts`重新打包到一个`d.ts`文件里，rollup配置大致是这样

```js
export default [
    {
        input: './src/index.ts',
        ...
        output: [
            {
                ...
                dir: 'dist',
            }
        ]
    },
    {
        input: './dist/index.d.ts',
        ...
        output: [
            {
                ...
                file: 'dist/global.d.ts',
            }
        ]
    }
]
```

理论上第一个任务`./src/index.ts`打包完已经生成了`./dist/index.d.ts`文件，且在vscode里也确实看到了打包产物，但是在执行第二个任务时，还是报错提示入口文件`./dist/index.d.ts`找不到

## 解决方案

在重新查看ts配置文档时，发现了问题的解决方法，就是在`tsconfig.json`里配置`noEmit`改为`false`(之前配的是`true`)

```json
{
    "compilerOptions": {
        ...
        "noEmit": false,
        ...
    }
}
```

然后重新打包就能正常执行了
