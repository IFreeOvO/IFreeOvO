# docker构建多平台镜像

## 前言

准备一份Dockerfile文件例如：

```bash
# Dockerfile文件内容
FROM nginx:stable
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```

对应的构建命令为`docker build . -t nginx-demo`。

我们以这份简单的docker配置文件为例,介绍下如果利用`docker buildx`命令构建一个可以支持多个平台的docker镜像。

## 操作流程

1. 首先执行下

```bash
docker buildx ls
```

查看本地构建器列表，顺序验证下本地的docker版本是否支持buildx命令，低版本docker不会内置buildx命令，执行后会报错

2. 本地构建器列表会有一个默认的名叫`default`的构建器，macos电脑上无法直接用，需要通过命令

```bash
docker buildx create --use --name mybuilder
```

创建一个新的构建器。`--name mybuilder`表示新的构建器名称叫`mybuilder`，`--use`表示立即使用当前这个新建的构建器

3. 然后我们需要修改下原始的`Dockerfile`文件，加上`--platform=$BUILDPLATFORM`

```bash
# 修改后的Dockerfile文件内容
FROM --platform=$BUILDPLATFORM nginx:stable
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```

4. 一切准备就绪后使用新的构建命令`docker buildx build . -t nginx-demo --platform=linux/arm64,windows/amd64 --push`。其中`--platform`参数后面拼接需要支持的平台。`--push`表示构建完立即推送到远程docker仓库。至此我们实现里跨平台镜像的构建。
