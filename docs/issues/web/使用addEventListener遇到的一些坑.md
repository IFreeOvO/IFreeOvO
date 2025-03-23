# 使用addEventListener遇到的一些坑

## 1. 不是任何元素都可以绑任何事件

比如`resize`事件。只有`window`能绑定，其他元素对象绑定的话，是无法触发`resize`事件监听的。因为`resize`事件只有`window`有。也就是说，只有元素对象自身拥有的事件，你去绑定才能生效

## 2. 事件回调里，如果有异步任务，请不要把`e.stopPropagation()`放异步事件后面(不止addEventListener，用其他方式绑定也能复现)

例如:

```js
async function cb(e) {
        await request()
        e.stopPropagation()
}
dom.addEventListener('click', cb)
```

这样做会导致阻止冒泡失效。正确做法是把`e.stopPropagation()`异步任务前面

## 3. addEventListener的第三个参数如果配了`capture`(第三个参数配了其他字段没事),那移除事件时也要配置相同的值才能移除

例如:

```js
function cb(e) {
        console.log('click')
}
dom.addEventListener('click', cb, {
        capture: true
})

setTimeout(() => {
        dom.removeEventListener('click', cb, {
                capture: false
        })
},1000)
```

如果像上面代码`addEventListener`和`removeEventListener`，传的`capture`值不一样，事件就无法正确移除
