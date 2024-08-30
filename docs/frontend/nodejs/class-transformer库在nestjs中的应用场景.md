# class-transformer库在nestjs中的应用场景

> 本篇主要介绍class-transformer在nestjs框架里的应用，它在哪有场景下需要用到，以及解决了什么问题

## 使用场景

### 过滤掉接口返回的敏感字段

比如我们在查询用户信息时，用户的密码可能会存储在用户表里，当查询用户表时，接口会把用户信息(含密码字段)一起返回给前端，这是我们不希望看到到。
这种情况下我们可以修改`user.entity.ts`用户实体类，比如我们希望过滤掉密码字段，可以在密码字段上加上`@Exclude()`装饰器。

```ts
import { Exclude } from 'class-transformer'

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 10,
        comment: '用户名',
        unique: true,
    })
    username: string

    @Column({
        length: 100,
        comment: '密码',
    })
    @Exclude() // 在这里加上Exclude装饰器
    password: string
}   
```

并在使用接口的地方同时加上`UseInterceptors`装饰器(**后续例子里也需要这样做，才能让`class-transformer`的装饰器生效，就不重复写了**)

```ts
import { ClassSerializerInterceptor, UseInterceptors} from '@nestjs/common'
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    getUser(@Param('id') id: string) {
        return this.userService.register(registerUser)
    }
}

```

这样在查询用户信息时，密码字段就不会被返回了。

### 基于已有字段，生成新的字段
  
使用`@Expose`装饰器加`get`关键字

```ts
import { Expose } from 'class-transformer'

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 10,
        comment: '用户名',
        unique: true,
    })
    username: string

    @Column({
        comment: '密码',
    })
    age: string

    // 新增字段test
    @Expose()
    get test() {
        return this.username + ' ' + this.age
    }
}   
```

接口返回

```json
{
    "code": 200,
    "message": "success",
    "data": {
        "username": "demo",
        "id": 9,
        "age": "18",
        "test": "demo 18" // 这是新的字段
    }
}
```

这里的产生的新字段`test`并不会出现在数据库里。它的计算方式有点类似于`vue`里`computed`

### 格式化字段成自己想要的形式

比如最常见的就是日期展示格式，这里需要使用`@Transform`装饰器

```ts
import * as dayjs from 'dayjs'
import { Transform } from 'class-transformer'

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 10,
        comment: '用户名',
        unique: true,
    })
    username: string

    @CreateDateColumn()
    @Transform(({ value }) => dayjs(new Date(value)).format('YYYY-MM-DD HH:mm:ss'))
    createTime: Date
}   
```

接口返回

```json
{
    "code": 200,
    "message": "success",
    "data": {
        "username": "demo",
        "id": 9,
        "age": "18",
        "createTime": "2024-08-30 07:49:07", // 这是格式化后的字段
    }
}
```

### 转换字段的类型

需要使用`@Type`装饰器

```ts
import * as dayjs from 'dayjs'
import { Type } from 'class-transformer'

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    @Type(() => String) // 进行类型转换，=>后面可以跟其他js类型或者自定义的类型
    id: number

    @Column({
        length: 10,
        comment: '用户名',
        unique: true,
    })
    username: string
}   
```

接口返回

```json
{
    "code": 200,
    "message": "success",
    "data": {
        "username": "demo",
        "id": "9", // 修改后，从数字类型变成字符串类型
    }
}
```
