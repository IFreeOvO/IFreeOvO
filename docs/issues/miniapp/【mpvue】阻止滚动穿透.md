# 【mpvue】阻止滚动穿透

## 问题描述
当小程序长页面的弹出层如果有scroll-view组件滚动时，会带着底部页面一起滚动

## 解决方案
原理：阻止外层嵌套元素的touchmove事件的冒泡。
举个栗子🌰：
```html
<view @touchmove.stop>
  <scroll-view scroll-y></scroll-view>
<view>
```