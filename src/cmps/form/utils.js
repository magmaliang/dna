/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-31 17:06:52 
 */

 /**
 * get specified keys as an object from an Object
 * @param {*} object 
 * @param {*} keys 
 */
export function pickKeys(object, keys) {
  let rs = {};

  Object.keys(object).forEach(x=>{
    // maybe a bug: object[x] === 0 or object[x] === false
    if (keys.includes(x) && object[x]) {
      rs[x] = object[x]
    }
  })

  return rs;
}

 /**
  * 从对象obj中获取keysStr位置的对象，不存在则返回undefined
  * @param {*} obj 
  * @param {*} keysStr 
  */
export function getKey(obj, keysStr) {
  let keys = keysStr.split('.');
  while(keys.length) {
    let key = keys.shift()
    if (obj === undefined) {
      return obj;
    }
    obj = obj[key];
  }
  return obj;
}

/**
 * 格式化fields数组，主要用于添加默认值
 * @param {*} fields 
 */
export function filterFields(fields = [], parentContext = {}){
  // 补全默认值
  fields.forEach(x=>{
     x._meta = Object.assign({
       visible: true,
       status: parentContext.status,
       extendValue: true
     }, x._meta)

     // 如果是展示状态的组件，则直接转化为detail-field
     if (x._meta.status === 'detail') {
       x._originType = x._type;
       x._type = 'Field_DetailField'
     }

     if (x._meta.status === 'disabled') {
       x.disabled = true;
     }
  })

  const visibleFields = fields.filter(x => x._meta.visible)

  return visibleFields
}

/**
 * 用ctx替换string中占位符
 * tips: 只能是字符串
 * @param {*} string 
 * @param {*} ctx 
 */
export function contextFill(string, ctx, pctx={}) {
  // 替换父级上下文
  let matched = string.match(/\$\{(.)*?\}/g);
  if (matched) {
    matched.forEach(x=>{
      let tartgetField = pctx[x.replace(/\$|\{|\}/g, '')];
      if (tartgetField) {
        string = string.replace(x, tartgetField)
      }
    })
  }

  // 替换当前上下文
  matched = string.match(/\{(.)*?\}/g);
  if (matched) {
    matched.forEach(x=>{
      let tartgetField = ctx[x.replace(/\{|\}/g, '')];
      if (tartgetField) {
        string = string.replace(x, tartgetField)
      }
    })
  }

  return string
}

/**
 * 从urlObj中计算出url,不包含params的计算
 * @param {*} urlObj 
 * @param {*} ctx 
 */
export function getUrlFromUrlObj(urlObj, ctx) {
  if (typeof urlObj === 'string') {
    return contextFill(urlObj, ctx)
  }

  return contextFill(urlObj.url, ctx)
}