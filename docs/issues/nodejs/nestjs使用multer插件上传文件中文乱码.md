# nestjs使用multer插件上传文件中文乱码

## 问题描述

相同的中文名文件，用`postman`请求上传到服务器上，文件名是正常的。但是用代码创建`formData`上传，存到服务器上文件件名就是中文乱码。
前端代码:

```js
const formData = new FormData()
const imgName = '测试.png'
formData.append(
    'files',
    new File([blob], imgName, {
        type: 'image/png',
    }),
)
upload(imgName)
```

## 解决方案

这里没有用[NestJS 上传文件中文名乱码](https://juejin.cn/post/7261808673033863227?searchId=2025031119594505CD69C491EF0864B128)提到的方案去处理，是因为用中文字符集判断后，再去`Buffer.from(value.originalname, 'latin1').toString('utf8',)`转码，使用场景太局限。根据`issue`反馈，如果文件名用了其他字符集，比如韩文，其实也是会乱码。

所以我改成一种稍微麻烦，但是能解决更多场景乱码的方案，用`encodeURIComponent`编码去处理。

前端处理：

```js
const formData = new FormData()
const imgName = encodeURIComponent('测试.png')
formData.append(
    'files',
    new File([blob], imgName, {
        type: 'image/png',
    }),
)
upload(imgName)
```

后端处理:

```ts
imports: [
        MulterModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                storage: diskStorage({
                    destination: 'upload',
                    filename: (_req, file, callback) => {
                        const filename = decodeURIComponent(file.originalname)
                        callback(null, filename)
                    },
                }),
            }),
            inject: [ConfigService],
        }),
    ],
```

## 参考链接

[NestJS 上传文件中文名乱码](https://juejin.cn/post/7261808673033863227?searchId=2025031119594505CD69C491EF0864B128)
[multer官方issue](https://github.com/expressjs/multer/issues/1104)
