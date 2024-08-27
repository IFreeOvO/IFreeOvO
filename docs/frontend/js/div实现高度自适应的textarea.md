# div实现高度自适应的textarea

## 实现思路
>
> 通过css属性`contenteditable="true"`，让div里的文字可以编辑。文本域的placeholder的显示隐藏通过伪元素类的样式控制实现

## HTML部分

```html
<div
    class="title"
    ref='ipt'
    contenteditable="true"
    style="-webkit-user-select:text"
    :class="{ tip : !hasTitle}"
    @input="getTitle"
    @focus='focusFn'
    @blur='blurFn'
    >
</div>
```

## JS部分

```js
    focusFn(e) {
      this.hasTitle = true // 让placeholder消失
    },

    blurFn(e) {
      if (e.target.innerText === '') {
        this.hasTitle = false
      }
    },


    // 输入标题 
    getTitle(e) {
      if (e.target.innerText.length > 20) {
        e.target.innerText = e.target.innerText.slice(0, 20) // 超出字数限制就截取
        this.setHeaderTitle(e.target.innerText)  // vuex里的设置文本函数
        e.target.blur()
        return
      }
      this.setHeaderTitle(e.target.innerText)
    },
```

## css部分

```scss
.title {
  font-size: 30px;
  outline: none;

  &.tip {
    &:after {
      content: '点击设置标题';
    }
  }
}
```
