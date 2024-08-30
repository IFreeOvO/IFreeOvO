# 连接postgresql报错database "tracking" is not currently accepting connections

## 问题描述

新建了一个空的postgresql数据库，之后我使用nestjs去连接postgresql服务，控制台报错：

```bash
database "xxx" is not currently accepting connections
```

## 解决方案

进入postgresql数据库里执行

```bash
alter database tracking with allow_connections true;
```

允许数据库连接即可
