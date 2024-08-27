# java语法注意事项

## 方法重载

1. 同一个类中方法名相同。参数列表不同(参数个数，类型，顺序)
2. 方法返回值类型，修饰符随意

## 方法重写

1. 子类重写有继承关系的类方法
2. 方法名相同。参数列表相同(参数个数，类型，顺序)
3. 重写方法返回值类型是void活基本类型时，返回类型必须相同。返回值类型是引用类型时，重写方法返回值类型可以是父类或者子类
4. 重写方法的访问修饰符，访问范围需要大于等于父类的访问范围
5. 父类的构造函数不允许被重写
6. static方法不允许被重写

## 构造函数

1. 构造函数没有void修饰符
2. 构造函数可以有多个
3. 构造函数可以相互调用，但是必须放在构造函数的第一行
4. 构造函数名必须与类名一样
5. 父类的构造函数不允许被继承

## static修饰符

1. 静态方法中不能访问非静态成员，只能访问静态成员
2. 非静态方法可以访问静态成员
3. 类和对象都可以调用静态成员
4. 静态成员的存储空间被类和对象(实例)共享，所以修改静态成员会影响类和对象
5. 静态方法中不能使用this和super
6. 静态方法中只能通过实例化类，来访问类的成员
7. 子类方法如果跟父类方法名相同，参数列表相同，且都有static(子类方法不能一有@Override注解)，此时编译器会隐藏父类同名的静态方法，并把子类的这个方法视为子类的独有的静态方法

```java
class Animal {
    public static Animal create() {
        return new Animal();
    }
}

class Dog extends Animal{
    public static Dog create() {
        return new Dog();
    }
}
new Animal().create(); // 使用Animal的create
new Dog().create(); // 使用Dog自己的create
```

## protected修饰符

1. 允许在当前类、同包的子类/实例、跨包子类调用
2. 跨包时，实例不允许调用

## 无访问修饰符

1. 允许在当前类、同包的子类/实例
2. 跨包时，子类/实例都不允许调用

## final修饰符

1. 修饰类时，这个类不允许被继承
2. 修饰方法时，方法不允许被重写
3. 修饰局部变量时，一旦变量初始化过，就不允许被修改
4. 修饰属性时，如果属性初始化过了，则不允许被修改。如果没有初始化，那么只能在构造函数和构造代码块中进行初始化，初始化后不能修改
5. 不允许修饰构造方法

## abstract抽象类

1. 不允许实例化抽象类
2. 抽象方法不允许定义方法体，且子类继承时必须重写抽象方法
3. 子类和父类都是抽象类时，子类可以不重写父类的抽象方法
4. 不能与final、static、private同时使用

## 代码块

1. 代码块在类中的执行顺序:静态代码块->构造代码块->构造函数

```java
class Demo {
  // 构造代码块
  {
      System.out.println(22);
  }
  
  // 静态代码块
  static {
      System.out.println(11);
  }
  
  public Demo() {
    // 普通代码块
    {
       int a = 1;
    }

    System.out.println(33);
    // 普通代码块
    {
       int a = 2;
    }
  }
}
```

2. 静态代码块在实例化多个类时，只执行一次
3. 构造代码块在实例化时一定会执行
4. 构造代码块，静态代码块，普通代码块可以出现多次

## entends继承

1. 继承的初始化顺序：父类静态成员->子类静态成员->父类构造函数->子类构造函数
2. 子类的构造函数默认调用父类的无参数构造函数。但是可以通过super(xxx)去指定调用父类的其他构造方法
3. 父类的构造函数不允许被继承、重写
4. 只能继承一个类
5. 可以继承多个接口
6. 接口继承父接口时，可以继承除静态方法以外的所有成员

## 多态

1. (向上转型，隐式转型，自动转型)父类引用可以指向子类，可以调用子类重写的父类方法和父类本身的成员。子类特有成员无法使用

```java
class Animal {
    int age = 1;
    
    public void eat() {
        
    }
}

class Dog extends Animal{
    @Override
    public void eat() {
    }
    
    public void run() {
    }
}

Animal dog = new Dog();
dog.eat(); // 调用子类重写的方法
System.out.println(dog.age); // 使用父类的属性
```

2.(向下转型，强制类型转换)子类引用指向父类，此时必须强制转换

```java
Animal dog = new Dog();
Dog myDog = (Dog)dog;
myDog.run();
```

## Object方法

* equals比较对象引用是否相同
* toString

```java
class A{
    
}
A a = new A();
System.out.print(A); // 输出对象名时会自动调用toString方法
System.out.print(A.toString());// 与上面输出结果相同
```

## instanceof判断对象是否是类的实例

```java
if(dog instanceof Animal) {
    
}
```

