import TabsView from '@/layouts/tabs/TabsView'
import PageView from '@/layouts/PageView'
import HomeView from "@/pages/home/HomeView";
import DocView from "@/pages/docs/DocView";
import ApiListView from "@/pages/api/ApiListView";
import ApiDetailView from "@/pages/api/ApiDetailView";

// 路由配置
const options = {
    routes: [
        {
            path: '/login',
            name: '登录页',
            component: () => import('@/pages/login')
        },
        {
            path: '/check-is-must-be-login',
            name: '登录检查',
            component: () => import('@/pages/check/CheckRedirectView')
        },
        {
            path: '/403',
            name: '403',
            component: () => import('@/pages/exception/403'),
        },
        {
            path: '/',
            name: '首页',
            component: TabsView,
            // 如果直接切换过来，先进入判断页面
            redirect: '/check-is-must-be-login',
            children: [
                {
                    path: 'index',
                    name: '首页',
                    meta: {
                        icon: 'home',
                        page: {
                            closable: false
                        }
                    },
                    component: HomeView,
                },
                {
                    path: 'docs',
                    name: '文档',
                    meta: {
                        icon: 'read',
                    },
                    component: DocView,
                },
                {
                    path: 'test',
                    name: '测试',
                    meta: {
                        icon: 'rocket'
                    },
                    component: PageView,
                },
                {
                    path: 'api-list',
                    name: '接口列表',
                    meta: {
                        icon: 'project'
                    },
                    redirect: '/api-list/api-detail',
                    component: ApiListView,
                    children: [
                        {
                            meta: {
                                invisible: true
                            },
                            path: 'api-detail',
                            key: 'api-detail',
                            name: 'api详情',
                            component: ApiDetailView,
                        },
                    ]
                },
            ]
        },
        {
            path: '*',
            name: '404',
            component: () => import('@/pages/exception/404'),
        },

    ]
}

export default options
