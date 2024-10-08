# mysql注意事项

* sql语句不区别大小写，但是引号里字符串区别大小写

* sql语句必须分号结尾

* sql语句中空格和换行没有限制，但是不能破坏语法

* '#'单行注释，'/**/'多行注释

* 推荐用`数字类型`作为主键，因为数字的检索速度快。且可以设置自动增长

* 外键约束的定义是写在子表上

* 有外键关联的数据，删除的话，先从子表删除

* 如果形成外键闭环，将无法删除其中任何一张表

* 数据量很大时，才建议在经常查询的表上设置索引

* 索引值添加在经常被作为检索条件的字段上

* 不要在大字段上创建索引。比如特别长的字符串

* 排序字段内容相同时，默认比较主键大小进行排序。或者通过多个排序字段处理，解决内容相同的情况

* `DISTINCT`关键字去重，只能针对一列数据，查询多列结果，去重会失效

* `DISTINCT`在SELECT语句中只能使用一次

* `WHERE`子语句中，建议把索引条件放最左侧，或者筛选记录最多的条件放最左侧。因为条件执行顺序是从左到右，这样写可以提高查询速度

* 在包含`GROUP BY`语句中，SELECT子句中的内容只能包含聚合函数或者`GROUP BY`子句的分组列

* 聚合函数不能出现在`WHERE`和`ON`子语句中

* 推荐先用`WHERE`筛选，再用`GROUP BY `的`HAVING`筛选

* 内连接只保留符号条件的记录，所以查询条件写在ON子句和WHERE子句的效果是相同的。但是外连接里，条件写在WHERE子句里，不符合条件的记录会被过滤掉，而不是保留下来

* 子查询建议写在表连接里，写的WHERE子句里执行效率太低

* `DELETE`是在事务机制下删除记录，删除记录前会把被删除的记录保存到日志里，然后在删除。用`TRUNCATE TABLE 表名`在事务机制外区删除记录，速度比delete快

## 三个范式
1. 原子性
同一列不能有多个值，也不能存在重复属性
2. 唯一性
每条记录必须是唯一的。通常加一列用来存储唯一标识
3. 关联性
每列必须和主键有直接关系，不存在传递依赖

## 事务的ACID属性
原子性，一致性，隔离性，持久性

## 子句执行顺序
FROM -> WHERE -> GROUP BY -> SELECT -> ORDER BY -> LIMIT