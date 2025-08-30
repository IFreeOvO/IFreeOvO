# flask-migrate用法

## 一、初始化迁移环境

在开始迁移数据之前，需要先使用 init 命令初始化创建一个迁移环境(在项目里中创建一个`migrations`文件夹，并设置好所有必要的文件和目录结构)：

```zsh
# 当 flask 的应用入口在项目根目录，且文件名为 app.py，并且实例变量名为 app 时
flask db init

# 或者指定app路径
flask --app app.http.app db init
```

## 二、生成迁移脚本

```zsh
flask --app app.http.app db migrate -m "项目初始化"

```

其中 `-m "项目初始化"` 是可选的，意思是为这个迁移写上一个简单的注释。

在生成的迁移脚本中有两个函数：

* upgrade()：把迁移中的改动应用到数据库中；
* downgrade()：将改动撤销；

注意下，在生产环境中一般不使用 Flask-Migrate 迁移，一般人工生成相应的 SQL 执行迁移，如果要使用迁移，一定要仔细检查生成的迁移文件是否符合预期，确认后才可以使用。

## 三、更新及回滚数据库

生成迁移脚本后，可以使用 upgrade 命令来更新数据库，如下：

```zsh
flask --app app.http.app db upgrade
```

每一次更新 ORM 模型，都需要执行 migrate 命令生成迁移文件，然后才可以使用 upgrade 命令将更新同步到数据库中。

如果想要回滚数据库，可以使用 downgrade 命令，如下：

```zsh
flask --app app.http.app db downgrade
```

每执行一次命令会向上回滚一个版本，如果想一次性回滚到最原始的版本，即删除所有数据库，可以使用如下命令：

```zsh
flask --app app.http.app db downgrade base

```

如果想回滚到特定的版本，可以在 downgrade 后带上特定的版本号，如下：

```zsh
flask --app app.http.app db downgrade 版本号

```
