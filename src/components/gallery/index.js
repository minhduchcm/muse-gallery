import React, { Component } from "react";
import PropTypes from "prop-types";

import Control from "./control";
import Room from "./room";
import style from "./gallery.css";

class Gallery extends Component {
  static childContextTypes = {
    getContainerSize: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.goNextWall = this.goNextWall.bind(this);
    this.goPrevWall = this.goPrevWall.bind(this);
    this.goNextRoom = this.goNextRoom.bind(this);
    this.goPrevRoom = this.goPrevRoom.bind(this);
    this.goNextImage = this.goNextImage.bind(this);
    this.goPrevImage = this.goPrevImage.bind(this);
  }
  getChildContext() {
    return {
      getContainerSize: () => {
        return {
          width: this.state.width,
          height: this.state.height
        };
      }
    };
  }
  state = {
    height: undefined,
    width: undefined,
    currentRoom: 0,
    currentWall: 0,
    currentImage: 0
  };
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions() {
    this.setState({
      width: this.refs.container.clientWidth,
      height: this.refs.container.clientHeight
    });
  }
  goNextWall() {
    const { currentRoom, currentWall } = this.state;
    const { rooms } = this.props;
    let nextWallIndex = currentWall + 1;
    if (nextWallIndex === rooms[currentRoom].length) {
      nextWallIndex = 0;
    }
    return this.setState({
      currentWall: nextWallIndex,
      currentImage: 0,
      direction: "next",
      changeWall: true
    });
  }
  goPrevWall() {
    const { currentRoom, currentWall } = this.state;
    const { rooms } = this.props;
    let nextWallIndex = currentWall - 1;
    if (nextWallIndex < 0) {
      nextWallIndex = rooms[currentRoom].length - 1;
    }
    return this.setState({
      currentWall: nextWallIndex,
      currentImage: rooms[currentRoom][nextWallIndex].length - 1,
      direction: "prev",
      changeWall: true
    });
  }
  goNextRoom() {
    const { currentRoom } = this.state;
    const { rooms } = this.props;
    let nextRoomIndex = currentRoom + 1;
    if (nextRoomIndex === rooms.length) {
      nextRoomIndex = 0;
    }
    return this.setState({
      currentRoom: nextRoomIndex,
      currentWall: 0,
      currentImage: 0,
      direction: "next",
      changeWall: true
    });
  }
  goPrevRoom() {
    const { currentRoom } = this.state;
    const { rooms } = this.props;
    let nextRoomIndex = currentRoom - 1;
    if (nextRoomIndex < 0) {
      nextRoomIndex = rooms.length - 1;
    }
    return this.setState({
      currentRoom: nextRoomIndex,
      currentWall: rooms[nextRoomIndex].length - 1,
      currentImage:
        rooms[nextRoomIndex][rooms[nextRoomIndex].length - 1].length - 1,
      direction: "prev",
      changeWall: true
    });
  }
  goNextImage() {
    const { currentRoom, currentWall, currentImage } = this.state;
    const { rooms } = this.props;
    let changeWall = false;
    let nextImageIndex = currentImage + 1,
      nextWallIndex = currentWall;
    if (nextImageIndex === rooms[currentRoom][currentWall].length) {
      nextWallIndex += 1;
      if (nextWallIndex === rooms[currentRoom].length) {
        nextWallIndex = 0;
      }
      changeWall = true;
      nextImageIndex = 0;
    }
    return this.setState({
      currentWall: nextWallIndex,
      currentImage: nextImageIndex,
      direction: "next",
      changeWall: changeWall
    });
  }
  goPrevImage() {
    const { currentRoom, currentWall, currentImage } = this.state;
    const { rooms } = this.props;
    let changeWall = false;
    let nextImageIndex = currentImage - 1,
      nextWallIndex = currentWall;
    if (nextImageIndex < 0) {
      nextWallIndex -= 1;
      if (nextWallIndex < 0) {
        nextWallIndex = rooms[currentRoom].length - 1;
      }
      changeWall = true;
      nextImageIndex = rooms[currentRoom][nextWallIndex].length - 1;
    }
    return this.setState({
      currentWall: nextWallIndex,
      currentImage: nextImageIndex,
      direction: "prev",
      changeWall: changeWall
    });
  }
  renderRoom() {
    const {
      currentRoom,
      currentWall,
      currentImage,
      direction,
      changeWall
    } = this.state;
    const { rooms } = this.props;
    const wall = {
      direction: direction,
      changeWall: changeWall,
      roomIndex: currentRoom,
      wallIndex: currentWall,
      imageIndex: currentImage,
      image: rooms[currentRoom][currentWall][currentImage]
    };
    return <Room {...wall} />;
  }
  render() {
    const { width, currentRoom, currentWall, currentImage } = this.state;
    const { rooms } = this.props;
    return (
      <div className={style.container} ref="container">
        {width && rooms && this.renderRoom()}
        {width &&
        rooms && (
          <Control
            currentRoom={currentRoom}
            currentImage={
              rooms[currentRoom]
                .filter((r, i) => i < currentWall)
                .reduce((acc, room) => (acc += room.length), 0) +
              currentImage +
              1
            }
            canGoNextRoom={currentRoom < rooms.length - 1}
            canGoPrevRoom={currentRoom > 0}
            goNextImage={this.goNextImage}
            goPrevImage={this.goPrevImage}
            goNextRoom={this.goNextRoom}
            goPrevRoom={this.goPrevRoom}
            nbRoomx={this.props.nbRoom}
            nbImage={rooms[currentRoom].reduce(
              (acc, room) => (acc += room.length),
              0
            )}
          />
        )}
      </div>
    );
  }
}

Gallery.propTypes = {};

export default Gallery;
