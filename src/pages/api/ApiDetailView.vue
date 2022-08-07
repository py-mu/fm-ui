<template>
  <div class="content">
    <div>
      <a-space direction="vertical" size="middle" style="width: 100%">
        <!--    接口名称      -->
        <div style="display: inline">
          <a-page-header
              style="border: 1px solid rgb(235, 237, 240)"
              :title="apiData.data.title"
              :sub-title="apiData.data.operationId"
              @back="() => null"
          >
            <template #extra>
              <a-space>
                <a-icon type="user"/>
                <span>
                  {{ apiData.env }}
                  <!--                  {{ requestData }}-->
                </span>
              </a-space>
            </template>
            <template #tags>
              <api-tag :tags="apiData.data.tags" :method="apiData.data.method" :deprecated="apiData.data.deprecated"/>
            </template>
          </a-page-header>

        </div>
        <!--  接口标签      -->
        <div>
          <a-input-search
              addon-before="http://127.0.0.1:8080/api/v1"
              v-model="requestURL"
              placeholder="input search text"
              :enter-button="$t('send')"
              size="large"
          />
        </div>
        <!--    接口描述      -->
        <div>
          <a-collapse>
            <a-collapse-panel key="1" :header="$t('api_detail')">
              <div v-html="renderMarkdown(apiData.data.description || $t('nothing'))"></div>
            </a-collapse-panel>
          </a-collapse>

        </div>
        <div style="min-height: 500px">
          <a-tabs>
            <!--    请求头        -->
            <a-tab-pane key="1" tab="Header">
              <request-header-table :request-data="requestData"/>
            </a-tab-pane>
            <!--    Query表单        -->
            <a-tab-pane key="2" tab="Query">
              <query-table :parameters="getApiParameters('query')" :request-data="requestData"></query-table>
            </a-tab-pane>
            <!--    在使用GET请求是body其实没有用的，所以禁用        -->
            <a-tab-pane key="Body" tab="Body" :disabled="apiData.data.method === 'get'">

              <div class="field-box">
                <div class="field-box-left">
                  <a-tooltip
                      v-if="['multipart/form-data', 'application/x-www-form-urlencoded'].indexOf(bodyType) !== -1">
                    <template slot="title">
                      {{ $t('header_add_help') }}
                    </template>
                    <a-button class="editable-add-btn"
                              @click="onClickBodyTableAddBtn"
                              style="margin-bottom: 8px">{{ $t('add_row') }}
                    </a-button>
                  </a-tooltip>
                </div>
                <div class="field-box-right">
                  <a-select v-model="bodyType"
                            dropdown-class-name="eia-dropdown-class"
                            style="width: 100%">
                    <a-select-option value="none">none</a-select-option>
                    <a-select-option value="multipart/form-data">multipart/form-data</a-select-option>
                    <a-select-option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded
                    </a-select-option>
                    <a-select-option value="application/json">application/json</a-select-option>
                    <a-select-option value="application/xml">application/xml</a-select-option>
                    <a-select-option value="application/javascript">application/javascript</a-select-option>
                    <a-select-option value="text/pain">text/pain</a-select-option>
                    <a-select-option value="text/html">text/html</a-select-option>
                  </a-select>
                </div>

              </div>
              <div>
                <div v-if="bodyType=== 'none'">
                  <div style="min-height: 300px;">
                    <a-empty :description="$t('no_request_body')"/>
                  </div>
                </div>
                <div v-else-if="['multipart/form-data', 'application/x-www-form-urlencoded'].indexOf(bodyType) !== -1">
                  <query-table :parameters="getApiParameters('form')" :request-data="requestData" ref="bodyTable">
                    <template #addBtn>
                      <div></div>
                    </template>

                  </query-table>
                </div>
                <div v-else style="margin-top: 10px">
                  <a-textarea style="width: 100%; min-height: 300px;">

                  </a-textarea>
                </div>
              </div>

            </a-tab-pane>
            <!--    环境变量        -->
            <a-tab-pane key="Environment" tab="Environment">
              <a-select v-model="env" style="width: 30%">
                <a-select-option value="guest">游客</a-select-option>
                <a-select-option value="admin">管理员</a-select-option>
              </a-select>
            </a-tab-pane>
          </a-tabs>
        </div>
        <!--  接口响应      -->
        <div>
          <a-tabs>
            <a-tab-pane key="1" tab="Raw">
              <a-table :dataSource="dataSource" :columns="columns" class="ant-table-striped" bordered
                       size="middle"/>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Beautify">
              <a-table :dataSource="dataSource" :columns="columns" class="ant-table-striped" bordered
                       size="middle"/>
            </a-tab-pane>
            <a-tab-pane key="3" tab="Render">
              <a-table :dataSource="dataSource" :columns="columns" class="ant-table-striped" bordered
                       size="middle"/>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-space>
    </div>
  </div>
