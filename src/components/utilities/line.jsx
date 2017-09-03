import React from "react";
import Square from "./square";

class Line extends React.Component {
  render() {
    const style = {
      line: {
        color: "red"
      },
      square: {
        marginTop: "-10%"
      }
    };
    return (
      <div style={style.line}>
        <hr />
        <Square />
      </div>
    );
  }
}
export default Line;
