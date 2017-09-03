import React, { Component } from "react";
import PropTypes from "prop-types";

import renderHTML from "react-render-html";

import language from "../../../language.json";

import IconAudio from "./img/icon-audio.png";
import IconAtelier from "./img/icon-atelier.png";
import Info from "./img/info.png";
import Audio from "./img/audio.png";
import Atelier from "./img/atelier.png";
import IconInfo from "./img/icon-info.png";
// import Loading from "../../../../public/img/picto/default.svg";

import style from "./image-viewer.css";

export default class ImageViewer extends Component {
  static contextTypes = {
    getContainerSize: PropTypes.func.isRequired
  };
  constructor() {
    super();
    this.state = {
      imageActive: false
    };
    this.zoomImage = this.zoomImage.bind(this);
  }

  zoomImage() {
    this.setState({
      imageActive: !this.state.imageActive
    });
  }

  render() {
    const containerSize = this.context.getContainerSize();
    const itemStyle = {
      height: containerSize.height + 200,
      width: containerSize.width + 4,
      position: "relative",
      display: "inline-block",
      verticalAlign: "middle"
    };

    return (
      <div className={style["gallery-item"]} style={itemStyle}>
        <div className={style["image-border"]}>
          <img
            onClick={this.zoomImage}
            className={
              this.state.imageActive ? (
                `${style["image"]} ${style["image-active"]}`
              ) : (
                style["image"]
              )
            }
            src={this.props.data.image}
            alt={this.props.data.alt}
          />
        </div>
        <div className={style["floor"]} />
      </div>
    );
  }
}
