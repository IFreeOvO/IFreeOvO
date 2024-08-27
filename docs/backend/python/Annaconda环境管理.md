# Annaconda环境管理

## 查看环境

```bash
conda env list
```

## 创建环境

创建环境可以使用命令，其中`myenv`是自定义环境名

```bash
conda create -name myenv
```

如果需要指定python版本可以向下面一样写

```bash
conda create -n myenv python=3.10
```

## 切换环境

```bash
conda activate myenv
```

## 删除环境

```bash
conda remove --name myenv --all
```

## 重命名环境

直接重命名conda环境没有直接的命令。需要通过创建新环境的方式克隆实现重命名

```bash
conda create --name newname --clone oldname
```

然后删除旧的环境

```bash
conda remove --name oldname --all
```

## 退出当前环境

```bash
conda deactivate
```

## 程序包安装

1. pip安装
卸载时替换成`uninstall`

```bash
pip install package-name
```

2. pip安装
可以使用`conda list`查看安装了哪些包

```bash
conda install package-name
```
