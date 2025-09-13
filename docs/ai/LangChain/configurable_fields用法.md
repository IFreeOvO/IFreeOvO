# configurable_fields用法

在某些场合下除了在构建链的时候配置对应的调用参数，也可能让链在执行调用的时候才去配置对应的运行时链内部（运行时修改链相应参数），包括运行时动态调整温度、停止词、传递自定义参数、甚至是运行时动态替换模型为另外一个。

针对这类需求，在`LangChain`也提供了相应的解决方案：

1. configurable_fields()：和 bind() 方法接近，但是并不是在构建时传递对应的参数，而是在链运行时为链中的给定步骤指定参数，比 bind() 更灵活。
2. configurable_alternatives()：使用这个方法可以在链运行时，将链中的某一个部分替换成其他替换方案，例如：运行中更换提示模板、更换大语言模型等。

`configurable_fields()`方法使用分成两个流程：

1. 为 Runnable 定义哪些字段可以在链运行时动态配置；
2. 在调用 invoke() 函数时，传递对应的配置信息 configurable 完成动态配置；

## configurable_fields和bind区别

* 只要是`Runnable`组件下的所有属性(可以通过`Runnable.__fields__.keys()`查看所有属性)，`configurable_fields`都可以配置
* `bind`只能配置*调用参数*
