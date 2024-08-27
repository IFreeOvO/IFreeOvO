# 解决PC端滚动穿透

### 解决方案

给html元素添加css

```css
.no-scroll {
  overflow-y: hidden !important;
  height: auto !important;
}
```
