<script>
import BaseView from "@/components/base/BaseView";

/**
 * 查询详情混合类(继承自[BaseView](BaseView.vue))
 *
 *
 */
export default {
  name: "DetailMixin",
  extends: BaseView,
  data() {
    return {
      /**
       * 模型详情，查询详情后返回一个详细的数据实体，一般在编辑某条数据
       * 或者是查看某条数据详情时使用
       */
      modeDetail: {},
    }
  },
  methods: {
    /**
     * 获取详情成功详情, 在获取一个数据详情后如果程序正常响应
     * 则会回调此方法，一般在这里对数据进行逻辑处理
     * @param response{AxiosResponse} 响应体
     */
    getDetailSuccess(response) {
      this.modeDetail = response.data.data;
    },
    /**
     * 根据id查询模型详情, 成功时会回调getDetailSuccess方法，
     * 如果需要对响应数据进行处理需要重构方法getDetailSuccess
     * @param id {string}
     */
    getDetail(id) {
      let api = this.getBaseUrl() + "/%s" % id;
      this.getRequest(api, null, this.getDetailSuccess);
    },
    /**
     * 角色组件、部门组件里的树控件中：
     *      1. 在创建页面中，如果都不选则 this.checkedKeys 是没有 filter 这个函数的。所以需要先判断是否为空
     *      2. 当全选时，会把父选项的key也勾上。所以需要把父选项的key去掉
     */
    deleteParentID() {
      if (!this.checkedKeys) return this.checkedKeys   // 如果为空则直接返回
      return this.checkedKeys.filter(function (item) {
        return item !== "0-0"
      })
    },
  }
}
</script>