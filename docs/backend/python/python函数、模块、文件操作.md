# python函数、模块、文件操作

## 函数

* 使用关键字参数时，参数顺序可以变化

```python
def func(a , b):
    print(a,b)
func(b=1,a=2)
```

* 默认参数

```python
def func(a=1 , b=2):
    print(a,b)
func()
```

* 可变参数

```python
def func(a, *b):
    print(a,b)
func(1,2,3,4)
```

* 匿名函数

```python
# 类似js里a => a*2
func = lambda a: a*2
func(3)
```

## 模块

* 安装指定版本模块

```python
pip install numpy==1.26.1
```

* 导入

```python
import math

import math as m # math取别名m

from math import add # 导入add方法

from math import * # 导入math所有方法
```

## 文件操作

* 复制

```python
import shutil
fileSource = '/a/source.jpg'
fileTarget = '/b/source.jpg'
shutil.copyfile(fileSource,fileTarget)
```

* 移动

```python
import shutil
fileSource = '/a/source.jpg'
fileTarget = '/b/source.jpg'
shutil.move(fileSource,fileTarget)
```

* 删除

```python
import os
fileTarget = '/b/source.jpg'
os.remove(fileTarget)
```

* 读取文本

```python
# 读取全部内容
with open('a.text', 'r') as file:
    content = file.read()
    print(content)
    
# 逐行读取
with open('b.txt', 'r') as file:
    line = file.readline()
    while line:
        print(line, end=' ')
        line = file.readline()
       
# 读取所有行 
with open('c.txt', 'r') as file:
    lines = file.readlines()
    print(lines)
```

* 写入文本

```python
with open('a.text', 'w') as file:
    file.write("你好")
    
# 逐行写入
lines = ['第1','第2']
with open('a.text', 'w') as file:
    file.writelines(line + '\n' for line in lines)
```
