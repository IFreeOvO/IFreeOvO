# 使用docker环境变量动态配置nginx

## 前言

前后端联调接口时，经常会用到nginx反向代理来解决跨域问题。部署时，同一份前端代码有时候会根据开发环境不同，需要切换不同的后端接口地址进行代理。
传统方式是为每个环境都独立部署一份nginx配置，但是多数情况下，这些配置里的内容大体上相同，只有少数部分内容需要修改，这时候我们就希望nginx配置能够从docker中获取环境变量，动态设置有差异的那部分配置。本文将以代理接口地址为例，介绍下解决方案

## Docker安装nginx服务

我们先从配置一份静态的nginx环境开始。

1. 首先，找一个空文件夹，把前端项目打包后的`dist`文件夹拷贝到根目录
2. 在根目录下配置`nginx.conf`如下，代理接口的关键点在于`proxy_pass`:

```bash
server {
  listen 80;
  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
  location /api/ {
    #这里假设接口地址为http://127.0.0.1:8081
    #前端以/api/开头的接口将被代理到http://127.0.0.1:8081
    proxy_pass http://127.0.0.1:8081;
  }
}
```

3. 同时在根目录下面创建一份`Dockerfile`文件，写入以下内容

```bash
# 拉取nginx镜像
FROM nginx:stable-alpine
# 把本地的dist文件夹下所有内容复制到/usr/share/nginx/html下
COPY dist/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
# 暴露80端口
EXPOSE 80
# 将docker环境下的命令行路径切换到/etc/nginx/conf.d下执行
WORKDIR /etc/nginx/conf.d
# 此时相当于在docker容器里的/etc/nginx/conf.d路径下，运行nginx命令
ENTRYPOINT nginx -g 'daemon off;'
```

4. 执行`docker build . -t my-nginx`命令将本地资源打包成镜像，镜像名为`my-nginx`

5. 执行`docker run --name nginx-server -d -p 8080:8080 my-nginx`运行镜像，`--name nginx-server`设置docker容器的名称，`-p 8080:8080`指将容器内8080端口映射到宿主机的8080端口，`my-nginx`就是之前打包好的镜像

6. 这时浏览器打开`http://localhost:8080`进行访问，接口就被代理到了`http://127.0.0.1:8081`

## 动态配置nginx.conf

上一步我们使用静态配置运行了nginx服务，现在我们来试试通过环境变量，动态注入nginx配置。

1. 将`nginx.conf`重命名为`nginx.template`(名字可以随便起，不重命名也行，这里为了表示这是一个模板)，修改内容如下

```bash
server {
  listen 80;
  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
  location /api/ {
    #使用变量替换具体的地址，或者用${URL_1}也行
    proxy_pass $URL_1;
  }
  location /login/ {
    #新增一个代理接口，方便演示注入多个变量，或者用${URL_2}也行
    proxy_pass $URL_2;
  }
}
```

2.同时`Dockerfile`也有修改一下

```bash
FROM nginx:stable-alpine
COPY dist/ /usr/share/nginx/html
#这里改成将nginx配置模板复制过去
COPY nginx.template /etc/nginx/conf.d
EXPOSE 80
WORKDIR /etc/nginx/conf.d
#添加环境变量的写入
ENTRYPOINT envsubst '$URL_1 $URL_2'  < nginx.template > default.conf && cat default.conf && nginx -g 'daemon off;'
```

这里实现环境变量注入的核心原理是利用`linux`自带的`envsubst`指令。`envsubst '$URL_1 $URL_2'  < nginx.template`作用是取环境的`$URL_1`和`$URL_2`(此处变量名也可以写成${URL_2}，与模板保持一致即可)的值注入到`nginx.template`模板里对应的位置，然后后半句`> default.conf`是将替换好变量后的模板内容写入到docker容器下`default.conf`文件里。`cat default.conf`这句话方便我们查看nginx的配置内容，下文会提到。

3. 重新执行`docker build . -t new-nginx`重新打包镜像

4. 执行`docker run --name new-nginx-server -d -p 8080:8080  -e URL_1=http://127.0.0.1:8081 -e URL_2=http://127.0.0.1:8082 new-nginx`运行镜像，这里我们新增了`-e URL_1=http://127.0.0.1:8081 -e URL_2=http://127.0.0.1:8082`，往容器里注入了环境变量，`URL_1`的值为`http://127.0.0.1:8081`，`URL_2`的值为`http://127.0.0.1:8082`

5. 然后我们使用`docker logs -f new-nginx-server`查看容器里打印的内容，因为之前已经提前写好`cat default.conf`，所以执行完命令后，可以直接在
   控制台看到打印出的nginx配置，之前的变量部分，已经成功的被替换掉：

```bash
server {
  listen 80;
  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
  location /api/ {
    proxy_pass http://127.0.0.1:8081;
  }
  location /login/ {
    proxy_pass http://127.0.0.1:8082;
  }
}
   ```

## 总结

整个方案，采用的是通过`docker run -e xxxx=xxx`先往容器注入环境变量，然后进一步通过`envsubst`指令将环境变量写入到具体的文件当中，实现动态配置文件内容。
当然这个方案依然有一些缺陷，例如当需要替换的变量有成百上千时，命令会很长，那时可能需要找一些其他方案进行优化。此外这里`envsubst`只是实现变量替换的其中一种方式，
其实实现类似的功能的方式有很多，例如利用`nodejs`配合`ejs`动态写入也是可以的，本文仅是提供一下大体的思路，具体实现可以结合自身项目灵活变通。
