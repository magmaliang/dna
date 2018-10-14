/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 19:04:38 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-14 14:00:00
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