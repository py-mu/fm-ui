export default {
    namespaced: true,
    state: {
        user: undefined,
        permissions: null,
        roles: null,
        routesConfig: null,
        /**
         * 可选认证类型
         */
        authenticateTypes: [
            {
                name: '无需认证',
                key: 'none',
            },
            {
                name: 'Basic Auth认证',
                key: 'basic_auth',
            },
            {
                name: 'Bearer Auth认证',
                key: 'bearer_auth',
            },
            {
                name: '键值对',
                key: 'key_auth',
            },
            {
                name: 'session & cookie',
                key: 'cookie_auth',
            },
        ],
        userEnvironment: {
            guest: {
                description: "游客环境",
                authenticate: {
                    /**
                     * 认证方式: 无需认证
                     */
                    type: 'none',
                    token: null,
                    cookie: {},
                    session: {}
                },
                host: "http://localhost:8000/",
                user: {
                    id: null,
                    name: 'guest'
                },
                /**
                 * 全局query，发起请求时会自动携带
                 */
                query: {},
                /**
                 * 全局header ，默认会使用这个，且不做同步
                 */
                header: {},
                /**
                 * 全局body，发起请求时会自动携带
                 */
                body: {},
                /**
                 * 全局参数（环境内有效）
                 */
                variables: [
                    {
                        key: "api_name",
                        id: "2-2-2-2-2-2-3",
                        default: null,
                        type: 'string',
                        description: "萌男专用"
                    }
                ]
            }
        }
    },
    getters: {
        user: state => {
            if (!state.user) {
                try {
                    const user = localStorage.getItem(process.env.VUE_APP_USER_KEY)
                    state.user = JSON.parse(user)
                } catch (e) {
                    console.error(e)
                }
            }
            return state.user
        },
        permissions: state => {
            if (!state.permissions) {
                try {
                    const permissions = localStorage.getItem(process.env.VUE_APP_PERMISSIONS_KEY)
                    state.permissions = JSON.parse(permissions)
                    state.permissions = state.permissions ? state.permissions : []
                } catch (e) {
                    console.error(e.message)
                }
            }
            return state.permissions
        },
        roles: state => {
            if (!state.roles) {
                try {
                    const roles = localStorage.getItem(process.env.VUE_APP_ROLES_KEY)
                    state.roles = JSON.parse(roles)
                    state.roles = state.roles ? state.roles : []
                } catch (e) {
                    console.error(e.message)
                }
            }
            return state.roles
        },
        routesConfig: state => {
            if (!state.routesConfig) {
                try {
                    const routesConfig = localStorage.getItem(process.env.VUE_APP_ROUTES_KEY)
                    state.routesConfig = JSON.parse(routesConfig)
                    state.routesConfig = state.routesConfig ? state.routesConfig : []
                } catch (e) {
                    console.error(e.message)
                }
            }
            return state.routesConfig
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(user))
        },
        setPermissions(state, permissions) {
            state.permissions = permissions
            localStorage.setItem(process.env.VUE_APP_PERMISSIONS_KEY, JSON.stringify(permissions))
        },
        setRoles(state, roles) {
            state.roles = roles
            localStorage.setItem(process.env.VUE_APP_ROLES_KEY, JSON.stringify(roles))
        },
        setRoutesConfig(state, routesConfig) {
            state.routesConfig = routesConfig
            localStorage.setItem(process.env.VUE_APP_ROUTES_KEY, JSON.stringify(routesConfig))
        }
    }
}
