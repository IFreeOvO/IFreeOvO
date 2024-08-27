# 如何编译Chrome-DevTools-frontend源码(macos)

由于谷歌用的自家的编译工具编译项目，加上他家资源需要翻墙，容易出现各种报错，所以写了这篇文章记录下macos系统上，如何构建[Chrome DevTools frontend
](https://github.com/ChromeDevTools/devtools-frontend?tab=readme-ov-file)项目源码。

## 准备工作

在编译`Chrome DevTools frontend`项目前，我们需要先安装下编译指令

1. 本地开启科学上网，代理地区选择`美国`

2. 设置全局git代理。其中`socks5://127.0.0.1:7890`需要根据自己的代理软件提供的端口自行修改。我本地使用`clash pro`挂机场代理，所以用的`7890端口`

```shell
git config --global http.proxy 'socks5://127.0.0.1:7890'
git config --global https.proxy 'socks5://127.0.0.1:7890'
```

3. 本地创建一个新的目录，拉取`depot_tools`项目，因为`Chrome-DevTools-frontend`的编译需要这个工具

```shell
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
```

4. 打开电脑里的`~/.bashrc`或`~/.zshrc`文件(**配置其中一个就好**)，将我们拉取的`depot_tools`项目路径配置到系统环境变量中。例如我本地项目路径为`/Users/my/development/depot_tools`，则在文件里追加一行代码(路径记得替换成自己本地的)，然后保存关闭文件

```shell
export PATH=/Users/my/development/depot_tools:$PATH
```

控制台执行`source ~/.bashrc`命令使环境配置生效

## 编译项目

 在上一轮，我们完成了编译工具的配置工作。接下来我们，开始正式编译`Chrome-DevTools-frontend`。

1. 第一次执行`gclient sync`命令可能会出现获取代码失败的问题。先到`~/.bashrc`或`~/.zshrc`文件里，配置下代理。下面的`http://127.0.0.1:7890`需要替换成自己电脑上的代理地址

```shell
export http_proxy=http://127.0.0.1:7890
export https_proxy=$http_proxy
export ftp_proxy=$http_proxy
export rsync_proxy=$http_proxy
export HTTP_PROXY=$http_proxy
export HTTPS_PROXY=$http_proxy
export FTP_PROXY=$http_proxy
export RSYNC_PROXY=$http_proxy
```

2. 找一个地方创建`gclient`文件，例如`/Users/my/development/gclient`，在文件夹里创建`.gclient`文件，文件内容如下

```
solutions = [
  {
    "managed": False,
    "name": "src",
    "url": "https://github.com/chromium/chromium.git",
    "custom_deps": {},
    "deps_file": ".DEPS.git",
    "safesync_url": "",
  },
]
```

为了避免`gclient sync`执行时出现`NOTICE: You have PROXY values set in your environment, but gsutil in depot_tools does not (yet) obey them.
Also, --no_auth prevents the normal BOTO_CONFIG environment variable from being used.
To use a proxy in this situation, please supply those settings in a .boto file pointed to by the NO_AUTH_BOTO_CONFIG environment variable`报错。

找个地方创建`.boto`文件。例如我的文件路径为`/Users/my/development/.boto`，然后去`~/.bashrc`或`~/.zshrc`文件里配置

```shell
 export NO_AUTH_BOTO_CONFIG=/Users/my/development/.boto
```

保存后，在控制台执行`source ~/.bashrc`命令使环境配置生效。回到之前的`/Users/my/development/gclient`路径里，执行命令`gclient sync`

`gclient sync`这个指令会执行很久，大概会下载几十G的文件。如果没有用这个命令，直接去执行`gn gen out/Default`会报错提示`depot_tools`路径里缺文件。这个`gclient sync`指令其实是帮你下载缺的依赖文件

3. 完成上述步骤后，找个地方创建`devtools`文件夹，例如`/Users/my/development/devtools`，在当前目录里执行`fetch devtools-frontend`(**fetch命令是之前安装的depot_tools里提供的，包括后面用到的gn和autoninja**)下载`Chrome DevTools frontend`前端代码

4. 下载完成后，进入`devtools-frontend`目录下，执行命令

```
gn gen out/Default
autoninja -C out/Default
```

命令全部执行完后，我们也就完成了整个编译流程。编译后的前端产物会生成在`out/Default/gen/front_end`文件里

5. 最后记得清除代理，避免后续拉不了国内代码

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

还有`~/.bashrc`或`~/.zshrc`里面的

```shell
export http_proxy=http://127.0.0.1:7890
export https_proxy=$http_proxy
export ftp_proxy=$http_proxy
export rsync_proxy=$http_proxy
export HTTP_PROXY=$http_proxy
export HTTPS_PROXY=$http_proxy
export FTP_PROXY=$http_proxy
export RSYNC_PROXY=$http_proxy
```

这段代码也可以删除掉了

## 参考文献

* [Chrome DevTools Frontend 运行原理浅析](https://zhaomenghuan.js.org/blog/chrome-devtools-frontend-analysis-of-principle.html)
* [gclient sync失败问题之gclient config](https://zhuanlan.zhihu.com/p/70879583)
* [Chromium DevTools-frontend 源码构建流程-Windows系统](https://blog.csdn.net/sdpyly/article/details/127720079)
* [gclient sync 报错](https://www.jianshu.com/p/744d2bf1f373)
* [Mac编译Chromium](https://hustergs.github.io/archives/23dc19dd.html)
