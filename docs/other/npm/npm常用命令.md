# npm常用命令

* npm config set registry <https://registry.npm.taobao.org> 设置镜像

* npm whoami 查看npm当前使用账户

* npm adduser 用户注册

* npm login 用户登录

* npm logout 退出登录

* npm publish --tag=tagName发布npm包

* npm config ls  查看npm配置

* `npm view [包名] versions` 查看该包的所有版本

* npm deprecate pkgName@1.1.0 'message' 废弃包

* `npm unpublish [<@scope>/]<pkg> --force` 删除整个包

* `npm unpublish [<@scope>/]<pkg>@<version>` 删除包的指定版本

* npm config get registry 获取镜像地址

* `npm dist-tag add [<@scope>/]<pkg>@<version>` [tag]    修改包的标签

* npm dist-tag list 查看所有的标签

* npm version major/minor/patch 升级版本号

* npm ci --cache .npm --quiet --no-progress --production

```bash
--production：只安装dependencies

--prefer-offline: 将使npm跳过任何条件请求（304检查）直接使用缓存数据，只有在缓存无法匹配到的时候，才去访问网络。这样我们将依赖包添加到项目的过程就会快很多
```

* 传参方式

```bash
npx standard-version –t rb
等价于package.json里有
"scripts": {
  "release": "standard-version"
}
执行
npm run release -- -t rb 
```

`npm <command> --loglevel verbose` 设置npm日志输出
支持快捷方式的值：
• -s, --silent: --loglevel silent
• -q, --quiet: --loglevel warn
• -d: --loglevel info
• -dd, --verbose: --loglevel verbose
• -ddd: --loglevel silly

* 开启代理

```bash
npm config set proxy http://proxy-server:port
npm config set https-proxy http://proxy-server:port
```

* 清除代理

```bash
npm config delete proxy
npm config delete https-proxy
```
