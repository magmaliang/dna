import React, { Component } from "react";
import { DnaBasicForm } from '@dna-js/dna-form';
import * as CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/mode/javascript/javascript'

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
  "regions": [{
    "header": {
      "visible": true,
      "title": "工单列表"
    },
    "_meta": {
      "layout": "triple"
    },
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
        "status": 'edit', //'disabled/edit/detail',不写的时候从父组件继承
        "visiable": true,
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
          },{
            "_cmp": '3', /*使用组件的id*/
            "action": 'disable' 
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
          },{
            "_cmp": '3', /*使用组件的id*/
            "action": 'enable' 
          }]
        }
      ]
    },{
      "fieldName": "性别",
      "validationRules": [],
      "fieldKey": "gender",
      "dataMap": ["/getGender"],
      "_type": "Field_Radio",
      "_id": '4',
      "_meta": {
        "visible": true,
        "status": "edit",
        "multi": false
      },
      "configEnum": "",
      "validation": "",
      "defaultValue": "ascasc",
    }, {
      "fieldName": "工作组ID",
      "validationRules": [],
      "fieldKey": "id",
      "dataMap": [],
      "_type": "Field_Input",
      "_id": '2',
      "_meta": {
        "visible": true,
        "status": "edit",
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
        "status": "edit",
        "multi": false
      },
      "configEnum": "",
      "validation": "required"
    }]
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

    return <div className="page json-design">
      <div className="input-block">
        <textarea
          id="editor"
          className="form-control"
          value={this.state.dslText}
          onChange={this.jsonChange}
        ></textarea>
      </div>
      <div className="demo-display-block">
        <DnaBasicForm {...this.state.dsl} dnaContext={dnaContext}></DnaBasicForm>
      </div>
    </div>
  }

  componentDidMount(){
    let myTextarea = document.getElementById('editor');
    this.CodeMirrorEditor = CodeMirror.fromTextArea(myTextarea, {
      mode: {name:'javascript', json: true},//编辑器语言
      theme: 'monokai', //编辑器主题
      extraKeys: {"Ctrl": "autocomplete"},//ctrl可以弹出选择项 
      lineNumbers: true //显示行号,
    });

    this.CodeMirrorEditor.on('change', this.jsonChange)
  }

  jsonChange = (codemirror, event)=>{
    let value = codemirror.doc.getValue();
    try {
      this.setState({dsl: JSON.parse(value)})
    } catch (error) {
      console.warn('unresonable json string!');
    }
  }
}