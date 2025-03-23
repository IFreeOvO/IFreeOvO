# runnable组件的输入和输出类型

|     组件     |             输入类型              |     输出类型     |
| :----------: | :-------------------------------: | :--------------: |
|    Prompt    |               字典                |   PromptValue    |
|  ChatModel   | 字符串、聊天消息列表、PromptValue |   ChatMessage    |
|     LLM      | 字符串、聊天消息列表、PromptValue |      字符串      |
| OutputParser |        LLM或聊天模型的输出        |   取决于解析器   |
|  Retriever   |            单个字符串             | List of Document |
|     Tool     |     字段串、字典或取决于工具      |    取决于工具    |

