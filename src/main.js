import React, { Component } from "react";
import { render } from "react-dom";
import FormDemo from "demos/form";
import FormDslDemo from "demos/dsl-form-generator";
import './index.scss';
import "antd/dist/antd.css";
import 'codemirror/lib/codemirror.css'

render(<div className="demo-container">
  <FormDslDemo></FormDslDemo>
</div>, document.getElementById('app'))