/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-22 15:34:20 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2018-09-01 15:05:17
 */
import schema from "async-validator";

export function formatRules(rules, fieldName){
  let adapted = [];

  rules.forEach(x=>{
    if (typeof x === 'string') {
      switch (x) {
        case 'required':
          adapted.push({
            required: true,
            message: `${x} 为必填字段`,
          })
          break;
        case 'mail':
          adapted.push({
            type: 'mail',
            message: `${x} 字段必须输入为邮箱格式`,
          })
          break;
        case 'string':
          adapted.push({
            type: 'string',
            message: `${x} 字段必须输入为字符`,
          })
          break;
        case 'array':
          adapted.push({
            required: true,
            type: 'array',
            message: `${x} 字段必须输入为数组`,
          })
          break;
        default:
          throw new Error(`不能识别的验证规则： ${x}`)
          break;
      }
    } else {
      if (x.type === 'regexp') {
        adapted.push({
          validator: (rule, value, callback) => {
            if (value && typeof value !== 'string') {
              throw new Error('value must be a string')
            }
            
            // 正则验证
            let reg = new RegExp(x.rule)
            if (reg.test(value)) {
              callback()
              return
            } 
            callback(x.help)
          }
        })
      } else if (x.type === 'required') {
        adapted.push({
          required: true,
          message: x. help || `${fieldName} 为必填字段`,
        })
      }
    }
  })

  return adapted;
}

export function validating(data, rules) {
  return new Promise((resolve, reject)=>{
    var validator = new schema(rules);
    validator.validate(data, (errors, fields) => {
      if (errors) {
        reject(fields)
      }
      resolve()
    });
  })
}