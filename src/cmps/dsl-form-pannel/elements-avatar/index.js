import React from "react";
import { Icon, Button} from "antd";
import InputAvatar from "./avatars/text-input";

export default class ElementAvatars extends React.Component {
  render(){
    return <>
      <div className="avatar-field">
          <InputAvatar></InputAvatar>
          <Button type="small" shape="circle" icon="plus" onClick={this.addElementAvatar}/>
      </div>
    </>
  }

  addElementAvatar = ()=>{
    this.props.addAvatar()
  }
}