<template>
  <page-layout :desc="desc" :linkList="linkList">

    <page-toggle-transition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
      <template>
        <div>
          <a-row class="row-card" :gutter="16">
            <a-col :span="5" class="col-card-left">
              <div class="beauty-scroll">
                <!--                <router-link :to="{path:'/api-list/api-detail'}">凯尼</router-link>-->
                <api-menus :paths="apiPaths" @menuSelect="onSelect"></api-menus>
              </div>
            </a-col>
            <a-col :span="19" class="col-card-left">
              <div class="col-card-right card-content">
                <a-keep-alive>
                  <api-detail-view :aid="aid" :key="aid"></api-detail-view>
                </a-keep-alive>
              </div>
            </a-col>
          </a-row>
        </div>
      </template>
    </page-toggle-transition>
  </page-layout>
</template>

<script>
import PageView from "@/layouts/PageView";
import {mapGetters} from "vuex";
import {parseRouter} from "@/utils/swagger";
import ApiMenus from "@/components/menu/ApiMenus";
import AKeepAlive from "@/components/cache/AKeepAlive";
import ApiDetailView from "@/pages/api/ApiDetailView";

/**
 * api 接口列表
 */
export default {
  name: "ApiListView",
  extends: PageView,
  components: {ApiMenus, AKeepAlive, ApiDetailView},
  computed: {
    ...mapGetters('setting', ["swaggerInfo"]),
    apiPaths: function () {
      return parseRouter(this.swaggerInfo)
    }
  },
  data(){
    return {
      aid: '1'
    }
  },
  created() {
  },
  methods: {
    /**
     * 选择菜单时
     */
    onSelect(obj) {
      console.log(obj)
      this.aid = obj.key
    }
  }
}
</script>

<style scoped lang="less">
.row-card {
  display: flex;
  margin-bottom: 20px;
}

.col-card-left {
  //display: inline-grid;
}

.col-card-right {
  //display: inline-grid;
}

.card-content {
  background: @base-bg-color;
  padding: 10px;
  border-radius: 2px;
  height: auto;
  min-height: 360px;
}
</style>