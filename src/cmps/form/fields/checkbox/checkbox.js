/*
 * @Author: 宋慧武 
 * @Date: 2018-08-27 17:24:59 
 * @Last Modified by: 宋慧武
 * @Last Modified time: 2018-08-27 21:19:32
 */

import React from 'react';
import AbstractField from '../abstract-field';
import { Checkbox } from 'antd';

export default class FieldCheckbox extends AbstractField {
  constructor() {
    super()
  }

  render() {
    return (
      <Checkbox {...this.filterProps()}>{this.props.dataMap[0].value}</Checkbox>
    )
  }
}