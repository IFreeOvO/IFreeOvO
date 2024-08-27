# CSS过渡属性transition与display冲突问题

## 问题描述

当改变元素display属性时，过渡属性transition失效，以至于看不出元素的动画效果。
举个栗子🌰：

```scss
.box {
  display: 'none';
  opacity: 0;
  transition: transform .3s ease-in-out;
  &:hover {
    display: 'block';
    opacity: 1
  }
}
```

## 问题产生的原因

display:none的时候，页面文档流中将不会存在该元素。transition无法对一个从有到无的元素产生过渡效果

## 解决方案

* 通过改变元素的宽/高为0px，代替display实现隐藏
* 通过改变元素visibility，代替display实现隐藏
* setTimeout延迟设置opacity:1
* 通过requestanimationframe函数延迟设置opacity:1

## 参考文献
>
> 文章链接：[解决transition动画与display冲突的几种方法](https://www.cnblogs.com/ihardcoder/p/3859026.html)<br/>
> 文章链接：[CSS过渡属性transition与display冲突问题](https://www.jianshu.com/p/e25d3aa9116a)
