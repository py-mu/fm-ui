import Router from 'vue-router'
import {formatRoutes} from '@/utils/routerUtil'
import options from './config'
import Vue from "vue";


const loginIgnore = {
    names: ['404', '403'],
    paths: ['/login'],

    /**
     * 判断路由是否包含在该配置中
     * @param route vue-router 的 route 对象
     * @returns {boolean}
     */
    includes(route) {
        return this.names.includes(route.name) || this.paths.includes(route.path)
    }
}

/**
 * 初始化路由实例
 * @returns {Router}
 */
function initRouter() {
  // const options = isAsync ? require('./async/config.async').default : require('./config').default
  formatRoutes(options.routes)
  return new Router(options)
}
Vue.use(Router)
let router = initRouter()

export {loginIgnore, initRouter, router}
