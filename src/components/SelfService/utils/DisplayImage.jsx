import React from "react";
import { useState, useEffect } from "react";
import ImageWithPolygons from "./ImageWithPolygons";

const annotationColors = [
  "#ff0000", // Red
  "#00ff00", // Green
  "#0000ff", // Blue
  "#ffff00", // Yellow
  "#ff00ff", // Magenta
  "#00ffff", // Cyan
  "#800080", // Purple
  "#008000", // Dark Green
  "#ff4500", // Orange Red
  "#4682b4", // Steel Blue
];

const DisplayImage = ({ url, annotationData, width, height }) => {
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    if (annotationData && annotationData.length > 0) {
      setAnnotations((prev) => {
        let result = [];
        annotationData?.map((item) => {
          let coordinates = [];
          let labels = [];
          item.points?.map((p) => {
            coordinates.push({
              x: p[0] * width,
              y: p[1] * height,
            });
          });
          labels.push({
            x: item.points[0][0] * width,
            y: item.points[0][1] * height,
            text: item.label,
          });
          result.push({
            coordinates: coordinates,
            labels: labels,
          });
        });
        return result;
      });
    }
  }, [annotationData, width, height]);

  return (
    <div>
      {annotations && annotations.length > 0 && (
        <ImageWithPolygons
          imageUrl={url}
          annotations={annotations}
          color={annotationColors}
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default DisplayImage;
