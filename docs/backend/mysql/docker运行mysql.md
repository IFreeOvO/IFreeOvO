# docker运行mysql

```bash
docker run -id --name=mysql -v /Users/username/dockerSpace/mysql/conf.d:/etc/mysql/conf.d -v /Users/username/dockerSpace/mysql/logs:/logs -v /Users/username/dockerSpace/mysql/data:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=666666 -e LANG=C.UTF-8 mysql
```

* -id 将MySQL容器挂在后台运行

* --name=mysql 将容器起名为mysql，大家可以自己起名，该参数可以省略
* -p 3306:3306 把容器的3306端口映射到宿主机的3306端口，这样才能从外网访问这台机器上的MySQL，若你的数据库只需要从本机访问，就可以去除这个参数
* -e MYSQL_ROOT_PASSWORD=123456 设置容器环境变量MYSQL_ROOT_PASSWORD的值为123456，这个环境变量表示MySQL的root用户的密码，一定要设置，这里设置了密码为123456，大家可以自定义
* -e LANG=C.UTF-8 设置容器的语言环境变量LANG值为C.UTF-8，这个必须要设置，否则容器内默认是英文环境，使得MySQL无法存放中文内容
