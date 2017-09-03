import React, { Component } from "react";
import PropTypes from "prop-types";

import { fetchGalleryData } from "../../api";

class Gallery extends Component {
  componentDidMount() {
    fetchGalleryData();
  }

  render() {
    return <div>Hello World</div>;
  }
}

Gallery.propTypes = {};

export default Gallery;
