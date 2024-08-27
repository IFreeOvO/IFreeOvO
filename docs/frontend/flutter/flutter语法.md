# flutter语法

> 列举flutter3.x版本里的dart用法上与js的不同。和dart特有的语法

## 声明

* var变量声明

```dart
// 初始化时可以赋值任何类型。如果第一次声明时就初始化，后面就不能修改成其他类型
var a = 123; // a被推导为数字类型
a = '哈哈'; // 报错。因为此时a是数字类型，接受不了字符串

// 如果第一次声明时，不进行初始化，那么它可以接受任何类型
var b;
b = 123;
b = true;
```

* const常量声明

```dart
const a = 123; // 正确用法。声明时就要赋值
const a = new DateTime.now(); // 报错。因为const是编译时常量

var o1 = const Object();// const在多处创建相同对象时，只保留一个对象在内存中
var o2 = const Object();
print(identical(o1, o2)); // 打印true

print(identical(const [1], const [1])); // 打印true
print(identical(const [1], const [2])); // 打印false
```

常量构造函数：

1. 常量构造函数用const修饰
2. const构造函数必须用于成员变量都是final的类
3. 如果实例化时不加const，即使常量构造函数，实例化对象也不是常量实例
4. 实例化常量构造函数。多处调用时如果参数相同，只保留一个对象

```dart
class Container {
    final int width;
    final int height;
    // 定义常量构造函数
    const Container({required this.width,required this.height});
};

var a1 = const Container(width:1,height:1); // new可以省略
var a2 = const Container(width:1,height:1);
print(identical(a1, a2));// 打印true
```

* final常量声明

```dart
final a; // 声明时可以先不赋值。
a = new DateTime.now(); // final是运行时常量。它是惰性初始化，在第一次初始化时进行赋值

```

## 数据类型

#### dynamic类型

可以接受任何类型。编译时不会进行类型检查。类似于ts里的any类型

```dart
dynamic a = 'ab';
a = 1;
a = true;
```

与Object类型的区别

```dart
Object str = 'abc'; // dart里所有类型都是Object的子类，所以这里可以接受字符串
print(str.length); // 报错，找不到length属性

Map<String, Object> map1 = {
    "name": "订单",
}
print(map1['name'].length) // 报错，找不到length属性

// 正确用法
dynamic str2 = 'abc';
print(str2.length);

Map<String, dynamic> map2 = {
    "name": "订单",
}
print(map2['name'].length)
```

#### 可空类型

使用?修饰类型后，表示变量可接受null和当前定义的类型

```dart
String? a = '搜索';
a = null;

List<int>? arr = [1,2];
arr = null;

// 定义函数的返回值为String类型或null
String? getStr(str) {
    if(str != null) {
        return str;
    } else {
        return null;
    }
};
```

#### 字符串类型

```dart
// 使用三个引号时可以保留字符串的换行
String a = '''标题
第一行
第二行
''';
```

```dart
String a = '姓名';
String b = '性别';
print('$a-$b'); // 模板字符串里的变量只需加$标识。如果想使用${}也可以
```

#### 数字类型

```dart
// 只接收整数
int a = 123;
```

```dart
// 可以接收浮点数和整数
double a = 123.23;
```

#### 布尔类型

```dart
bool a = true;
```

## 条件判断

* 使用==判断相等

```dart
int a = 1;
int b = 2;
if(a == b) {
    print('相等');
}
```

* 使用is关键字判断类型(在判断类的类型时，其作用类似于js里的instanceof)

```dart
var a = '订单';
if(a is String) {
    print('是字符串');
}
```

* isEmpty判断字符是否为空

```dart
var a = '';
if(a.isEmpty){ // isNotEmpty判断不为空
    print(a.runtimeType); // 打印运行时的类型
}
```

* identical判断引用是否指向同一个对象

```dart
var a = new Object();
var b = a;
if(identical(a, b)) {
    print('相同');
}
```

#### 集合(数组)类型-List

dart里的List和js里的数组类型很像。元素可以是任意值

```dart
var arr = [1, true, '写的是'];
```

也可以指定数组元素类型

```dart
var arr = <String>['西安市', '阿水']; // 指定数组元素必须是字符串
```

* 添加元素

```dart
var a = [];
a.add(1);
a.addAll([2,3]) // 添加多个值
```

* 插入元素

```dart
var a = [1, 2];
a.insert(1, '哈哈'); // 在指定索引位置插入元素
a.insertAll(0, ['吃的啥', '成都市']); // 插入多个元素
```

* 删除元素

```dart
var a = ['菜单', '新菜单'];
a.remove('新菜单'); // 按元素值删除
a.removeAt(0); // 按索引值删除
```

* 创建固定长度集合

