# LCEL表达式与Runnable可运行协议

为了简化创建自定义链，LangChain官方实现了一个`Runnable`协议，这个协议适用于LangChain中的绝大部分组件，并实现了大量的标准接口，涵盖

1. stream：将组件的响应块流式返回，如果组件不支持流式则会直接输出。
2. invoke：调用组件并得到对应的结果。
3. batch：批量调用组件并得到对应的结果。
4. astream：stream 的异步版本。
5. ainvoke：invoke 的异步版本。
6. abatch：batch 的异步版本。
7. astream_log：除了流式返回最终响应块之外，还会流式返回中间步骤。

除此之外，在`Runnable`中还重写了`__or__`和`__ror__`方法，这是`Python`中`|`运算符的计算逻辑，所有的`Runnable`组件，均可以通过`|`或者`pipe()`的方式将多个组件拼接起来形成一条链

```python
prompt = ChatPromptTemplate.from_template("{query}")
llm = ChatOpenAI(model="gpt-3.5-turbo-16k")
parser = StrOutputParser()
# LCEL表达式
chain = prompt | llm | parser

```
