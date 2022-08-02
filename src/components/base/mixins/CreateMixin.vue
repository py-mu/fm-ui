<script>
import BaseView from "@/components/base/BaseView";

/**
 * post 表单常用混合类
 */
export default {
  name: "CreateMixin",
  extends: BaseView,
  data() {
    return {
      /**
       * 创建数据的表单内容
       */
      postForm: {},
      /**
       * 发送请求成功时提示
       */
      postSuccessMessage: "操作成功",
    };
  },
  methods: {
    /**
     * post数据成功
     * @param response{{msg: string, code: number, data: [{}] | {}, page: number, total: number, limit: number}} 响应体
     */
    postSuccess(response) {
      this.loading = false;
      this.tableLoading = false;
      this.requestSuccess(response);

    },
    /**
     * 发送数据失败时回调
     * @param response{{msg: string, code: number, data: [{}] | {}, page: number, total: number, limit: number}} 响应体
     */
    postFailed(response) {
      this.loading = false;
      this.tableLoading = false;
      this.requestError(response);
    },
    /**
     * 获取创建表单，在请求前的封装，
     * 针对一些请求前置处理
     */
    getCreatForm() {
      return this.postForm
    },
    /**
     * 发送POST请求
     */
    postData(url) {
      this.loading = true;
      this.postRequest(url, this.getCreatForm(), this.postSuccess, this.postFailed)
    },
  }
}
</script>

<style scoped>

</style>