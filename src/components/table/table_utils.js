const defaultRow = {
    /**
     * 字段名称
     */
    params_name: '',
    /**
     * 字段值
     */
    params_value: '',
    /**
     * 是否必填
     */
    params_require: false,
    /**
     * 字段类型
     */
    params_type: 'string',
    /**
     * 是否使用
     */
    params_used: false,
    /**
     * 是否翻译
     */
    params_tran: false,
    /**
     * 可编辑字段
     */
    params_edit: {
        params_name: false,
        params_value: false,
    },
    /**
     * 枚举类型
     */
    params_value_help: [],
    /**
     * 字段描述
     */
    params_description: '...'
}


/**
 * 默认新建一行时需要的字段，可以输入空，会返回一个带默认值的数据结构
 * @param map{{}}
 * @return {ApiTableDefaultRow}
 */
export function getDefaultRow(map = null) {
    map = map || {}
    let row = JSON.parse(JSON.stringify(defaultRow))
    for (const key in map) {
        row[key] = map[key] || defaultRow[key]
    }
    return row
}

/**
 * 如果是json object则转换成json字符串
 * @param obj
 * @return {*}
 */
export function isJson2str(obj) {
    if (Object.prototype.toString.call(obj) === '[object Object]'){
        return JSON.stringify(obj)
    }
    return obj
}
