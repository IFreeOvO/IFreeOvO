# mysql基本查询

* 查询表的所有数据

```bash
select * from 表名
```

* 查询表里指定字段的所有数据

```bash
select 列1，列2 from 表名
```

* 给列取别名

```bash
select 列1 as "新列名" from 表名
```

* 分页查询

```bash
select 列  from 表名 LIMIT 起始位置,偏移量
```

```bash
select 列  from 表名 LIMIT 10
-- 等价于select 列  from 表名 LIMIT 0,10
```

* 对查询结果排序

```bash
select * from 表名 ORDER BY 列名 [ASC|DESC]
-- ASC升序，DESC降序
select * from 表名 ORDER BY 列1 [ASC|DESC],列2 [ASC|DESC]
-- 当列1字段值相同时，按照列2排序
```

* 去除重复的查询结果

```bash
select DISTINCT 列  from 表名
-- DISTINCT关键字去重，只能针对一列数据，查询多列结果，去重会失效;DISTINCT在SELECT语句中只能使用一次;DISTINCT必须放在第一个列名前面
```

* 按条件查询数据

```bash
select *  from 表名 WHERE 条件 [AND|OR] 条件
-- 例如select *  from people where sex=1 or age < 18;
```
