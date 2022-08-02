<script>
import BaseView from "@/components/base/BaseView";

/**
 * 获取列表混合类
 *
 * - tableLoading  # 查询时的加载中拥塞
 * - tablePagination  # 查询列表的分页
 * - tableColumns  # 表格的解析字段
 * - tableData  # 用以放置表格的数据容器
 * - tableSelectRows  # 表格选择行
 * - orderBy  # 排序字段
 * - sentenceList  # 筛选语句
 * - queryForm  # 查询表单
 * - 更多属性详情请查阅源码
 *
 * - paginationChange(number, number)  # 也说或者分页数发生改变时回调
 * - buildSearchForm()  # 对查询字段进行表单构建
 * - getListSuccess(AxiosResponse)  # 查询成功时回调
 * - getList()  # 查询入口
 * - 其他方法详情请查询源码
 *
 */
export default {
  name: "ListMixin",
  extends: BaseView,
  data() {
    return {
      /**
       * 表格分页(用于table组件的分页)
       */
      tablePagination: {
        /**
         * 每页条数
         */
        pageSize: 10,
        /**
         * 第几页
         */
        current: 1,
        /**
         * 数据总数
         */
        total: 0,
        showTotal: total => `共 ${total} 条`,
        showSizeChanger: true,
        showQuickJumper: true,
        /**
         * 当前页发生改变时调用方法
         */
        onChange: this.paginationChange,
        /**
         * 分页大小发生改变时调用方法
         */
        onShowSizeChange: this.paginationChange,
      },
      /**
       * 是否弹出加载层(一般给表格加载时使用，如果没有表格给其他组件使用也是可以的，
       * 但是需要多个时就需要重新创建一个不重名的loading，不然会覆盖弗雷德而非方法)
       */
      tableLoading: false,
      /**
       * 查询组件使用的数据表单，要求按照格式填写
       */
      searchComponents: [
        {
          label: '创建时间',
          key: 'create_time',
          value: '',
          format: 'YYYY-MM-DD',
          type: 'datePicker',
          placeholder: '创建时间',
          /**
           * 使用的查询关键字（具体语法查看查询语法表单），目前不支持多参联查， 比如 a < b
           *
           * 默认为空（即等于）
           */
          sentence_key: "__date",
        },
      ],
      /**
       * 表格解析
       */
      tableColumns: [],
      /**
       * 表格数据
       */
      tableData: [],
      /**
       * 表格选择行
       */
      tableSelectRows: [],
      /**
       * 滚动条
       */
      tableScroll: {},
      /**
       * 查询排序字段（排序字段，在）
       */
      orderBy: [],
      /**
       * 查询筛选语句(发起请求时需要合成特定的筛选语法的一个list语句列表，具体需要语法需要查阅文档)
       */
      sentence: {},
      /**
       * 查询表单
       */
      queryForm: {
        _filter_: {
          sentence_list: []
        },
        _order_by_: [],
        page: 1,
        limit: 10
      },
    }
  },
  methods: {
    /**
     * 当页数或者页条数发生改变时
     * @param current{number} 当前页
     * @param pageSize{number} 分页大小
     */
    paginationChange(current, pageSize) {
      this.queryForm.page = current;
      this.queryForm.limit = pageSize;
      this.getList(current, pageSize)
    },
    /**
     * 构建查询表单，具体语法查阅开发手册
     * 每次查询列表时会从this.queryForm获取一个请求的表单
     * 而在此之前，会执行buildSearchForm构建表单，
     *
     * 如果不适用searchComponents的情况，需要对方法进行重写
     */
    buildSearchForm() {
      let sentence = {};
      this.queryForm._order_by_ = this.orderBy.join(",");
      this.searchComponents.forEach(items => {
        if (items.value !== null && items.value !== undefined && items.value.toString().length > 0) {
          let sentence_key = items.sentence_key;
          if (sentence_key === undefined) {
            sentence_key = "";
          }
          sentence[items.key + sentence_key] = items.value;
        }
      })
      Object.assign(this.sentence, sentence)
      this.queryForm._filter_.sentence_list = [this.sentence];
    },
    /**
     * 点击查询时，应该从表单中或者
     * @param data
     */
    doSearch(data) {
      this.searchComponents = data;
      this.getList();
    },
    /**
     * 重置搜索框
     */
    doReset() {
      this.searchComponents.forEach(items => {
        items.value = ''
      })
    },
    /**
     * 查询列表时正常
     * @param response{AxiosResponse} 响应体
     */
    getListSuccess(response) {
      this.tableData = response.data.data;
      this.tablePagination.current = response.data.page
      this.tablePagination.total = response.data.total
      this.tableSelectRows = [];
      this.$message.success("操作成功");
      this.tableLoading = false;
    },
    /**
     * 获取列表失败时回调
     * @param  response 响应体
     */
    getListFailed(response) {
      this.requestError(response)
      this.tableLoading = false;
    },
    /**
     * 分页查询, 一般查询列表
     */
    getList() {
      this.tableLoading = true;
      this.buildSearchForm();
      this.getRequest(this.getBaseUrl(), this.queryForm, this.getListSuccess, this.getListFailed);
    },
  }
}
</script>
