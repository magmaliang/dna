import React from "react";
import { Input} from "antd";
import Avatar from "./avatar";

export default class InputAvatar extends Avatar {
  render() {
    return <Input placeholder="placeholder" disabled={true} />
  }
}

InputAvatar.dsl = {
  "fieldName": "文本框",
  "validationRules": [],
  "_type": "Field_Input",
  "_meta": {
    "status": 'edit',
    "visible": true
  },
  "defaultValue": "默认值",
  "xactions": []
}