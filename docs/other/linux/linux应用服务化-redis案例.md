# linux应用服务化-redis案例

* redis.conf中的daemonize设置为yes，为后续设置后台运行铺垫

* 查看所有pid文件，找到redis的pid文件(比如redis_6379.pid)

```bash
find / -name *.pid
```

* 查看pid文件里的内容，里面存放了进程的pid(比如6697)

```bash
vim /run/redis_6379.pid
```

也可以通过网络查看pid

```bash
ps -ef | grep redis
```

* 进入到系统服务文件夹，里面的服务都是以.service结尾的。如果我们想创建redis服务，也需要一个对应的.service文件

```bash
cd /usr/lib/systemd/system
```

* 用vim创建一个redis服务文件，并进入编辑模式，按下面内容写入并保存

```bash
vim redis.service
```

文件内容为

```bash
[Unit]
Description=Redis
After=syslog.target network.target remote-fs.target nss

[Service]
Type=forking
PIDFile=/run/redis_6379.pid
ExecStart=/usr/local/redis-4.0.14/src/redis-server /usr/local/redis-4.0.14/redis.conf
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

1. Description是给读者看的，描述是干什么的服务。
2. After是指在指定系统服务启动后，再启动服务
3. Type=forking代表后台运行
4. ExecStart代表启动时执行什么命令，需要写应用的完整路径。案例中是以指定配置文件加载服务
5. ExecStop代表关闭程序的命令
6. PrivateTmp给服务提供私有的临时文件目录
7. WantedBy将服务分配到指定服务组

* 重新加载配置

```bash
systemctl daemon-reload
```

* 启动服务

```bash
systemctl start redis
```

* 查看服务状态

```bash
systemctl status redis
```

* 设置开机自动启动

```bash
systemctl enable redis
```
