# 解决外网访问不了服务器上的redis

## 问题描述

笔者的服务器上用docker安装好redis并对外暴露6379端口，然后本地电脑通过GUI工具连接服务器redis，一直报错无法正常访问

## 解决方案

在服务器里执行`docker exec -it redis redis-cli`进入redis容器内部操作，通过`auth xxx`命令输入密码，然后执行`CONFIG GET protected-mode`，此时返回值应该是`no`。接着我们执行`CONFIG SET protected-mode yes`就可以吧`protected-mode`设置为`true`。设置完成后，我们再次用本地的GUI工具连接redis，此时连接成功。
