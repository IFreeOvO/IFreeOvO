# vue的history模式路由刷新出现404问题

本地开发项目时，使用history模式刷新浏览器界面会返回404

## 复现场景

1. 使用非`index.html`文件作为文档入口(例如`index.pro.html`)
2. vue-router路由设置了`mode:history`
3. webpack已配置了如下代码：

```js
    {
      output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist'),
        publicPath: '/'
      },
      devServer: {
        historyApiFallback: {
          rewrites: [
            {
              from: /.*/,
              to: '/index.pro.html'
            }
          ]
        },
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.pro.html',
        })
      ]
    }
```

## 问题思路

出现404的原因在于：根据上面的historyApiFallback配置，在资源出现404时，会从内存中取出`index.pro.html`文件返回。按照上述配置的话，HtmlWebpackPlugin插件默认往内存放入的是`index.html`，所以是没有`index.pro.html`返回给前端的，也就导致了404

## 解决方案

在`HtmlWebpackPlugin`中修改默认的html文件入口

```js
    {
      output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist'),
        publicPath: '/'
      },
      devServer: {
        historyApiFallback: {
          rewrites: [
            {
              from: /.*/,
              to: '/index.pro.html'
            }
          ]
        },
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: './index.pro.html', // 默认的HTML入口。添加此行代码修复bug
          template: './index.pro.html', // 这句话意思应该是把这个模板里的内容写入到默认的html文件里。之前没定位到问题，是因为把这个属性当成了入口文件配置
        })
      ]
    }
```
