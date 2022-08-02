//跨域代理前缀
const API_PROXY_PREFIX = '/api'
// 静态写法
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX

// 动态配置写法
const BASE_URL = process.env.NODE_ENV === 'production' ? window.VUE_APP_API_BASE_URL : API_PROXY_PREFIX

// const BASE_URL = process.env.VUE_APP_API_BASE_URL
// 本地Mock测试用
// const BASE_URL = process.env.VUE_APP_API_BASE_URL

module.exports = {
    LOGIN: `${BASE_URL}/api/v1/user/login`,
    ROUTES: `${BASE_URL}/api/v1/permission/user-menu`,
    // SRAPURL: `${BASE_URL}/api/v1`,
    SRAPURL: `${BASE_URL}/api/v1`,
    // GOODS: `${BASE_URL}/goods`,
    // GOODS_COLUMNS: `${BASE_URL}/columns`,
    // 本地Mock测试接口
    // LOGIN: `${BASE_URL}/login`,
    // ROUTES: `${BASE_URL}/routes`,
}