import React, { Component } from "react";
import PropTypes from "prop-types";

import ImageViewer from "../image-viewer";
import style from "./room.css";

class Room extends Component {
  static contextTypes = {
    getContainerSize: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      walls: [this.renderWall(props)]
    };
  }

  renderWall(props, inlineStyle = null) {
    return (
      <div
        key={"wall" + props.roomIndex + props.wallIndex + props.imageIndex}
        style={inlineStyle}
        className={style["wall"]}
      >
        <ImageViewer data={props.image} />
      </div>
    );
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.roomIndex === this.props.roomIndex &&
      nextProps.wallIndex === this.props.wallIndex &&
      nextProps.imageIndex === this.props.imageIndex
    )
      return;
    let changeWall = nextProps.changeWall;
    let direction = nextProps.direction;
    const containerSize = this.context.getContainerSize();
    let wallStyle = { transitionDuration: "0ms" };
    let nextWallStyle = {
      transitionDuration: "0ms",
      transformOrigin: `50% 50% ${containerSize.width / 2}px`
    };
    let offset = containerSize.width;
    if (changeWall) {
      let deg = 90;
      if (direction === "next") deg *= -1;
      nextWallStyle.transform = `rotate3d(0, 1, 0, ${deg}deg)`;
    } else {
      if (direction === "prev") offset *= -1;
      wallStyle.transform = `translateX(0px)`;
      nextWallStyle.transform = `translateX(${offset}px)`;
    }
    this.setState({
      changeWall,
      direction,
      walls: [
        this.renderWall(this.props, wallStyle),
        this.renderWall(nextProps, nextWallStyle)
      ]
    });
    this.lastWallData = { ...this.props };
    this.isAnimationing = true;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.isAnimationing) {
      this.isAnimationing = false;
      const containerSize = this.context.getContainerSize();

      const { changeWall, direction } = this.state;
      let wallStyle = {
        transitionDuration: "1000ms",
        transformOrigin: `50% 50% ${containerSize.width / 2}px`
      };
      let lastWallStyle = {
        transitionDuration: "1000ms",
        transformOrigin: `50% 50% ${containerSize.width / 2}px`
      };
      let offset = containerSize.width;
      if (changeWall) {
        wallStyle.transform = `rotate3d(0, 1, 0, 0deg)`;
        let deg = -90;
        if (direction === "next") deg *= -1;
        lastWallStyle.transform = `rotate3d(0, 1, 0, ${deg}deg)`;
      } else {
        if (direction === "next") offset *= -1;
        lastWallStyle.transform = `translateX(${offset}px)`;
      }
      setTimeout(
        () =>
          this.setState({
            walls: [
              this.renderWall(this.lastWallData, lastWallStyle),
              this.renderWall(this.props, wallStyle)
            ]
          }),
        50
      );
    }
  }

  render() {
    const containerSize = this.context.getContainerSize();

    const { walls } = this.state;
    return (
      <div
        className={style["room"]}
        style={{ perspective: containerSize.width }}
      >
        {walls}
      </div>
    );
  }
}

Room.propTypes = {};

export default Room;
