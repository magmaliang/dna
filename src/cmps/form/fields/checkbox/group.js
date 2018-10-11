/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 17:24:59 
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2018-08-28 12:37:21
 */

import React from 'react';
import AbstractField from '../abstract-field';
import { Checkbox } from 'antd';

// const CheckboxGroup = Checkbox.Group;

export default class FieldCheckboxGroup extends AbstractField {
  constructor() {
    super()
  }

  render() {
    const options = this.props.dataMap.map((item) => {
      return {
        ...item,
        label: item.key,
      }
    })

    return (
      <Checkbox.Group options={options} {...this.filterProps()}/>
    )
  }
}