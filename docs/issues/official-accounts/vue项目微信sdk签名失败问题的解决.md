# vue项目微信sdk签名失败问题的解决

## 问题描述
>
> &nbsp;&nbsp;&nbsp;&nbsp;公众号页面在调试时微信接口报错`invalid signature`签名错误，另外网页刷新一次后也会出现签名失败。虽然网上论述签名失败的文章很多，但笔者并没有找到有说明如何解决刷新页面后导致的签名时效的文章，所以整理了一下导致sdk失效的原因和解决方案

## 官方解决方法

&nbsp;&nbsp;&nbsp;&nbsp;首先，我们先看一下[微信公众号平台官网](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)上提供的解决方案:

>1.确认签名算法正确，可用`http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign` 页面工具进行校验。
>
>2.确认config中nonceStr（js中驼峰标准大写S）, timestamp与用以签名中的对应noncestr, timestamp一致。
>
>3.确认url是页面完整的url(请在当前页面`alert(location.href.split('#')[0]`)确认)，包括'http(s)://'部分，以及'？'后面的GET参数部分,但不包括'#'hash后面的部分。
>
>4.确认 config 中的 appid 与用来获取 jsapi_ticket 的 appid 一致。
>
>5.确保一定缓存`access_token`和`jsapi_ticket`。
>
>6.确保你获取用来签名的url是动态获取的，动态页面可参见实例代码中php的实现方式。如果是html的静态页面在前端通过ajax将url传到后台签名，前端需要用js获取当前页面除去'#'hash部分的链接（可用`location.href.split('#')[0]`获取,而且需要`encodeURIComponent`），因为页面一旦分享，微信客户端会在你的链接末尾加入其它参数，如果不是动态获取当前链接，将导致分享后的页面签名失败。

## 实际开发中遇到的问题及部分原因(vue路由采用history模式)

1. 本地调试提示`invalid url domain`错误。原因是sdk只有线上环境才能使用(即前端浏览器地址是标准域名不是本地ip地址)
2. 使用线上地址调试依然报`invalid url domain`错误。原因是当前页面所在域名没有在公众号后台进行绑定,需要绑定业务域名和js接口地址才能正式使用
3. 使用`wx.getLocalImgData`接口报错,原因是该接口只能在真机上使用,本地调试不可以使用
4. ios上刷新页面会导致签名失败。解决方案往下看
5. 由于项目有多个页面需要配置微信sdk，能否抽取成一个公共模块，减少重复配置代码

## sdk地址签名的规律

&nbsp;&nbsp;&nbsp;&nbsp;网上查资料说，安卓是以当前路由地址签名，所以每次凡是用到签名的页面都是以当前页面地址签名(签名在安卓机上一切正常，ios上比较复杂)。ios则是以第一次进入页面的地址作为签名的url,例如从公众号入口进来访问的是页面A,签名页是页面D，那么从A->D无论经过多少次跳转都是以A的地址进行签名。

&nbsp;&nbsp;&nbsp;&nbsp;不过网上没有人考虑过页面刷新这一点，经过笔者测试，ios上只要刷新(不管在哪个路由页面刷新)，都会导致签名失败。笔者的第一个想到的解决方案是签名页面D如果签名失败，则在config的error回调中进行再次签名,不过是以签名页面D的地址进行签名的，而不是一开始进来的地址。虽然这个方法解决的刷新导致签名失败的问题，但有个缺点，就是如果一直失败，可能导致error回调无限次数执行导致页面卡死。

&nbsp;&nbsp;&nbsp;&nbsp;第一个方案似乎是解决了页面刷新导致的签名失败，但是在后面的开发中，笔者又遇到新的问题，此时项目中又有一个页面E需要使用签名。此时用第一个解决方案会有以下问题,页面D刷新后重新签名后可以正常使用，但是跳转到页面E时，页面E第一次签名和第二次签名都提示失败。

&nbsp;&nbsp;&nbsp;&nbsp;经过笔者反复测试，得出失败的原因:当你刷新页面后，微信浏览器会认为这个页面是入口页，就是说以后签名都是以这个刷新过的页面的地址作为签名地址的，这也是**为什么刷新页面后会出现签名失败**。有了这个结论后，笔者找出了相对完美的解决方案。大体思路是，通过vue-router路由守卫，在页面t利用vuex刷新页面会使vuex数据重置的特点。第一次进来会保存入口页面地址并设置vuex状态为false。一旦vuex里的isReloaded变成true说明肯定刷新或是第一次进入页面，那么就记录下地址，以后签名时ios设备就以这个地址签名就行了

## 解决方案

vue-router里写

```js
router.beforeEach((to, from, next) => {
  recordUrl(to)
  next()
})

router.afterEach((to, from) => {
  let url
  // 非ios设备
  if (window.__wxjs_is_wkwebview !== true) {
    url = window.location.origin + to.fullPath
  } else {
    url = wsCache.get('url')
  }

  const SDKList = ['chooseImage', 'previewImage', 'getLocalImgData', 'uploadImage', 'onMenuShareTimeline', 'onMenuShareAppMessage']
  _getSignature(url).then(res => {
    _wxConfig(res, SDKList)
  })

})
```

相关方法

```js
// 记录路由地址用于配置sdk
export function recordUrl(to) {
  if (store.state.isReloaded) {
    let url = location.origin + to.fullPath
    wsCache.set('url', url)
    store.commit('SET_RELOAD_STATUS', false)
  }
}

// 配置sdk
export function _wxConfig(signObj, SDKList) {
  wx.config({
    debug: false,
    appId: signObj.appid,
    timestamp: signObj.timestamp,
    nonceStr: signObj.nonceStr,
    signature: signObj.signature,
    jsApiList: SDKList
  })
}

// 获取签名
export function _getSignature(url) {
  return new Promise((resolve, reject) => {
    getSignature({
      url
    }).then(res => {
      resolve(res.data)
    })
  })
}
```

vuex里写

```js
const state = {
  isReloaded: true, // 用于判断有没有页面被用户刷新过
}
export default state
```
