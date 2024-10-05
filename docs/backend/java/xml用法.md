# xml用法

## 约束XML语义的方式

### 1. 通过DTD定义节点约束

* 利用DTD中的<!ELEMENT>标签，定义XML文档中允许出现的节点和数量

```xml
<!-- hr节点下只允许出现一个employee节点 -->
<!ELEMENT hr (employee)>

<!-- hr节点下最少出现一个employee节点 -->
<!ELEMENT hr (employee+)>

<!-- hr节点下出现0到n个employee节点 -->
<!ELEMENT hr (employee*)>

<!-- hr节点下出现0或者1个employee节点 -->
<!ELEMENT hr (employee?)>
```

```xml
<!-- employee节点下必须包含以下四个节点，且按顺序出现 -->
<!ELEMENT employee (name,age,salary,department)>
```

```xml
<!-- name标签体只能是文本,#PCDATA代表文本元素 -->
<!ELEMENT name (#PCDATA)>
```

```xml
<!-- 约束employee 属性里有个no，CDATA代表是文本，''表示no的默认值 -->
<!ATTLIST employee no CDATA ''>
```

* 在XML中使用<!DOCTYPE>标签引入
用法<!DOCTYPE 根节点 SYSTEM "dtd文件路径">

```xml
<!-- 例子 -->
<!DOCTYPE hr SYSTEM "ht.dtd">
```

### 2. 通过xml-schema定义节点约束

用法例子

```xml
<!-- demo.xsd -->
<?xml version="1.0" encoding="UTF-8"?>
<!-- targetNamespace写的网址不一定要真实存在。作用只是取个空间名 -->
<!-- elementFormDefault="qualified"将这个文件作为默认的文档约束生效 -->
<schema xmlns="http://www.w3.org/2001/XMLSchema" targetNamespace="http://wwww.test.com/demo"
    elementFormDefault="qualified">
    <element name="hr">
        <!-- complexType一般和sequence搭配使用 -->
        <complexType>
            <!-- sequence表示子标签必须按顺序书写 -->
            <sequence>
                <!-- minOccurs最小出现几次 -->
                <!-- maxOccurs最多出现几次 -->
                <element name="employee" minOccurs="1" maxOccurs="9999">
                    <complexType>
                        <sequence>
                            <!-- type="string"表示字符串文本 -->
                            <element name="name" type="string"></element>
                            <element name="age">
                                <simpleType>
                                    <!-- base="integer"约束为整数类型 -->
                                    <restriction base="integer">
                                        <!-- 约束值的范围在18-65之间 -->
                                        <minExclusive value="18"></minExclusive>
                                        <maxExclusive value="65"></maxExclusive>
                                    </restriction>
                                </simpleType>
                            </element>
                            <element name="salary" type="integer"></element>
                            <element name="department">
                                <complexType>
                                    <sequence>
                                        <element name='dname' type="string"></element>
                                        <element name='address' type="string"></element>
                                    </sequence>
                                </complexType>
                            </element>
                        </sequence>
                        <!-- 约束标签属性 -->
                        <attribute name='no' type='string' use="required"></attribute>
                    </complexType>
                </element>
            </sequence>
        </complexType>
    </element>
</schema>
```

```xml
<!-- demo.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!-- xmlns填的命名空间要和xsd文件里定义的一致 -->
<!-- xmlns:xsi是为了能够加载本地的xsd文件 -->
<!-- xsi:schemaLocation填写文件地址格式 【空间名字 本地文件名】 -->
<hr xmlns="http://wwww.test.com/demo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://wwww.test.com/demo demo.xsd">
    <employee no="csd">
        <name>哈哈</name>
        <age>33</age>
        <salary>3000</salary>
        <department>
            <dname>搜索</dname>
            <address>城市堵车</address>
        </department>
    </employee>
    <employee no="12">
        <name>哈哈1</name>
        <age>19</age>
        <salary>3000</salary>
        <department>
            <dname>搜索</dname>
            <address>城市堵车</address>
        </department>
    </employee>
</hr>
```
