const deepMerge = require('deepmerge')
const _config = require('./config')
const constant = require('./constant')
const {setting} = require('./default')
const config = deepMerge(setting, _config)

/**
 *
 *
 *  配置文件
 */
module.exports = {...config, ...constant}
