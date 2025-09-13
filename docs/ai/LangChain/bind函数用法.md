# bind函数用法.md

在使用`LangChain`开发的时候，某些场合我们希望在一个`Runnable`可运行队列中中调用另一个`Runnable`，并传递一些常量参数，但是这些参数不是前一个 `Runnable`的输出的一部分，也不是用户输入的一部分，而是某个`Runnable`组件的一部分参数。

我们就可以考虑使用`Runnable.bind()`来传递这些默认参数。

例如以下场景：

1. 创建了一个 ChatOpenAI 的 LLM 大语言模型，利用这个 LLM 来构建两条链；
2. 第 1 条链的`temperature`为 -0.7，即生成的内容确定性更强；第 2 条链的`temperature`为 1.2，生成的内容会更随机，更有创意；
3. 在构建时，即可通过`LLM.bind(temperature=0.7)`和`LLM.bind(temperature=1.2)`来为 LLM 设置不同的默认调用参数;

`bind()`函数用于修改`Runnable`底层的默认调用参数，并在调用时会自动传递该参数，无需手动传递，像原始链一样正常调用即可。所以如果在构建`Runnable`链应用时就知道对应的参数，可以使用`bind`函数来绑定参数（事先指定）。

## 使用场景

1. 动态添加默认调用参数
2. 解决多参`RunnableLambda`函数传参
