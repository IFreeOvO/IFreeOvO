# linux服务器如何安装java

1. 使用`yum search jdk`查看仓库有哪些可用jdk

2. 安装jdk

```bash
yum install -y java-1.8.0-openjdk
```

3. 查看java版本，来验证是否安装成功

```bash
java -version
// 或者
which java
```
