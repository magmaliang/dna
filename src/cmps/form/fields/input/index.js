/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:50:33 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2018-08-29 03:33:32
 * @Desc: Field_Input field, write this for a sample
 */
import React from "react";
import AbstractField from "../abstract-field";
import { Input } from "antd";

export default class FieldInput extends AbstractField {
  constructor(options){
    super(options)
  }

  render(){
    return <Input {...this.filterProps()}/>
  }

  fieldChange = (value, addtion) => {
    if (value && value.target) {
      this.props.fieldChange(this.props, value.target.value, addtion)
    }
  }
}
