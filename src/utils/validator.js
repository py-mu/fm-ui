/**!
 * 表单自定义校验方法
 */




/**
 * 密码校验
 * @param {*} rule 校验规则
 * @param {*} value 校验值
 * @param {*} callback 回调
 */
function passwordValidator(rule, value, callback) {
    const Reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!Reg.test(value)) {
        callback('密码格式不正确');
    }
    callback();
}

/**
 * 手机号校验
 * @param {*} rule 校验规则
 * @param {*} value 校验值
 * @param {*} callback 回调
 */
function phoneValidator(rule, value, callback) {
    const Reg = /^1([3-9])\d{9}$/;
    if (!Reg.test(value)) {
      callback('手机号格式不正确');
    }
    callback();
}

/**
 * 邮箱校验
 * @param {*} rule 校验规则
 * @param {*} value 校验值
 * @param {*} callback 回调
 */
 function emailValidator(rule, value, callback) {
    const Reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!Reg.test(value)) {
      callback('邮箱格式不正确')
    }
    callback()
}


module.exports = {
    passwordValidator, 
    phoneValidator, 
    emailValidator 
}