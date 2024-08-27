# centOS搭建nodejs环境

## 安装wget

```
yum -y install wget
```

## 安装git

参考文章链接：[CentOS 安装最新版本 Git](https://www.cnblogs.com/jhxxb/p/10571227.html)
笔者采用的配置全局变量步骤与上面文章有所区别，具体操作如下

```
cd /usr/bin/
ll git // 判断是否已经创建过软链接，如果创建过就用rm -rf git删除软链接
ln -s /usr/local/git/bin/git git   // 创建软链接
git --version  // 返回正确的版本号说明创建成功
```

## 安装nvm

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```

## 将nvm命令加入系统环境

```
source ~/.bashrc
```

## 查看nvm版本，出现提示说明安装成功

```
nvm -v
```

## 使用nvm安装最新的node

```
nvm install node
```

## 查看node版本，出现提示说明安装成功

```
node -v
```
