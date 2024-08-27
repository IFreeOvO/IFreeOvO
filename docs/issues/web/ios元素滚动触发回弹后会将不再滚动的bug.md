# ios元素滚动触发回弹后会将不再滚动的bug

## 问题描述

&nbsp;&nbsp;&nbsp;&nbsp;弹出层有一个列表滚动,在滚动回弹后发现，如果再次滚动会滚动不了，而且滚动条也消失了,查阅资料发现-webkit-overflow-scrolling这个css样式可以解决

## -webkit-overflow-scrolling 的属性介绍
>
>-webkit-overflow-scrolling:touch;/*当手指从触摸屏上移开，会保持一段时间的滚动 */
-webkit-overflow-scrolling:auto;/* 当手指从触摸屏上移开，滚动会立即停止*/

## 问题解决方法

&nbsp;&nbsp;&nbsp;&nbsp;给有滚动条的元素加上-webkit-overflow-scrolling:auto,来阻止滚动回弹
