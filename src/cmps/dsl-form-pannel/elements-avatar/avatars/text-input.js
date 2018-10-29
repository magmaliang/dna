import React from "react";
import { Input, Form } from "antd";

export default class DSLInputDemo extends React.Component{
  render(){
    return <Form.Item label='字段名'>
      <Input placeholder="placeholder" disabled={true} />
  </Form.Item>
  }
}