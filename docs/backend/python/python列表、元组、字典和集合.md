# python列表、元组、字典和集合

## 序列

* 序列切片

```python
number = [1,2,3,4,5]
print(numbers[1:3]) #输出索引为1到3的元素(但不含索引3的元素)
print(numbers[2:]) # 索引2到最后元素
print(numbers[:2]) # 从首个元素到索引2(不含索引2)
print(numbers[:-2]) # 从左往右数，数到倒数第二个元素(不包含倒数第二个)
print(numbers[0:4:2]) # 在0到4范围内(不包含4)，按步进2输出数元素
```

* 序列拼接

```python
a = [1]
b = [2, 3]
c = a + b # c为[1, 2, 3]
```

* 序列乘法

```python
num = [1,2,3]
res = num * 3 # res为[1,2,3,1,2,3,1,2,3]
```

* 判断元素是否在序列中

```python
num = [1,2,3]
if 1 in num:
    print("包含")
```

* 统计

```python
num = [1,2,3]
len(num) # 序列长度
max(num) # 序列最大值
min(num) # 序列最小值
sum(num) # 求和
```

* 排序

```python
score = [1,2,3]
score.sort() # 升序
score.sort(reverse=True) # 降序
```

* 新增删除

```python
a = [1]
a.append(2)
a.remove(2) # 2是指元素值
```

## 列表推导式

* 快速创建有序列表

```python
list = [i for i in range(10)] # 创建0-9元素
```

## 元组

* 创建元组

```python
tu = tuple(range(10, 20, 2)) # 从10-20按步进2取出元素放到元组，结果(10,12,14,16,18)
```

* 解包元组

```python
model_config = (3,23, "啊啊")
a,b,c = model_config
print(f"a={a},b={b},c={c}")
```

* 元组和列表区别

| 特性   |  列表  |  元组  |
|----|----|----|
|  定义  |  使用[]或者list  | 使用()或者tuple   |
|  可变性  |  可变  |  不可变，不能修改内容  |
|  方法  |  方法多  |  方法少  |
|  性能  |  较慢  |  较快  |
|  适应场景  |  经常修改数据  |  不需要修改数据  |
|   占用空间 |  较多  |  较少    |

## 字典

* 遍历

```python
obj = {'a': 1, 'b': 2, 'c':3}
for k, v in obj.items():
    print(k, v)
```

## 集合

* 交集

```python
set1 = {1, 2}
set2 = {2, 3}
set1.intersection(set2)
# 或者
set1 & set2
```

* 并集

```python
set1 = {1, 2}
set2 = {2, 3}
set1.union(set2)
# 或者
set1 | set2
```

* 差集

```python
set1 = {1, 2}
set2 = {2, 3}
set1.difference(set2)
# 或者
set1 - set2
```

## 字符串

```python
str = "abcdef"
str[1:5] # 索引1到5的字符(不含5)
str[1:] # 索引1到最后
str[1:5] # 从开始到5的字符
str[:] # 获取整个字符串
str[-3:] # 获取最后三个字符
str[1:-2:2] # 从索引1到倒数第3个,步进2取一个
str[::-1] # 反转字符串
```
