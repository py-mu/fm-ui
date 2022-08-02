<script>
import {SRAPURL} from "@/services/api";
import {METHOD, request} from "@/utils/request";
import {encrypt, decrypt} from "@/utils/encrypt-utils";

/**
 * 所有组件基准，一般生辰的组件都应该使用这个作为父类继承，这样方便在以后的运维优化过程中添加中间层hook或者更多控制层
 * 如网络请求，异常控制等
 */
export default {
  name: "BaseStandard",
  data() {
    return {
      /**
       * 模型名称，用于构建api
       */
      modelName: "",
      /**
       * 可能存在的表格加载
       */
      tableLoading: false,
      /**
       * 其他通用加载
       */
      loading: false,
    }
  },
  methods: {
    /**
     * 构造请求的url，如果输入modelName则会以输入的内容拼接api前缀，返回，如果没有则返回当前控制模型的api（前提是有重写modelName）
     *
     * @param path {null|string} 如果输入了path则使用输入的path返回一个路径 host + path
     * @return {string} 默认返回本组件的api
     */
    buildUrl(path = null) {
      if (path) {
        return SRAPURL + "/" + path;
      }
      return SRAPURL + "/" + this.modelName;
    },
    /**
     * 请求成功回调函数(可用于hook的钩子函数), 如果不对请求方法进行重写，则湖默认调用此函数
     *
     * @param response{{msg: string, code: number, data: [{}] | {}, page: number, total: number, limit: number}}
     * @param msg{string} 请求成功提示
     * @param showTip{boolean} 是否显示弹窗
     * @param useResponseMessage{boolean} 使用响应内容作为信息提示
     */
    requestSuccess(response, msg = "操作成功", showTip = true, useResponseMessage = false) {
      this.loading = false;
      this.tableLoading = false;
      if (useResponseMessage && response.msg) {
        msg = response.msg
      }
      if (showTip) {
        this.$message.success(msg);
      }
      return response;
    },
    /**
     * 请求失败的回调函数(可用于hook的钩子函数),
     * 一般出现的时候必定是网络或者服务器异常,所以不用管， 如果没有重写请求方法并指定对应的请求异常时会调用此方法
     *
     * ps： 当发生异常时，通常有两种情况：
     *    1. 服务端主动推送的异常响应，此响应通常是可被理解的，所以需要单独读取响应体内容。（有请求注入，在响应时会接管并重新修正响应内容）
     *    2. 不是有服务器主动产生的，如网络不可达等等，这类的响应内容不可被理解，需要单独处理（操作失败）
     *
     * @param event{{msg: string, code: number, data: [{}] | {}, page: number, total: number, limit: number}} 异常
     * @param msg{string} 提示内容
     * @param showTip{boolean} 是否显示
     * @param useResponseMessage{boolean} 使用响应内容作为信息提示
     */
    requestError(event, msg = "操作失败", showTip = true, useResponseMessage = true) {
      this.tableLoading = false;
      this.loading = false
      if (!showTip) {
        return event
      }
      if (useResponseMessage && event.msg) {
        msg = event.msg
      }
      this.$message.error(msg, 3);
    },
    /**
     * get请求
     *
     * @param url{string} 请求的接口
     * @param params{{}} 请求参数
     * @param successCallback{function} 成功回调 （如果不指定则使用默认的回调函数requestSuccess）
     * @param errorCallback{function} 异常回调 （如果不指定则使用默认的回调函数requestError）
     */
    getRequest(url, params = null, successCallback = null, errorCallback = null) {
      this.baseRequest(url, METHOD.GET, params, successCallback, errorCallback)
    },

    /**
     * get请求
     *
     * @param url{string} 请求的接口
     * @param params{{}} 请求参数
     * @param successCallback{function} 成功回调 （如果不指定则使用默认的回调函数requestSuccess）
     * @param errorCallback{function} 异常回调 （如果不指定则使用默认的回调函数requestError）
     */
    postRequest(url, params = null, successCallback = null, errorCallback = null) {
      this.baseRequest(url, METHOD.POST, params, successCallback, errorCallback)
    },
    /**
     * put请求
     *
     * @param url{string} 请求的接口
     * @param params{{}} 请求参数
     * @param successCallback{function} 成功回调 （如果不指定则使用默认的回调函数requestSuccess）
     * @param errorCallback{function} 异常回调 （如果不指定则使用默认的回调函数requestError）
     */
    putRequest(url, params = null, successCallback = null, errorCallback = null) {
      this.baseRequest(url, METHOD.PUT, params, successCallback, errorCallback)
    },

    /**
     * patch请求
     *
     * @param url{string} 请求的接口
     * @param params{{}} 请求参数
     * @param successCallback{function|null} 成功回调 （如果不指定则使用默认的回调函数requestSuccess）
     * @param errorCallback{function|null} 异常回调 （如果不指定则使用默认的回调函数requestError）
     */
    patchRequest(url, params = null, successCallback = null, errorCallback = null) {
      this.baseRequest(url, METHOD.PATCH, params, successCallback, errorCallback)
    },
    /**
     * delete请求
     *
     * @param url{string} 请求的接口
     * @param params{{}} 请求参数
     * @param successCallback{function} 成功回调 （如果不指定则使用默认的回调函数requestSuccess）
     * @param errorCallback{function} 异常回调 （如果不指定则使用默认的回调函数requestError）
     */
    deleteRequest(url, params = null, successCallback = null, errorCallback = null) {
      this.baseRequest(url, METHOD.DELETE, params, successCallback, errorCallback)
    },

    /**
     * 所有的请求封装，符合restful设计， 如果get请求的参数过长则应该创建一个post缓存请求查询条件，并重新查询结果
     * @param url{string}
     * @param method
     * @param params
     * @param successCallback
     * @param errorCallback
     */
    baseRequest(url, method, params = null, successCallback = null, errorCallback = null) {
      if (method === METHOD.GET) {

        let param_array = [];
        for (const key in params) {
          param_array.push(key + "=" + params[key]);
        }
        const url_ = url + (url.indexOf("?") !== -1 ? "&" : "?") + param_array.join("&");
        // 如果是get请求则需要判断请求的参数是否超过长度，超过的话则需要建立一个缓存连接
        if (url_.length >= 18) {
          console.log(url)
        }
      }
      if (!successCallback) {
        successCallback = this.requestSuccess;
      }
      if (!errorCallback) {
        errorCallback = this.requestError;
      }
      if (!params) {
        params = {}
      }
      request(url, method, params, {}).then(successCallback).catch(errorCallback);
    },
    /**
     * 对数据加密, 全局通用加密参数
     * @param data{Object}
     * @constructor
     */
    baseEncrypt(data){
      return encrypt(JSON.stringify(data))
    },
    /**
     * 对数据进行解密
     * @param data{string}
     * @returns {string}
     */
    baseDecrypt(data){
      return decrypt(data)
    }

  }
}
</script>
