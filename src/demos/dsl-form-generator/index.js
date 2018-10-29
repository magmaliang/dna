import React from "react";
import DSLFormGenerator from "cmps/dsl-form-pannel";
import './index.scss'

export default class DemoDslForm extends React.Component{
  constructor(options){
    super(options)
  }

  render(){
    return <div>
      <DSLFormGenerator></DSLFormGenerator>
    </div>
  }
}
