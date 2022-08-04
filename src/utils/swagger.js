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
export function isEmpty(input) {
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
 * 通过swagger 构建一个映射集合，用于搜索及详情显示
 * @param info
 */
export function parseSwaggerMap(info) {
    const paths = info.paths;
    let dataset = {
        // 预保留标签筛选
        tags: {},
        uris: {},
    }
    let tagMap = {};
    for (const uri in paths) {
        const uriData = paths[uri];

        let tag = getUriTag(uri)
        for (const method in uriData) {
            if (method === 'parameters') {
                continue
            }
            const methodData = uriData[method]
            tag = methodData['tags'].length !== 0 ? methodData['tags'][0] : getUriTag(uri)

            if (tagMap[tag] === undefined){
                tagMap[tag] = getUriTag(uri)
            }
            const operationId = tagMap[tag] + '/' + methodData.operationId
            const title = isEmpty(methodData.summary) ? operationId : methodData.summary
            let all_tags = (methodData['tags'].indexOf(tag) === -1 ? methodData['tags'] : [tag].concat(methodData['tags']))
            for (const i in all_tags) {
                const a_tag = all_tags[i]
                dataset["tags"][a_tag] = (dataset["tags"][a_tag] || [])
                if (dataset["tags"][a_tag].indexOf(operationId) === -1) {
                    dataset["tags"][a_tag].push(operationId)
                }
            }
            dataset.uris[operationId] = methodData
            dataset.uris[operationId]['title'] = title
            dataset.uris[operationId]['base'] = uri
            dataset.uris[operationId]['method'] = method
        }
    }
    return dataset
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
                deprecated: methodData.deprecated,
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
    menus.sort((b, a) => b.name.localeCompare(a.name, 'zh'))

    return menus
}

export {getSwaggerData}