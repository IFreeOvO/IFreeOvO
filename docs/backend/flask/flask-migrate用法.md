# flask-migrate用法

## 基本用法

1. 初始化迁移环境

```bash
flask db init # 当应用入口在项目根目录，且文件名为app.py，实例变量名为app时.可以用这个初始化数据迁移

flask --app app.http.app db init # 推荐。加上-app指定具体程序入口。其他场景用这个进行初始化
```

运行好命令后，会生成一个迁移环境目录。默认位置为`./migrations`

2. 生成迁移脚本

```bash
flask --app app.http.app db migrate -m "初始化"
```

其中`-m "初始化"`是可选的，表示为迁移写个备注，方便以后查看。

## 其他命令

* 升级迁移版本。同步到数据库

```bash
flask --app app.http.app db upgrade
```

* 回滚迁移版本

```bash
# 回退到上一个版本
flask --app app.http.app db downgrade

# 回退到最初版本
flask --app app.http.app db downgrade base

# 回退到指定版本
flask --app app.http.app db downgrade db999eef492f
```

* 查看迁移历史记录

```bash
flask --app app.http.app db history
```
