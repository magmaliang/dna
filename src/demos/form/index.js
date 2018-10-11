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
    "_id": '1',
    "_meta": {
      "visible": true,
      "enable": true,
      "status": "",
      "multi": false
    },
    "configEnum": "",
    "validation": "required",
    "defaultValue": "${presetType}",
    "xactions": [
      {
        "source": {
          "action": "valueChange", /*事件类型*/ 
          "trigger": 'value == "2"' /*触发条件, 不写时表示直接触发*/
        },
        // 目标事件源信息，source 和 target 的
        "target": [{
          "_cmp": '2', /*使用组件的id*/
          "action": 'unVisible' 
        }]
      },{
        "source": {
          "action": "valueChange", /*事件类型*/ 
          "trigger": 'value != "2"' /*触发条件, 不写时表示直接触发*/
        },
        // 目标事件源信息，source 和 target 的
        "target": [{
          "_cmp": '2', /*使用组件的id*/
          "action": 'visible' 
        }]
      }
    ]
  }, {
    "fieldName": "工作组ID",
    "validationRules": [],
    "fieldKey": "id",
    "dataMap": [],
    "_type": "Field_Input",
    "_id": '2',
    "_meta": {
      "visible": true,
      "enable": true,
      "status": "",
      "multi": false
    },
    "configEnum": "",
    "validation": "",
    "defaultValue": "ascasc",
  }, {
    "fieldName": "用户组名称",
    "validationRules": [{
      "help": "请选择用户组名称",
      "type": "required"
    }],
    "fieldKey": "name",
    "dataMap": [],
    "_type": "Field_Input",
    "_id": '3',
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