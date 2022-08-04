import config from '@/config'
import {ADMIN} from '@/config/default'
import {formatFullPath} from '@/utils/i18n'
import {filterMenu} from '@/utils/authority-utils'
import {getLocalSetting} from '@/utils/themeUtil'

const localSetting = getLocalSetting(true)
const customTitlesStr = sessionStorage.getItem(process.env.VUE_APP_TBAS_TITLES_KEY)
const customTitles = (customTitlesStr && JSON.parse(customTitlesStr)) || []

/**
 * 配置类
 * @type{{}|config|localSetting|customTitlesStr}
 */
export default {
    namespaced: true,
    state: {
        /**
         * 最后打开的api
         */
        lastSelectApiUri: null,
        isMobile: false,
        animates: ADMIN.animates,
        palettes: ADMIN.palettes,
        pageMinHeight: 0,
        menuData: [],
        activatedFirst: undefined,
        customTitles,
        ...config,
        ...localSetting,
        /**
         * swagger 数据
         * @type{SwaggerInfoType}
         */
        _swaggerInfo: {}
    },
    getters: {
        lastSelectApiUri: state =>{
            if (!state.lastSelectApiUri) {
                return localStorage.getItem('select-api-uri')
            }
            return state.lastSelectApiUri
        },
        /**
         * 查询配置swagger数据
         * @param state
         * @return {SwaggerInfoType}
         */
        swaggerInfo: state => {
            if (!state._swaggerInfo.swagger) {
                try {
                    const swaggerInfo = localStorage.getItem(config.SWAGGER_INFO_KEY)
                    state._swaggerInfo = JSON.parse(swaggerInfo)
                } catch (e) {
                    console.error(e)
                }
            }
            return state._swaggerInfo
        },
        menuData(state, getters, rootState) {
            if (state.filterMenu) {
                const {permissions, roles} = rootState.account
                return filterMenu(state.menuData, permissions, roles)
            }
            return state.menuData
        }
        ,
        firstMenu(state) {
            const {menuData} = state
            if (menuData.length > 0 && !menuData[0].fullPath) {
                formatFullPath(menuData)
            }
            return menuData.map(item => {
                const menuItem = {...item}
                delete menuItem.children
                return menuItem
            })
        }
        ,
        subMenu(state) {
            const {menuData, activatedFirst} = state
            if (menuData.length > 0 && !menuData[0].fullPath) {
                formatFullPath(menuData)
            }
            const current = menuData.find(menu => menu.fullPath === activatedFirst)
            return current && current.children || []
        }
    }
    ,
    mutations: {
        setDevice(state, isMobile) {
            state.isMobile = isMobile
        }
        ,
        setTheme(state, theme) {
            state.theme = theme
        }
        ,
        setLayout(state, layout) {
            state.layout = layout
        }
        ,
        setMultiPage(state, multiPage) {
            state.multiPage = multiPage
        }
        ,
        setAnimate(state, animate) {
            state.animate = animate
        }
        ,
        setWeekMode(state, weekMode) {
            state.weekMode = weekMode
        }
        ,
        setFixedHeader(state, fixedHeader) {
            state.fixedHeader = fixedHeader
        }
        ,
        setFixedSideBar(state, fixedSideBar) {
            state.fixedSideBar = fixedSideBar
        }
        ,
        setLang(state, lang) {
            state.lang = lang
        }
        ,
        setHideSetting(state, hideSetting) {
            state.hideSetting = hideSetting
        }
        ,
        correctPageMinHeight(state, minHeight) {
            state.pageMinHeight += minHeight
        }
        ,
        setMenuData(state, menuData) {
            state.menuData = menuData
        }
        ,
        setAsyncRoutes(state, asyncRoutes) {
            state.asyncRoutes = asyncRoutes
        }
        ,
        setPageWidth(state, pageWidth) {
            state.pageWidth = pageWidth
        }
        ,
        setActivatedFirst(state, activatedFirst) {
            state.activatedFirst = activatedFirst
        }
        ,
        setFixedTabs(state, fixedTabs) {
            state.fixedTabs = fixedTabs
        }
        ,
        setLastSelectApiUri(state, key){
            if (key) {
                sessionStorage.setItem('select-api-uri', key)
            }
        }
        ,
        setCustomTitle(state, {path, title}) {
            if (title) {
                const obj = state.customTitles.find(item => item.path === path)
                if (obj) {
                    obj.title = title
                } else {
                    state.customTitles.push({path, title})
                }
                sessionStorage.setItem(process.env.VUE_APP_TBAS_TITLES_KEY, JSON.stringify(state.customTitles))
            }
        },
        /**
         * 设置swagger数据
         * @param state
         * @param swaggerInfo{Object}
         */
        setSwaggerInfo(state, swaggerInfo) {
            state._swaggerInfo = swaggerInfo
            localStorage.setItem(config.SWAGGER_INFO_KEY, JSON.stringify(swaggerInfo))
        },
    }
}
