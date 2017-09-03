import React, { Component } from "react";
import PropTypes from "prop-types";

class Gallery extends Component {
  componentDidMount() {}

  render() {
    return <div>{JSON.stringify(this.props)}</div>;
  }
}

Gallery.propTypes = {};

export default Gallery;
