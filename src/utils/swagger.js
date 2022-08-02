/**
 * swagger 信息获取
 */

import {METHOD, request} from "@/utils/request";
import Prism from 'prismjs';

/**
 * 获取swagger 数据进行解析
 * @param url{string}
 */
async function getSwaggerData(url) {
    return request(url, METHOD.GET, {}, null)
}

/**
 * 替换
 * @param html
 * @constructor
 */
export function PrismParse(html) {
    const code = '';
    html.replace(code)
    Prism.highlightElement()
}

/**
 * 判断是否为空
 * @param input{any}
 * @return {boolean}
 */
function isEmpty(input) {
    return input === undefined || input === null || input === ''
}

/**
 * 根据URI获取tag
 * @param uri{string}
 * @return{string}
 */
function getUriTag(uri) {
    for (const i in uri) {
        if (isEmpty(i)) {
            return i
        }
    }
    return uri
}

/**
 * 解析swagger 路由
 * @param info{SwaggerInfoType|{}}
 */
export function parseRouter(info) {
    const paths = info.paths;
    let tagMap = {};
    let uriMap = {}
    for (const uri in paths) {
        const uriData = paths[uri];
        let children = []
        let tag = getUriTag(uri)
        for (const method in uriData) {
            if (method === 'parameters') {
                continue
            }
            const methodData = uriData[method]
            const operationId = methodData.operationId
            tag = methodData['tags'].length !== 0 ? methodData['tags'][0] : getUriTag(uri)
            const title = isEmpty(methodData.summary) ? operationId : methodData.summary
            uriMap[operationId] = methodData
            children.push({
                path: operationId,
                key: operationId,
                name: title,
                method: method,
                meta: {
                    icon: '',
                    title: title
                }
            })
        }
        tagMap[tag] = (tagMap[tag] || {router: [], path: getUriTag(uri)})
        tagMap[tag]['router'] = tagMap[tag]['router'].concat(children)
    }
    let menus = []
    for (const tag in tagMap) {
        const nemu = tagMap[tag]
        menus.push({
            path: nemu['path'],
            name: tag,
            children: nemu['router']
        })
    }
    menus.sort((b, a)=> b.name.localeCompare(a.name, 'zh'))

    return menus
}

export {getSwaggerData}