```dart
var arr = List<String>.filled(2, '字符'); // 定义长度为2的数组，并用'字符'填充
arr.length = 0; // 报错。因为固定长度的数组不允许修改 
```

* 遍历数组
在dart里，map方法返回值需要通过toList()再转换一次才能得到List类型

```dart
List a = [1, 2];
var b = a.map((value){
    return value * 2;
}).toList(); // 不转的话，打印出来是(1,2)
```

dart里的for...in跟js里的for...of相似

```dart
List a = [1]
for(var item in a) {
    print(item);
}
```

查找元素可以使用where

```dart
List a = [1, 2, 3];
var b = a.where((value) {
    return value > 1; // 返回大于一的值
})
```

dart里的any方法类似于js的some

```dart
List a = [1, 2, 3];
var b = a.any((value) {
    return value > 1; // 只要有元素满足条件就返回true
})
```

#### 字典类型-Map

dart里的Map和js里的对象类型很像。但是要注意赋值时，属性必须加引号

```dart
var a = {
    'b': 1
};
```

访问方式也有区别，需要使用中括号

```dart
print(a['b']);
```

Map的另一种定义方式是

```dart
var a = new Map();
```

* 添加属性

```dart
Map a = {
    'name': '消毒水'
};
a.addAll({
    "age": 12,
    "phone": 12313321,
})
```

* 删除属性

```dart
Map a = {
    'name': '消毒水'
};
a.remove('name');
```

* 遍历属性

```dart
Map a = {
    'name': '消毒水',
    "age": 12,
    "phone": 12313321,
};
a.forEach((key,value) {
    print('$key--$value');
});
```

#### 类型转换

* 数字转字符

```dart
var a = 1;
a.toString();
```

* 字符转数字

```dart
var a = '11';
pring(int.parse(a));
```

## 函数用法

* 函数定义

```dart
// int用来声明函数的返回值类型。返回值类型可以不写
int getNumber() {
    return 123;
};
```

* 可选参数用法

```dart
// 使用[]声明可选参数
String printUserInfo(String name,[int? age, String? sex]){
    return '$name-$age-$sex';
};
```

* 命名参数用法

```dart
// 使用{}声明命名参数
// required关键字表示必填参数
String printUserInfo(String name,{required int age, String sex='女'}){
    return '$name-$age-$sex';
};
printUserInfo('掘金', age: 11,sex: '男'); // 传参时需要把参数名字带上
```

* 箭头函数
dart里的箭头函数只能执行一行语句。不能执行多个。

```dart
// 正确用法
var a = [1];
a.forEach((value) => print(value));

a.forEach((value) => {
    print(value);
});

// 错误用法
a.forEach((value) => {
    print(value); 
    print(123); 
});
```

## 类的用法

* 构造函数

```dart
class Person {
    // 定义一个与类同名的方法，即为构造函数。或者说是默认构造函数
    Person() {
        print('构造函数');
    }
};
new Person(); // 执行时调用默认构造函数
```

* 命名构造函数
命名构造函数可以写多个。默认构造函数只能有一个

```dart
class Person {
    Person() {
        print('构造函数');
    }
    // 定义命名构造函数
    Person.who() {
        print('命名构造函数');
    }
};
new Person.who();
```

* factory构造函数
`factory`关键字适合实现单例模式。`factory`构造函数里必须返回一个值。创建实例时，如果已经存在实例对象，会直接从缓存中获取。

```dart
class Singleton {
  static Singleton _instance; // 定义引用自身类的静态属性
  static get instance {
    if (_instance == null) {
      _instance = Singleton._internal();
    }
    
    return _instance;
  }
  
  // 单例模式的构造函数通常没有参数，且被标记为私有，确保不能从类外部实例化该类
  Singleton._internal(); // 定义私有的命名构造函数
};
final singleton = Singleton.instance;
```

* 定义私有属性或方法
dart没有private,protected,public这些访问修饰符。但是可以通过变量名前加_符号，并且将类抽离到单独的文件里使用，此时可以实现私有

```dart
// Person.dart文件
class Person {
    String name;
    int _age;
    Person(this.name, this._age);
    // ↑相当于
    //Person(String name, int age) {
    //    this.name = name;
    //    this.age = age;
    //};
};
Person a = new Person('哈‘,1);
// main.dart
import 'Person.dart';
print(a._age);// 报错
```

* getter修饰符
类似于vue的计算属性

```dart
class Person {
    get name() {
        return '名字';
    }
};
Person a = new Person();
print(a.name);
```

* setter修饰符

```dart
class Person {
    String myName;
    set name(value) {
       this.myName = value;
    }
};
Person a = new Person();
a.name = '人名';
```

* 在构造函数运行前进行初始化变量

```dart
class Person {
    String myName;
    Person(): myName='人名'{
        print('构造函数 ${this.name}');
    }
};
Person a = new Person();
```

