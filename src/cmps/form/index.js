/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-28 12:24:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-02 22:52:48
 * @desc： dnaform 
 */

import React,{ Component } from "react";
import PropTypes from "prop-types";
import {  Form, Button } from "antd";
const FormItem = Form.Item;
import Fields from "./fields";
import {validating, formatRules} from "./fields/validator";
import {pickKeys, getKey, filterFields, getUrlFromUrlObj, contextFill} from "./utils";
import request from "utils/request";
import fieldsXActionHandler from "./core/x-actions";

// layout set
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 6,
    },
  },
};

class DnaForm extends Component {
  constructor(options){
    super(options)

    this.state = {
      status: getKey(options, '_meta.status'),
      fields: filterFields(this.props.fields),
      // form的数据
      formData: {},
      // 统一的数据源
      dataMap: {},
      // 统一的验证规则,
      validators: [],
      validatorRs: {},
      // 字段实时验证
      fieldAutoValidator: false
    }
    // create的表单需要显示默认值
    if (this.state.status === 'create') {
      this.state.formData = this.collectDefaultValue()
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      fields: filterFields(nextProps.fields),
      formData: nextProps.formData
    }, ()=>{
      this.collectValidators()
      this.fillDataMap()
      this.tryFetchData()
    })
  }

  componentDidMount(){
    this.collectValidators()
    this.fillDataMap()
    this.tryFetchData()
  }

  render() {
    return (<Form onSubmit={this.handleSubmit}>
      {this.createFields()}
      <FormItem {...tailFormItemLayout}>
        <div style={{textAlign: 'right'}}>
          <Button type="primary" htmlType="submit" style={{marginRight: '5px'}}>保存</Button>
          <Button type="primary" onClick={this.props.buttonCancel}>取消</Button>
        </div>
      </FormItem>
    </Form>)
  }

  getFormMeta(){
    return {formContext: pickKeys(this.props, ['_meta', '_type'])} 
  }

  /**
   * 生成field
   */
  createFields(){
    const { formData ,fields} = this.state;
    return fields.filter(x=>x._meta.visible).map((x, index) => {
      // 1. 计算Item相关
      let itemProps = {
        ...formItemLayout,
        label: x.fieldName
      }

      // 如果 验证规则中存在必填
      if ((this.state.validators[x.fieldKey]||[]).find(x=>x.required)) {
        itemProps.required = true
      }

      // 验证失败msg
      if (this.state.validatorRs[x.fieldKey]) {
        itemProps.help = this.state.validatorRs[x.fieldKey][0].message
        itemProps.validateStatus = 'error'
      }

      // 2. 计算 Cmp相关, form的status会作为默认值传给Field
      let Cmp = Fields.getDefFromField(x, this.getFormMeta());

      let fieldProps = Object.assign({}, x, {
        _type: x._type,
        _meta: x._meta,
        value: formData[x.fieldKey],
        fieldKey: x.fieldKey
      })

      // 如果组件有dataMap, 则从state.Map中取得填充后的dataMap
      if (x.dataMap && x.dataMap.length > 0) {
        fieldProps.dataMap = this.state.dataMap[x.fieldKey] || []
        fieldProps._dataMap = x.dataMap
      }


      return <FormItem
        {...itemProps}
        key={index}
      >
        <Cmp {...fieldProps} fieldChange={this.setFieldValue} />
      </FormItem>
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    validating(this.state.formData, this.state.validators).then(res => {
      this.formSave()
    }).catch(err => {
      // err 回显示
     this.setState({
       validatorRs: err,
       fieldAutoValidator: true
     })
    })
  }

  // field子组件数据更新时的回调
  setFieldValue = (fieldInfo, value)=>{
    let fieldKey = fieldInfo.fieldKey;
    // console.log(`${fieldKey}:  ${value}`)
    this.state.formData[fieldKey] = value;

    // 1. just in time validator
    if (this.state.fieldAutoValidator) {
      validating({[fieldKey] : value}, {[fieldKey]: this.state.validators[fieldKey]})
      .then(res => {
        this.state.validatorRs[fieldKey] = null;
        this.setState({})
      })
      .catch(err => {
        Object.assign(this.state.validatorRs, err)
        this.setState({})
      })
    }

    // 2. deal with xaction 
    if (fieldInfo.xactions) {
      let matchedAction = fieldInfo.xactions.filter(x=>x.source.action === 'valueChange');
      if (matchedAction && matchedAction.length > 0) {
        fieldsXActionHandler(this.state.fields, {
          fieldInfo,
          action: matchedAction,
          eventName: 'valueChange',
          value
        })
      }
    }
    
    this.setState({}, () => {
      if (this.props.formDataChange) {
        this.props.formDataChange(this.state.formData)
      }
    })
  }
  
  /**
   * form 保存里逻辑，成功失败的回调从props中读取
   * 鉴于后端需要使用form data的格式进行保存
   * @param {*} values 
   */
  formSave(){
    let values = Object.assign({}, this.state.formData);

    // 保存时数组要join(',')
    Object.keys(values).forEach(x=>{
      if (Array.isArray(values[x])) {
        values[x] = values[x].join(',')
      }
    })

    let urlObj = this.state.status === 'create' ? this.props.createSaveUrl : this.props.editSaveUrl;
    let url =  getUrlFromUrlObj(urlObj, values)
    
    request.post(url, {formData: JSON.stringify(values)}).then(res => {
      if (this.props.saveSuccessed) {
        this.props.saveSuccessed(res)
      }
    }).catch(err=>{
      if (this.props.saveFailed) {
        this.props.saveFailed(res)
      }
    })
  }

  /**
   * 表单处于编辑状态及传入了数据的id，则开始获取表单的数据，并入到field的default value中
   */
  tryFetchData(){
    // 非编辑态，不需要获取表单数据
    if (this.state.status !== 'edit') {
      return
    }
    // 没有id，也不获取
    if (!this.props.id) {
      return
    }

    
    let url = getUrlFromUrlObj(this.props.fetchUrl, {id: this.props.id})
    // 请在request中统一处理异常
    request.get(url).then(res => {
      this.setState({formData: res})
    })
  }

  /**
   * 提取所有field的dataMap并进行格式化，父组件托管dataMap的请求
   */
  fillDataMap = ()=>{
    let fieldsWithDataMap = this.state.fields.filter(x => x.dataMap && x.dataMap.length > 0);
    fieldsWithDataMap.forEach(x=>{
      // 直接可用的dataMap
      if (typeof x.dataMap[0] == 'object') {
        this.state.dataMap[x.fieldKey] = x.dataMap;
        this.setState({})
        // urlObj形式存在的dataMap,需要请求后进行填充
      } else {
        let url = getUrlFromUrlObj(x.dataMap[0], this.formData)
        request.get(url).then(res => {
          this.state.dataMap[x.fieldKey] = res.data;
          this.setState({})
        })
      }
    })
  }

  collectValidators = ()=>{
    let rules = {}
    this.state.fields.filter(x => x.validationRules && x.validationRules.length > 0).forEach(x => {
      rules[x.fieldKey] = formatRules(x.validationRules, x.fieldName)
    })
    this.setState({validators: rules})
    return rules
  }

  /**
   * 收集默认值，注意，创建表单时是否展示默认值与表单的状态（create, edit）有逻辑关系
   * 放在form中收集的原因：默认值中存在占位符语法
   */
  collectDefaultValue = ()=>{
    let values = {}
    this.state.fields.forEach(x => {
      if (x.hasOwnProperty('defaultValue')) {
        values[x.fieldKey] = contextFill(x.defaultValue, {}, this.props.dnaContext)
      }
    })
    console.log('default-value: ', values)
    return values
  }
}

DnaForm.propTypes = {
  // 点击取消按钮时回调
  buttonCancel: PropTypes.func,
  // 请求方法体中需要有post,get的请求
  // request: PropTypes.func,
  // saveSuccessed: PropTypes.func,
  // saveFailed: PropTypes.func,
}

export {DnaForm as default}