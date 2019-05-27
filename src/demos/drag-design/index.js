/*
 * @Author: lianglongfei
 * @Date: 2019-05-27 11:57:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-27 12:16:32
 * @Desc: 可视化生成json的demo
 */

import React from "react";
import DSLFormGenerator from "cmps/dsl-form-pannel";
import './index.scss'

export default class DemoDslForm extends React.Component{
  constructor(options){
    super(options)
  }

  render(){
    return <div className='page'>
      <DSLFormGenerator></DSLFormGenerator>
    </div>
  }
}
