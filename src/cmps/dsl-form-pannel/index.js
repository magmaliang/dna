import React from "react";
import _ from "lodash";
import StagePannel from "./sub-pannel/stage-pannel";
import ElementPannel from "./sub-pannel/element-pannel";
import PropertyPannel from "./sub-pannel/properties-pannel";
import "./index.scss"
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default class DSLFormGenerator extends React.Component {
  constructor(options){
    super(options)
    this.state = {
      formDslData: [],
      activeAvatar: {}
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
            layout = {this.state.formDslData}
            onLayoutChange = {this.onLayoutChange}
            avatarActive = {this.avatarActive}
          ></StagePannel>
        </div>
        <div className="dsl-property-pannel">
          <PropertyPannel
            fieldDsl={this.state.activeAvatar}
            propertyChange={this.onPropertyChange}
          ></PropertyPannel>
        </div>
      </div>
    </>
  }

  /**
   * a field avatar's plus button clicked
   */
  addAvatar = (avatarDsl)=>{
    avatarDsl = JSON.parse(JSON.stringify(avatarDsl));
    let id  = this.generateCmpId(avatarDsl);
    avatarDsl._id = id;

    // get max y
    let y = 0;
    this.state.formDslData.forEach(x => {
      if (x.y > y) {
        y = x.y
      }
    });

    this.state.formDslData = this.state.formDslData.concat([{
      x: 0, y: y, w: 3, h: 1, i: id, dsl: avatarDsl
    }])

    this.setState({});
  }

  /**
   * stage field avatar active
   */
  avatarActive = (layout) => {
    const {dsl} = layout;
    console.log(dsl)
    this.setState({activeAvatar: dsl});
  }

  /**
   * create unique field id
   */
  generateCmpId = (avatarDsl) => {
    return `${avatarDsl._type}_${performance.now()}`;
  }

  /**
   * stage-pannel layout change
   */
  onLayoutChange = (layout)=>{
    // async layout
    layout.forEach(x=>{
      let fieldLayout = this.state.formDslData.find(y => y.i === x.i);
      Object.assign(fieldLayout, _.pick(x, ['x', 'y', 'w', 'h'])) 
    })
  }

  onPropertyChange = (data) => {
    this.state.activeAvatar.fieldName = data.fieldName;
    this.state.activeAvatar.defaultValue = data.defaultValue;
    Object.assign(this.state.activeAvatar._meta, _.pick(data, ['status'])) 
    this.setState({})
  }
}