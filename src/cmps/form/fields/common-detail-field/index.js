/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:50:33 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-14 15:18:51
 * @Desc: disabled field
 */
import React from "react";
import AbstractField from "../abstract-field";

export default class DisabledField extends AbstractField {
  constructor(options){
    super(options)
  }

  render(){
    let val = this.getDisplayText()
    return <div><span>{val}</span></div>
  }

  getDisplayText(){
    const { dataMap } = this.props;
    if (dataMap && dataMap.length) {
      return (dataMap.find(x=>x.key === this.props.value)||{}).value || this.props.value
    }
    return this.props.value
  }
}
