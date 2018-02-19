import Style from "ol/style/style";
import Circle from "ol/style/circle";
import Stroke from "ol/style/stroke";
import Fill from "ol/style/fill";

const styleCache = Object.create(null);
const selectedStyle = new Style({
  image: new Circle({
    radius: 9,
    stroke: new Stroke({ color: "#ff31f9", width: 2 })
  })
});

export default function featureStyle(feature, selected) {
  const color = feature.get("color");
  if (!styleCache[color]) {
    styleCache[color] = new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({ color })
      })
    });
  }
  return feature.get("id") === selected
    ? [selectedStyle, styleCache[color]]
    : styleCache[color];
};
