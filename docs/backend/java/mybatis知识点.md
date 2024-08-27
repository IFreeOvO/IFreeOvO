# mybatis知识点

## select和useGeneratedKeys区别

* selectKey标签需要明确编写获取最新主键的sql语句
* useGeneratedKeys属性会自动根据驱动生成对应sql语句

## select和useGeneratedKeys应用场景

* selectKey适用于所有的关系型数据库
* useGeneratedKeys只支持'自增主键'类型的数据库。而且即使切换其他数据库，也不需要重新写获取最新主键的sql语句

## mybatis两种传值方式

* ${}文本替换，未经过任何处理对sql文本替换
* \#{}预编译传值，使用预编译传值可以预防sql注入

## 二级缓存

* 一级缓存默认开启，缓存范围sqlSession会话
* 二级缓存手动开启，属于范围Mapper Namespace

## 二级缓存运行规则

* 二级缓存开启默认所有查询操作均使用缓存
* 写操作commit提交时对该namespace缓存强制清空
* 配置useCache=false可以不用缓存
* 配置flushCache=true代表强制清空缓存

### 二级缓存清除策略(eviction)

1. LRU 最近最久未使用
2. FIFO 先进先出
3. SOFT 软引用：移除基于垃圾收集器状态和软引用规则的对象
4. WEAK 弱引用：更积极的移除基于垃圾收集器状态和弱引用规则的对象

### 二级缓存只读(readOnly)

* true代表返回只读缓存，每次从缓存取出的是缓存对象本身，这种执行效率高
* false，代表每次取出的是缓存对象的'副本',每次取出的对象不同，这种是安全性高

## 批量插入的局限性

* 无法获取插入数据的id
* 批量生产的sql太长，可以会被服务器拒绝

## 常用注解

|  注解  |  对应xml  |  说明  |
|----|----|----|
|  @Insert  |  `<insert>`  |  新增sql  |
|  @update  |  `<update>`  |  更新sql  |
|  @delete  |  `<delete>`  |   删除 |
|   @select | `<select>`   |  查询  |
|  @param  |    |  参数  |
|  @Results  |  `<resultMap>`  |  结果映射  |
|  @Result  | `<id>`、`<result>`   | 字段映射   |
|    |    |    |
|    |    |    |
