/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2018-08-20 16:45:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-14 14:49:23
 * @desc: fields map exports
 */
import React from "react";
import FieldInput from "./input";
import FieldCheckbox from "./checkbox";
import FieldSugest from "./sugest";
import GroupTree from "./group-tree";
import DetailField from "./common-detail-field";
import FieldRadio from "./radio-group";

class NullType extends React.Component{
  constructor(options){
    super(options)
  }
  render(){
    return <div> component {this.props._type} is not defined</div>
  }
}

const map =  {
  Field_Input: FieldInput,
  Field_GroupTree: GroupTree,
  Field_Checkbox: FieldCheckbox.Group,
  Field_Sug: FieldSugest,
  Field_DetailField: DetailField,
  Field_Radio: FieldRadio
}

export default {
  getDef(type){
    return map[type] || NullType
  },
  getDefFromField (field) {
    let {_type: type} = field;
    return map[type] || NullType
  },
  /**
   * 
   * @param {string} type 
   * @param {cmp} cmp 
   * warnning: maybe overwrite old type
   */
  register(type, cmp){
    map[type] = cmp;
  }
}