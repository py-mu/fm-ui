<template>
<div>
  <div v-html="htmlText"></div>
</div>
</template>

<script>
/**
 * Markdown渲染组件
 */
export default {
  name: "MarkRender",
  props:['plaintext'],
  computed:{
    /**
     * 渲染Markdown
     * @return {*|string}
     */
    htmlText: function () {
      if (this.plaintext) {
        return this.renderMarkdown(this.plaintext);
      }
      return this.renderMarkdown("> 空空如也~");
    },
  }
}
</script>

<style scoped>

</style>