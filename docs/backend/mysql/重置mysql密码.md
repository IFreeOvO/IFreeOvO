# 重置mysql密码

## 重置root密码

1. 创建`a.txt`文件，定义修改密码语句

```bash
ALTER USER 'root'@'localhost' IDENTIFED BY '123456'
```

其中`localhost`表示登录方式，改成'%'表示任何主机都能登录

2. 以管理员身份打开电脑终端工具
执行`net stop mysql80`停止服务

3. 执行`mysqld --defaults-file="/Users/MySQL/MySQL Server 8.0/my.ini" --init-file="/Users/a.txt" --console`，覆盖密码
其中`mysqld`会启动mysql并加载配置文件
`--defaults-file`是本地mysql配置文件的绝对路径
`--init-file`是步骤1中创建的文件绝对路径
`--console`是把信息打印到控制台
