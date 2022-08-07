import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import './theme/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import store from './store'
import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import {initI18n} from '@/utils/i18n'
import bootstrap from '@/bootstrap'
import 'moment/locale/zh-cn'
import Router from 'vue-router'
import {marked} from 'marked'

const markedRender = new marked.Renderer();
marked.setOptions({
    renderer: markedRender,
    gfm: true,
    tables: true,
    breaks: true,
    headerIds: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});


const markedMixin = {
    methods: {
        /**
         * 进行Markdown解析
         * @param input{string}
         * @returns {*|string}
         */
        renderMarkdown: function (input) {
            return marked(input);
        },
    },
};

Vue.use(Router)
Vue.mixin(markedMixin)

const i18n = initI18n('CN', 'US')

Vue.use(Antd)
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Plugins)

bootstrap({router, store, i18n, message: Vue.prototype.$message})

new Vue({
    router, store, i18n, render: h => h(App),
}).$mount('#app')
