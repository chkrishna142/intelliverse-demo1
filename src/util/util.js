// import { mappingData } from "./mappingData";

import React from 'react';
import { useLocation } from 'react-router-dom';

export function ElementData(elem) {
  // console.log("elem", elem);
  const label = elem.condition.toLowerCase();
  this.index =
    // label === "hot" ? 9 : label === "healthy" ? 5 : label === "dusty" ? 1 : 0;
    elem.index;
  this.label = label;
  this.color = label === 'hot' ? '#f00' : label === 'dusty' ? '#00f' : '#0f0';
  this.recommended_delta_coal_feedrate =
    label === 'hot'
      ? -0.2
      : label === 'dusty'
      ? 0.2
      : label === 'healthy'
      ? 0
      : 'NA';
  this.time = elem.time.split('-').join(':');
  const [date, time] = elem.photoName
    .split('photo_')[1]
    .split('.png')[0]
    .split('_');
  const timeFormatted = time.replace(/-/g, ':');
  this.dateTime = new Date(date + ' ' + timeFormatted).toLocaleString();
  const keys = [
    'area',
    'condition',
    'image',
    'perimeter',
    'photoName',
    'dateTime',
    'date',
    'probability',
    'time',
    'recommended_action',
    'predictions',
  ];
  keys.forEach((key) => {
    this[key] = elem[key];
  });
}

export const getLabel = (elem) => {
  if (elem && elem.predictions) {
    return elem.predictions[0].tagName;
  }
  return '';
};

export const getValue = (elem) => {
  if (elem && elem.predictions) {
    return elem && Math.floor(elem.predictions[0].probability * 100);

    // let label = getLabel(elem);
    // if (label === "Healthy") {
    //   return elem && Math.floor(elem.predictions[0].probability * 100);
    // } else if (label === "Dusty") {
    //   return elem && 100 - Math.floor(elem.predictions[1].probability * 100);
    // }
  }
};

export const getElementData = (elem) => {
  return new ElementData(elem);
  // console.log("ed", ed);
  // return ed;
};

export const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

function getErrorMessage() {
  return 'Error';
}

export default getErrorMessage;
