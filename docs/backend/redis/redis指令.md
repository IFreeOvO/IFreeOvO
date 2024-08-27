# redis指令

## 操作指令

### 控制台进入redis

`redis-cli`

### 输入密码

`auth 密码`

### 将key中存储的数字值加一，如果key不存在会先初始化为0再加一

`incr key`

### 获取字符串

`get key`

### 查询所有键名

 `keys *`
 `keys 正则表达式`按条件查询键

### 修改redis配置中的日志级别

 `config set loglevel warning` 其中warning为其中之一的级别

### 切换数据库

 `select 1` 其中1为数据库索引

### 基础指令

 `dbsize` 返回key的总数
 `exists key名`检测某个key是否存在
 `del key名`删除key
 `expire key名 过期时间`设置key的过期时间
 `ttl key名`查看key的过期时间

### 进入事务模式（执行多条命令）

`MULTI`
事务模式能发现语法错误并会产生中断，但发现不了运行错误，例如对一个键名即进行列表操作又进行集合操作

### 退出事务

`EXEC`

### watch命令（可以解决竞态问题）

用法`watch key`
watch命令可以监控一个或多个。
因为过期而被删除的key不会被监控到

### 设置过期时间

`EXPIRE key seconds`(以秒为单位)
`PEXPIRE key milliseconds`(以毫秒为单位)
`EXPIREAT key timestamp`(以秒为单位时间戳)
`PEXPIREAT key timestamp`(以毫秒为单位时间戳)
没有设置时间则为永久存在

### 判断一个键还要多久才被删除

`TTL key`
-----

### 取消过期时间的设置

`PERSIST key`
 `set`操作为键赋值也会清理过期设置

### 【字符串】判断键名是否存在

 `exists key`

### 【字符串】删除键

`del key`

### 【字符串】判断数据类型

`type key`

### 【字符串】设置键值数据类型

 `set key value`

### 【字符串】按指定数值递增

 `incrby key 数字`
 如`incrby a 10` 是指a每次加10

### 【字符串】将key中存储的数字值减一，如果key不存在会先初始化为0再减一

`decr key`

### 【字符串】按指定数值递减

`decrby key 数字`

- 如`decrby a 10` 是指a每次减10

### 【字符串】获取/设置多个键值

 `mset key1 v1 key2 v2`
 `mget key1 key2`

### 【字符串】获取字符串长度

 `strlen key`

-----

### 【散列表】获取/设置散列表

 `hset hash key value`
`hget hash key`

### 【散列表】获取散列表键中所有字段和值

 `hgetall hash`

### 【散列表】判断散列表字段是否存在

 `hexists hash key`

### 【散列表】散列表字段值按指定数值递增

 `hincrby hash key 数字`

- 如`hincrby car price 10` 是指列表car的price字段值加10

### 【散列表】删除散列表字段

 `hdel hash key`

### 【散列表】设置多个键值

 `hmset hash key1 v1 key2 v2`

 -----

### 【列表】向列表两端添加元素

 `LPUSH key value`
 `RIGHT key value`

### 【列表】列表两端弹出元素

 `LPOP key`
 `RPOP key`

### 【列表】获取列表元素格式

  `LLEN list`
  
### 【列表】获取列表片段（类似于截取数组）

  `LRANGE list start end`
  start 开始索引，end结束索引
  `LRANGE list 0 -1` 获取所有元素
  
### 【列表】删除列表元素

 `LREN list count value`
 删除列表中count个值为value的元素，返回值是实际删除的元素个数
 *count为负数时从右往左删除,count为0会删除所有

### 【列表】获取/设置指定索引的元素值

 `LINDEX list index`
 `LSET list index value`

### 【列表】删除指定索引范围外的所有元素

 `LTRIM list start end`

### 【列表】向列表中插入元素

 `LINSERT list BEFORE|AFTER pivot value`
 查找元素pivot，根据BEFORE或AFTER决定向前还是向后插入value

### 【列表】将元素从一个列表移动到另一个列表

 `RPOPLPUSH source destination`
 从source列表右侧弹出元素放到destination列表左侧，整个过程是原子操作

 -----

### 【集合】添加元素

 `SADD 集合名 value1 value2`

### 【集合】删除元素

`SREM 集合名 value1 value2`

### 【集合】获取所有元素

`SMEMBERS 集合名`

### 【集合】判断元素是否存在

`SISMEMBER 集合名 value1`

### 【集合】集合之间的运算

`SDIFF 集合1 集合2等` 差集，基于集合1算
`SINTER 集合1 集合2等`交集
`SUNION 集合1 集合2等`并集

### 【集合】获取集合元素个数

`SCARD 集合名`

### 【集合】进行集合运算并存储

`SDIFFSTORE destination 集合1 集合2等`
`SINTERSTORE destination 集合1 集合2等`
`SUNIONSTORE destination 集合1 集合2等`

### 【集合】随机获取一个或多个集合元素

`SRANDMEMBER 集合名 count`
count为正数时，获取不重复的元素。如果count大于集合总元素个数则返回全部元素
count为负数时，获取的元素可能相同

### 【集合】随机从集合中弹出一个元素

`SPOP 集合名`

-----

### 【有序集合】增加元素

`ZADD 集合 score member`

### 【有序集合】获取元素分数

`ZSCORE 集合 member`

### 【有序集合】获取指定范围的元素

`ZRANGE 集合 start end`升序
`ZRANGE 集合 start end WITHSCORE` 同时获取到分数
`ZREVRANGE 集合 start end`降序
*分数相同时值按字典顺序，如果值为中文的话按中文的编码方式排序

### 【有序集合】获取指定分数范围的元素

`ZRANGEBYSCORE 集合 min max [withscore] [LIMIT offset count]` 分数范围包含端点。分数前加'('符合代表不含端点。分数不设上限可以用+inf，不设下限用-inf

- 例如`ZRANGEBYSCORE collection 10 100`找分数在10到100之间的元素
- 例如`ZRANGEBYSCORE collection 10 (100`找分数在10到100之间的元素，但不含100
- 例如`ZRANGEBYSCORE collection 10 +inf`找分数在10到无限大之间的元素
- 例如`ZRANGEBYSCORE collection 60 +inf LIMIT 1 3`找分数大于60分的从第二个人开始的3个人

### 【有序集合】增加元素分数

`ZINCRBY 集合 分数 元素`

### 【有序集合】获取集合元素数量

`ZCARD 集合`

### 【有序集合】获取指定分数范围内元素的个数

`ZCOUNT 集合 min max`

### 【有序集合】删除一个或多个元素

`ZREM 集合 value1 value2`

### 【有序集合】按分数排名范围删除元素

`ZREMRANGEBYRANK 集合 start end`

### 【有序集合】删除分数范围内的元素

`ZREMRANGEBYSCORE 集合 min max`

### 【有序集合】获取元素排名

`ZRANK 集合 member`

### 【有序集合】计算交集

`ZINTERSTORE destination 交集元素的个数 key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]`
