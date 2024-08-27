# 如何隐藏scroll-view组件的滚动条

## 问题描述
通常在弹出层内容很长的情况下会用到scroll-view组件，但是由于scroll-view纵向滚动时会出现一个自带的滚动条，非常不美观，想把它给去掉。
查阅了网上方案，使用下面这个css并不能解决
```css
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
```
于是在微信小程序社区又找到另一个解决方案，经过验证可行。

## 解决方案
```javascript
// 结构
<view class='wrap'>
  <scroll-view scroll-y></scroll-view>
</view>
```

```css
// 样式
.wrap {
  width: 500rpx;
  overflow: hidden;
}
scroll-view {
  height:800rpx;
  width: 520rpx;
}
```
其思想在于要让scroll-view比父容器宽一点（多出的宽要大于等于滚动条宽度，笔者取的是20rpx），这样scroll-view右侧溢出的部分，也就是滚动条部分，会被父容器隐藏掉