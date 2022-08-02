//引用AES源码js
const CryptoJS = require('crypto-js');

/**
 * 默认密钥
 *
 * @type {string}
 */
const DEFAULT_AES_KEY = "srap-master"
const iv = "a1a2a3a4a5a6a7a8";

/**
 * 检查字符是否满足长度要求
 *
 * @param key key
 * @param len 长度
 * @returns {*} 填充后的key
 */
function checkKey(key, len = 8) {
    key += "";
    const keyLength = key.length
    if (keyLength % len !== 0) {
        for (let i = 0; i < (len - keyLength % len); i++) {
            key += " "
        }
    }
    return key
}

/**
 * 进行 AES加密， 最好是加上时间纠错，防止重放攻击及明文读取, 所有的加密都应该进行两次加密
 *
 * @param plaintext 加密明文
 * @param aseKey 密钥
 * @constructor
 */
export function SimpleEncrypt(plaintext, aseKey) {
    return encrypt(encrypt(plaintext), aseKey)
}

/**
 * 进行AES解密, 同样需要进行两次解密
 *
 * @param ciphertext
 * @param aseKey
 * @returns {*}
 * @constructor
 */
export function SimpleDecrypt(ciphertext, aseKey = DEFAULT_AES_KEY) {
    return decrypt(decrypt(ciphertext, aseKey))
}

/**
 * 对字符进行base64编码
 * @param plaintext
 * @returns {string}
 */
export function base64encode(plaintext) {
    return new Buffer.from(plaintext).toString('base64')
}


/**
 * 对字符进行base64解码
 *
 * @param ciphertext
 * @returns {string}
 */
export function base64decode(ciphertext) {
    return new Buffer.from(ciphertext, 'base64').toString();
}

export function encrypt(plaintext, aseKey = DEFAULT_AES_KEY) {
    aseKey = checkKey(aseKey)
    return CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(aseKey), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString()
}

export function decrypt(ciphertext, aseKey = DEFAULT_AES_KEY) {
    aseKey = checkKey(aseKey)
    const result = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(aseKey), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return result.toString(CryptoJS.enc.Utf8)
}

