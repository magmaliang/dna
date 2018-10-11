/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 19:04:38 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2018-09-19 17:55:22
 */
import React from 'react';
import AbstractField from "../abstract-field";
import { Select } from 'antd';

const Option = Select.Option;

class FieldSelect extends AbstractField {
  constructor() {
    super();
  }

  onChange = (value, node) => {
    this.props.fieldChange(this.props, value);
  }

  renderOptions = () => {
    return this.props.dataMap.map(ele => {
      return <Option key={ele.key}>{ele.value}</Option>
    })
  }

  render() {
    if (this.props.value && !Array.isArray(this.props.value)) {
      this.onChange(this.props.value.split(','))
    }

    let opts = {}

    if (this.props._meta.multi === true) {
      opts.mode = 'multiple'
    }

    return (
      <Select
        {...opts}
        value={this.props.value}
        onChange={this.onChange}
      >
        {this.renderOptions()}
      </Select>
    );
  }
}
 
export default FieldSelect;