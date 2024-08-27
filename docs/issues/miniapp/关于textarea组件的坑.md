# 关于textarea组件的坑

## 业务场景
需要用小程序原生组件textarea实现个输入框，用于发送用户评论

## 遇到的问题
- 自定义textarea最大高度(即最多显示几行文本)
> 解决思路：textarea组件提供了`bindlinechange`方法可以监听输入框行数变化,通过动态修改组件的类样式,给组件加上固定高度，并将组件`auto-height`属性设置为`true`(<b style='color:red'>*注意</b>,**设置`auto-height`为`true`时，`style.height`不生效**)。有一个细节,textarea组件的初始高度会大于一行文本的高度,所以初始化组件时就可以设置`auto-height`为`true`，让它变成一行的高度

- 点击发送按钮时，并没有获得textarea的value值
> 官方文档上有说明: textarea 的 `blur` 事件会晚于页面上的 `tap` 事件，如果需要在 `button` 的点击事件获取 `textarea`，可以使用 `form` 的 `bindsubmit`。**这里需要注意一点的是，需要给是textarea设置`name`属性,button设置`open-type`属性**

- 需要通过点击页面上某个按钮后，才能显示我们的输入框，其他条件下不显示
> 解决思路：通过js动态将textarea的`focus`属性设置为`true`即可,`auto-focus`属性我试过了，没有用

- 键盘弹起时，输入框需要显示并固定在可视区底部
> 解决思路: 我采用给组件固定定位的方式实现这个功能，通过vue计算属性(mpvue框架),给组件style一个动态的bottom值，有关键盘的高度，可以通过组件的`bindfocus`方法获取到。
(**细节：如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true**)

> 另一个解决思路:如果通过`adjust-position`属性实现键盘弹起时输入框自动置底，会有一个缺点，即如果不设置相应的`cursor-spacing`的属性来调整光标和键盘的位置，则两者在会上下紧挨在一起

- textarea和button没有对齐并垂直居中
> 解决方案：给`button`和`textarea`的样式同时加上`vertical-align: middle;`和`display: inline-block;`