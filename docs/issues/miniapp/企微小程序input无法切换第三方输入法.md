# 企微小程序input无法切换第三方输入法

## 问题描述

苹果手机企微小程序里，如果有两个相邻的input输入框，点击其中一个输入框切换输入法，此时只能切换手机自带输入法，切不了第三方输入法

## 解决方案

在两个input组件之间隐藏一个看不见的input

```html
<input type="text">
<!-- 插入一个隐藏input -->
<input placeholder="" style="height: 2rpx; position: absolute; left: -9999px" />
<input type="password">
```
