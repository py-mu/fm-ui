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
            <a-tab-pane key="1" tab="Header">
              <request-header></request-header>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Query">
              <a-table :dataSource="dataSource" :columns="columns" class="ant-table-striped" bordered
                       size="middle"/>
            </a-tab-pane>
            <!--    在使用GET请求是body其实没有用的，所以禁用        -->
            <a-tab-pane key="Body" tab="Body" :disabled="apiData.data.method === 'get'">
              <a-table :dataSource="dataSource" :columns="columns" class="ant-table-striped" bordered
                       size="middle"/>
            </a-tab-pane>
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
import RequestHeader from "@/components/table/RequestHeader";

export default {
  props: ['aid', 'swaggerDataset'],
  name: "ApiDetailView",
  components: {ApiTag, RequestHeader},
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
        }
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
  created() {
    this.requestURL = this.apiData.data.base
  },
  data() {
    return {

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
  }
}
</script>

<style scoped lang="less">
.center-element {
  display: block;
  margin: 0 auto;
  text-align: center;
}



.content {
  padding: 20px;
}

</style>