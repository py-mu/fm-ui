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