const crypto = require("crypto");

// 加密
/**
 * @description:加密
 * @param algorithm 加密算法
 * @param key 秘钥
 * @param iv 偏移量
 * @return:字符串
 */
function genSign(algorithm, key, iv) {
  let sign = "";
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  sign += cipher.update(algorithm, "utf8", "hex");
  sign += cipher.final("hex");
  return sign;
}

// 解密
/**
 * @description:
 * @param sign:加密后的字符串，buffer.toString()
 * @param key 秘钥
 * @param iv 偏移量
 * @return:
 */
function deSign(sign, key, iv) {
  let src = "";
  const cipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  src += cipher.update(sign, "hex", "utf8");
  src += cipher.final("utf8");
  return src;
}

module.exports = { genSign, deSign };
