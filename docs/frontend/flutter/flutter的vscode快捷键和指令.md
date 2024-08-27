# flutter的vscode快捷键和指令

## 快捷键

* 快速创建widget
输入`stl`(无状态组件)或者`stf`(有状态组件)，回车

* 快速修复

```bash
command + .
```

* 终止程序运行
控制台按q

* 热更新
控制台按r

* 清除终端信息

```bash
command + k
```

## 指令

* 清理缓存，解决一些运行异常

```bash
flutter clean
```

* 创建项目

```bash
flutter create projectName
```

检查开发环境是否存在异常

```bash
flutter doctor -v
```

装包

```bash
flutter pub get
```

自动生成序列化声明(需要配合vscode flutter-helper插件)

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

vscode切换flutter运行设备

```bash
command + p
然后输入'> select'选择select device
```

## 运行ios模拟器

```bash
open -a Simulator
```
