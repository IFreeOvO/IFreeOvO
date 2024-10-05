# children属性引发的React.memo缓存失效

## 复现场景

```ts
const Child: React.FC<{
    children: React.ReactNode
}> = memo(({ children }) => {
    console.log('渲染子组件')
    return <div>{children}</div>
})

const Test: React.FC= () => {
    const [count, setCount] = useState(0)
    const onClick = () => {
        setCount(count + 1)
    }

    return (
        <>
            <button onClick={onClick}>测试{count}</button>
            <Child>
                <div>12</div>
            </Child>
        </>
    )
}
```

上面代码每次点击按钮时，虽然看起来数据没有变动，但是`Child`组件都会重新渲染

## 问题分析

这里虽然`Child`标签上没明确传递任何属性，但实际上`<div>12</div>`这部分代码时作为，`props.children`传递给子组件的。
`memo`缓存之所以失效，得分析`memo`的缓存原理，它是根据比较之前的`props`和当前的`props`是否相等，如果不相等，就会重新渲染。

那么当父组件重新渲染时，`props.children`是否改变了呢?

这里需要分析`<div>12</div>`干了什么事。`<div>12</div>`其本质是代码编译后，会转换成`React.createElement`，然后`React.createElement`会返回`children`对象，当重新渲染时，返回的`children`对象引用变了，所以`memo`缓存失效了。弄懂问题根源，问题就好解决了，就是给`<div>12</div>`加缓存

## 处理方式

使用useMemo缓存子组件，进行传递。这样memo就能符合我们预期执行

```ts
const Child: React.FC<{
    children: React.ReactNode
}> = memo(({ children }) => {
    console.log('渲染子组件')
    return <div>{children}</div>
})

const Test: React.FC= () => {
    const [count, setCount] = useState(0)
    const onClick = () => {
        setCount(count + 1)
    }

    const child = useMemo(() => <div>12</div>, []) // 对传入的children节点进行缓存

    return (
        <>
            <button onClick={onClick}>测试{count}</button>
            <Child>
                {child}
            </Child>
        </>
    )
}
```
