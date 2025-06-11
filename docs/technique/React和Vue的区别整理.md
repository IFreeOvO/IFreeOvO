# React和Vue的区别整理

## 声明式UI实现方式不同

Vue使用`template`实现声明式UI

React使用`jsx`实现声明式UI

## 状态不同

Vue中，状态是双向绑定的，是可以对它直接修改的

React中，状态不可变的

## 更新机制不同

Vue是自动收集依赖，当数据变化时，会自动更新

React是通过setState进行手动更新视图
