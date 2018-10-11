import React, { Component } from "react";
import { Input } from "antd";
import Form from "cmps/form";

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
    "fieldName": "类型",
    "validationRules": [{
      "help": "请选择类型",
      "type": "required"
    }],
    "fieldKey": "resource",
    "dataMap": ["/getTypes"],
    "_type": "Field_Sug",
    "_meta": {
      "visible": true,
      "enable": true,
      "status": "",
      "multi": false
    },
    "configEnum": "",
    "validation": "required",
    "defaultValue": "${presetType}"
  }, {
    "fieldName": "工作组ID",
    "validationRules": [],
    "fieldKey": "id",
    "dataMap": [],
    "_type": "Field_Input",
    "_meta": {
      "visible": false,
      "enable": true,
      "status": "",
      "multi": false
    },
    "configEnum": "",
    "validation": ""
  }, {
    "fieldName": "用户组名称",
    "validationRules": [{
      "help": "请选择用户组名称",
      "type": "required"
    }],
    "fieldKey": "name",
    "dataMap": [],
    "_type": "Field_Input",
    "_meta": {
      "visible": true,
      "enable": true,
      "status": "",
      "multi": false
    },
    "configEnum": "",
    "validation": "required"
  }]
}

export default class FormDemo extends Component {
  constructor(options){
    super(options)
    this.state ={
      dsl: defaultFormDsl,
      dslText: JSON.stringify(defaultFormDsl, null, 2)
    }
  }

  render(){
    // 构建form dna的上下文,
    let dnaContext = {
      presetType: '1'
    }

    return <>
      <div className="input-block">
        <Input.TextArea 
          value={this.state.dslText}
          onChange={this.jsonChange}
        ></Input.TextArea>
      </div>
      <div className="demo-display-block">
        <Form {...this.state.dsl} dnaContext={dnaContext}></Form>
      </div>
    </>
  }

  jsonChange = (e)=>{
    let value = e.target.value;
    this.setState({dsl: JSON.parse(value), dslText: value}, ()=>{
      console.log(this.state.dsl.fields)
    })
  }
}