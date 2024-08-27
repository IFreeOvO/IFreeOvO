# mongo命令

1. `use [数据库名称]` 切换或使用数据库
2. `db.auth('用户名', '密码')` 鉴权登录
3. `db.[集合名称].insertOne({xx:xxx})` 插入一条数据
4. `show dbs` 显示可操作的数据库
5. `show collectiions` 显示数据库下的集合
6. `db.[集合名称].find({})` 查看数据,空对象是查询所有数据
7. `db.[集合名称].updateOne({[字段名]:'唯一的字段值'},{$set:{字段名:字段值}})` 更新数据
8. `db.[集合名].deleteOne({[字段名]:'唯一的字段值'})` 删除数据

显示当前数据库名称

```bash

db
```

注册数据库管理员流程
1.切换到admin数据
2.登录
3.切换到需要注册管理员的数据库
4.创建这个数据的角色

```bash
db.createUser({user: "lego", pwd: "666666", roles: [{ role: "dbOwner", db: "lego" }]})
```

```markdown
Built-In Roles（内置角色）：
    1. 数据库用户角色：read、readWrite;
    2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
    3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
    4. 备份恢复角色：backup、restore；
    5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
    6. 超级用户角色：root  
    // 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
    7. 内部角色：__system
```

```markdown
角色权限：
Read：允许用户读取指定数据库
readWrite：允许用户读写指定数据库
dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
dbOwner: 允许用户在当前数据库执行热议操作
clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
root：只在admin数据库中可用。超级账号，超级权限
```
