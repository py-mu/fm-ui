<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png"/>
        <span class="title">{{ systemName }}</span>
      </div>
      <div class="desc">{{ systemDescription }}</div>
    </div>
    <div class="login">
      <a-form @submit="login" :form="form">
        <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert type="error" :closable="false" v-show="error" :message="error" :showIcon="true"
                     style="margin-bottom: 24px;"/>
            <a-form-item>
              <a-input
                  autocomplete="autocomplete"
                  size="large"
                  placeholder="输入账号"
                  v-decorator="['name', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="user"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                  size="large"
                  placeholder="输入密码"
                  autocomplete="autocomplete"
                  type="password"
                  v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="lock"/>
              </a-input>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <a-form-item>
          <a-button :loading="loading" style="width: 100%;margin-top: 24px" size="large" htmlType="submit"
                    type="primary">登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
import {getRoutesConfig} from '@/services/user'
import {setAuthorization} from '@/utils/request'
import {mapMutations} from 'vuex'
import {loadRoutes} from "@/utils/routerUtil";
import {SimpleEncrypt} from "@/utils/encrypt-utils";
import CreateMixin from "@/components/base/mixins/CreateMixin"


export default {
  name: 'Login',
  components: {CommonLayout},
  mixins: [CreateMixin],
  data() {
    return {
      loading: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    /**
     * 获取当前应用名称
     * @returns {any}
     */
    systemName() {
      return this.$store.state.setting.systemName
    },
    /**
     * 获取当前应用一句话描述内容
     * @returns {any}
     */
    systemDescription() {
      return this.$store.state.setting.systemDescription
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),

    /**
     * 成功登录, 在登录成功之后请求用户可访问的路由
     * @param response
     */
    loginSuccess(response) {
      this.loading = false;
      this.requestSuccess(response, "登录成功");
      const {user_id, token, username, nickname} = response.data;
      const user = {
        user_id: user_id,
        name: username,
        nickname: nickname
      }
      this.setUser(user);
      setAuthorization({token: token, expireAt: new Date()});
      // this.getRoutersRequest()
      let redirect = '/index'
      this.$router.push(redirect)
      this.$message.success('欢迎回来！', 3)
    },

    /**
     * 登录失败
     * @param response
     */
    loginFailed(response) {
      this.loading = false;
      if (response.code === 8) {
        for (const errKey in response.detail) {
          for (const idx in response.detail[errKey]) {
            this.error += response.detail[errKey][idx]
          }
        }
      } else {
        this.error = response.msg;
      }
    },
    /**
     * 解析路由
     * @param result
     */
    getRoutersSuccess(result) {
      let menus = result.data
      let redirect = '/' + menus[0].children[0].router
      loadRoutes(menus)
      const permission = this.parsePermission(menus[0])
      this.setPermissions(permission)
      this.$router.push(redirect)
      this.$message.success('欢迎回来！', 3)
    },
    /**
     * 请求用户路由
     */
    getRoutersRequest() {
      const url = this.buildUrl('permission/user-menu')
      this.getRequest(url, null, this.getRoutersSuccess, ()=>{})
    },
    /**
     * 发送POST请求
     */
    loginRequest(url) {
      this.loading = true;
      this.postRequest(url, this.getCreatForm(), this.loginSuccess, this.loginFailed)
    },
    /**
     * 用户登录
     */
    login(event) {
      this.error = ""
      event.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          const now = Date.now()
          const name = this.form.getFieldValue('name')
          let password = SimpleEncrypt(this.form.getFieldValue('password'), now)
          this.postForm = {
            account: name,
            password: password,
            timestamp: now
          }
          this.loginRequest(this.buildUrl('user/login'))
        }
      })
    },
    /**
     * 根据权限构建可操作类型
     * @param key
     * @returns {string[]|*}
     */
    getPermissionNList(key) {
      if (key === undefined) {
        return ['close']
      }
      const permMap = {
        "000": ['close'],
        "001": ['edit', 'close'],
        "010": ['delete', 'close'],
        "011": ['delete', 'edit', 'close'],
        "100": ['add', 'close'],
        "101": ['add', 'edit', 'close'],
        "110": ['add', 'delete', 'close'],
        "111": ['add', 'delete', 'edit', 'close'],
      }
      return permMap[key]
    },
    /**
     * 根据后端返回的路由解析出对应的权限集合
     * @param routers
     */
    parsePermission(routers) {
      let permissions = [];
      const id = routers.router
      permissions.push({
        id: id,
        operation: this.getPermissionNList(routers.permission)
      })
      const routersChildren = routers.children
      if (routersChildren !== undefined && routersChildren.length > 0) {
        for (const childrenKey in routersChildren) {
          permissions = permissions.concat(this.parsePermission(routersChildren[childrenKey]))
        }
      }
      return permissions
    },
    /**
     * 成功登录之后
     *
     * @param res
     */
    afterLogin(res) {
      this.loading = false
      const loginRes = res.data
      if (loginRes.code === 1) {
        // const {user, token, expireAt, permissions, role} = loginRes.data
        // this.setUser(user)
        // this.setPermissions(permissions)
        // this.setRoles(role)
        // setAuthorization({token: token, expireAt: new Date(Number(expireAt))})
        // // 获取路由配置
        getRoutesConfig().then(result => {
          let menus = result.data.data
          let redirect = '/' + menus[0].children[0].router
          loadRoutes(menus)
          const permission = this.parsePermission(menus[0])
          this.setPermissions(permission)
          this.$router.push(redirect)
          this.$message.success('欢迎回来！', 3)
        })
        const {user_id, token, username, nickname} = loginRes.data;
        const user = {
          user_id: user_id,
          name: username,
          nickname: nickname
        }
        this.setUser(user);
        setAuthorization({token: token, expireAt: new Date()});
        // this.$router.push('/home');
        // this.$message.success("欢迎回来", 3);
      } else {
        this.loading = false;
        if (loginRes.code === 8) {
          this.error = loginRes.detail.non_field_errors[0];
        } else {
          this.error = loginRes.msg;
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;

    .header {
      height: 44px;
      line-height: 44px;

      a {
        text-decoration: none;
      }

      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }

      .title {
        font-size: 33px;
        color: @title-color;
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }

    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }

  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }

    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
