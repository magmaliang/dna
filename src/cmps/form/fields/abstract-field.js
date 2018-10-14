/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-27 17:57:35 
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

  filterProps(defalutValue = []){
    return Object.assign({value: ''}, pickKeys(this.props, ['id', '_type', 'value', 'xactions'].concat(defalutValue)), {
      onChange: this.fieldChange
    })
  }

  /**
   * check if obj is empty: null or etc
   * @param {*} obj 
   */
  isEmpty(obj){
    if (Array.isArray(obj)) {
      if (obj.length > 0) {
        return false
      }

      return true
    } 

    return !!obj;
  }
}
