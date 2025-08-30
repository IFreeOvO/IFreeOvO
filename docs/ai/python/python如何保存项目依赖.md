# python如何保存项目依赖

## 方式1

在根目录执行

```bash
pip freeze > requirements.txt
```

* 缺点: 会把项目里用到的包的依赖也保存起来

## 方式2

通过第三方库pipreqs

```bash
 pip install --no-deps pipreqs
 pip install yarg==0.1.9 docopt==0.6.2
```

然后在控制台执行

```bash
 pipreqs

## 或者加上 --ignore，如果本地项目有venv文件
pipreqs --ignore venv --force
```

## 如何安装项目依赖

```bash
pip install -r requirements.txt
```