</template>

<script>/**
 * api 详情
 */
import ApiTag from "@/components/tag/ApiTag";
import RequestHeaderTable from "@/components/table/RequestHeaderTable";
import QueryTable from "@/components/table/QueryTable";

import {isJson2str} from "@/components/table/table_utils";

const {getDefaultRow} = require("@/components/table/table_utils");
import {isEmpty} from "@/utils/swagger";
import {Empty} from 'ant-design-vue';

export default {
  props: ['aid', 'swaggerDataset'],
  name: "ApiDetailView",
  components: {ApiTag, QueryTable, RequestHeaderTable},
  computed: {
    apiData: function () {
      let dataset = {
        aid: this.aid,
        /**
         * @type {SwaggerApiType|{}}
         */
        data: {
          title: 'unknown',
          description: '',
          base: ''
        },
        env: this.env
      }
      // 如果没有传入任何值，则取第一个
      if (!dataset.aid && Object.entries(this.swaggerDataset.uris)) {
        dataset.aid = Object.entries(this.swaggerDataset.uris)[0][0]
      }
      if (dataset.aid && this.swaggerDataset.uris[dataset.aid]) {
        dataset.data = this.swaggerDataset.uris[dataset.aid]
      }
      return dataset
    }
  },
  data() {
    return {
      /**
       * 请求数据
       * @type ApiTableEnvironment
       */
      requestData: {
        query: {},
        headers: {},
        body: {},
        env: {}
      },
      simpleImage: '',
      /**
       * 请求表单类型
       */
      bodyType: 'multipart/form-data',
      env: 'guest',
      requestURL: '',
      dataSource: [
        {
          key: '1',
          name: 'username',
          age: 'FierceMan',
          address: '用户账号',
        },
        {
          key: '2',
          name: 'password',
          age: '*********',
          address: '用户密码',
        },
      ],

      columns: [
        {
          title: '启用',
          dataIndex: 'activation',
          key: 'activation',
          default: true,
          value: true,
          slots: {
            customRender: 'activation',
          },
        },
        {
          title: '参数名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '参数值',
          dataIndex: 'age',
          key: 'age',
          slots: {
            customRender: 'inputCell',
          },
        },
        {
          title: '描述',
          dataIndex: 'address',
          key: 'address',
        },
      ],
    }
  },
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
  created() {
    this.requestURL = this.apiData.data.base
    /**
     * 如果全都没有任何形式的表单数据则使用 none
     */
    if (this.getApiParameters('body').concat(this.getApiParameters('form')).length === 0) {
      this.bodyType = 'none'
    }
  },
  watch: {
    requestData: {
      /**
       * 当下方的数据表格发生变化的时候，需要更新URL
       * @param value {ApiTableEnvironment}
       */
      handler(value) {
        let queries = [];
        for (const key in value.query) {
          queries.push(key + "=" + value.query[key])
        }
        if (queries.length > 0) {
          this.requestURL = this.apiData.data.base + "?" + queries.join("&");
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {

    /**
     * 获取接口的请求参数列表
     * @param key
     * @param pushDefaultIfNot 如果数据为空的时候填充一个默认列表
     * @return {[]}
     */
    getApiParameters(key, pushDefaultIfNot = true) {
      let data = [];
      /**
       * @type SwaggerApiType
       */
      const swaggerApi = this.apiData.data;
      if (!isEmpty(swaggerApi) && swaggerApi.parameters) {
        for (const index in swaggerApi.parameters) {
          const parameter = swaggerApi.parameters[index]
          if (parameter.in === key) {
            data.push(getDefaultRow({
              params_name: parameter.name,
              params_value: isJson2str(parameter.default),
              params_require: parameter.required,
              params_used: parameter.required,
              params_description: parameter.description,
            }))
          }
        }
      }
      if (data.length === 0 && pushDefaultIfNot) {
        data = [getDefaultRow()]
      }
      return data
    },
    /**
     * 点击body表单的新增一行按钮
     */
    onClickBodyTableAddBtn() {
      this.$refs.bodyTable.onClickAddRow()
    }
  },
}
</script>

<style lang="less">
.center-element {
  display: block;
  margin: 0 auto;
  text-align: center;
}

.field-box {
  display: flex;
  justify-content: flex-end;
}

.field-box-left {
  width: 100%;
  display: flex;
}

.field-box-right {
  width: 35%;
}

.content {
  padding: 20px;
}

.eia-dropdown-class {
  .ant-select-dropdown-menu:extend(.beauty-scroll) {
    color: red;
  }
}

</style>