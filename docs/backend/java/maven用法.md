# maven用法

## 本地仓库位置
>
> /Users/username/.m2/repository

## 指令

* 解析并下载依赖

```
mvn dependency:resolve
```

* 将依赖项添加到classpath中

```
mvn dependency:build-classpath
```

* 构建项目并将构件安装到本地 Maven 仓库

```
mvn install
```

## 设置项目级别的镜像

```xml
<!-- 跟properties标签同级 -->
<!-- maven依赖仓库镜像 -->
<repositories>
    <repository>
        <id>aliyun</id>
        <name>name和id可以随便写</name>
        <url>https://maven.aliyun.com/repository/public</url>
    </repository>
</repositories>
<!-- maven插件仓库镜像 -->
<pluginRepositories>
    <pluginRepository>
        <id>aliyun</id>
        <name>name和id可以随便写</name>
        <url>https://maven.aliyun.com/repository/public</url>
    </pluginRepository>
</pluginRepositories>
```

## maven的scope属性

|  scope值  |   描述 |
|----|----|
|  compile  |  默认值。依赖组件作用于所有阶段  |
|  provided  |  依赖组件仅作用在编译与测试阶段  |
|  runtime  | 依赖组件仅作用在测试与运行阶段   |
|   test |  依赖组件仅作用在测试阶段  |
|  system  |  本地jar文件仅作用在编译和测试阶段  |
