# nestjs使用swc加速编译

## 步骤

1. 在`src`目录下创建`generate-metadata.ts`，内容为

```ts
import { writeFileSync } from 'fs'
import { join } from 'path'
import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator'
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin'

const tsconfigPath = 'tsconfig.build.json'
const srcPath = join(__dirname, '..', 'src') // 都使用绝对路径防止执行时，找不到文件
const metadataPath = join(srcPath, 'metadata.ts')

// 如果本地没有metadata.ts文件，则创建一个默认的。不然这个脚本执行会报错
const defaultContent = `export default async () => { return {}; };`
writeFileSync(metadataPath, defaultContent, 'utf8')

const generator = new PluginMetadataGenerator()
generator.generate({
    visitors: [new ReadonlyVisitor({ introspectComments: true, pathToSource: srcPath })],
    outputDir: __dirname,
    tsconfigPath,
    // watch: true, // 如果需要开启监听
})

```

2. 在`package.json`里添加脚本

```json
"scripts": {
    "generate-metadata": "ts-node ./src/generate-metadata.ts",
},
```

并执行`pnpm generate-metadata`，脚本会在`src`下生成`metadata.ts`文件

3. 在`main.ts`文件里导入`metadata.ts`

```ts
import metadata from './metadata'

...
await SwaggerModule.loadPluginMetadata(metadata); // 还需要添加这一行
const document = SwaggerModule.createDocument(app, config);

```

4. 在`nest-cli.json`里添加

```json
 "compilerOptions": {
        "builder": "swc",
        "typeCheck": true,  // swc不具备检测类型功能。所以需要自己开启类型检测
}
```

配置完后，`nestjs`将用`swc`进行编译

5. 最后，运行项目启动即可
