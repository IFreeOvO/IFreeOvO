# linux基础

## 系统目录

|  绝对路径  | 用途   |
|----|----|
|  /bin  |  常用的二进制命令所在目录  |
|  /boot  |  内核和系统引导目录  |
|  /dev  |  设备文件目录，比如声卡、光驱  |
|  /etc  |  yum、rpm方式安装应用程序的默认配置文件路径  |
| /home   |  存放用户数据  |
|  /var  |  系统与软件运行日志目录  |
|  /lib  |  启动系统与运行命令所需的共享库文件与内核模块目录  |
|  /proc  |  系统运行时，进程信息与内核信息存放与此目录  |
|  /root  | 超级用户目录   |
|  /sbin  |  系统管理命令存放目录  |
|  /usr  |  存放用户应用目录  |
|  /usr/local  | 编译方式安装程序的默认目录   |
|  /usr/src  | 程序源码目录   |

## yum好rpm关系

* rpm安装过程中，需要用户自己解决依赖问题
* yum通过引入软件仓库，联网下载rpm包以及依赖，并依次自动安装
* yum是rpm的前端程序，目的是简化rpm安装过程

## yum命令

* `yum search 应用名` 在仓库中搜索应用
* `yum install -y 应用名` 自动下载安装应用及其依赖
* `yum info 应用名` 查看应用详细信息
* `yum list installed 应用名` 查看已安装的应用程序
* `rpm -ql 应用名` 查看安装后输出的文件清单
* `yum remove -y 应用名` 自动卸载指定应用

## 网络命令

* `ifconfig` 查看网卡ip
* `netstat -tulpn`或`netstat -ano` 查看网络端口号

|  netstat选项  | 用途   |
|----|----|
|  t  |  显示tcp传输协议的连接状况  |
|  u   |  显示udp传输协议的连接状况  |
|  l  |  显示处于监听状态的网络连接  |
|  p  |  显示应用PID和程序名称  |
|  n  |  显示ip地址  |
|  a  |  显示所有连接  |
|  o  |  显示计时器   |

## 进程命令

* `ps -ef`查看进程
* `kill -9 进程PID` 强制杀掉进程
* `kill -s QUIT 进程PID` 按正常流程杀掉进程

## 服务管理命令

* systemctl

|  子指令  | 用途   |
|----|----|
|  start  |  启动服务  |
|  stop   |  停止服务  |
|  restart  |  重启服务  |
|  enable  |  设置开机启动  |
|  disable  |  禁止开机启动  |
|  status  |  查看服务状态  |
|  daemon-reload  |  重载服务配置文件   |
|  list-unit-files  |  列出所有服务   |

* `systemctl status 服务名`查看服务状态

## 用户与用户组常用命令

|  命令  |  用途  |
|----|----|
|  useradd  |  创建新用户  |
|  passwd  |  修改密码  |
|  usermod  |  修改用户信息/分配组(覆盖原组)  |
|  groupadd  |  创建新的用户组  |
|  chown  |  更改文件的属主或属组  |
|  chmod  |  更改文件的访问权限  |
|  newgrp  |  切换用户当前组  |
|  groups  |  查看当前用户所在组  |

* `useradd 用户名`创建新用户

* `passwd 用户名`为指定用户设置密码

* `groupadd 分组名`创建用户组

* `usermod -g 用户组 用户名`给用户分配组,-g 设置组

 `usermod -G 用户组1,用户组2 用户名`给用户分配组,-G 设置多个组

* `chown 用户:用户组 文件名`更改文件的属主或属组

* `chmod 权限代码(如750) 文件名`更改文件的访问权限

## 文件权限代码表

|  d  |  r  |  w  |  x  |   r |  w  |  x  |  r  |  w  |  x  |
|----|----|----|----|----|----|----|----|----|----|
|    |   4 |   2 |  1  |  4  |  2  |  1  |  4  |  2  |  1  |
|  目录  |  属主读取  |  属主写入  | 属主执行   |  组读取  |  组写入  |  组执行  | 其他读取   | 其他写入   |  其他执行  |

## 防火墙命令

* `firewall-cmd --state` 查看防火墙运行状态

* `firewall-cmd --list-ports`查看防火墙放行了哪些端口

* `firewall-cmd --zone=public --permanent --add-port=端口号/tcp`放行端口。--permanent代表永久，--zone=public指针对某个规则(区域)

* `firewall-cmd --zone=public --permanent --remove-port=端口号/tcp`移除放行端口

* `firewall-cmd --zone=public --permanent --add-port=端口号-端口号tcp` 放行指定范围的端口。移除同理

* `firewall-cmd --zone=public --permanent --add-rich-rule="
rule family="ipv4" source address="192.168.xxx.xx" port protocol="tcp" port="端口号" accept "`只给指定主机放行端口号

* `firewall-cmd --reload`重载防火墙规则(设置永久规则时需要重启)
