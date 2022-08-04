<template>
  <div>
    <a-space direction="vertical" style="width: 100%">
      <a-tooltip>
        <template slot="title">
          {{ $t('header_add_help') }}
        </template>
        <a-button class="editable-add-btn" size="small"
                  @click="handleAdd"
                  style="margin-bottom: 8px">{{ $t('add_row') }}
        </a-button>
      </a-tooltip>
      <a-table :columns="columns" :data-source="headers"
               rowKey="id" style="max-height: 400px; overflow-y: auto"
               size="middle" bordered class="beauty-scroll"
               :pagination="false">
        <!--   表头    -->
        <span :key="'table_header' + index" :slot="column.key" v-for="(column, index) in columns">
          {{ getIn18(column.key) }}
        </span>
        <!--  索引     -->
        <div slot="index" slot-scope="text, record, index">
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
              :key="index"
              style="margin: -5px 0"
              :value="text"
              allowClear
              @select="(value, option) => handleNameSelect(value, index)"
              @change="value => handlerCellChange('params_name', index, value)"
              :data-source="headersKeys"
              :placeholder="$t('input_tip')"
              :filter-option="filterOption"
          />
        </div>
        <!--  值输入      -->
        <div slot="params_value" slot-scope="text,  record, index">
          <a-input
              style="margin: -5px 0"
              :value="text"
              :placeholder="$t('input_tip')"
              @change="e => handlerCellChange('params_value', index, e.target.value)"
          />
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
            <div v-if="record.params_tran" class="text-show" style="word-wrap: normal">
              {{ $t(text) }}
            </div>
            <div v-else class="text-show" style="word-wrap: normal">
              {{ text }}
            </div>
          </a-tooltip>
        </div>
        <!--  操作列      -->
        <div slot="action" slot-scope="text,record, index">
          <a-popconfirm
              :disabled="headers.length <= 1"
              :title="$t('ask_to_delete')"
              @confirm="() => onDelete(index)"
          >
            <a-button class="center-element" :disabled="headers.length <= 1"
                      size="small" type="danger">{{ $t('delete') }}
            </a-button>
          </a-popconfirm>
        </div>
      </a-table>
    </a-space>

  </div>
</template>

<script>

import {REQUEST_HTTP_HEADERS} from '@/config/constant'
import {isEmpty} from "@/utils/swagger";

const default_header_row = {
  params_name: '',
  params_value: '',
  params_require: false,
  params_used: false,
  params_tran: false,
  params_value_help: [],
  params_description: 'new add.',
}

let autoCompleteMap = {}

for (const fieldKey in REQUEST_HTTP_HEADERS.fields) {
  const field = REQUEST_HTTP_HEADERS.fields[fieldKey];
  autoCompleteMap[field.name] = field
}

/**
 * 请求表头
 */
export default {
  props: ['data'],
  name: "RequestHeader",
  computed: {
    headersKeys: function () {
      return Object.keys(autoCompleteMap)
    },
  },
  data() {
    return {
      headerKey: '',
      headers: [JSON.parse(JSON.stringify(default_header_row))],
      columns: [
        {
          slots: {title: 'index'},
          key: 'index',
          width: 70,
          dataIndex: 'index',
          scopedSlots: {customRender: 'index'},
        },
        {

          slots: {title: 'params_used'},
          key: 'params_used',
          width: 70,
          dataIndex: 'params_used',
          scopedSlots: {customRender: 'params_used'},
        },
        {
          dataIndex: 'params_name',
          key: 'params_name',
          slots: {title: 'params_name'},
          scopedSlots: {customRender: 'params_name'},
        },
        {
          slots: {title: 'params_value'},
          dataIndex: 'params_value',
          key: 'params_value',
          scopedSlots: {customRender: 'params_value'},
        },
        {
          slots: {title: 'params_description'},
          key: 'params_description',
          dataIndex: 'params_description',
          scopedSlots: {customRender: 'params_description'},
        },
        {
          slots: {title: 'action'},
          key: 'action',
          fixed: 'right',
          width: 100,
          dataIndex: 'action',
          scopedSlots: {customRender: 'action'},
        },
      ],
    }
  },
  methods: {
    /**
     * 获取翻译文本, 如果没找到会返回key
     * @param key
     * @return {VueI18n.TranslateResult}
     */
    getIn18(key) {
      return this.$t(key) || key
    },
    /**
     * 自动输入框
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
     * 添加一行, 如果最后一行为空，则不进行添加
     */
    handleAdd() {
      const lastRow = this.headers[this.headers.length -1];
      if (isEmpty(lastRow.params_value) && isEmpty(lastRow.params_name)){
        this.$message.warning(this.$t('there_are_blank_lines').toString());
        return
      }
      const {headers} = this;
      this.headers = [...headers, JSON.parse(JSON.stringify(default_header_row))];
    },
    /**
     * 当自动完成输入框的内容被选择时， 同时修改为默认值
     * @param value
     * @param index
     */
    handleNameSelect(value, index) {
      this.headers[index].params_tran = true
      /**
       * @type HttpFiledType
       */
      const field = autoCompleteMap[value]
      this.headers[index].params_description = field.translate_id
      this.headers[index].params_value_help = field.values
      const params_value = this.headers[index].params_value
      if (params_value === undefined || params_value === null || params_value === '') {
        this.headers[index].params_value = field.default
      }
    },
    /**
     * 删除行
     * @param index
     */
    onDelete(index) {
      let headers = [];
      for (const self_header_index in this.headers) {
        if (self_header_index === index.toString()) {
          continue
        }
        headers.push(this.headers[self_header_index])
      }
      this.headers = headers;
    },
    /**
     * 修改使用状态
     * @param index
     */
    onChangeRowUsed(index) {
      this.headers[index].params_used = !this.headers[index].params_used
    },
    /**
     * 监听单元格编辑事件
     */
    handlerCellChange(key, index, value) {
      this.headers[index][key] = value
    }
  }
}
</script>

<style scoped lang="less">
.center-element {
  display: block;
  margin: 0 auto;
  text-align: center;
}

.text-show {
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

:global(.ant-table-thead > tr > th) {
  text-align: center !important;
}
</style>