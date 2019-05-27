import React from "react";
import {Form, Button } from "antd";

import InputAvatar from "./avatars/text-input";
import CheckboxAvatar from "./avatars/checkbox-group";

function avatarWrap(Avatar){
  return class Hoc extends React.Component {
    render(){
      return <div className="avatar-field">
            <Form.Item label={Avatar.dsl.fieldName}>
              <Avatar {...this.props}></Avatar>
            </Form.Item>
          <Button type="small" shape="circle" icon="plus" onClick={this.addAvatar}/>
      </div>
    }
    addAvatar = ()=> {
      this.props.addAvatar(Avatar.dsl)
    }
  }
}



export default {
  Field_Input: InputAvatar,
  Field_Checkbox: CheckboxAvatar
}