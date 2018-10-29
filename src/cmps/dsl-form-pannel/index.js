import React from "react";
import StagePannel from "./sub-pannel/stage-pannel";
import ElementPannel from "./sub-pannel/element-pannel";
import "./index.scss"
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default class DSLFormGenerator extends React.Component {
  constructor(options){
    super(options)
    this.state = {
      formDslData: []
    }
  }

  render(){
    return <>
      <div className="dsl-generator dsl-generator-form">
        <div className="dsl-elements-container">
          <ElementPannel addAvatar={this.addAvatar}></ElementPannel>
        </div>
        <div className="dsl-state-pannel">
          <StagePannel 
            layouts={{lg: this.state.formDslData}}
            onLayoutChange={this.onLayoutChange}
          ></StagePannel>
        </div>
      </div>
    </>
  }

  addAvatar = ()=>{
    this.state.formDslData.push({
      x: 0, y: 0, w: 2, h: 1, i: this.state.formDslData.length.toString()
    })
    this.setState({})
  }

  onLayoutChange = (layout)=>{
    console.log(layout)
  }
}