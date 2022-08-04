<template>
  <div>
    <a-space size="small">
      <a-tag color="blue" v-if="method === 'get'">GET</a-tag>
      <a-tag color="green" v-else-if="method === 'post'">POST</a-tag>
      <a-tag color="cyan" v-else-if="method === 'patch'">PATCH</a-tag>
      <a-tag color="orange" v-else-if="method === 'put'">PUT</a-tag>
      <a-tag color="red" v-else-if="method === 'delete'">DELETE</a-tag>

      <a-tag color="orange" v-if="deprecated">{{ $t('deprecated') }}</a-tag>

      <a-tag :color="colors[i % colors.length]" :key="name + i" v-for="(name, i ) in tags">{{ name }}</a-tag>

    </a-space>
  </div>
</template>

<script>
/**
 * 自定义tag类型
 */
const colors = ['pink', 'red', 'orange', 'cyan', 'blue', 'purple']
export default {
  props: ['tags', 'method', 'deprecated'],
  name: "ApiTag",
  data() {
    return {
      colors: colors
    }
  }
}
</script>

<style scoped>

</style>