# nestjs同时使用swagger和swc编译，会出现依赖循环报错

## 问题描述

复现版本:

```json
"@nestjs/core": "9.0.0",
"@nestjs/swagger": "^7.4.0",
"@swc/core": "^1.11.11",
```

在项目里存在`swagger`插件时，同时使用`swc`进行项目进行编译，会报错`Error: A circular dependency has been detected (property key: "XXX"). Please, make sure that each side of a bidirectional relationships are using lazy resolvers ("type: () => ClassType").`

## 问题原因

根据官网`issue`和`stackoverflow`查阅资料，得知`swc`是无法防止循环依赖问题的需要手动处理。然后在本案例项目里，报错是因为`*.dto.ts`文件里使用了`swagger`的`@ApiProperty`导致的依赖循环。

需要修改以下几处

```ts
class UserDto {
    name: string;
    age: number;
}

class SchoolDto {
    @ApiProperty({
      type: UserDto // 如果用了类作为类型。需要明确在ApiProperty进行定义
    })
    user: UserDto;
}
```

```ts
enum StatusEnum {
    enable,
    disable
}

class TestDto {
    @ApiProperty({
      enum: Salutation // 如果用了枚举作为类型。需要明确在ApiProperty进行定义
    })
    status: StatusEnum;
}
```

## 参考文档

[nestjs->swc->常见陷阱](https://docs.nestjs.com/recipes/swc#common-pitfalls)
[Circular Dependency with Nestjs Swagger 4](https://stackoverflow.com/questions/60749439/circular-dependency-with-nestjs-swagger-4)
