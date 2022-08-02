<script>
import BaseView from "@/components/base/BaseView";

/**
 * 删除及批量删除混合类
 */
export default {
  name: "DeleteMixin",
  extends: BaseView,
  data() {
    return {
      /**
       * 删除动作进行二次确认时，需要显示的问询文本
       */
      deleteAskHelpText: "确定删除吗?"
    }
  },
  methods: {
    /**
     * 删除成功
     */
    deleteSuccess() {
      this.$message.success("删除成功");
      try {
        this.refresh()
      } catch (e) {
        console.log(e)
      }


    },
    /**
     * 删除失败时回调
     * @param event
     */
    deleteFailed(event) {
      this.requestError(event);
    },
    /**
     * 彻底删除, 可以是单个或者多个id
     * @param idList{Array|string}
     */
    deleteByidRequest(idList) {
      let params = null
      let api = this.getBaseUrl();
      if (!Array.isArray(idList)) {
        api = this.getBaseUrl() + "/" + idList;
      } else {
        api = this.getBaseUrl() + "/delete-by";
        params = {"sentence_list": [{"id__in": idList}]}
      }
      this.deleteRequest(api, params, this.deleteSuccess, this.deleteFailed)
    },
    /**
     * 询问是否删除？
     * @param idList{string| Array} 数据实体
     */
    askDeleteOrNot(idList) {
      const _this = this;
      _this.$confirm({
        title: _this.deleteAskHelpText,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          _this.deleteByidRequest(idList);
        },
      });
    }
  }
}
</script>