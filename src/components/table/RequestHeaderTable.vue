<template>
  <div>
    <div class="add-btn">
      <a-tooltip>
        <template slot="title">
          {{ $t('header_add_help') }}
        </template>
        <a-button class="editable-add-btn"
                  @click="onClickAddRow"
                  style="margin-bottom: 8px">{{ $t('add_row') }}
        </a-button>
      </a-tooltip>
    </div>
    <a-table :columns="tableColumns" :data-source="tableData"
             rowKey="id" style="max-height: 400px; overflow-y: auto"
             size="middle" bordered class="beauty-scroll"
             :pagination="false">
      <!--   表头    -->
      <!--suppress JSVoidFunctionReturnValueUsed -->
      <span :key="'table_header' + index" :slot="column.key" v-for="(column, index) in tableColumns">
          {{ getIn18(column.key) }}
        </span>
      <!--  索引     -->
      <div slot="params_index" slot-scope="text, record, index">
        <span class="center-element">{{ index + 1 }}</span>
      </div>
      <!--  是否使用      -->
      <div slot="params_used" slot-scope="text,  record, index">
        <a-switch :checked="record.params_used"
                  @change="onChangeRowUsed(index)"
        >
          <a-icon slot="checkedChildren" type="check"/>
          <a-icon slot="unCheckedChildren" type="close"/>
        </a-switch>
      </div>
      <!--  键输入      -->

      <div slot="params_name" slot-scope="text,  record, index">
        <a-auto-complete
            ref="params_name"
            v-if="record.params_edit.params_name"
            :key="index" :value="text" allowClear
            style="margin: -5px 0; width: 100%"
            @select="(value) => handleNameSelect(value, index)"
            @change="value => handlerCellChange('params_name', index, value)"
            :data-source="headersKeys"
            :placeholder="$t('input_tip')"
            :filter-option="filterOption"
            @blur="record.params_edit.params_name = false"
        />
        <span v-else @click="setInputFocus(index,'params_name')"
              :class="text?['text-show']:['text-show', 'text-color-secondary',
                 showBlankAnimate && !(record.params_value || record.params_name)?'blank-row-tip':'']">
            {{ text || $t('input_tip') }}
          </span>
      </div>

      <!--  值输入      -->
      <div slot="params_value" slot-scope="text,  record, index">
        <a-textarea class="text-input beauty-scroll" ref="params_value"
                    v-if="record.params_edit.params_value"
                    :value="text" allowClear
                    :placeholder="$t('input_tip')"
                    autocomplete="off"
                    :auto-size="{ minRows: 1, maxRows: 5 }"
                    @blur="record.params_edit.params_value = false"
                    @change="e => handlerCellChange('params_value', index, e.target.value)"
        />
        <span v-else @click="setInputFocus(index,'params_value')"
              :class="text?['text-show']:['text-show', 'text-color-secondary',
                 showBlankAnimate && !(record.params_value || record.params_name)?'blank-row-tip':'']">
            {{ text || $t('input_tip') }}
          </span>

      </div>
      <!--  描述      -->
      <div slot="params_description" slot-scope="text, record">
        <a-tooltip>
          <template slot="title">
            <div v-if="record.params_tran">
              {{ $t(text) }}
            </div>
            <div v-else>
              {{ text }}
            </div>

          </template>
          <div v-if="record.params_tran" class="text-show">
            {{ $t(text) }}
          </div>
          <div v-else class="text-show text-color-secondary">
            {{ text }}
          </div>
        </a-tooltip>
      </div>
      <!--  操作列      -->
      <div slot="action" slot-scope="text,record, index">
        <a-popconfirm style="border: none"
                      :disabled="tableData.length <= 1"
                      :title="$t('ask_to_delete')"
                      @confirm="() => onClickDeleteRow(index)"
        >
          <a-button class="center-element" :disabled="tableData.length <= 1"
                    size="small" type="danger">{{ $t('delete') }}
          </a-button>
        </a-popconfirm>
      </div>
    </a-table>
  </div>
</template>

<script>
import ApiTable from './ApiTable'
import tColumns from './columns/request_header'
import {REQUEST_HTTP_HEADERS} from '@/config/constant'

const {getDefaultRow} = require("@/components/table/table_utils");

const {isEmpty} = require("@/utils/swagger");

let autoCompleteMap = {}

for (const fieldKey in REQUEST_HTTP_HEADERS.fields) {
  const field = REQUEST_HTTP_HEADERS.fields[fieldKey];
  autoCompleteMap[field.name] = field
}

/**
 * 请求头表格
 */
export default {
  name: "RequestHeaderTable",
  extends: ApiTable,
  data() {
    return {
      tableType: 'headers',
      tableData: [getDefaultRow()],
      tableColumns: tColumns
    }
  },
  computed: {
    headersKeys: function () {
      return Object.keys(autoCompleteMap)
    },
  },
  methods: {
    /**
     * 自动输入框，值变化时进行数据筛选
     * @param input
     * @param option
     * @return {boolean}
     */
    filterOption(input, option) {
      return (
          option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
      );
    },
    /**
     * 当自动完成输入框的内容被选择时， 同时修改为默认值
     * @param value
     * @param index
     */
    handleNameSelect(value, index) {
      this.tableData[index].params_tran = true
      /**
       * @type HttpFiledType
       */
      const field = autoCompleteMap[value]
      this.tableData[index].params_description = field.translate_id
      this.tableData[index].params_value_help = field.values
      const params_value = this.tableData[index].params_value
      if (params_value === undefined || params_value === null || params_value === '') {
        this.tableData[index].params_value = field.default
      }
    },
    /**
     * 监听单元格编辑事件
     */
    handlerCellChange(key, index, value) {
      if (key === 'params_name' && this.tableData[index].params_tran && isEmpty(autoCompleteMap[value])) {
        this.tableData[index].params_tran = false;
        this.tableData[index].params_description = '...';
      }
      this.tableData[index][key] = value
    }
  }
}
</script>

<style scoped lang="less">
@import "table";
</style>