<template>
  <div class="content">
    <div>
      <a-space direction="vertical" size="middle" style="width: 100%">
        <!--    接口名称      -->
        <div style="display: inline">
          <h1>
            创建用户
          </h1>
          {{ aid }}
        </div>
        <!--  接口标签      -->
        <div>
          <a-space size="small">
            <a-tag color="pink">pink</a-tag>
            <a-tag color="red">red</a-tag>
            <a-tag color="orange">orange</a-tag>
            <a-tag color="green">green</a-tag>
            <a-tag color="cyan">cyan</a-tag>
            <a-tag color="blue">blue</a-tag>
            <a-tag color="purple">purple</a-tag>
          </a-space>
        </div>
        <!--    接口描述      -->
        <div>
          <a-collapse>
            <a-collapse-panel key="1" header="API 接口描述">
              接口详情
            </a-collapse-panel>
          </a-collapse>

        </div>
        <div style="min-height: 500px">
          <a-tabs>
            <a-tab-pane key="1" tab="Header">
              <a-table :dataSource="dataSource" :columns="columns" class="ant-table-striped" bordered
                       :pagination="{ position: ['none'] }"
                       size="middle"/>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Query">
              <a-table :dataSource="dataSource" :columns="columns" class="ant-table-striped" bordered
                       size="middle"/>
            </a-tab-pane>
            <a-tab-pane key="3" tab="Body">
              <a-table :dataSource="dataSource" :columns="columns" class="ant-table-striped" bordered
                       size="middle"/>
            </a-tab-pane>
          </a-tabs>
        </div>
        <!--  接口响应      -->
        <div>
          <a-tabs>
            <a-tab-pane key="1" tab="Raw">
              <a-table :dataSource="dataSource" :columns="columns" class="ant-table-striped" bordered
                       :pagination="{ position: ['none'] }"
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

<script>
/**
 * api 详情
 */
export default {
  props: ['aid'],
  name: "ApiDetailView",
  data() {
    return {
      inss: '',
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ],

      columns: [
        {
          title: '参数名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '参数值',
          dataIndex: 'age',
          key: 'age',
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

<style scoped>

.content {
  padding: 20px;
}

</style>