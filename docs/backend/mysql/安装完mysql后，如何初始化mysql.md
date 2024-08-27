# 安装完mysql后，如何初始化mysql

1. 安装完mysql后使用`vi /var/log/mysql.log`去日志文件里找root用户的初始密码

2. 使用`mysql -uroot -p`,登录到mysql

3. 修改root账号密码

```bash
alter user 'root'@'localhost' identified with mysql_native_password by '新密码'
```

localhost代表只允许在本机进行登录
with mysql_native_password 可以使mysql8的密码与navicat软件兼容

4. 查看用户表

```bash
use mysql;
select host,user from user;
```

5. 修改root的host允许任何电脑用root访问

```bash
update user set host='%' where user='root';
```

6. 让用户权限生效

```bash
flush privileges;
```

7. 退出mysql

```bash
exit;
```
