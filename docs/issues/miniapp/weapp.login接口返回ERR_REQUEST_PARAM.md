# weapp.login接口返回ERR_REQUEST_PARAM

## 问题描述:
&nbsp;&nbsp;&nbsp;&nbsp;项目本地运行时没有问题，最近将项目后台服务接口改为微信开发环境request接口,打算放到开发环境运行,但是点击登录后,login接口状态码为200,返回数据为`{"code":-1,"error":"ERR_REQUEST_PARAM"}`

## 解决方法:
&nbsp;&nbsp;&nbsp;&nbsp;从[小程序sdk的github地址](https://github.com/tencentyun/wafer2-quickstart/issues/13)上找到两个方法:

> <b>1. 关闭腾讯云代理登录，使用微信小程序 AppID 和 AppSecret 登录：</b>
</br>
修改 `server/config.js` 中的 `useQcloudLogin` 为 `false`，并填写上 `appId` 和 `appSecret` 字段（分别为微信小程序的 `AppID` 和 `AppSecret`），重新部署代码即可。
</br>
<b>2. 手动填写腾讯云云 API 密钥：：</b>
</br>
登录腾讯云云 API 密钥控制台申请云 API 密钥，并在 `server/config.js` 的 `CONF` 中添加如下三个字段：</br>
>
>```
>    qcloudAppId: '你的腾讯云 AppID',
>    qcloudSecretId: '你的腾讯云 SecretId',
>    qcloudSecretKey: '你的腾讯云 SecretKey',
>```
>
> 重新部署代码即可生效。
由于上传接口也会使用到腾讯云云 API 密钥，如遇到上传接口报错，也请参考上面的方法进行排查。