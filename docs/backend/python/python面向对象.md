# python面向对象

## 类

* 定义类

```python
class People:
    pass
```

* 定义构造函数

```python
class People:
    def __init__(self, sex):
        self.age = 10 # 定义属性
        self.sex = sex
        
    def eat(self): # 定义方法
        print("吃")
    
p = People(1)  
p.eat()  
print(p.age)
```

* 继承

```python
class People:
    def __init__(self, sex):
        self.age = 10 # 定义属性
        self.sex = sex
        
    def eat(self): # 定义方法
        print("吃")
        
class Student(People): # 继承People
    def __init__(self, sex, name): # 需要写上父类构造函数的参数
        super().__init__(sex) # 初始化父类
        self.name = name
        
    def my_say(self): # 子类自己的方法
        print(f"我是{self.name}")
        
s = Student(1, 'Alice')
s.my_say()
```

* 多态
指不同类的对象可以使用相同的方法名

```python
class People:
    def __init__(self, sex):
        self.age = 10 # 定义属性
        self.sex = sex
        
    def eat(self): # 定义方法
        print("吃")
        
class Student(People): # 继承People
    def __init__(self, sex, name): # 需要写上父类构造函数的参数
        super().__init__(sex) # 初始化父类
        self.name = name
        
    def eat(self): # 子类自己的方法
        print("不吃")
        
s = Student(1, 'Alice')
s.eat()
```
