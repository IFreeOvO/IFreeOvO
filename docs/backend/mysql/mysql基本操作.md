# mysql基本操作

## 逻辑库操作

* `CREATE DATABASE dbname` 创建逻辑库

* `show databases` 查看数据库

* `drop database 逻辑库名称` 删除逻辑库

* `use 逻辑库名称`使用逻辑库

* `show tables` 显示逻辑库里的表

## 表操作

* `create table 数据表 (
    列名1 数据类型 [约束] [注释]
) [注释]` 创建数据表

```bash
create table student (
    id INT UNSIGNED PRIMARY KEY,
    sex CHAR(1) NOT NUll
)
```

* `insert into 逻辑库表名 values()`给表插入数据

* `desc 表名`查看表的情况

* `show create table 表名`查看创建表的sql语句

* `drop table 表名`删除表

* 给表添加字段

```bash
alter table 表名 
add 列1 数据类型 [约束] [COMMENT 注释],
add 列2 数据类型 [约束] [COMMENT 注释];
```

* 给表修改字段和约束

```bash
alter table 表名 
modify 列1 数据类型 [约束] [COMMENT 注释],
modify 列2 数据类型 [约束] [COMMENT 注释];
```

* 给表修改字段名称

```bash
alter table 表名 
change 列1 新列名 数据类型 [约束] [COMMENT 注释],
change 列2 新列名 [约束] [COMMENT 注释];
```

* 给表删除字段

```bash
alter table 表名 
drop 列1 ,
drop 列2;
```

## 索引操作

* `create index 索引名称 on 表名(字段)`创建索引

* `alter table 表名 add index [索引名称](字段)`创建索引

* `show index from 表名`查看表的索引

* `drop index 索引名称 on 表名`删除索引

## 插入数据

```bash
-- 插入一条记录
INSERT INTO 表名(字段1,字段2,...)
VALUES(值1,值2,...);

-- 插入多条记录
INSERT INTO 表名(字段1,字段2,...)
VALUES(值1,值2,...),(值1,值2,...);

-- 方言语法
INSERT [INTO] 表名 SET 字段1=值1,字段2=值2,...;
```

## IGNORE关键字

IGNORE关键字可以让INSERT插入数据库里不存在的记录、UPDATE同理

```bash
INSERT [IGNORE] INTO 表名
```

## 更新数据库

```bash
UPDATE [IGNORE] 表名 SET 字段1=值1,字段2=值2,...;


-- 表连接(内连接和外连接都行)
UPDATE  表1 [LEFT|RIGHT] JOIN 表2 ON 条件
SET 字段1=值1,字段2=值2,...;
```

## 删除数据

```bash
-- 内连接和外连接都支持
-- 不加where会删除表里所有数据
DELETE 列... [IGNORE] FROM 表名 [LEFT|RIGHT] JOIN 表2 ON 条件
[WHERE 条件...] [ORDER BY...] [LIMIT...]
```

```bash
-- 快速删除表里全部记录
-- 一次只能清空一张表
TRUNCATE TABLE 表名;
```

## 事务机制

所有sql要么全部成功，要么全部失败

```bash
-- 开启事务
-- ROLLBACK回退全部事务
-- COMMIT提交事务，所有操作生效，不能回退
START TRANSACTION;
SQL语句
[COMMIT|ROLLBACK];
```

* 修改事务级别

```bash
-- READ UNCOMMITTED 代表可以读取其他事务未提交的数据
SET SESSION TRANSACTION ISOLATION LEVEL
READ UNCOMMITTED;

-- READ COMMITTED 代表只能读取其他事务已提交的数据
SET SESSION TRANSACTION ISOLATION LEVEL
READ COMMITTED;

-- REPEATABLE READ 代表事务在执行过程中反复读数据，得到的结果是一致的，不会受到其他事务影响
SET SESSION TRANSACTION ISOLATION LEVEL
REPEATABLE READ;

-- 事务序列化
-- 让事务顺序执行
SET SESSION TRANSACTION ISOLATION LEVEL
SERIALIZABLE;
```

## 导出sql文件

```bash
-- 不加no-data时，即导出表结构也导出表数据
mysqldump -uroot -p [no-data] 逻辑库 > 路径
-- 例如mysqldump -uroot -p demo > /logs/demo.mysql
```

## 导入sql文件

需要进入sql终端

```bash
-- 导入示例
sql > USE demo;
sql > SOURCE backup.sql;
```
