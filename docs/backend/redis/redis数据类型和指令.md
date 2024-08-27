# redis数据类型和指令

## redis数据类型

* String-字符串类型
* Hash-Hash类型
* List-列表类型
* Set-集合类型
* Zset-有序集合类型

## 字符串类型

* String最大512mb，建议单个kv不超过100kb，否则从内存中提取数据的效率会降低

### 指令

* 获取key=kxx的结果

```bash
get kxx
```

* 设置key=kxx,value=vxx

```bash
set kxx vxx
```

* 一次性设置或者获取多个值

```bash
mset mset k1 v1 k2 v2

mget k1 k2
```

* 删除key=kxx

```bash
del kxx
```

* key值自增/自减1

```bash
incr kxx

decr kxx
```

* 自增/自减指定步长

```bash
incrby kxx 数字

decr kxx 数字
```

* 检测是否存在

```bash
exists kxx
```

* 判断数据类型

```bash
type kxx
```

* 获取字符串长度

 ```bash
 strlen kxx
 ```

## hash键值类型

* 用于存储结构化数据

### 指令

* 获取hash中key=kxx的结果

```bash
hget hkxx kxx
```

* 设置hash中kxx=vxx

```bash
hget hkxx kxx vxx
```

* 设置hash多个值;获取hash多个值;获取hash所有值

```bash
hmset hkxx k1 v1 k2 v2

hmget hkxx k1 k2

hgetall hkxx
```

* 删除hash的kxx

```bash
hdel hkxx kxx
```

* 检测是否存在

```bash
hexists hkxx
```

* 获取指定长度

```bash
hlen hkxx
```

## List列表类型

* List是一系列字符串的'数组'，按插入顺序排序
* List最大长度是2的23次方-1，可以包含40亿个元素

### 指令

* 往key=lkxx的数据右侧插入v1, v2两个元素，此时顺序是v1, v2

```bash
rpush lkxx v1 v2
```

* 往key=lkxx的数据做侧插入v1, v2两个元素，此时顺序是v2, v1

```bash
lpush lkxx v1 v2
```

* 右侧弹出

```bash
rpop lkxx
```

* 左侧弹出

```bash
lpop lkxx
```

* 查询指定索引范围内的元素

```bash
// 查询所有元素
lrange lkxx 0 -1
```

## Set和Zset集合类型

* Set集合是字符串的无序集合，集合成员是唯一的
* Zset集合是字符串的有序集合，集合成员是唯一的
* set和Zset指令差不多，把s开头换成z开头即可

### 指令

* 新增集合成员

```bash
sadd skxx v1

// 分数用于排序
zadd zkxx 分数 v1
```

* 查看集合所有成员

```bash
smember skxx

// 按索引查询
zrange zkxx 0 -1

// 按分数查询
zrange zkxx 起始分数 结束分数

// 显示分数
zrange zkxx 0 -1 withscore
```

* 求两个集合交集

```bash
sinter sk1 sk2
```

* 求两个集合并集

```bash
sunion sk1 sk2
```

* 求两个集合差集(sk1有,sk2没有)

```bash
sdiff sk1 sk2
```
