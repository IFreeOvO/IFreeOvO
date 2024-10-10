# 使用typeorm-cli执行迁移时，无法识别ts的路径里的@别名

## 问题描述

在nestjs项目里，使用`typeorm-ts-node-commonjs migration:run -d ./scripts/data-source.ts`执行迁移时，由于`*.entity.ts`文件都是用`@/**`绝对路径的方式导入，导致命令运行后报错`Error: Cannot find module '@/modules/roles/entities/role.entity'`。

也就是说`typeorm-ts-node-commonjs`这个命令，在执行时没有调用项目里`tsconfig.json`里配置好的路径别名。

## 解决方案

通过`NODE_OPTIONS=' -r tsconfig-paths/register'`把配好的别名传递给`typeorm-ts-node-commonjs`使用。

关于`NODE_OPTIONS=' -r tsconfig-paths/register'`命令作用，ChatGPT给出的解释如下:

* `NODE_OPTIONS`: 是一个环境变量，用于为 Node.js 进程设置全局选项。
* `-r tsconfig-paths/register`: 这个选项用于在 Node.js 启动时预先注册 tsconfig-paths 模块。这样可以确保在运行任何 Node.js 应用程序时，TypeScript 的路径别名（如 @ 符号）能够被正确解析。

修改后命令如下:

```bash
NODE_OPTIONS=' -r tsconfig-paths/register' typeorm-ts-node-commonjs migration:run -d ./scripts/data-source.ts
```

命令如果觉得太长，可以优化下:

```json
{
  "scripts": {
        "typeorm": "NODE_OPTIONS=' -r tsconfig-paths/register' typeorm-ts-node-commonjs",
        "migration:run": "pnpm typeorm migration:run -d ./scripts/data-source.ts",
}
```
