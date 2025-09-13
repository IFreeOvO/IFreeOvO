# callback用法

`Callback`是`LangChain`提供的回调机制，允许我们在`LLM`应用程序的各个阶段使用`hook`（钩子）。对于记录日志、监控、流式传输等任务非常有用。`Callback`收集到的信息可以直接输出到控制台，也可以输出到文件，更可以输入到第三方应用，相当于独立的日志管理系统，通过这些日志就可以分析应用的运行情况，统计异常率，运行的瓶颈模块以便优化。

## callback两大功能

1. `CallbackHandler`：对每个应用场景比如`Agent`或`Chain`或`Tool`的记录。
2. `CallbackManager`：对所有`CallbackHandler`的封装和管理，包括了单个场景的`Handle`，也包括运行时整条链路的 `Handle`。

## 钩子触发时机

| 事件 | 事件触发 | 相关方法 |
|------|---------|---------|
| Chat Model start | 当聊天模型启动时 | on_chat_model_start |
| LLM start | 当大语言模型启动时 | on_llm_start |
| LLM new token | 当聊天模型或大语言模型生成新 token 时 | on_llm_new_token |
| LLM end | 当聊天模型或大语言模型结束时 | on_llm_end |
| LLM error | 当聊天模型或大语言模型发生错误时 | on_llm_error |
| Chain start | 当链开始运行时 | on_chain_start |
| Chain end | 当链结束时 | on_chain_end |
| Chain error | 当链发生错误时 | on_chain_error |
| Tool start | 当工具开始运行时 | on_tool_start |
| Tool end | 当工具结束时 | on_tool_end |
| Tool error | 当工具发生错误时 | on_tool_error |
| Agent action | 当智能体执行动作时 | on_agent_action |
| Agent finish | 当智能结束时 | on_agent_finish |
| Retriever start | 当检索工具开始运行时 | on_retriever_start |
| Retriever end | 当检索工具结束时 | on_retriever_end |
| Retriever error | 当检索工具发生错误时 | on_retriever_error |
| Text | 运行任意文本时，该接口可以在自定的 Chain、Agent、Tool 上调用该接口。使用该接口增加了灵活性和可扩展性 | on_text |
| Retry | 当重试事件时 | on_retry |

## 在LangChain中使用CallbackHandler几种方式

1. 在运行`invoke`时，传递对应的`config`信息配置`callbacks`（推荐）。
2. 在`Chain`上调用`with_config`函数，传递对应的`config`并配置`callbacks`（推荐）。
3. 构建大语言模型时，传递`callbacks`参数（不推荐）。

在`LangChain`中提供了两个最基础的`CallbackHandler`，分别是：`StdOutCallbackHandler`和`FileCallbackHandler`。
