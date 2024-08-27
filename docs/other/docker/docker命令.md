# docker命令

## 镜像命令

* `docker commit [container-id][spacename]/[repository-name]:[desc]`  将容器打包成一个镜像

```bash
docker commit  -m "nginx动态代理" d3de32a05d18 ifreegame/nginx-proxy:1.0
```

* `docker build [options] image-name <Dockerfile文件路径，例如.>`创建一个镜像,'.'表示当前路径,'--no-cache'不缓存

```bash
docker build . -t nginx-proxy
```

* `docker push [spacename]/[images-name]:[image-tag]`  将本地的镜像上传到镜像仓库

```bash
docker push ifreegame/nginx-proxy:1.0
```

* `docker images`列出本地镜像

* `docker container ls`查看容器列表

* `docker pull [spacename]/[repository-name]` 拉取远程镜像

* `docker commit [容器id] [要创建的目标镜像名]:[标签名]`   创建docker镜像

* `docker images` 查看镜像

* `docker rmi image-id` 删除镜像

## 容器命令

* `docker rm [容器名]` 删除容器(容器如果在运行就先stop,再rm)

* `docker start [容器id]` 启动容器

* `docker container start [容器id]` 启动容器

* `docker run -d -p 81:80 -v host-path:container-path --name container-name image-name`

```bash
docker run --name nginx-demo -d -p 8080:80 -e WEB_HOST_URL=http://r3-8098.dev.burgeononline.com nginx-proxy
```

(-d后台运行,-p端口,81为主机,80为镜像中的端口,--name自定义容器名,-v路径映射,实现让容器使用主机里的文件,-e环境变量 )

* `docker stop [容器id]` 终止容器

* `docker restart [容器id]` 重启容器

* `exit`在容器内部运行，可退出容器

* `docker logs -f [容器名称]` 持续打印容器里的信息

## 其他操作

* `docker login/logout` 登录/登出镜像仓库

* `docker exec -it [container-id] command` 进入容器并执行命令例如bash(-i指即使没有附近也保持stdin打开,-t分配一个伪终端)。它会打开新的终端

* `docker attach`进入容器。在已有终端打开

* `docker ps | grep <container-name>` 列出运行中的容器并筛选指定容器（docker ps 后面加-a 查看所有容器）

* `docker volume create <volume-name>`创建一个volumn给不同容器使用

* `docker run -d -v <volume-name> container-path command`通过volumn映射地址

* `docker volume inspect <volume-name>`获取volume的信息

* `docker network create network-name`创建一个可供容器之间通信的网络

* `docker system df`查看docker空间使用情况

* `docker cp xxx/.  8ccc8cdce9ec://xxx/xxx` 复制本地(命令行执行路径的相对路径)xxx目录下所有内容到xxx目录(绝对路径)

* `docker cp xxx/  8ccc8cdce9ec://xxx/xxx` 复制本地xxx目录到xxx目录下

* `docker inspect`获取容器/镜像元数据

* `docker inspect 容器id | grep Pid` 查看容器进程在宿主机上的真实IP

* `docker top mysql`查看容器中运行的mysql进程信息

* `docker events --since="313133132"`获取服务事件

* `docker port 容器id`获取容器端口映射

* `docker tag 镜像 镜像:tag` 设置docker的tag

* `docker rm -v ${docker ps -aq -f status=exited}`批量删除所有已经退出的容器

* `docker system prune -f`删除已经退出的容器

* `docker image prune -a`删除未使用的镜像

* `docker login -u 用户名 私有仓库域名`登录私有仓库

## 批量操作

* `docker container stop $(docker container ps -qa)`利用`docker container ps -qa`返回的容器id批量停止容器

## docker-compose

* `docker-compose up -d` 执行docker-compose配置文件

* `docker-compose stop` 批量停止

* `docker-compose down` 批量停止，并删除容器和网络

* `docker-compose rm` 批量删除

* `docker-compose -f [filename].yml up -d` 强制使用指定yml进行启动
