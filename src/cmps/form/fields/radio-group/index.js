/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:50:33 
 * @Desc: Field_Radio
 */
import React from "react";
import AbstractField from "../abstract-field";
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class FieldRadio extends AbstractField {
  constructor(options){
    super(options)
  }

  renderOptions = () => {
    return this.props.dataMap.map(ele => {
      let opts = {value: ele.key, key: ele.key}
      if (this.props.disabled === true) {
        opts.disabled = true;
      }

      return <Radio {...opts}>{ele.value}</Radio>
    })
  }

  render(){
    return <RadioGroup {...this.filterProps()}>
      {this.renderOptions()}
    </RadioGroup>
  }

  fieldChange = (value) => {
    if (value && value.target) {
      this.props.fieldChange(this.props, value.target.value)
    }
  }
}
