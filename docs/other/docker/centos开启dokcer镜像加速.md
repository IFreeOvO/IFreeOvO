# centos开启dokcer镜像加速

## 问题描述

docker下载镜像速度太慢

## 解决方案

修改配置

```bash
vi /etc/docker/daemon.json
```

加入以下代码：

```json
{
  "registry-mirrors": ["https://dhq9bx4f.mirror.aliyuncs.com"]
}
```

控制台执行下面两行代码

```bash
systemctl daemon-reload
systemctl restart docker
```
