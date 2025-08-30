# Anaconda换镜像源

## 添加清华大学的镜像源

```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/

conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
```

> 如果需要使用conda-forge

```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
```

## 设置搜索优先级
>
> 确保使用刚刚设置的镜像

```bash
conda config --set show_channel_urls yes
```

## pip换源

1. 临时使用

> 使用`-i`参数使用临时镜像源安装

```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package-name
```

2. 永久更换

* 方式1：修改配置文件
  1. 创建或修改pip的配置文件
     > 修改~/.pip/pip.conf
  2. 文件内容改为：

  ```bash
  [global]
  index-url = https://pypi.tuna.tsinghua.edu.cn/simple 
  ```
  
  * 方式2: 使用命令行
  命令行输入

  ```bash
  pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple 
  ```

## 查看anaconda配置

```bash
conda config --show
```
  
## 删除所有第三方镜像源

```bash
conda config --remove-key channels
```
