<template>
  <page-layout :desc="desc" :linkList="linkList">
    <page-toggle-transition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
      <router-view ref="page"/>

    </page-toggle-transition>
    <template>
      <a-row class="row-card" :gutter="16">
        <a-col :span="12" class="col-card-left">
          <a-card title="基本信息" :bordered="false" class="card-content">
            <!--     基本信息       -->
            <a-descriptions title="Swagger 信息" size="middle">
              <a-descriptions-item label="名称">Fierce Man UI</a-descriptions-item>
              <a-descriptions-item label="Python">
                <img src="https://img.shields.io/badge/Python-3.7+-blue.svg"/>
              </a-descriptions-item>
              <a-descriptions-item label="版本">swagger {{ swagger.swagger }}</a-descriptions-item>
            </a-descriptions>
            <!--      项目信息      -->
            <a-descriptions title="API 信息" size="middle">
              <a-descriptions-item label="名称">{{ swagger.info.title }}</a-descriptions-item>
              <a-descriptions-item label="作者">
                <a :href="'mailto:' + swagger.info.contact.email">{{ swagger.info.contact.name }}</a>
              </a-descriptions-item>
              <a-descriptions-item label="版本">{{ swagger.info.version }}</a-descriptions-item>
              <a-descriptions-item label="Base" :span="2">
                <a target="_blank"
                   :href="'http://' + swagger.host + swagger.basePath">http://{{ swagger.host + swagger.basePath }}</a>
              </a-descriptions-item>
            </a-descriptions>
            <h1><b>
              REST规范检查
            </b></h1>
            <a-space direction="vertical" class="show-msg beauty-scroll">
              <a-alert
                  message="听说你的API很RESTful喔😁。——来自前端的点赞👍"
                  closable
              />
              <a-alert
                  message="执行错误"
                  description="无法解析API User Object."
                  type="error"
                  show-icon
                  closable
              />
              <a-alert
                  message="API版本规范"
                  type="warning"
                  closable
                  show-icon
              >
                <template #description>
                  <p><span style="color: red">v22.2.a.2</span>
                    不符合语义化版本规范，详情参阅: <a target="_blank" href=" https://semver.org/lang/zh-CN/">
                      https://semver.org/lang/zh-CN/</a>
                  </p>
                </template>
              </a-alert>
              <a-alert
                  message="REST 规范"
                  description="http://localhost:8080/admin/getUser （查询用户）命中动词：get，应该使用method作为动作表示，URI作为资源类型。"
                  type="warning"
                  closable
                  show-icon
              />
              <a-alert
                  message="REST 规范"
                  description="http://localhost:8080/admin/user_permission （查询用户权限）命中规则：下划线，URI资源应统一使用使用小写，单词尽可能简洁，如出现多个单词应使用横杠(-)作为连接符，而非下划线。"
                  type="warning"
                  closable
                  show-icon
              />
              <a-alert
                  message="REST 规范"
                  description="http://localhost:8080/admin/getUser （查询用户）命中动词：get，应该使用method作为动作表示，URL作为资源类型。"
                  type="warning"
                  closable
                  show-icon
              />
            </a-space>
          </a-card>
        </a-col>
        <a-col :span="12" class="col-card-right">
          <a-card title="API视图" :bordered="false" class="card-content">
            <div style="min-height: 400px;">
              <radar-view/>
            </div>
            <a-button @click="test">
              分析
            </a-button>
          </a-card>

        </a-col>
      </a-row>
    </template>
  </page-layout>
</template>

<script>
import PageToggleTransition from "@/components/transition/PageToggleTransition";
import PageLayout from "@/layouts/PageLayout";
import PageView from "@/layouts/PageView";
import RadarView from "@/components/chart/Radar";
import {getSwaggerData} from "@/utils/swagger";
import {mapMutations} from "vuex";


/**
 * 主页
 */
export default {
  name: 'HomeView',
  extends: PageView,
  components: {PageToggleTransition, PageLayout, RadarView},
  data() {
    return {
      page: {},
      /**
       * the swagger info what you get.
       * @type{SwaggerInfoType|{}}
       */
      swagger: {
        info: {
          title: '',
          version: '',
          contact: {}
        }
      }
    }
  },
  created() {
    this.initSwaggerData();
  },
  methods: {
    ...mapMutations('setting', ['setSwaggerInfo']),
    /**
     * 初始化swagger数据, 获取swagger数据，缓存到本地存储中作为所有页面作为共享
     */
    initSwaggerData() {
      getSwaggerData('http://127.0.0.1:8001/api/v1/swagger?format=openapi').then(res => {
        this.setSwaggerInfo(res);
        if (res) {
          this.swagger = res;
        }

      })
    },
    test() {
      // const menus = parseRouter(this.swagger)
      // addRouterWhenParseSuccess(menus)
    }
  },

}
</script>

<style lang="less" scoped>
.row-card {
  display: flex;
  margin-bottom: 20px;
}

.show-msg {
  background: @base-bg-color;
  overflow: auto;
  width: 100%;
  padding-right: 5px;
  max-height: 400px;
}

.col-card-left {
  display: inline-grid;
}

.col-card-right {
  display: inline-grid;
}

.card-content {
  background: @base-bg-color;
  padding: 10px;
  border-radius: 2px;
  height: auto;
  min-height: 360px;
}

.extraImg {
  margin-top: -60px;
  text-align: center;
  width: 195px;

  img {
    width: 100%;
  }
}
</style>
