# mysql高级查询

## 聚合函数

聚合函数查询结果只有一条

### AVG求非空值的平均值

```bash
select AVG(age) as avg from people;
```

#### SUM求和

```bash
select SUM(age) from people where age in(10,20);
```

#### MAX获取非空值的最大值

```bash
select MAX(age) from people;
```

#### MIN获取非空值的最小值

```bash
select MIN(age) from people;
```

#### COUNT获取记录数量

```bash
-- 获取包含空值的记录数量
select COUNT(*) from people;

-- 获取包含非空值的记录数量
-- 比如这里是把age里非空的记录排除在外
select COUNT(age) from people;
```

## 分组查询

### GROUP BY分组(搭配聚合函数使用)

```bash
-- 按部门分组，求每个部门平均薪资
SELECT deptno, AVG(sal) FROM t_emp GROUP BY deptno;
```

### WITH ROLLUP对每一列做汇总计算

```bash
SELECT deptno, COUNT(*),MAX(sal), MIN(sal) FROM t_emp GROUP BY deptno WITH ROLLUP;
```

### FROUP_CONCAT

```bash
-- FROUP_CONCAT可以把分组查询中的某个字段拼接成一个字符串
SELECT deptno,GROUP_CONCAT(ename), COUNT(*) FROM t_emp WHERE sal >= 2000 GROUP BY deptno;
```

### HAVING

限定分组范围，解决WHERE里不能写聚合函数的问题

```bash
-- 查询薪资大于2000的部门
-- HAVING中不能出现 字段与数值比较，例如sal >= 2000
SELECT deptno
FROM t_emp
GROUP BY deptno HAVING AVG(sal)>= 2000;
```

## 连接查询

```bash
SELECT * FROM t_emp e JOIN t_dept d ON e.deptno=d.deptno;
```

> 表连接分为内连接和外连接。内连接是结果集中只保留符合连接条件的记录；外连接是不管符不符合连接条件，记录都保留在结果集中，左连接保留左表记录，右连接保留右表记录

### 内连接多种语法形式

```bash
SELECT ... FROM 表1 JOIN 表2 ON 连接条件;

SELECT ... FROM 表1 JOIN 表2 WHERE 连接条件;

SELECT ... FROM 表1, 表2 WHERE 连接条件;
```

### UNION进行合并查询

```bash
-- 注意查询数量和字段名称和数量必须相同才行
(查询语句) UNION (查询语句) UNION (查询语句) ...
```

### 子查询

* 子查询可以写在WHERE、FROM和SELECT子句里，但是只有FROM子句的子查询最可取
* 单行子查询的结果集只有一条记录。多行子查询的结果集有多行记录
* 多行子查询只能出现在WHERE和FROM子句
* WHERE子句中，可以使用IN、ALL、ANY、EXISTS关键字来处理多行表达式结果集的条件判断

```bash
-- 例子：查询比FORD和MARTIN底薪高的员工信息
SELECT ename FROM t_emp
WHERE sal > ALL
(SELECT sal FROM t_emp
WHERE ename IN('FORD','MARTIN'));
```
