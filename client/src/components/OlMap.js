import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import styled from "styled-components";
import Map from "ol/map";
import View from "ol/view";
import TileLayer from "ol/layer/tile";
import VectorLayer from "ol/layer/vector";
import Stamen from "ol/source/stamen";
import VectorSource from "ol/source/vector";
import GeoJSON from "ol/format/geojson";
import Overlay from "ol/overlay";
import MapPopup from "./MapPopup";
import featureStyle from "./featureStyle";
import UserInfo from "./UserInfo";
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

const OlContainer = styled.div`
  height: 100%;
  background: #aad3df;
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
    const tileLayer = new TileLayer({
      preload: Infinity,
      source: new Stamen({
        layer: 'watercolor'
      })
    });

    this.vectorSource = new VectorSource();

    const vectorLayer = new VectorLayer({
      name: "FeaturesLayer",
      source: this.vectorSource,
      style: feature => featureStyle(feature, this.props.selected)
    });

    this.overlay = new Overlay({
      element: findDOMNode(this.overlayRef),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    const target = findDOMNode(this.mapRef);

    this.map = new Map({
      target,
      layers: [tileLayer, vectorLayer],
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

    this.map.on("pointermove", evt => {
      if (evt.dragging) {
        return;
      }
      target.style.cursor = this.map.hasFeatureAtPixel(evt.pixel)
        ? "pointer"
        : "";
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.features && nextProps.features.type === "FeatureCollection") {
      this.vectorSource.clear();
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
    const { selectedInfo } = this.state;
    return (
      <div className={className}>
        <OlContainer ref={el => (this.mapRef = el)} />
        <MapPopup ref={el => (this.overlayRef = el)} onClose={this.hideOverlay}>
          {selectedInfo && (
            <UserInfo user={selectedInfo} />
          )}
        </MapPopup>
      </div>
    );
  }
}

export default OlMap;
