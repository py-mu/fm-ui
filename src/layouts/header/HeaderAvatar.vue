<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" src="/staticUI/img/user.png"/>
      <span class="name">{{user.name}}</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
<!--      <a-menu-item>-->
<!--        <a-icon type="user" />-->
<!--        <span>个人中心</span>-->
<!--      </a-menu-item>-->
      <a-menu-item @click="onopenSettingView">
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <!--suppress HtmlUnknownTag -->
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import {mapGetters} from 'vuex'
import {logout} from '@/services/user'
import AMenuItem from 'ant-design-vue/es/menu/MenuItem'
import AMenu from 'ant-design-vue/es/menu/index'

/**
 * 个人中心
 */
export default {
  name: 'HeaderAvatar',
  components:{AMenu, AMenuItem},
  computed: {
    ...mapGetters('account', ['user']),
    getShowSetting: {
      get: function(){
        return this.showSetting;
      },
      set: function (value) {
        //通过$emit触发父组件
        this.$emit('showSetting', value)
      }
    },
  },
  props: ['showSetting'],
  methods: {
    logout() {
      logout()
      this.$router.push('/login')
    },
    /**
     * 打开
     */
    onopenSettingView(){
      this.getShowSetting = true
    }
  }
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-flex;
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      margin-right: 8px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 150px;
  }

</style>
