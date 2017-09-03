import React from "react";
import Eye from "../../../../public/img/picto/eye-large.png";
import EyeBlue from "../../../../public/img/picto/eye-large-blue.png";

class IconEye extends React.Component {
  constructor() {
    super();
    this.state = {
      icon: false
    };
    this.changeIcon = this.changeIcon.bind(this);
  }
  changeIcon() {
    this.setState({ icon: true });
  }
  render() {
    return (
      <span onMouseOver={this.changeIcon}>
        <img src={this.state.icon ? EyeBlue : Eye} alt="Icon-eye" />&nbsp;&nbsp;
      </span>
    );
  }
}
export default IconEye;
