<template>
  <page-layout :desc="desc" :linkList="linkList">

    <page-toggle-transition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
      <template>
        <div>
          <a-row class="row-card" :gutter="16">
            <a-col :span="5" class="col-card-left">
              <div class="beauty-scroll">
                <api-menus :paths="apiPaths" @menuSelect="onSelect" :defaultSelectedKeys="[aid]"></api-menus>
              </div>
            </a-col>
            <a-col :span="19" class="col-card-left">
              <div class="col-card-right card-content">
                <a-keep-alive>
                  <api-detail-view :aid="aid" :key="aid" :swagger-dataset="swaggerDataset"></api-detail-view>
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
import {mapGetters, mapMutations} from "vuex";
import {isEmpty, parseRouter, parseSwaggerMap} from "@/utils/swagger";
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
    ...mapGetters('setting', ["swaggerInfo", "lastSelectApiUri"]),
  },
  data() {
    return {
      aid: null,
      apiPaths: [],
      swaggerDataset: {},
    }
  },
  created() {
    this.apiPaths = parseRouter(this.swaggerInfo);
    this.swaggerDataset = parseSwaggerMap(this.swaggerInfo)
    // 如果没有传入任何值，则取第一个
    if (isEmpty(this.aid) && Object.entries(this.swaggerDataset.uris)) {
      this.aid = Object.entries(this.swaggerDataset.uris)[0][0]
    }
  },
  methods: {
    ...mapMutations('setting', ['setLastSelectApiUri']),
    /**
     * 选择菜单时
     */
    onSelect(obj) {
      this.aid = obj.key
      this.setLastSelectApiUri(obj.key)
    },
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