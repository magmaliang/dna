/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:50:33 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-02 22:45:31
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

  fieldChange = (value) => {
    if (value && value.target) {
      this.props.fieldChange(this.props, value.target.value)
    }
  }
}
