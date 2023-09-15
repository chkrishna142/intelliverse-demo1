import React from "react";
import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import LiquidFillGauge from "react-liquid-gauge";

const LiquidGauge = ({moisture,r}) => {
  const startColor = "#bcd5fb"; // cornflowerblue
  const endColor = "#bcd5fb";
  const radius = r;
  const interpolate = interpolateRgb(startColor, endColor);
  const fillColor = interpolate(moisture / 100);
  const gradientStops = [
    {
      key: "0%",
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "100%",
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];
  console.log(moisture,'moisture RECEIVED')
  return (
    <LiquidFillGauge
      style={{ margin: "0 auto" }}
      width={radius * 2}
      height={radius * 2}
      value={moisture}
      percent="%"
      textSize={0.8}
      textOffsetX={0}
      textOffsetY={0}
      textRenderer={(props) => {
        const value = props && props.value ? props.value.toFixed(2) : 0;
        const radius = Math.min(props.height / 2, props.width / 2);
        const textPixels = (props.textSize * radius) / 2;
        const valueStyle = {
          fontSize: textPixels,
        };
        const percentStyle = {
          fontSize: textPixels * 0.6,
        };

        return (
          <tspan>
            <tspan className="value" style={valueStyle}>
              {value}
            </tspan>
            <tspan style={percentStyle}>{props.percent}</tspan>
          </tspan>
        );
      }}
      riseAnimation
      waveAnimation
      waveFrequency={2}
      waveAmplitude={6}
      gradient
      gradientStops={gradientStops}
      circleStyle={{
        fill: fillColor,
      }}
      waveStyle={{
        fill: fillColor,
      }}
      textStyle={{
        fill: color("#024d87").toString(),
        fontFamily: "Arial",
      }}
      waveTextStyle={{
        fill: color("#fff").toString(),
        fontFamily: "Arial",
      }}
      outerRadius="0.92"
    />
  );
};

export default LiquidGauge;
