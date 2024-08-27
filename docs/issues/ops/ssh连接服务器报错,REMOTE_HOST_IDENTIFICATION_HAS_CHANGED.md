# ssh连接服务器报错，REMOTE HOST IDENTIFICATION HAS CHANGED

## 问题描述

笔者初始化阿里云服务器后，再次进行ssh连接，控制台报错
> @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
da:f7:3e:ba:f7:00:e6:44:76:f2:58:6e:48:******.
Please contact your system administrator.
Add correct host key in /用户home目录/.ssh/known_hosts to get rid of this message.
Offending RSA key in /用户home目录/.ssh/known_hosts:1
RSA host key for ip地址 has changed and you have requested strict checking.
Host key verification failed.

## 问题产生原因

网上说这个问题的原因是,第一次使用SSH连接时，会生成一个认证，储存在客户端的known_hosts中。笔者猜测应该是服务器初始化时导致之前存的验证密钥变了，使得本机和服务器的密钥对不匹配

## 解决方案

在本地电脑上执行`ssh-keygen -R 168.12.xx.xx`(写上阿里云服务器的ip地址)，该指令可以从 known_hosts 文件中删除所有属于 hostname 的密钥
