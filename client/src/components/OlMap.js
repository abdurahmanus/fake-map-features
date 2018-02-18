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

class OlMap extends Component {
  componentDidMount() {
    const osmLayer = new TileLayer({
      source: new OSMSource()
    });

    this.vectorSource = new VectorSource();

    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style(feature) {
        return new Style({
          image: new Circle({
            radius: 5,
            fill: new Fill({ color: feature.get("color") })
          })
        });
      }
    });

    const overlay = new Overlay({
      element: findDOMNode(this.popupRef),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });


    const map = new Map({
      target: this.el,
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: [0, 0],
        zoom: 4
      }),
      overlays: [overlay]
    });

    map.on("singleclick", function(evt) {
      if (!map.hasFeatureAtPixel(evt.pixel)) {
        return;
      }
      const feature = map.getFeaturesAtPixel(evt.pixel)[0];
      const geometry = feature.getGeometry();
      const coordinates = geometry.getCoordinates();
      overlay.setPosition(coordinates);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.features && nextProps.features.type === "FeatureCollection") {
      const features = new GeoJSON({
        featureProjection: "EPSG:3857"
      }).readFeatures(nextProps.features);
      this.vectorSource.addFeatures(features);
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
