# linux命令

1. lsb_release 查看linux系统版本(默认-v)

> -v 显示版本信息。
-i 显示发行版的id。
-d 显示该发行版的描述信息。
-r 显示当前系统是发行版的具体版本号。
-c 发行版代号。
-a 显示上面的所有信息。
-h 显示帮助信息。

<br/>

2. uname -a 查看内核版本
<br/>

3. df 查看磁盘空间占用情况

> -Th 显示文件类型，文件大小单位以M为单位

<br/>

4. ls 查看文件列表

> -a 显示所有文件及目录 (ls内定将文件名或目录名称开头为"."的视为隐藏档，不会列出)
-l 除文件名称外，亦将文件型态、权限、拥有者、文件大小等资讯详细列出

<br/>

5. top 查看系统运行的进程
<br/>

6. `mkdir 文件夹名` 创建目录
`mkdir -p ./xxx/xx/文件名`创建多级目录
`mkdir -p -v ./xxx/xx/文件名`创建多级目录，额外查看命令执行信息。-p -v 等价于-pv

7. `touch 文件名` 创建文件
<br/>
8. `vi 文件名` 用vi编辑器打开文件
<br/>
9. esc 退出文本编辑

> :wq 保存并退出编辑
:q! 不保存并退出

<br/>

10. cat 查看文件内容
<br/>

11. `echo '内容' >> 文件名`  往文件末尾追加内容
`echo '内容'` 直接在控制台打印内容

12. `echo '内容' > 文件名`  覆盖文件内容

13. `rm 文件名` 删除文件(会询问)
`rm -f 文件名` 删除文件(跳过询问)

14. `rm -r 文件夹名` 删除文件夹
<br/>

15. `rm -rf 文件夹名` 强制删除
<br/>

16. clear 清除控制台命令
<br/>

17. `wget 下载链接` 从网络上下载
<br/>

18. `tar zxvf 文件.gz` 解压gzip文件

> z指通过gzip解压,x指解压,v指显示解压过程,f指以当前名字作为解压后的文件名

* 可以通过`-C 文件夹`解压到指定路径

<br/>

19. `tar  zcvf  压缩后的文件名.tar.gz  被压缩的文件名` 压缩gzip文件

> c指创建压缩文件

<br/>

20. `ps -ef | grep 要筛选的进程名` 筛选出指定进程
<br/>

21. `kill -9 进程的pid` 杀掉进程
<br/>

22. `service 服务名 status` 查看服务的状态

> `systemctl status 服务名.service` 也可以查看服务状态
<br/>

23. `service 服务名 stop` 关闭服务
<br/>

24. `service 服务名 restart` 重庆服务
<br/>

25. `ssh 用户名@ip地址` 连接服务器(一般服务器默认端口是22，建议修改掉)

26. `netstat -anlp | grep 服务名` 查看端口网络连接情况

27. `firewall-cmd --list-all`查看防火墙放行端口列表

`firewall-cmd --state` 查看防火墙状态

`firewall-cmd --add-port=端口/tcp --zone=public --permanent` 防火墙放行某端口

`firewall-cmd --reload` 重启防火墙

28.`systemctl restart/start/stop/status/reload 服务名 service`操作服务

* `sudo usermod -aG 组名 用户名`将用户添加到对应的组
* `sudo groupadd 组名`添加组
* `groups`查看用户所属的组
* `cat ~/.ssh/id_rsa.pub`查看公钥

* `scp -r /本地绝对路径 root@远程服务器ip:/远程服务器绝对路径`复制本地文件到远程服务器

* `ls -alF /Users/chenzihao/.nvm//versions/node//v12.11.0/lib/node_modules` 查看node下全局指令

* `sed -i '$d' 文件名` 删除文件最后一行

* `sudo systemctl enable 服务名`设置开机自启

* `systemctl status 服务名` 查看服务状态

* `telnet www.baidu.com 80`测试端口连通性

* `ifconfig`查看ip

* `ls`查看当前目录下所有文件

* `ll` 查看文件列表详情信息

* `命令 --help`查看命令用法

* `cp 源文件 目标路径`复制文件

* `cp -r 源文件夹 目标文件夹`复制下文件夹下所有内容到其他目录

* `mv 旧文件名 新文件名`文件重命名

* `mv 源文件 目标路径`移动文件

* `mv 源文件夹 目标路径`移动文件夹

* `find 查找路径 -name *.后缀`查找文件

* `cat 文件名`查看文件内容，加-n可以查看行号,-E显示空行
* `cat 源文件1 源文件2等 >> 新文件`合并多个文件内容到新文件

* `cat > 文件名 << EOF`输入自定义内容，最后还需要输入EOF结束输入

* `tail 文件名`控制台打印文件最后几行内容。可以加`-n 数量`控制显示行数。加-f动态监控文件最后几行，可以监听到文件内容改变

* `grep 关键词 文件名`筛选文件中包含关键字的内容，打印到控制台。关键词可以用正则表达式，前后不需要加//
* `grep -v 关键词 文件名`筛选文件中不包含关键字的内容，打印到控制台
* `grep 关键词 文件名 > 文件名`将筛选结果存到文件中

* `ll | grep 关键词`筛选出指定文件展示

```bash
// -E是指使用扩展正则表达式
ll | grep -E "log[0-9]{1,5}.txt"
```

* `shutdown -r now`立即重启

* `visudo` 授权管理员权限命令。会打开一个文本，此时通过100gg指令要跳转到第100行。在root下面加入

```bash
## 含义:    允许来源主机=(允许使用哪些用户的权限) 允许的命令
用户名       ALL=(ALL) ALL

## NOPASSWD可以免输入密码
## 用户名       ALL=(ALL) NOPASSWD:ALL
```

保存后执行`visudo -c`保证配置解析正确
