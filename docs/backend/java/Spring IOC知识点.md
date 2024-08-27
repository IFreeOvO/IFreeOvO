# Spring IOC知识点

## bean标签的id和name属性相同点

* 都是设置对象在ioc容器的唯一对象
* 两种在同一个配置文件种不允许重复出现
* 两种允许多个配置文件里重复出现，新对象覆盖旧对象

## bean标签的id和name属性不同点

* id要求更严格，一次只能定义一个对象
* name更宽松，允许定义多个对象
* name可以用逗号分割，添加多个标识，例如name="a1,a2"

## bean没有id和name时

默认使用类名称全称作为bean标识

## 路径表达式

| 表达式实例   |  说明  |
|----|----|
|  classpath:config.xml  |  扫描classpath根路径(不含jar)的config.xml  |
| classpath: com/imooc/config.xml   | 扫描classpath下(不含jar)com.imooc包中的config.xml   |
| classpath*: com/imooc/config.xml   | 扫描classpath下(含jar)com.imooc包中的config.xml   |
|  classpath: config-*.xml  |  扫描classpath根路径下所有以config-开头的xml文件  |
|  classpath: com/**/config.xml  | 扫描com包下(包含任意子包)的config.xml   |
|  file: c:/config.xml  |  扫描c盘根路径config.xml  |

## 注入List

```xml
<bean>
    <property name="xx">
        <list>
            <value>xx</value>
            <ref bean="bean-xx"></ref>
        </list>   
    </property>
</bean>
```

## 注入Set

```xml
<bean>
    <property name="xx">
        <set>
            <value>xx</value>
            <ref bean="bean-xx"></ref>
        </set>   
    </property>
</bean>
```

## 注入Map

```xml
<bean>
    <property name="xx">
        <map>
            <entry key="xx" value="xx"></value>
            <entry key="xxx" value-ref="bean-xx"></ref>
            <entry key="xx" >
                <bean class="xx">
                    <property name="xx" value="xx"></property>
                </bean>
            </entry>
        </map>   
    </property>
</bean>
```

## 注入Properties

```xml
<bean>
    <property name="xx">
        <props>
            <prop key="xx">xx</value>
            <prop key="xx">xx</ref>
        </props>   
    </property>
</bean>
```

## bean scope属性

|  scope属性  |  说明  |
|----|----|
|  singleton  | 单例(默认值),每一个容器有且只有唯一的实例，实例被全局共享。容器初始化时就会创建实例。在容器中是单例多线程执行，存在线程安全风险  |
|  prototype  |  多例，每次用getbean使用时都是创建一个实例。占用更多资源，不存在线程安全问题  |
|  request  |  web环境下，每次独立请求存在唯一的实例  |
|  session  |  web环境下，每一个session存在有唯一的实例  |
|  global session  |  protlet的web应用的共享session中  |
|  websocket  | 每一次webscoket连接中存在唯一实例   |

## bean生命2周期

* 容器行为：Ioc容器准备初始化解析xml
* 对象行为：对象实例化执行构造方法
* 容器行为：为对象注入属性
* 对象行为：调用init-method初始化方法
* 容器行为：Ioc容器初始化完毕
* 对象行为：执行业务代码
* 容器行为：Ioc容器准备销毁
* 对象行为：调用destory-method释放资源
* 容器行为：Ioc容器销毁完毕

## 四种组件注解

* @Component

> 组件注解，通用注解，被改注解描述的类将被ioc容器管理并实例化

* @Controller

> 语言注解，说明当前类是MVC应用中的控制器类

* @Service

> 语言注解，说明当前类是Service业务服务类

* @Repository

> 语言注解，说明当前类用于业务持久层，通常描述对应Dao类

## 两类字段装配注解

### 按类型装配

* @Autowired: 按容器内对象类型动态注入属性，有Spring机构提供
* @Inject: 基于JSP-330(Dependency Injection for Java)标准，其    他同@Autowired，但不支持required属性

### 按名称装配

* @Named: 与@Inject配合使用，JSR-330规范，按属性名自动装配属性
* @Resource: 基于JSR-250规范，优先按名称、再按类型智能匹配

## 元数据注解

* @Primary: 按类型装配时出现多个相同类型对象，拥有此注解对象优先被注入
* @PostConstruct: 描述方法，相当于XML中的init-method
* @PreDestory: 描述方法，相当于XML中的destory-method
* @Scope: 设置对象的scope属性
* @Value: 为属性注入静态数据

## Java config核心注解

* @Configuration: 描述类，说明当前类是Java config配置类，完全替代xml文件
* @Bean: 描述方法，方法返回对象将被ioc容器管理，beanId默认为方法名
* @ImportResource: 描述类，加载静态文件，可使用@Value注解提取
* @ComponentScan: 描述类，同xml的<context:component-scan>标签
