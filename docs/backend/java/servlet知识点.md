# servlet

## 生命周期

1. 装载-web.xml
2. 创建-构造方法
3. 初始化-init()
4. 提供服务-service()
5. 销毁-destory()

## java-web标准工程结构

|  组织结构  | 描述   |
|----|----|
| /   |  java web应用根目录  |
|  /index.html  |  默认首页  |
|   /WEB-INF |  web应用的安全目录，用于存放配置文件  |
|  /WEB-INF/web.xml  |  web.xml是'部署描述符文件'，是web项目的核心配置文件  |
|  /WEB-INF/classes  |  存放编译后的classes文件  |
|  /WEB-INF/lib  | 用于存放web应用依赖的jar文件   |
| /META-INF/MANIFEST.MF  |   包含web应用的版本等信息 |

## cookie时效性

* 默认的cookie有效期与当前浏览器进程绑定。浏览器进程结束后就过期
* 设置过期时间后，cookie过期后才会失效

## session

* session的数据存储在tomcat服务器内存中，具有时效性。用户关闭浏览器，本地cookie里存的sessionId会失效，但是服务器里的session数据还在，且默认有效期为30分钟
* session通过cookie里的sessionId值提取用户数据

## ServletContext

* 它是web应用全局对象
* 一个web应用只创建一个ServletContext对象
* ServletContext随着web应用启动自动创建，web应用关闭时自动销毁

## java web三大作用域对象

* HttpServletRequest-请求对象
* HttpSession-用户回话对象
* ServletContext-web应用全局对象

## 开发过滤器三要素

* 任何过滤器都有实现javax.servlet.Filter接口
* 在Filter接口的doFilter()方法中编写过滤器的功能代码
* 在web.xml中对过滤器进行配置，定义拦截url的范围

## 过滤器执行顺序

* web.xml里配置的过滤器优先执行，全部执行完才执行注解过滤器
* web.xml里的过滤器执行顺序以`<filter-mapping>`为准
* 注解过滤器执行顺序按照filter-name值的首字母顺序执行

## url-pattern常用写法

* /index.html-精准匹配
* /servlet/*-以前缀进行模糊匹配
* *.html-以后缀进行模糊匹配
* 注意前缀和后缀匹配不能同时使用

## /和/*区别

* /应用在servlet配置，使该servlet替代主页
* /*应用在过滤器，代表对所有请求拦截

## 过滤器和监听器区别

* 过滤器的职责是对URI进行过滤拦截，是主动的执行
* 监听器的职责是对Web对象进行监听，是被动触发
