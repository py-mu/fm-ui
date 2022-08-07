<script>
import {isEmpty} from "@/utils/swagger";
import {getDefaultRow, isJson2str} from './table_utils'


/**
 * api通用表格, 用于显示请求头、Query参数、Form表单显示
 */
export default {
  name: "ApiTable",
  props: {
    /**
     * 请求数据表单
     */
    requestData: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      /**
       * 表格类型（用于设置表单内容，如请求头的表单就写headers, query， body， env等等）
       */
      tableType: '',
      /**
       * 默认添加行, 添加一行数据
       * @type ApiTableDefaultRow
       */
      defaultRow: getDefaultRow(),
      /**
       * 显示空行提示
       */
      showBlankAnimate: false,
      /**
       * 表格数据
       */
      tableData: [],
      /**
       * 表头显示
       */
      tableColumns: []
    }
  },
  watch: {
    /**
     * 监听数据表格发生的变化，同步给父组件
     */
    tableData: {
      handler(val) {
        if (isEmpty(this.tableType)) {
          return
        }
        /**
         * @type ApiTableEnvironment
         */
        let requestData = this.requestData
        requestData[this.tableType] = {}
        for (const index in val) {
          const row = val[index]
          if (!isEmpty(row.params_name) && row.params_used) {
            requestData[this.tableType][row.params_name] = row.params_value
          }
        }
        this.$emit('update:requestData', requestData)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /**
     * 在表格中新增一行，如果有一行的关键数据全为空则，需要进行提示，目前不允许添加空行
     * todo 不是最后一行，是全部行里面存在空行的
     */
    onClickAddRow: function () {
      const lastRow = this.tableData[this.tableData.length - 1];
      if (lastRow && isEmpty(lastRow.params_value) && isEmpty(lastRow.params_name)) {
        this.$message.warning(this.$t('there_are_blank_lines').toString());
        this.showBlankAnimate = true;
        setTimeout(() => {
          this.showBlankAnimate = false
        }, 3000)
        return
      }
      const {tableData} = this;
      this.tableData = [...tableData, JSON.parse(JSON.stringify(this.defaultRow))];
    },
    /**
     * 在表格删除一行
     * @param index
     */
    onClickDeleteRow(index) {
      let data = [];
      for (const idx in this.tableData) {
        if (idx === index.toString()) {
          continue
        }
        data.push(this.tableData[idx])
      }
      this.tableData = data;
    },
    /**
     * 获取翻译文本, 如果没找到会返回key
     * @param key
     * @return {VueI18n.TranslateResult || string}
     */
    getIn18(key) {
      return this.$t(key) || key
    },
    /**
     * 修改使用状态，点击使用或者取消使用时回调
     * @param index
     */
    onChangeRowUsed(index) {
      this.tableData[index].params_used = !this.tableData[index].params_used
    },
    /**
     * 监听单元格编辑事件
     */
    handlerCellChange(key, index, value) {
      this.tableData[index][key] = isJson2str(value)
    },
    /**
     * 设置自动获得焦点， 在点击了某一个单元格之后，设置为可输入状态，同时在300ms后自动获得焦点
     * @param rowIndex
     * @param paramKey
     */
    setInputFocus(rowIndex, paramKey) {
      this.tableData[rowIndex].params_edit[paramKey] = true;
      setTimeout(() => {
        if (this.$refs && this.$refs[paramKey]) {
          // noinspection JSUnresolvedFunction
          this.$refs[paramKey].focus()
        }
      }, 100);
    },
  }
}
</script>