* static修饰符
用于实现静态变量和函数。静态方法不能访问非静态成员，非静态方法可以访问静态成员

```dart
class Person {
    static String myName;
    void printName(){
        print(myName); // 直接访问静态属性。不需要加this
    }
};
```

* ..级联操作符
用于简化对类的连续操作

```dart
class Person {
    String myName;
    String sex;
    Person(this.myName, this.sex);
    set name(value) {
       this.myName = value;
    }
    void printName(){
        print(this.myName); 
    }
};

Person a = new Person('哈哈', '男');
a..name='啦啦'
 ..printName();
// 相当于执行
// a.name = '啦啦';
// a.printName();
```

* 继承
子类使用`extends`实现继承。可继承父类公共和保护的成员，但是不继承构造函数。子类可覆写父类getter和setter

```dart
class Person {
    String myName;
    String sex;
    Person(this.myName, this.sex);
};

class Man extends Person {
    int age;
    Man(String myName, String sex, int age): super(name, age){
        this.age = age;
    } // 使用父类的构造函数进行初始化
}
```

* 抽象类和抽象方法
用法和ts的抽象类相似。不同的是抽象方法不需要加`abstract`关键字。

```dart
abstract class Animal {
    eat(); // 没有函数体的方法，会视为抽象方法。子类必须实现
    
    // 非抽象方法子类直接继承，不用去实现
    run() {
        print('跑');
    }
};


// 注意普通类不允许定义抽象方法
class Dog extends Animal {
    @override // 这行可以不写。但是建议加上，方便维护
    eat() {
        print('吃');
    }
}

```

* 接口
dart不像ts有interface可以实现接口，而是把普通类和抽象类作为接口实现。推荐用抽象类定义接口。实现接口时，需要把类的成员全部覆写一遍

```dart
abstract class Db {
    String uri;
    add();
}
class Mysql implements Db {
    @override
    String uri;
    
    Mysql(this.uri);
    
    @override
    add(){
        print('add');
    }
}
```

* mixin功能
使用`with`关键字后面跟一个或多个混入的名称，来使用Mixin，可以实现类似继承多个类的效果。
mixins使用条件：

1. 作为mixins的类不能继承其他类
2. 作为mixins的类不能有构造函数
3. 一个类可以mixins多个mixins类

```dart
// 定义一个mixins类
class A {
    void printA() {
        print('A');
    }
    void run() {
        print('A');
    }
};
// 定义一个mixins类
class B {
    void printB() {
        print('B');
    }
    void run() {
        print('B');
    }
};
// Public不能通过with使用。因为它有构造函数
class Public {
    int num;
    Public(this.num)
}
// C会包含A和B的成员
class C with A,B {
};

// D继承Public，并被混入B的成员
class D extends Public with B {
    D(int num): super(num);
}

var c = new C();
c.printA();
c.printB();
c.run(); // 根据with后面的类名顺序，B的run会覆盖A的run，所以最后执行结果是B里的run
```

* late关键字
允许延迟初始化

```dart
class Person {
    late int _age; // dart里默认类的私有属性是初始化好的，此时这行代码如果不加late会报错，因为它没有进行初始化
    void setAge(int _age) {
        this.age = age;
    }
};
Person a = new Person();
a.setAge(1);
```

* required在类里的应用

```dart
class Person {
    String? name;
    int age;
    Person({this.name, required this.age})// name为可选参数，age为必填参数
};
Person a = new Person(age: 2);
```

## 模块导入

* 库的重命名
使用as关键字对库重命名。常用于解决命名冲突。类似于js里的`import * as xx from 'xxx'`

```dart
import 'lib/utils.dart' as lib;
```

* 部分导入
类似于js里的`import { xx } from 'xxx'`

```dart
// 导出库里的getName方法
import 'lib/utils.dart' show getName;
```

hide关键词可以排除不需要导出的方法

```dart
// 导出库里的除了getName以外的所有方法
import 'lib/utils.dart' hide getName;
```

## 异步处理

在dart中通常使用Future进行异步操作。类似于js里的promise

```dart
// 延迟5秒打印
Future.delayed(new Duration(seconds: 5), () {
    print(123);
});
```

```dart
// 等待所有异步任务完成
Future.wait([
    Future.delayed(new Duration(seconds: 1), () {
        print(1);
    }),
    Future.delayed(new Duration(seconds: 2), () {
        print(2);
    })
]).then((List results) {
    print('全部完成$results');
})
```

异步改成同步运行

```dart
// dart里的async和await语法和js里的差不多
Future<String> getNetworkData() async {
  var result = await Future.delayed(Duration(seconds: 3), () {
    return "network data";
  });

  return "请求到的数据：" + result;
}
```

创建微任务

```dart
scheduleMicrotask(() {
    print("Hello Microtask");
});
```
