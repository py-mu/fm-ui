window.VUE_APP_API_BASE_URL="http://localhost:8081"
window.DEFAULT_CONFIG =  {
    /**
     * 必须登录(如果是必须要登录则所有的页面都需要存在一个登录)
     */
    mustBeLogin: false,
    /**
     * 语言，可选 CN(简体)、HK(繁体)、US(英语)，也可扩展其它语言
     */
    lang: 'CN',
    /**
     * 主题
     */
    theme: {
        /**
         * //主题色
         */
        color: '#1890ff',
        /**
         * 主题模式 可选 dark、 light 和 night
         */
        mode: 'dark',
        /**
         * 成功色
         */
        success: '#52c41a',
        /**
         * 警告色
         */
        warning: '#faad14',
        /**
         * //错误色
         */
        error: '#f5222f',
    },
    /**
     * //导航布局，可选 side 和 head，分别为侧边导航和顶部导航
     */
    layout: 'side',
    /**
     * //固定头部状态栏，true:固定，false:不固定
     */
    fixedHeader: false,
    /**
     * //固定侧边栏，true:固定，false:不固定
     */
    fixedSideBar: true,
    /**
     * //固定页签头，true:固定，false:不固定
     */
    fixedTabs: false,
    /**
     * //内容区域宽度，fixed:固定宽度，fluid:流式宽度
     */
    pageWidth: 'fixed',
    /**
     * //色弱模式，true:开启，false:不开启
     */
    weekMode: false,
    /**
     * //多页签模式，true:开启，false:不开启
     */
    multiPage: false,
    /**
     * //是否缓存页面数据，仅多页签模式下生效，true 缓存, false 不缓存
     */
    cachePage: true,
    /**
     * 隐藏设置抽屉，true:隐藏，false:不隐藏
     */
    hideSetting: false,
    /**
     * 系统名称
     */
    systemName: 'FM UI',
    /**
     * 版权所有
     */
    copyright: 'Fierce Man api文档.simple FM.',
    /**
     * 系统描述
     */
    systemDescription: 'Fierce Man UI 一个解析swagger json生成的猛男专用API UI.',
    showPageTitle: true,                  //是否显示页面标题
    filterMenu: true,                    //根据权限过滤菜单
    animate: {                            //动画设置
        disabled: false,                    //禁用动画
        name: 'bounce',                     //动画效果，支持的动画效果可参考 ./animate.config.js
        direction: 'left'                   //动画方向，切换页面时动画的方向，参考 ./animate.config.js
    },
    /**
     * 页面底部链接，{link: '链接地址', name: '名称/显示文字', icon: '图标，支持 ant design vue 图标库'}
     */
    footerLinks: [
        // {link: 'https://pro.ant.design', name: 'Pro首页'},
    ],
    requestStatusMap: {
        400: "错误请求",
        401: "未授权",
        403: "无权访问",
        404: "网络不可达/请求超时",
        405: "方法不允许",
        406: "无法访问",
        407: "代理需要认证",
        408: "请求超时",
        502: "网关错误",
    }
}
