# Spring AOP知识点

## 基础概念

|  注解  |   说明 |
|----|----|
| Aspect   |  切面，具体的可拔插组件功能类，通常一个切面只实现一个通用功能  |
|  Target Class/Method  | 目标类，目标方法，指真正要执行与业务相关的方法   |
|  PointCut  | 切入点，使用execution表达式说明切面要作用在系统的哪些类上   |
|  JoinPoint  | 连接点，切面运行过程中是包含了目标类/方法元数据的对象   |
|  Advice  |  通知，说明具体的切面的执行时机，Spring包含了五种不同类型通知  |

## JoinPoint核心方法

| 注解   |  说明  |
|----|----|
|  Object getTarget()  |  获取ioc容器内目标对象  |
|  Signature getSignature()  | 获取目标方法   |
| Object[]   getArgs()   |  获取目标方法参数  |

## PointCut切点表达式
>
> 示例:           public void  com.imooc.service.UserService.createUser(形参1,形参2)
> 对应: execution(public *com.imooc ..*         .  *(..))
> 解释: 修饰符 返回类型 包名..类名.方法名(..)
> 其中* 是通配符，..是包通配符， (..) 是参数通配符。public可以省略

## 五种通知类型

| 注解   |  说明  |
|----|----|
|  Before Advice  | 前置通知，目标方法运行前执行   |
|  After Returning Advice  |  返回后通知，目标方法返回数据后执行  |
|  After Throwing Advice  |  异常通知，目标方法抛出异常后执行  |
|  After Advice  | 后置通知，目标方法运行后执行   |
|  Around Advice  |  最强大通知，自定义通知执行时机，可决定目标方法是否运行  |

## 特殊的“通知”--引介增强

* 引介增强是对类的增强，而非方法
* 引介增强允许在运行时为目标类增加新属性或方法
* 引介增强允许在运行时改变类的行为，让类随运行环境动态变更

## AOP实现原理

Spring基于代理模式实现功能动态扩展，包括两种形式：

* 目标类拥有接口时，通过JDK动态代理实现功能扩展
* 目标类没有接口时，通过CGLib组件实现功能扩展
