# mac上sourceTree提交代码时pre-commit钩子执行失败

## 场景

在vscode终端进行代码提交可以正常执行`pre-commit`钩子，但是在sourceTree里这个钩子总是执行失败

## 问题根源

sourceTree没有找到node路径，以至于执行不了npx命令。见[github-issues](https://github.com/typicode/husky/issues/390)

## 解决方案

在项目根目录下创建`.huskyrc`文件，文件里写如下代码

```
export PATH=\"$(dirname $(which node)):\$PATH\""
```

因为，这段脚本会在`pre-commit`之前执行，将node路径赋给环境变量PATH里，这样sourceTree就可以正确执行与node有关的命令(PS:`pre-commit`钩子里执行了`npx lint-staged`这个命令)
