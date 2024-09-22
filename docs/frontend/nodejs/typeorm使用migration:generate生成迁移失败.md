# typeorm使用migration:generate生成迁移失败

> 这篇文章主要记录下，`typeorm migration:generate`这个命令到底要怎么用，才能正确生成迁移文件

## 前言

最近在学习使用typeorm-cli进行数据库迁移，有个`typeorm migration:generate`命令用法，让我一直很困惑，它的具体用法。

因为在我项目里，我已经用过`typeorm migration:create" command`命令，再使用`typeorm-ts-node-commonjs migration:generate ./migrations/update-table -d ./scripts/data-source.ts`命令执行完，还是总提示`No changes in database schema were found - cannot generate a migration. To create a new empty migration use "typeorm migration:create" command`，并没有生成新的迁移文件。

先解释下这个命令：

* `typeorm-ts-node-commonjs migration:generate`作用等同于`typeorm migration:generate`，只是因为我需要执行`.ts`类型文件，需要把`typeorm`命令改为`typeorm-ts-node-commonjs`。
* `./migrations/update-table`是指生成的迁移文件存放位置。其中`update-table`对应的文件名将会是`[时间戳]-update-table.ts`格式
* `-d ./scripts/data-source.ts`是指自己写的`data-source.ts`脚本

## 目录结构

```bash
├── scripts/
│   └── data-source.ts
├── migrations/
└── src/
    └── providers/
        └── typeorm/
            └── typeorm.modules.ts
    └── modules/
        └── user/
                └── entities/
```

## 文件准备

```ts
// data-source.ts
import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'xx',
    password: 'xx',
    database: 'xx',
    migrations: [join(__dirname, '../migrations/**')], // 这个对生成迁移文件有影响
    entities: [join(__dirname, '../src/modules/**/entities/*.entity.ts')], // 这个对生成迁移文件有影响
}

export default new DataSource(dataSourceOptions)

```

```ts
// typeorm.modules.ts。nestjs里的typeorm配置。
@Module({
    imports: [
        TypeOrm.forRootAsync({
            useFactory(configService: ConfigService) {
                const mysqlConfig = {
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'xx',
                    password: 'xx',
                    database: 'xx',
                    synchronize: true, // 这个对生成迁移文件没有影响
                    migrations: '../../../migrations/**', // 这个对生成迁移文件有影响。要和data-source.ts里的指向的migrations保持一致
                    autoLoadEntities: true, // 如果是自动的话，对生成迁移文件没有影响。手动配entities，如果没配置对，会有影响
                    logging: true,
                } as TypeOrmModuleOptions
                return mysqlConfig
            },
            inject: [ConfigService],
        }),
    ],
})
export class TypeOrmModule {}
```

## migration:generate用法

假如在我例子中的`migrations`文件夹是空的，需要先执行下下面两个命令

```bash
typeorm migration:create ./migrations/initData
typeorm-ts-node-commonjs migration:run -d ./scripts/data-source.ts
```

然后修改`entities`文件里实体类的字段，修改后执行

```bash
typeorm-ts-node-commonjs migration:generate ./migrations/update-table -d ./scripts/data-source.ts
```

注意生成目录`./migrations/update-table`要跟`data-source.ts`和`typeorm.modules.ts`配的`migrations`指向同一个地方，就能正常生成迁移文件(之前一直没生成就是因为`migrations`配的路径不对)。