## interface接口

1. 接口默认的修饰符是public，不能是protected、private
2. 接口中只能定义抽象方法、静态方法和默认方法，可以不写abstract

```java
public interface IFace {
    void say();
    
    // 实现时可以不重写这个方法
    default void run() {
        System.out.print("默认方法");
    }
    
    // 实现时不能重写这个方法
    static void sleep() {
        System.out.print("静态方法");
    }
}

public class Test implements IFace {
    @Override
    public void run() {
        IFace.sleep();
        IFace.super.run(); // 使用接口的默认方法
    }
    
    @Override
    public void say() {
        System.out.print(11);
    }
}
```

3. 接口中方法默认的修饰符是public
4. 抽象类实现接口时，可以不重写抽象方法
5. 接口中可以包含常量，且必须要初始值

```java
public interface IFace {
    // 程序会默认加public static final修饰
    int TEMP = 1;
}
```

6. 一个类可以实现多个接口

* 如果多个接口里存在相同的默认方法。则实现类需要自己重写下默认方法
* 如果多个接口里存在相同的静态成员。则实现类使用静态成员时，要指定接口名，例如IFace.say()
* 如果父类和接口的静态成员重名，则实现类需要定义自己同名的静态成员

## java文件中可以有多少类和接口

一个java文件可以有多个类和多个接口，但是只能存在一个public类或接口，且这个public类或接口必须和文件名相同

## 内部类

* 获取成员内部类实例

```java
class People {
    public int age;
    class Heart {
        public String beat() {
            System.out.print("心跳");
        }
    }
    
   public Heart getHeart() {
        return new Heart();
    }
    
    static class Head {
        String name;
    }
}

class Me extends People {
    public static void main(String[] args) {
        // 方式1
        Person.Heart heart = new Person().new Heart();
        heart.beat();
        
        // 方式1
        Person p = new Person();
        p.getHeart().beat()

        // 静态内部类的访问
        Head head = new Person().Head;
        System.out.print(Head.name);
    }
}
```

* 非静态成员内部类可以直接使用外部类成员。外部类使用内部类成员需要先进行实例化内部类
* 非静态成员内部类如果要访问外部类中的同名成员，可以通过`外部类.this`，例如`Person.this.age`
* 静态成员内部类使用外部类成员，需要先实例化外部类再进行访问
* 成员内部类前面不能加public、protected、private
* 方法内部类不存在静态成员
* 匿名内部类

```java
public abstract class Person {
    abstract void read();
}

public class Test {
    public void getRead(Person person) {
        person.read();
    }
    public static void main(String[] args) {
        Test t = new Test();
        // 创建匿名内部类
        t.getRead(new Person() {
            @Override
            public void read() {}
        })
    }
}
```

* 匿名内部类无法创建构造方法、抽象方法和静态成员，但是可以创建构造代码块。

## 异常处理

* throws用法

```java
public class Test {
    public static void main(String[] args) {
        try {
            int result = test();
        } catch (ArithmeticException e) {
            e.printStackTrace();
        }
    }
    
    // 抛出可能会出现的数字异常
    public static int test() throws ArithmeticException {
        Scanner input = new Scanner(System.in);
        int num = 5 / input.nextInt();
        return num
    }
}
```

* throws后面可以接多个异常，用逗号分隔
* throws可以接父类异常Exception。此时catch必须要捕获Exception。子类的捕获写不写都可以
* throw抛出非检查异常，编译器不会报红

## 包装类

* java的包装类不允许被继承
* 装箱

```java
// 自动装箱
int t1=2;
Integer t2=t1;
// 手动装箱
Integer t3 = new Integer(t1);
```

* 拆箱

```java
// 自动拆箱
int t4 = t2;
// 手动拆箱
int t5=t2.intValue();
```

* 基本数据类型和字符串之间的转换

```java
int t1 =2;
// 转字符串
String t2 = Interger.toString(t1);

// 字符转基本数据类型
// 方式1
int t3 = Integer.parseInt(t2);
// 方式2。valueOf会先把t2转成包装类，再自动拆箱
int t2 = Integer.valueOf(t2);
```

* 基本数据类型和包装类的比较

```java
Interger one = new Integer(100);
Interger two = new Integer(100);
// 打印false。因为one和two指向的引用地址不同
System.out.printIn("one==two的结果:"+(one==two)); 

Interger three = 100; // 自动装箱
// 打印true。因为three会自动拆箱得到100进行比较
System.out.printIn("three==100的结果:"+(three==100)); 

Interger four = 100;
// 打印true。因为Interger four = 100;相当于执行Integer.valueOf(100)
// valueOf参数在 -128<=参数<=127时，会判断缓存区(对象池)有木有存储过。有就直接返回存储空间，没有就实例化Interger。
// 由于上一步中Interger three = 100;在缓存区中存储过一次100。所以Interger four = 100;相当于直接从缓存里取值用
System.out.printIn("three==four的结果:"+(three==four)); 


Interger five = 200;
Interger six = 200;
// 打印false。因为200不在-128<=参数<=127这个范围内。Integer.valueOf会创建新的空间
System.out.printIn("five==six的结果:"+(five==six)); 
```

