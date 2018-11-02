/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-10-31 15:21:28 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-02 22:50:49
 * @Desc  属性面板
 */
import React, { Component } from "react";
import Form from "cmps/form";
import _ from "lodash";

var defaultFormDsl = {
  "createSaveUrl": {
    "method": "post",
    "params": {},
    "url": "/saveform"
  },
  "buttons": [],
  "editSaveUrl": {
    "method": "post",
    "params": {},
    "url": "/updateform"
  },
  "fetchUrl": "/getformDetail?id={id}",
  "_type": "Form",
  "_meta": {
    "status": "create"
  },
  "title": "工作组配置",
  "fields": [{
    "fieldName": "label名称",
    "validationRules": [{
      "help": "请选择类型",
      "type": "required"
    }],
    "fieldKey": "fieldName",
    "_type": "Field_Input",
    "_id": '1',
    "_meta": {
      "status": 'edit', 
      "visible": true,
      "multi": false
    },
    "validation": "required"
  }, {
    "fieldName": "默认值",
    "validationRules": [],
    "fieldKey": "defaultValue",
    "_type": "Field_Input",
    "_id": '1',
    "_meta": {
      "status": 'edit', 
      "visible": true,
      "multi": false
    },
  }, {
    "fieldName": "状态",
    "validationRules": [],
    "fieldKey": "status",
    "_type": "Field_Sug",
    "_id": '1',
    "_meta": {
      "status": 'edit', 
      "visible": true,
      "multi": false
    },
    "dataMap": [{
      'value': '编辑',
      'key': 'edit'
    },{
      'value': '展示',
      'key': 'detail'
    },{
      'value': '不可用',
      'key': 'disabled'
    }]
  }]
}

export default class FormDemo extends Component {
  constructor(options){
    super(options)
    this.state = {
      dsl: defaultFormDsl
    }
  }

  render(){
    return <>
      <div className="demo-display-block">
        <Form {...this.state.dsl}
          formDataChange = {this.formDataChange}
          formData = {this.getFormDataFromDSl()}
        ></Form>
      </div>
    </>
  }

  getFormDataFromDSl = () => {
    // get properties' value
    const {fieldDsl: dsl} = this.props;
    const proData = Object.assign({}, dsl._meta, _.pick(dsl, ['fieldName', 'defaultValue']));

    return proData;
  }

  formDataChange = (formData)=>{
    this.props.propertyChange(formData)
  }
}