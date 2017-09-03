import React from "react";
import Eye from "../../../public/img/picto/eye-large.png";
import EyeBlue from "../../../public/img/picto/eye-large-blue.png";
import IconArrowRight from "./icon-svg/icon.arrow.right.jsx";
import langue from "../../redux-reducer/translate/langue";

class BtnVisite extends React.Component {
  constructor() {
    super();
    this.state = {
      icon: false
    };
    this.iconOut = this.iconOut.bind(this);
    this.iconOver = this.iconOver.bind(this);
  }
  iconOut() {
    this.setState({ icon: false });
  }
  iconOver() {
    this.setState({ icon: true });
  }
  render() {
    return (
      <button
        onMouseOver={this.iconOver}
        onMouseOut={this.iconOut}
        data-uk-toggle="target: #expo"
        type="button"
        className="BtnPrimary"
        style={{ height: "3em", fontSize: "22px" }}
      >
        <span className="uk-visible@m">
          <img
            src={this.state.icon ? EyeBlue : Eye}
            alt="Icon-eye"
          />&nbsp;&nbsp;
        </span>
        {langue.boutonStartVisitExpo}
        &nbsp;<IconArrowRight />
      </button>
    );
  }
}
export default BtnVisite;
