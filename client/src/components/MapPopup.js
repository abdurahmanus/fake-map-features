import React, { Component } from "react";
import "./popup.css";

class MapPopup extends Component {
  render() {
    const { text } = this.props;
    return (
      <div ref={el => (this.popupRef = el)} className="ol-popup">
        <button className="ol-popup-closer"></button>
        <div>{text}</div>
      </div>
    );
  }
}

export default MapPopup;
