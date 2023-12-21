import React, { useState, useEffect } from "react";

// annotation format
// const annotations = [
//   {
//     coordinates: [
//       { x: 100, y: 100 },
//       { x: 200, y: 100 },
//       { x: 200, y: 200 },
//     ],
//     labels: [
//       { x: 150, y: 150, text: "Label 1" },
//       // Add more labels as needed
//     ],
//   },
//   // Add more annotations as needed
// ];

const ImageWithPolygons = ({ imageUrl, annotations, color, width, height }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => setImageLoaded(true);
  }, [imageUrl]);

  const renderPolygons = () => {
    return annotations.map((annotation, index) => (
      <g key={index}>
        <polygon
          points={annotation.coordinates
            .map((coord) => `${coord.x},${coord.y}`)
            .join(" ")}
          fill={hexToRgba(color, 0.4)}
          stroke={color[index]}
          strokeWidth="2"
        />
        {renderLabels(annotation, index)}
      </g>
    ));
  };

  const renderLabels = (annotation, index) => {
    return annotation.labels.map((label, labelIndex) => (
      <g key={`${index}-${labelIndex}`}>
        {/* Background rectangle */}
        <rect
          x={label.x - 14} // Adjust the x-coordinate based on your design
          y={label.y - 14} // Adjust the y-coordinate based on your design
          width="35" // Adjust the width based on your design
          height="20" // Adjust the height based on your design
          fill="white"
        />
        {/* Text */}
        <text
          x={label.x}
          y={label.y}
          fill={color[index]}
          fontSize="14"
          fontWeight="bold"
          dominantBaseline="middle" // Vertically center the text within the rectangle
          textAnchor="middle" // Horizontally center the text within the rectangle
        >
          {label.text}
        </text>
      </g>
    ));
  };
  

  const hexToRgba = (hex, alpha) => {
    const hexWithoutHash = String(hex).startsWith("#")
      ? String(hex).slice(1)
      : String(hex);
    const bigint = parseInt(hexWithoutHash, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div style={{ position: "relative" }}>
      {imageLoaded && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {renderPolygons()}
        </svg>
      )}
      <img
        src={imageUrl}
        alt="annotated"
        style={{ width: width + "px", height: height + "px" }}
      />
    </div>
  );
};

export default ImageWithPolygons;
