<template>
  <div></div>
</template>
<script>

/**
 * 检查用户是否登录，如果未登录则需要转跳到登录页，否则转跳到
 */
export default {
  name: "CheckRedirectView",
  created() {
    if (this.mustBeLogin){
      this.$router.push('/login')
    }else {
       this.$router.push('/index')
    }
  },
  computed: {
    mustBeLogin() {
      return this.$store.state.setting.mustBeLogin
    }
  }
}
</script>

<style scoped>

</style>