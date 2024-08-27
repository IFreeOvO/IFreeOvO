# mysql登录失败问题

## 前言

前几天使用账号密码的方式登录自己服务器上的mysql，突然发现被拒绝访问（之前是好的，不知道是不是因为docker重启了丢失了之前的账号配置），于是上网百度解决方案，尝试了好几篇文章的操作才解决，所以用这篇文章重新梳理下解决流程，方便以后遇到类似问题可以快速解决

## 解决流程

1. 使用`docker exec -it <container-id> bash`进入mysql容器
2. 对`/etc/mysql/conf.d/docker.cnf`路径下的文件进行编辑，使用`echo 'skip-grant-tables' >> docker.cnf`，往文件尾部追加一行`skip-grant-tables`
3. 在容器内执行`exit`退出容器，并`docker restart <container-id>`重启容器
4. 再次执行`docker exec -it <container-id> mysql`进行容器，执行下`flush privileges;`(根据参考文章所说"不执行的话可能会提示在skip-grant-tables模式下无法修改密码"，是否真是如此我没有考证)
5. 使用`use mysql;`和`select user,host,plugin from user;`查询下用户表。发现没有`root`用户(原来root用户没了，难怪我登录不了，但是尚不清楚之前创建的root为什么丢失了)
6. 使用`CREATE USER 'root'@'localhost' IDENTIFIED with mysql_native_password BY 'xxxxxx';`(有的文章使用的是`ALTER`代替`CREATE`，如果有`root`，可以使用`update user set host = '%' where user = 'root'`进行更新)，确保`root`账户的`host`是`%`,`plugin`是`mysql_native_password`加密方式
7. 第6步我遇到了`Operation ALTER USER failed for 'root'@'localhost'`这个问题。解决步骤是：
在mysql容器里修改`/etc/mysql/my.cnf`文件，使用`echo 'default_authentication_plugin=mysql_native_password' >> my.cnf`，往文件尾部追加一行`default_authentication_plugin=mysql_native_password`
8. 重新执行上面的第6步操作，然后执行`flush privileges;`
9. 接着使用`sed -i '$d' <filename>`删除`/etc/mysql/conf.d/docker.cnf`里之前写的`skip-grant-tables`
10. 最后再次执行`exit`退出容器，并使用`docker restart <container-id>`重启容器
11. 重新使用`mysql -u root -p`登录，登录成功

## 总结

过程中主要遇到的两个问题：

1. Access denied for user 'root'@'localhost'
2. Operation ALTER USER failed for 'root'@'localhost'

第一个问题主要原因是，我的数据库里没有root账号，所以不能登录。(root账号没了的原因我没找到)

第二个问题引入相关文献说法是：
>MySql 8.0.11 换了新的身份验证插件（caching_sha2_password）, 原来的身份验证插件为（mysql_native_password）。而客户端工具Navicat Premium12 中找不到新的身份验证插件（caching_sha2_password），对此，我们将mysql用户使用的登录密码加密规则还原成mysql_native_password，即可登陆成功

所以需要`select user,host,plugin from user;`查询表，确认自己`root`的`host`值为`%`，`plugin`的值是`mysql_native_password`，并将`default_authentication_plugin=mysql_native_password`写入到`my.cnf`文件中
