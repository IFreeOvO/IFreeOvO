# 封装axios请求(ts版)

## 支持功能

- 自动取消重复请求
- `await-to-js`风格异步处理
- 接口返回类型的泛型推导
- 统一的异常处理

## 用法

```ts
function test(data: TestDTO) {
    return request.post<TestVO>('/test', data)
}

const [err, data] = test({a: 1})
if(!err) {
    console.log(data)
}
```

## 封装实现

```ts
import type {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import axios, { HttpStatusCode } from 'axios'
import { message } from 'antd'

export enum MethodEnum {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

export interface Result<T = any> {
    code: number
    message: string | string[]
    data: T
    error?: string
}

export type Response<T = any> = [Error | AxiosError, undefined] | [undefined, Result<T>]

const requestMap: Map<string, AbortController> = new Map()

const handleNetworkError = (err: AxiosError) => {
    let errMessage = err.message
    const { response } = err
    // 被取消的请求，不需要提示
    if (err.name === 'CanceledError') {
        console.error(`'Request ${err.config?.url} canceled'`)
        return
    }
    // 跨域报错时，没有response
    if (!response) {
        message.open({
            content: errMessage,
            type: 'error',
        })
        return
    }
    const { status } = response
    switch (status) {
        case HttpStatusCode.BadRequest:
            errMessage = '请求出错'
            break
        case HttpStatusCode.Unauthorized:
            errMessage = '未授权，请重新登录'
            break
        case HttpStatusCode.Forbidden:
            errMessage = '无访问权限，请联系管理员'
            break
        case HttpStatusCode.NotFound:
            errMessage = '接口不存在'
            break
        case HttpStatusCode.MethodNotAllowed:
            errMessage = `不支持${response.config.method}方式请求`
            break
        case HttpStatusCode.RequestTimeout:
            errMessage = '请求超时'
            break
        default:
            if (status >= HttpStatusCode.InternalServerError) {
                errMessage = '服务器出错'
            } else {
                errMessage = '请求失败'
            }
    }
    message.open({
        content: errMessage,
        type: 'error',
    })
}

const makeKey = (config: InternalAxiosRequestConfig) => {
    return (
        (config.url ?? '') +
        config.method +
        JSON.stringify(config.params) +
        JSON.stringify(config.data)
    )
}

const addSignal = (config: InternalAxiosRequestConfig) => {
    const controller = new AbortController()
    config.signal = controller.signal

    const key = makeKey(config)
    if (requestMap.has(key)) {
        requestMap.get(key)!.abort()
        requestMap.delete(key)
    } else {
        requestMap.set(key, controller)
    }
    return config
}

const removeSignal = (config: InternalAxiosRequestConfig) => {
    const key = makeKey(config)
    requestMap.delete(key)
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
    timeout: import.meta.env.VITE_REQUEST_TIMEOUT,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

axiosInstance.interceptors.request.use((config) => {
    config = addSignal(config)
    return config
})

axiosInstance.interceptors.response.use(
    (response: AxiosResponse<Result>) => {
        removeSignal(response.config)

        if (response.data.code !== 200) {
            return Promise.reject(response.data)
        }

        return response
    },
    (err: AxiosError) => {
        handleNetworkError(err)
        return Promise.reject(err)
    },
)

class Request {
    get<T = any>(
        url: string,
        params?: Record<string, any>,
        config?: AxiosRequestConfig,
    ): Promise<Response<T>> {
        const options = Object.assign(
            {},
            {
                url,
                params,
                method: MethodEnum.GET,
            },
            config,
        )
        return this.request(options)
    }

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Response<T>> {
        const options = Object.assign(
            {},
            {
                url,
                data,
                method: MethodEnum.POST,
            },
            config,
        )
        return this.request(options)
    }

    request<T = any>(config: AxiosRequestConfig): Promise<Response<T>> {
        return new Promise((resolve) => {
            axiosInstance
                .request(config)
                .then((res) => {
                    resolve([undefined, res.data as Result<T>])
                })
                .catch((e: Error | AxiosError) => {
                    resolve([e, undefined])
                })
        })
    }
}

export default new Request()

```
