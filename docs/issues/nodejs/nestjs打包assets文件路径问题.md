# nestjs打包assets文件路径问题

## 问题描述

在nestjs项目中，我有个目录`src/assets`目录，构建后，产物会生成在`dist/assets`，而不是在`dist/src/assets`这个位置，导致项目运行时找不到`assets`文件里对应的资源文件。

## 解决方案

* 环境`@nestjs/cli": "10.0.0`

修改`nest-cli.json`的`compilerOptions`如下

```json
{
    "compilerOptions": {
        "assets": [
            {
                "include": "assets/**/*",
                "outDir": "dist/src"
            }
        ],
    }
}
```

上面代码意思是把`assets`目录下所有文件，打包到`dist/src`。所以这样改完后，输出位置就正确了

## 参考链接

[nestjs官网-assets说明](https://docs.nestjs.com/cli/monorepo#assets)
