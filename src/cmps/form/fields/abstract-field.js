/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-27 17:57:35 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2018-09-01 15:06:54
 * @desc 抽象类组件，对field组件的通用行为进行统一管理
 * 所有field组件都是受控组件
 */
import React,{ Component } from "react";

/**
 * 
 * @param {*} object 
 * @param {*} keys 
 * get specified keys as an object from an Object
 */
function pickKeys(object, keys) {
  let rs = {};

  Object.keys(object).forEach(x=>{
    // maybe a bug: object[x] === 0 or object[x] === false
    if (keys.includes(x) && object[x]) {
      rs[x] = object[x]
    }
  })

  return rs;
}

export default class AbstractField extends Component {
  constructor(options) {
    super(options)
  }

  fieldChange = (value, addtion)=>{
    this.props.fieldChange(this.props, value, addtion)
  }

  filterProps(defalutValue = ''){
    return Object.assign(pickKeys(this.props, ['id', '_type', 'value']), {
      onChange: this.fieldChange
    })
  }
}