* 除了Float和Double类型，其他基本类型都有对象池的的概念(上面的比较例子里有提到)。Byte、Short、Integer、Long缓存[-128,127]直接，Character缓存[0,127]，Boolean缓存true和false

## 字符串

* `String a ="imoooc"`字符串的创建时，会在对象池查找字符串是否存在，存在就直接返回，不存在则在对象池中进行创建。`String a = new String("imooc")`则是在堆里进行创建，每次会创建一个新的对象
* String和StringBuild的区别
String具有不可变性，而StringBuild没有。所以频繁操作字符串时建议用StringBuild
* StringBuild和StringBuffer区别
StringBuffer是线程安全的。StringBuild则没有，所以性能略高

## 常见的集合与应用

### List集合

1. ArrayList常用来代替java数组。可以自动对数组容量进行扩容

```java
ArrayList<String> list = new ArrayList<String>();
list.add("字符"); // 添加
list.add(1, "单纯"); // 插入
list.set(1, "测试"); // 修改
list.remove("测试"); // 删除指定值
list.remove(0); // 删除指定位置
list.get(0); // 获取指定位置元素
list.size();// 获取元素数量
```

2. LinkedList基于链表实现

```java
LinkedList<String> list = new LinkedList<String>();
list.addFirst("啊啊"); // 在队列头部新增
list.addLast("吃的是草");
list.forEach(item -> {}); // 遍历方式1
Iterator itr = list.iterator(); // 遍历方式2
while(itr.hasNext()) {
    String item = itr.next();
}
```

3. Set是元素无序、不可重复的集合。用法和List集合基本相同

```java
// HashSet无法通过索引方法获取数据
Set<String> list =  new HashSet<String>();
list.contains("搜索"); // 判断是否包含元素
```

4. Set集合如何确保数据唯一性

> Set集合在新增数据时先判断数据的HashCode()是否存在，若HashCode()存在，再调用equals()进行比较。如果HashCode()和equals()都存在，才认为数据存在，不再新增。
> 这里为什么用不直接equals()判断？因为equals()执行效率慢，先HashCode()的话执行速度很快，但是可能出哈希碰撞，所以HashCode()执行完如果相等只能说明数据可能存在，还需要equals()进一步进行判断

5. LinkedHashSet是HashSet的子类，除HashSet特性外，它通过链表保证元素顺序。因为需要维护元素顺序，所以性能略低于HashSet

6. TreeSet采用红白树存储数据，保证元素时升序排列的。可以实现Comparable接口来自定义排序

```java
public class TreeSetDemo {
    class IntegerComparator implements Comparator<Integer> {
        // 重写比较方法，进行升序排列
        @override
        public int compare(Integer o1, Integer o2) {
            return o1 - o2;
        }
    }
    
    public void sort() {
        Set<Integer> list =  new TreeSet<Integer>(new IntegerComparator()); // 自定义排序
        set.add(1);
        set.add(2);
    }
    
    public static void main(String[] args) {
        new TreeSetDemo().sort();
    }
}
```

### Map映射

1. HashMap是无序存储，且key唯一

```java
Map<String, Object> map =  new HashMap(); // HashMap后面不写泛型，默认用前面的泛型

map.put("mykey", "值");
map.get("mykey");
map.containsKey("mykey"); // key是否存在
map.containsValue("值");
map.remove("mykey");
```

2. LinkedHashMap按数据插入顺序排序

```java
Map<String, Object> map =  new LinkedHashMap();
map.put("name", "成都市");
map.put("age", "12");
// 遍历1
Set<String> keys = map.keySet();
for(String k: keys) {
    System.out.print(map.get(k));
}

// 遍历2
map.forEach((key, value) -> {
    System.out.print(key+":"+value);

});

// 遍历3
Iterator<Map.Entry<String, Object>> itr = map.entrySet().iterator();
while(itr.hasNext()) {
    Map.Entry<String, Object> entry = itr.next();
    System.out.print(entry.getKey()+":"+entry.getValue());
}
```

3. TreeMap基于红白数实现，按key名称进行排序

## 泛型

1. 泛型通配符

`<? extends Shape>` 允许子类范围
`<? super Circle>` 允许Circle和Circle的父类
