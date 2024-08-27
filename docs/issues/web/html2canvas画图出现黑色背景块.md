# html2canvas画图出现黑色背景块

## 问题描述

html2canvas进行截图，本该是透明背景的区域出现黑色背景
![图1](./html2canvas画图出现黑色背景块/1.png)

## 问题原因

渲染的dom样式里的有`box-shadow`属性导致的

## 解决方案

通过vue的动态class，截图时暂时去掉`box-shadow`样式。修复后正常显示，如下图
![图1](./html2canvas画图出现黑色背景块/2.png)
