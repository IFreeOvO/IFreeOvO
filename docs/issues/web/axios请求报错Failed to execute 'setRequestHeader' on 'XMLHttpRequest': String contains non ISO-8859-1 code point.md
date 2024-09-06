# axios请求报错Failed to execute 'setRequestHeader' on 'XMLHttpRequest': String contains non ISO-8859-1 code point

## 问题描述

在使用axios发送请求时，报错如下：

```bash
Failed to execute 'setRequestHeader' on 'XMLHttpRequest': String contains non ISO-8859-1 code point
```

## 原因

请求头中包含中文字符

## 处理

经过排查，发现是请求拦截器时自动携带了`token`，由于`token`缓存在本地`localstorage`，且被我无意改成了中文，导致请求时，请求头包含了含有中文字符的`token`。所以换成正常token就好了
