<script>
import BaseView from "@/components/base/BaseView";

/**
 * 更新或者批量更新时使用
 */
export default {
  name: "UpdateMixin",
  extends: BaseView,
  data() {
    return {
      /**
       * 部分更新
       */
      patchForm: {}
    }
  },
  methods: {
    /**
     * 更新数据成功
     * @param response{AxiosResponse} 响应体
     */
    patchSuccess(response) {
      this.loading = false
      this.requestSuccess(response.data);
    },
    /**
     * 更新失败
     * @param response
     */
    patchFailed(response) {
      this.loading = false
      this.requestError(response)
    },
    /**
     * 请求前置处理
     */
    getPatchForm() {
      return this.patchForm;
    },
    /**
     * 更新数据
     * @param id{string} id
     */
    patchData(id) {
      // noinspection JSUnresolvedFunction
      // this.$refs[this.formRef].validate(valid => {
      //   debugger
      //   if (valid) {
      //
      //   }
      // });
      this.loading = true;
      this.patchRequest(this.getBaseUrl() + "/" + id, this.getPatchForm(), this.patchSuccess, this.patchFailed)
    },
  }
}
</script>

<style scoped>

</style>