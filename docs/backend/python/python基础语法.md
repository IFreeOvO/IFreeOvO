# python基础语法

## 等号赋值

|  赋值类型   |  描述   |  示例  |
|----|----|----|
| 基本赋值   | 使用等号 (=) 进行赋值   | x = 10   |
|  同一个值给多个变量  |  可以使用一个值来赋给多个变量  |  x = y = z = 10  |
|  多重赋值  |  可以同时给多个变量赋多个值  |  x, y, z = 1, 2, 3  |
|  使用下划线的赋值 | 当不关心某个值时，可用下划线 (\_)“丢弃”变量   |  x, _ = 1, 2    |

## 变量命名规则

不能以数字和特殊字符开头

## 注释

`#` 代表单行注释
三引号`'''`或`"""` 代表多行行注释

## 输出字符串

```python
# 下面三个输出效果一样
name = "测试"

print("my name is %s "%(name))
print("my name is {} ".format(name))
print(f"my name is {name} ")
```

输出精度控制

```python
# 保留两位小数
num = 12.1234
print("%.2f" % num)
print("{:.2f}".format(num))
print(f"{num:.2f}")
```

## for循环

```python
# 对数字循环
num = 5
for i in range(num):
    print(f"第{i}个")
```

```python
# 对可迭代对象循环
arr = ["a","b","c"]
for item in arr:
    print(f"我是{item}")
```

```python
# 循环枚举
arr = ["a","b","c"]
for i, item in enumerate(arr):
    print(f"第{i}个是{item}")
```
