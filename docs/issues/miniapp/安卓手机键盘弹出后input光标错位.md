# 安卓手机键盘弹出后input光标错位

## 问题描述

安卓手机上，有个页面A，页面A里面有个弹框组件放置了input，当页面大于一屏时，如果滚动到页面下面，再打开弹窗，input在获取焦点后，键盘自动弹出，会把input光标顶到input输入框上方(input组件位置没变，仅光标位置变了)

## 复现bug关键点

* 页面可以滚动，且必须滚出去一部分
* input要在弹框里，focus时键盘弹出

## 解决方案

网上给出的大部分方案，是用textarea组件模拟input组件，但是治标不治本。

这里用另一种方案。因为我页面滚动是用的`view`的`overflow-y: auto`实现的，需要替换成，`<scroll-view scroll-y></scroll-view`控制滚动。打开弹框时禁用`scroll-view`的滚动，关闭弹框时恢复`scroll-view`滚动，可以解决这个bug。然后我的页面A由于是自定义顶部，额外需要`input`配置`:adjust-position="false"`关闭自动推出页面，不然自定义导航会出顶出视图窗口，再配合监听`input`的`keyboardheightchange`事件，给`input`父容器加`padding-bottom`防止`input`被弹框遮挡。

最后总结下。需要改的有以下几点:

* `scroll-view`替换`view`实现滚动
* `input`获取焦点时禁用页面滚动(**关键点**)
* 关闭`input`的`adjust-position`属性(如果界面有自定义导航)
* 监听`input`的`keyboardheightchange`事件，设置`padding-bottom`(如果input有键盘被遮挡)
