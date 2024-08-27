# postMessage跨域通讯使用细节

postMessage通常用于处理主域名和内嵌iframe存在跨域的场景。
例如主域名为`www.a.com`，子域名为`www.b.com`，我们使用postMessage进行跨域通讯，代码一般会这样写

```js
// www.a.com代码
window.addEventListener('message', (e) => {
    console.log('接受iframe消息', e)
})
// 在iframe加载完后建立通讯
document.querySelector('iframe').onLoad = () => {
    e.target.contentWindow?.postMessage('我是主域名', 'www.b.com')
}
```

```js
// www.b.com代码
window.addEventListener('message', (e) => {
    if (e.origin === 'www.a.com') {
        console.log('收到消息', e.data)
        window.parent.postMessage('我是iframe', 'www.a.com')
    }
})
```

## 注意事项

* 父界面要等子界面加载完成，才能成功发送消息

* postMessage第二次参数推荐写具体地址，不要用`*`号，不然发出去的消息可能被一些无关iframe监听到
  
* 需要注意`message`监听注册时机，如果注册时机晚于`postMessage`发送时间，会导致收不到消息
