import React from "react";
import { Checkbox} from "antd";
import Avatar from "./avatar";

const CheckboxGroup = Checkbox.Group;

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' }
];

export default class CheckboxAvatar extends Avatar {
  render() {
    return  <CheckboxGroup options={options} defaultValue={['Apple']}/>
  }
}

CheckboxAvatar.dsl = {
  "fieldName": "选择框",
  "validationRules": [],
  "_type": "Field_Checkbox",
  "_meta": {
    "status": 'edit',
    "visible": true
  },
  "defaultValue": [],
  "xactions": [],
  "dataMap": []
}