/**
 * 接口类型
 */
export type SwaggerApiType = {
    title: string,
    deprecated: boolean,
    base: string,
    method: string,
    description: string,
    operationId: string,
    parameters: [
        {
            description: string,
            in: string,
            name: string,
            required: boolean,
            type: string,
            default: string,
            schema: string,
            format: string,
            enum: string,
            pattern: string,
            items: string,
        }
    ],
    responses: {
        200: {
            description: string,
            schema: {
                $ref: string
            }
        },

    },
    summary: string,
    tags: [string]
}

export type SwaggerInfoType = {
    /**
     * swagger版本
     */
    swagger: string,
    /**
     * 主机端口
     */
    host: string,
    /**
     * 根路由
     */
    basePath: string,
    /**
     * 响应类型【json、xml】
     */
    consumes: [string],
    /**
     * 序列化实体模型
     */
    definitions: {
        "200": {
            /**
             * 属性列表
             */
            properties: {
                'code': {
                    enum: [number],
                    items: { type: string, 'x-nullable': true, format: string },
                    default: number,
                    readOnly: true,
                    uniqueItems: true,
                    title: string,
                    type: string,
                    minLength: number,
                    maxLength: number,
                    maximum: number,
                    minimum: number,
                    description: string,
                    format: string,
                }
            },
            /**
             * 是否必填
             */
            required: [string]
        }
    },
    /**
     * api信息
     */
    info: {
        /**
         * 个人信息
         */
        contact: {
            email: string,
            name: string,
        },
        description: string,
        title: string,
        version: string,
    },
    paths: {
        '/application': {
            'get': SwaggerApiType,
            parameters: []
        }
    },
    produces: [string],
    schemes: [string],
    security: [{
        Bearer: []
    }],
    securityDefinitions: {
        Bearer: {
            description: string,
            type: string,
            in: string,
            name: string,
        }
    }
}
