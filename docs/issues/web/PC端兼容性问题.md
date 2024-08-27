# PC端兼容性问题

## 浏览器检测

```js
// 检测IE浏览器
function isIE(){
　　if(!!window.ActiveXObject || "ActiveXObject" in window){
　　　　return true;
　　}else{
　　　　return false;
　　}
} 

// 检测IE11
function isIE11(){
　　if((/Trident\/7\./).test(navigator.userAgent)){
　　　　return true;
　　}else{
　　　　return false;
　　}
}
```

## ie系列兼容问题

ie11页面刷新会自动执行input标签的input时间
> 解决方案:
用keyup事件代替input事件

ie11的DOM API没有remove方法
> 解决方案:
用removeNode(true)代替

ie11 鼠标移入移出动画效果,用js监听有兼容性问题
> 解决方案:
使用css 的:hover 实现,代替js监听
