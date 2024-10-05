# 【egg框架】postman发送post请求报错"invalid csrf token"

## 问题描述

笔者用postman发送post请求时，由于egg框架自带的安全插件,会提示错误`invalid csrf token`，拦截了我发送的post请求

## 解决方案

使用postman的“Tests”功能,添加下面代码

```bash
var csrf_token = postman.getResponseCookie("csrftoken").value
postman.clearGlobalVariable("csrftoken");
postman.setGlobalVariable("csrftoken", csrf_token);
```

![图1](./【egg框架】post请求报错_invalid%20csrf%20token_/1.png)

添加完后点击下面所示的眼睛图标可以看见`csrftoken`这个全局变量
![图2](./【egg框架】post请求报错_invalid%20csrf%20token_/2.png)

然后在请求header添加`csrftoken`字段，值用变量的形式导入，如下图
![图3](./【egg框架】post请求报错_invalid%20csrf%20token_/3.png)

此时，再次发送post请求后台即可获取到参数
