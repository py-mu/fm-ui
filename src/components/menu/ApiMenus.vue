<template>
  <div class="left-box">

    <a-menu mode="inline" class="menu-box beauty-scroll" @select="onSelect">
      <a-sub-menu :key="router.path + i" v-for="(router, i) in paths">
        <template #title>{{ router.name }}</template>

        <a-menu-item :key="router.path + '/' + _router.path + j" v-for="(_router, j) in router.children"
                     style="padding-left: 30px">
          <template>
            <!--              <a-badge color="blue"/>-->
            <a-tag color="blue" v-if="_router.method === 'get'">GET</a-tag>
            <a-tag color="green" v-else-if="_router.method === 'post'">POST</a-tag>
            <a-tag color="cyan" v-else-if="_router.method === 'patch'">PATCH</a-tag>
            <a-tag color="orange" v-else-if="_router.method === 'put'">PUT</a-tag>
            <a-tag color="red" v-else-if="_router.method === 'delete'">DELETE</a-tag>
          </template>
          <span :class="[_router.method === 'put' ? 'deprecated-text': '', 'display-api-name']" :title=" _router.name">
               {{ _router.name }}
            </span>
          <a-badge color="orange" v-if="_router.method === 'put'"/>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>

/**
 * api 菜单
 */
export default {
  name: "ApiMenus",
  props: ['paths'],
  methods:{
    onSelect(obj){
      this.$emit('menuSelect', obj)
    }
  }
}
</script>

<style scoped lang="less">
.menu-box {
  max-height: 800px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 10px;
}
.left-box{
  background: @background-color-base;
}
.deprecated-text{
  text-decoration:line-through;
  color: @disabled-color;
  border-color: @disabled-color;
  //background: @disabled-color;
}
.display-api-name{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>