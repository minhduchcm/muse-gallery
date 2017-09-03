import React, { Component } from "react";
import PropTypes from "prop-types";

import { fetchGalleryData } from "./api";

import Gallery from "./components/gallery";

class App extends Component {
  state = { loading: true, data: undefined };
  componentDidMount() {
    fetchGalleryData(
      "349464684",
      "52f3b663c746ae2ca5ffd95ba85d748e"
    ).then(data => this.setState({ loading: false, data }));
  }

  render() {
    const { loading, data } = this.state;
    if (loading) return <div>Loading</div>;
    return <Gallery {...data} />;
  }
}

App.propTypes = {};

export default App;
