# nestjs如何开启csrf防御

## 步骤

### 1.安装依赖包

```bash
pnpm add csurf  cookie-parser
pnpm add -D @types/csurf @types/cookie-parser
```

### 2.开发nestjs中间件

开发解析cookie的中间件

```ts
// cookie-parser.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as cookieParser from 'cookie-parser'

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
    private cookieParser

    constructor() {
        this.cookieParser = cookieParser()
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.cookieParser(req, res, next)
    }
}

```

开发校验csrf-token的中间件

```ts
// csrf.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as csurf from 'csurf'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
    private csrfProtection

    constructor(private readonly configService: ConfigService) {
        this.csrfProtection = csurf({ cookie: true })
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.csrfProtection(req, res, next)
    }
}

```

开发为接口响应设置csrf-token的中间件

```ts
// set-csrf-token.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { ConfigService } from '@nestjs/config'
import { isFunction } from 'radash'
import { ConfigEnum } from '@/constants/config.constant'

@Injectable()
export class SetCSRFTokenMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService) {}

    use(req: Request, res: Response, next: NextFunction) {
        if (!isFunction(req.csrfToken)) {
            next()
            return
        }
        const token = req.csrfToken()
        const isDev = process.env.NODE_ENV !== 'production' 

        res.cookie('CSRF-Token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: !isDev,
            domain: isDev ? undefined : this.configService.get<string>(ConfigEnum.FRONT_END_DOMAIN),
        })

        res.locals.csrfToken = token
        next()
    }
}

```

### 3. 使用中间件

```ts
// app.module.ts
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CookieParserMiddleware, CsrfMiddleware, SetCSRFTokenMiddleware)
            .forRoutes('*')
    }
}

```

### 4. 开发接口获取csrf-token

```ts
@Controller('auth')
export class AuthController {
    @Get('csrf-token')
    @Public()
    async getCsrfToken(@Req() req: any) {
        const token = req.csrfToken()
        return {
            csrfToken: token,
        }
    }
}
```

## 前端使用csrf-token进行防御步骤

1. 先通过`/auth/csrf-token`接口获取`csrfToken`存放到本地(存哪都行，因为第三方网站读取不了这个值)
2. 前端后续请求时，在请求头添加`X-CSRF-Token`，值为`csrfToken`存的值
