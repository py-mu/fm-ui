export type HttpFiledType = {
    /**
     * 字段名
     */
    name: string,
    /**
     * 默认值
     */
    default: string | number | null,
    /**
     * 可选值
     */
    values: [string],
    /**
     * 翻译的id
     */
    translate_id: string,
}

/**
 * HTTP 字段类型
 */
export type HttpHeaderFieldType = {
    /**
     * 字段版本信息
     */
    perm_header: {
        version: string,
        url: string,
    },
    /**
     * 字段列表
     */
    fields: [HttpFiledType],
}

/**
 *  表格行类型
 *
 */
export type ApiTableDefaultRowType = {
    /**
     * 字段名称
     */
    params_name: string,
    /**
     * 字段值
     */
    params_value: string,
    /**
     * 是否必填
     */
    params_require: boolean,
    /**
     * 字段类型
     */
    params_type: string,
    /**
     * 是否使用
     */
    params_used: boolean,
    /**
     * 是否翻译
     */
    params_tran: boolean,
    /**
     * 可编辑字段
     */
    params_edit: {
        params_name: boolean,
        params_value: boolean,
    },
    /**
     * 枚举类型
     */
    params_value_help: [],
    /**
     * 字段描述
     */
    params_description: string,
}

/**
 * @type ApiTableDefaultRowType
 */
export class ApiTableDefaultRow {
}


/**
 * 请求表单, 用于存储当前请求的环境，如请去头、请求体内容，查询表单，用户环境等等
 */
export class ApiTableEnvironment {
    query: {}
    body: {}
    headers: {}
    env: {}
}