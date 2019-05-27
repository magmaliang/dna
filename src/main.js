/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-27 11:48:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-27 12:18:55
 */

import React, { Component } from "react";
import { render } from "react-dom";
import JSON_DESGIN from "demos/json-design";
import DRAG_DESIGN from "demos/drag-design";

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import './index.scss';
import "antd/dist/antd.css";
import 'codemirror/lib/codemirror.css'

class TabContainer extends Component {
  constructor(options){
    super(options);
    this.state = {
      activeKey: '2'
    }
  }

  onChange = (key)=>{
    this.setState({activeKey: key});
  }

  render(){
    return <Tabs
        hideAdd
        activeKey={this.state.activeKey}
        className="dna-tabs"
        onChange={this.onChange}
      >
        <TabPane tab='json dsl' key='1'><JSON_DESGIN></JSON_DESGIN> </TabPane>
        <TabPane tab='drag dsl' key='2'><DRAG_DESIGN></DRAG_DESIGN> </TabPane>
      </Tabs>
  }
}

render(<div className="demo-container">
   <TabContainer/>
</div>, document.getElementById('app'))