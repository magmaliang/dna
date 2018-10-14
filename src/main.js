import React, { Component } from "react";
import { render } from "react-dom";
import FormDemo from "demos/form";
import './index.scss';
import "antd/dist/antd.css";
import 'codemirror/lib/codemirror.css'

render(<div className="demo-container">
  <FormDemo></FormDemo>
</div>, document.getElementById('app'))