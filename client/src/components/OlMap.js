import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import styled from "styled-components";
import Map from "ol/map";
import View from "ol/view";
import TileLayer from "ol/layer/tile";
import VectorLayer from "ol/layer/vector";
import OSMSource from "ol/source/osm";
import VectorSource from "ol/source/vector";
import GeoJSON from "ol/format/geojson";
import Style from "ol/style/style";
import Fill from "ol/style/fill";
import Circle from "ol/style/circle";
import Overlay from "ol/overlay";
import MapPopup from "./MapPopup";
import "ol/ol.css";

function getFeatureCoordinates(feature) {
  const geometry = feature.getGeometry();
  return geometry.getCoordinates();
}

function zoomMapToFeature(map, feature) {
  map.getView().animate({
    zoom: 10,
    center: getFeatureCoordinates(feature)
  });
}

const featureStyle = (function() {
  const styleCache = Object.create(null);
  return function(feature) {
    const color = feature.get("color");
    if (!styleCache[color]) {
      styleCache[color] = new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({ color })
        })
      });
    }
    return styleCache[color];
  };
})();

const OlContainer = styled.div`
  height: 100%;
`;

class OlMap extends Component {
  constructor(props) {
    super(props);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.state = {
      selectedInfo: null
    };
  }

  componentDidMount() {
    const osmLayer = new TileLayer({
      source: new OSMSource()
    });

    this.vectorSource = new VectorSource();

    const vectorLayer = new VectorLayer({
      name: "FeaturesLayer",
      source: this.vectorSource,
      style: featureStyle
    });

    this.overlay = new Overlay({
      element: findDOMNode(this.overlayRef),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.map = new Map({
      target: findDOMNode(this.mapRef),
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: [0, 0],
        zoom: 4
      }),
      overlays: [this.overlay]
    });

    this.map.on("singleclick", evt => {
      if (!this.map.hasFeatureAtPixel(evt.pixel)) {
        return;
      }
      const feature = this.map.getFeaturesAtPixel(evt.pixel)[0];
      this.showOverlay(feature);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.features && nextProps.features.type === "FeatureCollection") {
      const features = new GeoJSON({
        featureProjection: "EPSG:3857"
      }).readFeatures(nextProps.features);
      this.vectorSource.addFeatures(features);
    }
    if (nextProps.selected !== undefined) {
      const feature = this.vectorSource.getFeatureById(nextProps.selected);
      if (feature) {
        zoomMapToFeature(this.map, feature);
        this.showOverlay(feature);
      }
    }
  }

  showOverlay(feature) {
    this.overlay.setPosition(getFeatureCoordinates(feature));
    this.setState(() => ({
      selectedInfo: {
        userName: feature.get("userName"),
        email: feature.get("email")
      }
    }));
  }

  hideOverlay() {
    this.overlay.setPosition(undefined);
  }

  render() {
    const { className } = this.props;
    const selectedInfo = this.state.selectedInfo && (
      <div>
        <div>{this.state.selectedInfo.userName}</div>
        <div>{this.state.selectedInfo.email}</div>
      </div>
    );
    return (
      <div className={className}>
        <OlContainer ref={el => (this.mapRef = el)} />
        <MapPopup ref={el => (this.overlayRef = el)} onClose={this.hideOverlay}>
          {selectedInfo}
        </MapPopup>
      </div>
    );
  }
}

export default OlMap;
