# vue如何跨层级传递slot

## 使用场景

基础组件 a 有个 slot 需要展示 c 组件传入的内容。但是 a 组件被业务组件 b 包装了一层。
然后 c 组件在使用 b 组件时需要把内容透过 b 组件的 slot 传给组件 a

## 解决方案

```vue
// ui组件a
<template>
  <div>
    <slot name="content"> </slot>
  </div>
</template>
```

```vue
// 业务组件b
<template>
  <div>
    <a>
      <template :slot="'content'">
        <slot name="content"> </slot>
      </template>
    </a>
  </div>
</template>
```

```vue
// 项目组件a
<template>
  <div>
    <b>
      <template :slot="'content'">
        <span>内容</span>
      </template>
    </b>
  </div>
</template>
```
