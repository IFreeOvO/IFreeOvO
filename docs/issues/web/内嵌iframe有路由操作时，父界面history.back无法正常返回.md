# 内嵌iframe有路由操作时，父界面history.back无法正常返回

## 场景

有个项目地址`/parent/b`，是从`/parent/a`界面跳转过来的。`/parent/b`界面有个`返回按钮`，作用是点击后，返回到`/parent/a`界面，它还有一个内嵌iframe，它的路由为`/a`。
如果子iframe从`/a`跳转到`/b`，此时点击`/parent/b`界面的返回按钮，现象是子iframe从`/b`返回`/a`，而不是预期效果父界面返回到`/parent/a`界面

## 原因

这是浏览器的一个机制。子iframe往前跳转时，会往浏览器`history`堆栈里压入子iframe历史记录。所以就算点击浏览器自己的返回，也只会让子iframe返回到它的上个路由，而不是父界面的上一个路由

## 解决方案

1. 方案1
iframe里的跳转全部用`location.replace`去实现。这样就不会增加history的堆栈

2. 方案2
父界面用数组记录子iframe的`history`长度。返回时用`router.go(-historyArr.length)`实现

3. 方案3
父界面进入界面时记录下`history.length`，返回时，计算当前`history.length`和上一次`history.length`的查值`delta`，然后用`router.go(-delta - 1)`实现

4. 方案4(不推荐)
利用框架的`key`机制, `<iframe src={xx} key={xx} />`，这样每次跳转会生成新的iframe
