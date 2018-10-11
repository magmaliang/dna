/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:50:33 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2018-09-20 15:17:33
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
  }
}
