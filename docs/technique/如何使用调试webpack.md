# 如何使用调试webpack

## 一、node调试

1. 控制台输入`node --inspect-brk ./node_modules/.bin/webpack --inline --progress`
2. 打开chrome浏览器输入地址`chrome://inspect/#devices`点击`inspect`按钮，即可显示调试控制台

## 二、vs code调试

1. 点击vs code 左侧的调试标签
2. 点击`调试`里的添加配置
3. 配置修改如下:

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
      "name": "nodemon",
      "runtimeExecutable":"${workspaceFolder}/node_modules/.bin/nodemon", // 使用nodemon运行
      "program": "${workspaceFolder}/src/index.js",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "runtimeArgs": ["--exec","babel-node"]
    }
  ]
}
```

4.运行调试即可
