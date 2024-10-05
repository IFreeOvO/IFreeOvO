# 如何更新本地低版本的npm依赖包

1. 全局安装`npm-check-update`包
2. 安装完成后可以使用`ncu --help` 查看用法
3. 在项目中使用`ncu`可以查看哪些依赖包有新的版本
4. 如果有需要更新的包，可以执行`ncu -u`更新package.json里的版本号，然后用`npm install`安装更新依赖包
