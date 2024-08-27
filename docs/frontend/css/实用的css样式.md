# 实用的css样式

```css
// 自动转大写
text-transform: uppercase;
```

```css
// 阻止浏览器横向滚动到边界时会触发回退
overscroll-behavior: none;
```

```css
// 避免文字被选中
user-selected:none;
```

```css
// 避免浏览器默认把多个空格合并成一个空格
white-space: pre
```

```css
// 禁用鼠标事件
pointer-events: none;
```

```css
// 重置按钮样式
button {
    all: unset;
}
```

```css
// 防止反复点按钮，界面意外放大
button {
    touch-action: manipulation;
}
```

## 焦点样式

```css
button:focus:not(:focus-visible) {
    
}

button:focus
```
