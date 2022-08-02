<template>
  <page-layout :desc="desc" :linkList="linkList">
    <div v-if="this.extraImage && !isMobile" slot="extra" class="extraImg">
      <img :src="extraImage"/>
    </div>
    <page-toggle-transition :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
      <router-view ref="page"/>
    </page-toggle-transition>
  </page-layout>
</template>

<script>
import PageLayout from './PageLayout'
import PageToggleTransition from '../components/transition/PageToggleTransition';
import {mapState} from 'vuex'

export default {
  name: 'PageView',
  components: {PageToggleTransition, PageLayout},
  data() {
    return {
      page: {
        desc: 'index',
        linkList:[{
          title: '',
          ref: '/403',
          icon: 'error',
        }],
        extraImage: null
      }
    }
  },
  computed: {
    ...mapState('setting', ['isMobile', 'multiPage', 'animate']),
    desc() {
      return this.page.desc
    },
    linkList() {
      return this.page.linkList
    },
    extraImage() {
      return this.page.extraImage
    }
  },
  mounted() {
    if (this.$refs.page){
      this.page = this.$refs.page
    }
  },
  updated() {
    if (this.$refs.page){
      this.page = this.$refs.page
    }
  }
}
</script>

<style lang="less" scoped>
.row-card {
  display: flex;
  margin-bottom: 20px;
}

.card-content {
  background: @base-bg-color;
  padding: 10px;
  border-radius: 2px;
  height: auto;
  min-height: 360px;
}
.extraImg {
  margin-top: -60px;
  text-align: center;
  width: 195px;

  img {
    width: 100%;
  }
}
</style>
