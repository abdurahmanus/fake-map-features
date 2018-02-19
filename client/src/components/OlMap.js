import React, { Component } from "react";
import { findDOMNode } from "react-dom";
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
  }
})();

class OlMap extends Component {
  componentDidMount() {
    const osmLayer = new TileLayer({
      source: new OSMSource()
    });

    this.vectorSource = new VectorSource();

    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: featureStyle
    });

    this.overlay = new Overlay({
      element: findDOMNode(this.popupRef),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.map = new Map({
      target: this.el,
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: [0, 0],
        zoom: 4
      }),
      overlays: [this.overlay]
    });

    this.map.on("singleclick", (evt) => {
      if (!this.map.hasFeatureAtPixel(evt.pixel)) {
        return;
      }
      const feature = this.map.getFeaturesAtPixel(evt.pixel)[0];
      this.overlay.setPosition(getFeatureCoordinates(feature));
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.features && nextProps.features.type === "FeatureCollection") {
      const features = new GeoJSON({
        featureProjection: "EPSG:3857"
      }).readFeatures(nextProps.features);
      this.vectorSource.addFeatures(features);
    }
    if (nextProps.selected) {
      const feature = this.vectorSource.getFeatureById(nextProps.selected);
      if (feature) {
        zoomMapToFeature(this.map, feature);
        this.overlay.setPosition(getFeatureCoordinates(feature));
      }
    }
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <div style={{ height: "100%" }} ref={el => (this.el = el)} />
        <MapPopup ref={el => (this.popupRef = el)} text="Hello, world"/>
      </div>
    );
  }
}

export default OlMap;
