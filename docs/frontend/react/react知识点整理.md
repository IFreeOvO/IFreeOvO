# react知识点整理

## JSX本质

JSX是`React.createElement`的语法糖，所有JSX语法最终会被编译器编译成`React.createElement`的方式创建ReactElement对象。
react 17以及以上版本，改成了`JSXDev`，可以不需要显示引入`React`包

## react包的职责

* react包：专注于组件相关核心api，并保持跨平台接口的一致性

* react-dom包：专注于将编写好的组件渲染到某个平台中去，是客户端，还是服务端

* react-reconciler包：专注于渲染相关逻辑，负责找出变化的组件

## 为什么函数组件不能直接用ref绑定

因为函数没有实例，无法直接用`ref`绑定

## useEffect和useLayoutEffect区别

1. useLayoutEffect会阻止浏览器的重绘。useEffect不会
2. useEffect可以代替componentDidMount 和 componentDidUpdate声明周期

## react为什么不使用`requestIdleCallback`进行调度

* 浏览器兼容性
* 回调触发频率不稳定

## render函数阶段划分

1. 渲染阶段
2. 提交阶段

> 也可以细分说是beginWork、CompleteWork、commitWork三个阶段

## fiber

`beginWork`和`completeWork`是交替进行的。如果当前节点有子节点，则进行`beginWork`，没有时，进行`completeWork`
`beginWork`阶段，将虚拟dom转为fiber

## React异步调度为什么使用MessageChannel实现

Scheduler(异步调用)需要保证不阻塞本次页面更新，所以Scheduler首先的是一个宏任务。

* 为什么不选`setTimeout(fn, 0)`
`setTimeout`多层嵌套超过5层，调用会存在一个4ms间隔

* 为什么不选`requestAnimationFrame(fn)`
rAF依赖浏览器的渲染周期，但是浏览器什么时候更新界面是不确定的
  
* 为什么不选`requestIdleCallback(fn)`
存在兼容，且requestIdleCallback回调时间间隔太长，执行间隔为50ms(20FPS，1秒内执行20次)

`MessageChannel`执行时机比`setTimeout`早
