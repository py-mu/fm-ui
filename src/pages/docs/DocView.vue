<template>
  <a-row class="row-card">
    <a-col :span="24">
      <a-card title="文档描述" :bordered="false" class="card-content">
        <mark-render :plaintext="mdHtml"></mark-render>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import PageView from "@/layouts/PageView";
import {mapGetters} from "vuex";
import MarkRender from "@/components/markdown/MarkRender";

/**
 * 文档描述
 */
export default {
  name: "DocView",
  extends: PageView,
  components:{MarkRender},
  computed: {
    ...mapGetters('setting', ["swaggerInfo"]),
    /**
     * 渲染Markdown
     * @return {*|string}
     */
    mdHtml: function () {
      const info = this.swaggerInfo;
      if (info.info && info.info.description) {
        return info.info.description;
      }
      return "";
    },
  }
}
</script>

<style scoped lang="less">
.row-card {
  display: flex;
  margin-bottom: 20px;
}

.card-content {
  background: @base-bg-color;
  padding: 10px;
  border-radius: 2px;
  height: auto;
  min-height: 360px;
}
</style>