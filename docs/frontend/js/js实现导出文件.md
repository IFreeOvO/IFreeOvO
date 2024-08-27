# js实现导出xls文件

## 采用的技术栈

- vue
- axios

## 具体实现

这里需要注意,响应数据类型要单独设置blob来覆盖全局的响应类型

```javascript
// 导出文件
export function exportFile(params) {
  return request({
    responseType: 'blob',
    url: path + '/commodity/export',
    method: 'get',
    params
  })
}
```

获取到后台数据后,通过挂载a标签实现下载

```javascript
  exportFile({
    categoryId: state.curCategoryId,
    brandId: state.curBrandId,
    model: state.curModel,
    status: state.curTab
  }).then(res => {
    if (!res) {
      return
    }
    var url = window.URL.createObjectURL(new Blob([res]))
    var link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', new Date().getTime() + '.xls')
    document.body.appendChild(link)
    link.click()
  })
```
