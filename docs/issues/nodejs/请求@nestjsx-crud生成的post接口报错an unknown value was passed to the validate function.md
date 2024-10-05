# 请求@nestjsx-crud生成的post接口报错an unknown value was passed to the validate function

## 场景

我用`@nestjsx-crud`这个库自动生成了一套`restful`风格api接口，使用它生成`post`接口，发送请求时，接口报错`an unknown value was passed to the validate functio`，已经确认过参数传输没有问题。后来用网上查的一些方案，试了都不对,最后还是自己摸索出解决方案，记录一下如何处理。

## 解决方案

处理起来其实很简单，需要自己定义dto类型传给`Crud`装饰器即可解决。不手动传的话，`Crud`默认使用`entity`实体类的类型，但是我们实体类一般是不加`class-validator`装饰器的，全局设置的`ValidationPipe`也就不知道该怎么校验(因为报错是`ValidationPipe`校验后抛出的)

```ts
@Crud({
    model: {
        type: Menu,
    },
    routes: {
        only: ['getManyBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
    },
    dto: {
        create: CreateMenuDto, // 在这里手动加dto
        update: UpdateMenuDto,
    },
})
@Controller('menus')
export class MenusController implements CrudController<Menu> {
    constructor(public readonly service: MenusService) {}
}
```
