/**
 * 常量
 */
module.exports = {
    /**
     * 本地缓存swagger info 使用的key
     */
    SWAGGER_INFO_KEY: "swagger-info",
    /**
     * 请求头枚举（用于自动补全）
     * @type HttpHeaderFieldType
     */
    REQUEST_HTTP_HEADERS: {
        perm_header: {
            version: '[RFC4021]',
            url: 'https://www.rfc-editor.org/rfc/rfc4021.html'
        },
        fields: [
            {
                name: 'Accept',
                default: '*/*',
                translate_id: 'header_accept',
                values: ['text/palin', 'text/xml', 'application/json', '*/*', 'application/xml', 'text/html', 'application/octet-stream']
            },
            {
                name: 'Accept-Charset',
                default: 'UTF-8',
                translate_id: 'header_accept_charsets',
                values: ['utf-8', 'gbk']
            },
            {
                name: 'Accept-Encoding',
                default: 'gzip, deflate',
                translate_id: 'header_accept_encoding',
                values: ['gzip', 'compress', 'deflate', 'br']
            },
            {
                name: 'Accept-Language',
                default: 'zh-cn,zh;q=0.5',
                translate_id: 'header_accept_language',
                values: ['zh-cn,zh;q=0.5', 'en-us', '*;q=0.5']
            },
            {name: 'Accept-Datetime', default: '', translate_id: 'header_accept_datetime', values: []},
            {name: 'Authorization', default: '', translate_id: 'header_authorization', values: []},
            {
                name: 'Cache-Control',
                default: 'no-cache',
                translate_id: 'header_cache_control',
                values: ['no-cache', 'no-store', 'max-age', ' max-stale', 'min-fresh', 'only-if-cached']
            },
            {
                name: 'Connection',
                default: 'keep-alive',
                translate_id: 'header_connection',
                values: ['keep-alive', 'Upgrade']
            },
            {name: 'Cookie', default: '', translate_id: 'header_cookie', values: []},
            {name: 'Content-Length', default: '', translate_id: 'header_content_length', values: []},
            {name: 'Content-MD5', default: '', translate_id: 'header_content_md5', values: []},
            {
                name: 'Content-Type',
                default: 'application/x-www-form-urlencoded',
                translate_id: 'header_content_type',
                values: ['application/x-www-form-urlencoded', 'multipart/form-data', 'application/json']
            },
            {name: 'Date', default: '', translate_id: 'header_date', values: []},
            {name: 'Expect', default: '100-continue', translate_id: 'header_expect', values: []},
            {name: 'From', default: 'user@itbilu.com', translate_id: 'header_from', values: []},
            {name: 'Host', default: '', translate_id: 'header_host', values: []},
            {name: 'If-Match', default: '', translate_id: 'header_if_match', values: []},
            {name: 'If-Modified-Since', default: '', translate_id: 'header_if_modified_since', values: []},
            {name: 'If-None-Match', default: '', translate_id: 'header_if_none_match', values: []},
            {name: 'If-Range', default: '', translate_id: 'header_if_range', values: []},
            {name: 'If-Unmodified-Since', default: '', translate_id: 'header_if_umodified_since', values: []},
            {name: 'Max-Forwards', default: '10', translate_id: 'header_max_forwards'},
            {name: 'Origin', default: '10', translate_id: 'header_origin', values: ['Access-Control-Allow-Origin']},
            {name: 'Pragma', default: 'no-cache', translate_id: 'header_pragma', values: []},
            {name: 'Proxy-Authorization', default: 'no-cache', translate_id: 'header_proxy_authorization', values: []},
            {name: 'Range', default: 'bytes=500-999', translate_id: 'header_range', values: []},
            {name: 'Referer', default: '', translate_id: 'header_referer', values: []},
            {name: 'TE', default: 'trailers,deflate', translate_id: 'header_te', values: []},
            {
                name: 'User-Agent',
                default: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 Edg/103.0.1264.77',
                translate_id: 'header_user_agent',
                values: []
            },
            {
                name: 'Upgrade',
                default: ' HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11',
                translate_id: 'header_upgrade',
                values: [' HTTP/2.0', 'SHTTP/1.3', 'IRC/6.9', 'RTA/x11']
            },
            {name: 'Via', default: '', translate_id: 'header_via', values: []},
            {name: 'Warning', default: '', translate_id: 'header_warning', values: []},
            {name: 'Access-Control-Allow-Origin', default: '', translate_id: 'header_access_control_allow_origin', values: []},
            {name: 'Location', default: '', translate_id: 'header_location', values: []},
            {name: 'Location', default: '', translate_id: 'header_server', values: []},
            {name: 'Status', default: '', translate_id: 'header_status', values: []},

        ],
    }
}