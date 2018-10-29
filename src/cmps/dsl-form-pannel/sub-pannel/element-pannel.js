import React from "react";
import AvatarsMap from "../elements-avatar";

export default class ElementPannel extends React.Component {
  render(){
    return <AvatarsMap addAvatar={this.props.addAvatar}></AvatarsMap>
  }
}