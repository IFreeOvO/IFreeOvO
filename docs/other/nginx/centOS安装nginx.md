# centOS安装nginx

## 安装nginx依赖

```bash
yum -y install wget // 如果没有wget的话
yum -y install pcre* 
yum -y install openssl*
```

## 在/usr/local/src/nginx目录下载并解压nginx

```bash
cd /usr/local/src
mkdir nginx
cd nginx/
wget http://nginx.org/download/nginx-1.13.9.tar.gz
tar -zxvf nginx-1.13.9.tar.gz
```

## 编译并安装nginx

```bash
cd nginx-1.13.9
./configure
make -j4   // 4核同时编译
make install
/usr/local/nginx/sbin/nginx -t   // 执行后有返回值，说明安装成功
ln -s /usr/local/nginx/sbin/nginx /usr/sbin/nginx   // 创建nginx软连接
nginx   // 启动nginx。在本地浏览器输入服务器ip，如果显示nginx欢迎页说明启动成功
```

## 设置nginx开机自启动
>
> 参考文章链接：[centos7.x设置nginx开机自启动](https://www.cnblogs.com/bkwxx/p/10717891.html)
