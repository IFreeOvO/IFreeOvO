# vscode调试nodejs

## 操作步骤

1. 在vscode调试里点击创建一个用于node环境的`launch.json`

2. 在`configurations`属性里，敲`nodemon`编译器会自动提示`Node.js:Nodemon 安装程序`，我们点击这个提示，之后会生成一个代码片段(这个是nodemon调试配置)

```json
{
  "type": "node",
  "request": "launch",
  "name": "nodemon",
  "runtimeExecutable": "nodemon",
  "program": "${workspaceFolder}/app.js",
  "restart": true,
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": [
    "<node_internals>/**"
  ]
}
```

然后我们可以把原来的node配置对象从`configurations`属性里删掉

3. 在上面的基础上修改配置(`runtimeArgs`那一行，如果项目中没用es6可以不加)

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/nodemon",
      "program": "${workspaceFolder}/src/index.js",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "skipFiles": [
        "<node_internals>/**",
        "${workspaceFolder}/node_modules/**/*.js"
      ],
      "runtimeArgs": ["--exec", "babel-node"] // 因为项目中用到es6,需要babel-node解析es6
    }
  ]
}
```

4. 在node项目中打个断点

5. 运行vscode的调试配置，即可开始调试

## 附通过npm启动调试的配置

```json
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "通过npm启动",
      "runtimeExecutable": "npm",
      "restart": true,
      "console": "integratedTerminal",
      "runtimeArgs": [
        "run-script",
        "start" // npm启动脚本的命令
      ],
      "port": 9229,
      "skipFiles": [
        "<node_internals>/**",
        "${workspaceFolder}/node_modules/**/*.js"
      ]
    }
  ]
}
```
