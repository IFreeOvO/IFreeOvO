# mysql指令

`mysql -u root -p`密码登录mysql

`flush privileges;` 重新加载数据库

`create user 'root'@'%' IDENTIFIED with mysql_native_password BY '666666';`

`ALTER USER 'root'@'%' IDENTIFIED with mysql_native_password by '666666';`   root指用户名，%代表主机，此处指任何主机，6666代表密码

`grant all on *.* to 'root'@'%' with grant option;`授权账号,例如:

```bash
grant all privileges on 数据库名称.* to 'root'@'127.0.0.1' identified by '123456'
```

`数据库名称.*`指数据库下所有表

`quit`退出数据库

## 一、跳过mysql登录验证

1. 进入mysql的容器中，找到/etc/mysql/conf.d/docker.cnf文件 2. 在docker容器中安装vim（我有篇博客讲到了vim的安装），对docker.cnf文件进行编辑，添加一行skip-grant-tables，添加完成之后别忘记将mysql容器restart一下。

2.执行修改密码之前先刷新下权限，不然可能会提示在skip-grant-tables模式下无法修改密码

```bash
flush privileges;
```

3.创建

```bash
create USER 'root'@'localhost' IDENTIFIED with mysql_native_password BY '666666';
flush privileges;

```

4.修改完成，这时就需要将我们在第一步添加的skip-grant-tables删除掉

5.在/etc/mtsql/my.cnf文件中追加一行`default_authentication_plugin=mysql_native_password`，然后在restart mysql容器
