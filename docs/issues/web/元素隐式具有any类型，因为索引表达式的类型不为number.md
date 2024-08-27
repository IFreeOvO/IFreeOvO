# 元素隐式具有any类型，因为索引表达式的类型不为number问题处理

## 问题描述

在使用对象动态属性时，遇到一个奇怪的类型报错。复现代码如下

```ts
const attributeList = [
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
]

const computedStyle = window.getComputedStyle(ele)
attributeList.forEach((attributeName) => {
    const value = computedStyle[attributeName] // 这行报错"元素隐式具有any类型，因为索引表达式的类型不为number"
})
```

之所以奇怪是因为上面代码中，ts已经推到出`attributeName`是`string`类型，而`computedStyle`这个变量，在控制台打印出来的属性类型是包含`string`和`number`的。ts却错误的把`attributeName`认为是个`any`类型

## 解决方案

网上查询到以下几个解决方案

* 方案1
修改`tsconfig.json`

```json
"suppressImplicitAnyIndexErrors":true,
```

* 方案2

```ts
const value = (computedStyle as any)[attributeName]
```

* 方案3

```ts
const value = computedStyle[attributeName as keyof typeof computedStyle]
```

* 方案4，也是最终我采用的方案。解决思路是把`attributeList`转为元组类型进行forEach
  
```ts
const attributeList = [
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
] as const // 这里加as const 断言成元组类型

const computedStyle = window.getComputedStyle(ele)
attributeList.forEach((attributeName) => {
    const value = computedStyle[attributeName] // 这里的attributeName推导类型符合预期
})
```
