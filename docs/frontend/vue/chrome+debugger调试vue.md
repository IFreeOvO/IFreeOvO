# chrome+debugger调试vue

## 环境准备
- vscode
- vscode上安装debugger for chrome插件
- chrome浏览器

## 操作步骤
1. 在vscode里打开自己的项目，点击vscode左侧调试，添加一个chrome配置。完成后项目根目录多出一个`.vscode`文件,里面有个`launch.json`是我们接下来需要用的

2. 修改配置文件`launch.json`，如下
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": false,
      "sourceMapPathOverrides": {
        // f12的source看到的路径是webpack:///src/views/Home.vue
        // 所以下面配置相当于webpack:///src/* 下所有目录与我们项目目录${workspaceFolder}/src/下所有文件做映射
        "webpack:///./*": "${webRoot}/*", 
        "webpack:///src/*": "${webRoot}/*", 
      }
    }
  ]
}
```

3. 启动自己的vue项目

4. 在vue项目里打上断点

5. 点击vscode的调试，运行调试。运行后会打开新的浏览器窗口运行我们的项目，刷新一下页面，就会停留在我们的断点处，然后可以继续进行调试了
