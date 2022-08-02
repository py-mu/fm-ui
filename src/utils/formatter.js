/**!
 * 自定义格式化方法
 */


/**
 * 把对象按照 js配置文件的格式进行格式化
 * @param obj 格式化的对象
 * @param dep 层级，此项无需传值
 * @returns {string}
 */
function formatConfig(obj, dep) {
  dep = dep || 1
  const LN = '\n', TAB = '  '
  let indent = ''
  for (let i = 0; i < dep; i++) {
    indent += TAB
  }
  let isArray = false, arrayLastIsObj = false
  let str = '', prefix = '{', subfix = '}'
  if (Array.isArray(obj)) {
    isArray = true
    prefix = '['
    subfix = ']'
    str = obj.map((item, index) => {
      let format = ''
      if (typeof item == 'function') {
        //
      } else if (typeof item == 'object') {
        arrayLastIsObj = true
        format = `${LN}${indent}${formatConfig(item,dep + 1)},`
      } else if ((typeof item == 'number' && !isNaN(item)) || typeof item == 'boolean') {
        format = `${item},`
      } else if (typeof item == 'string') {
        format = `'${item}',`
      }
      if (index == obj.length - 1) {
        format = format.substring(0, format.length - 1)
      } else {
        arrayLastIsObj = false
      }
      return format
    }).join('')
  } else if (typeof obj != 'function' && typeof obj == 'object') {
    str = Object.keys(obj).map((key, index, keys) => {
      const val = obj[key]
      let format = ''
      if (typeof val == 'function') {
        //
      } else if (typeof val == 'object') {
        format = `${LN}${indent}${key}: ${formatConfig(val,dep + 1)},`
      } else if ((typeof val == 'number' && !isNaN(val)) || typeof val == 'boolean') {
        format = `${LN}${indent}${key}: ${val},`
      } else if (typeof val == 'string') {
        format = `${LN}${indent}${key}: '${val}',`
      }
      if (index == keys.length - 1) {
        format = format.substring(0, format.length - 1)
      }
      return format
    }).join('')
  }
  const len = TAB.length
  if (indent.length >= len) {
    indent = indent.substring(0, indent.length - len)
  }
  if (!isArray || arrayLastIsObj) {
    subfix = LN + indent +subfix
  }
  return`${prefix}${str}${subfix}`
}


/**
 * 将时间对象转格式，yy-MM-dd hh:mm:ss
 * @param timestamp 时间戳或时间类型
 * @returns {string}
 */
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

module.exports = {formatConfig, formatDate}
