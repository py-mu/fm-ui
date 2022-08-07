import {removeAuthorization} from "@/utils/request";
import {requestStatusMap} from "@/config/default/setting.config"

/**
 * 发生403请求异常时，判断如果是认证到期或者是无效凭证则需要重新登录，清除本地登录状态，重定向至登录页
 * @type {{onRejected(*): (Promise<never>)}}
 */
const resCommon = {
    onRejected(error) {
        const response = error.response
        let data = response.data;
        let msg = "请求异常"
        if (!data){
            const status = response.status;
            // eslint-disable-next-line no-prototype-builtins
            if (requestStatusMap.hasOwnProperty(status)){
                msg = requestStatusMap[status]
            }
            data = {code: -1, msg: msg, data: null}
        }
        //如果是权限已经到期了， 则返回到登录页面
        if (data.code === 15 || data.code === 4) {
            localStorage.removeItem(process.env.VUE_APP_NAME)
            localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
            localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
            localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
            removeAuthorization()
            location.href = '/#/login'
        }
        return Promise.reject(data)
    },
    onFulfilled(res){
        return Promise.resolve(res.data)
    }
}

/**
 * 通用请求拦截
 * @type {{onFulfilled(*, *): *, onRejected(*, *): Promise<never>}}
 */
export const reqCommon = {
    /**
     * 发送请求之前做些什么
     * @param config axios config
     * @param options 应用配置 包含: {router, i18n, store, message}
     * @returns {*}
     */
    onFulfilled(config, options) {
        const {message} = options
        const {url, xsrfCookieName} = config
        config.headers[xsrfCookieName] = localStorage.getItem(xsrfCookieName)
        if (url.indexOf('login') === -1 && xsrfCookieName && !localStorage.getItem(xsrfCookieName)) {
            message.warning('认证 token 已过期，请重新登录')
            location.href = '/login'
        }
        return config
    },
    /**
     * 请求出错时做点什么
     * @param error 错误对象
     * @param options 应用配置 包含: {router, i18n, store, message}
     * @returns {Promise<never>}
     */
    onRejected(error, options) {
        const {message} = options
        message.error(error.message)
        return Promise.reject(error)
    }
}

export default {
    // request: [reqCommon],
    request: [],
    response: [resCommon]
}
