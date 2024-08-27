# 如何检测并更新npm包

## 全局安装npm-check-updates

```bash
npm i -g npm-check-updates
```

## npm-check-updates的用法

查看用法的指令

```bash
ncu --help
```

检测项目中有哪些依赖需要更新

```bash
ncu
```

* 更新npm依赖，需要三步：
  * 更新package.json里的依赖版本
  * 删除node_modules
  * 重新安装依赖

```bash
ncu 
rm -rf node_modules/ 
npm i
```
