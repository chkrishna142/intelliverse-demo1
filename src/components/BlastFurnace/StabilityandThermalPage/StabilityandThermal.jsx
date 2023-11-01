import { useEffect, useRef, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  CircularProgress,
} from "@chakra-ui/react";
import Modelaccuracy from "../BF_Components/Modelaccuracy";
import StabilityInd from "./StabilityInd";
import Rca from "./Rca";
import ThermalIndicator from "./ThermalIndicator";
import Recommendations from "./Recommendations";
import Cohesivezone from "./Cohesivezone";
import { useParams } from "react-router-dom";
import Timer from "../../../util/VisionUtils/Timer";
import { BASE_URL_FOR_BF } from "../BF_Components/urlforbf";
import AlertBell from "../Alerts/AlertBell";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

const StabilityandThermal = ({
  handleTabChange,
  pageshift,
  capture,
  setCapture,
}) => {
  let param = useParams();
  const [callApi, setCallApi] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const client = param.clientId;
  // const [fetcheddata, setFetcheddata] = useState();
  // const [stabilityIndData, setStabilityIndData] = useState();
  // const [thermalIndData, setThermalIndData] = useState();

  const [serverDown1, setServerdown1] = useState(false);

  const [fetcheddata, setFetcheddata] = useState({
    stability_indicator: {
      stability_indicator_chart: [
        {
          value: 74,
        },
      ],
      stack_pressure: [
        {
          x: "PMStack Press1",
          y: [2.78, 2.88],
          z: 2.57,
        },
        {
          x: "PMStack Press2",
          y: [2.8, 2.9],
          z: 2.6,
        },
        {
          x: "PMStack Press3",
          y: [2.94, 3.04],
          z: 2.76,
        },
        {
          x: "PMStack Press4",
          y: [2.9, 3],
          z: 2.76,
        },
        {
          x: "PMStack Press5",
          y: [2.7, 2.9],
          z: 2.9,
        },
      ],
      stack_parameters: [
        {
          name: "Permeability (Darcy)",
          overallRange: [2.4, 3.1],
          optimalRange: [2.6, 2.7],
          currentValue: 2.79,
          impactOnProduction: 11,
          description: "PMPermeabilityJSPL",
        },
        {
          name: "Pressure Furnace Top",
          overallRange: [2.3, 2.7],
          optimalRange: [2.52, 2.57],
          currentValue: 2.36,
          impactOnProduction: 69,
          description: "PT5320",
        },
        {
          name: "Differential Pressure",
          overallRange: [1.6, 1.9],
          optimalRange: [1.72, 1.82],
          currentValue: 1.81,
          impactOnProduction: 1,
          description: "PMDifferentialPress",
        },
        {
          name: "Middle differential pressure",
          overallRange: [0.2, 0.7],
          optimalRange: [0.29, 0.39],
          currentValue: 0.34,
          impactOnProduction: 0,
          description: "DIFF_PRESS_MID",
        },
        {
          name: "Bottom differential pressure",
          overallRange: [0.7, 1.4],
          optimalRange: [1.05, 1.25],
          currentValue: 1.26,
          impactOnProduction: 0,
          description: "DIFF_PRESS_BOT",
        },
      ],
    },
    thermal_indicator: {
      thermal_indicator_chart: [
        {
          max_temperature: 100,
          temperature: 19,
        },
      ],
      target_ranges_for_stave_temp: [
        {
          x: "T1 +19378 R6",
          y: [49, 55],
          z: 57.5,
        },
        {
          x: "T2 +19666 R6",
          y: [48, 55],
          z: 57.8,
        },
        {
          x: "T3 +21934 R7",
          y: [60, 70],
          z: 79.4,
        },
        {
          x: "T4 +22222 R7",
          y: [64, 75],
          z: 84.5,
        },
        {
          x: "T5 +24301 R8",
          y: [55, 70],
          z: 79.4,
        },
        {
          x: "T6 +24589 R8",
          y: [60, 77],
          z: 85.6,
        },
        {
          x: "T7 +26501 R9",
          y: [61, 71],
          z: 82.8,
        },
        {
          x: "T8 +26789 R9",
          y: [65, 76],
          z: 89,
        },
        {
          x: "T9 +28476 R10",
          y: [67, 72],
          z: 78.9,
        },
        {
          x: "T10 +28764 R10",
          y: [72, 77.5],
          z: 83.3,
        },
        {
          x: "T11 +30676 R11",
          y: [66, 71.5],
          z: 76.35,
        },
        {
          x: "T12 +30964 R11",
          y: [72, 78],
          z: 81.4,
        },
        {
          x: "T13 +30901 R11",
          y: [68, 74],
          z: 78.3,
        },
        {
          x: "T14 +31074 R11",
          y: [71, 77],
          z: 82.2,
        },
        {
          x: "T15 +33715 R12",
          y: [95, 112],
          z: 98.5,
        },
        {
          x: "T16 +36210 R13",
          y: [75, 94],
          z: 68.75,
        },
        {
          x: "T17 +38864 R14",
          y: [66, 78],
          z: 49.1,
        },
        {
          x: "T18 +41807 R15",
          y: [50, 60],
          z: 44,
        },
      ],
      thermal_heat_map: [
        {
          name: "T1 +19378 R6",
          data: [60, 57, 55, 57],
          optimal_range: [49, 55],
        },
        {
          name: "T2 +19666 R6",
          data: [59, 57, 56, 57],
          optimal_range: [48, 55],
        },
        {
          name: "T3 +21934 R7",
          data: [71, 88, 94, 76],
          optimal_range: [60, 70],
        },
        {
          name: "T4 +22222 R7",
          data: [78, 85, 97, 87],
          optimal_range: [64, 75],
        },
        {
          name: "T5 +24301 R8",
          data: [75, 81, 83, 67],
          optimal_range: [55, 70],
        },
        {
          name: "T6 +24589 R8",
          data: [74, 92, 90, 75],
          optimal_range: [60, 77],
        },
        {
          name: "T7 +26501 R9",
          data: [82, 85, 81, 86],
          optimal_range: [61, 71],
        },
        {
          name: "T8 +26789 R9",
          data: [85, 87, 90, 88],
          optimal_range: [65, 76],
        },
        {
          name: "T9 +28476 R10",
          data: [76, 80, 80, 82],
          optimal_range: [67, 72],
        },
        {
          name: "T10 +28764 R10",
          data: [80, 84, 87, 83],
          optimal_range: [72, 77.5],
        },
        {
          name: "T11 +30676 R11",
          data: [75, 77, 77, 72],
          optimal_range: [66, 71.5],
        },
        {
          name: "T12 +30964 R11",
          data: [80, 83, 82, 76],
          optimal_range: [72, 78],
        },
        {
          name: "T13 +30901 R11",
          data: [78, 78, 79, 78],
          optimal_range: [68, 74],
        },
        {
          name: "T14 +31074 R11",
          data: [79, 83, 82, 83],
          optimal_range: [71, 77],
        },
        {
          name: "T15 +33715 R12",
          data: [101, 102, 98, 78],
          optimal_range: [95, 112],
        },
        {
          name: "T16 +36210 R13",
          data: [74, 74, 81, 51],
          optimal_range: [75, 94],
        },
        {
          name: "T17 +38864 R14",
          data: [47, 46, 53, 50],
          optimal_range: [66, 78],
        },
        {
          name: "T18 +41807 R15",
          data: [44, 43, 44, 44],
          optimal_range: [50, 60],
        },
      ],
    },
  });
  const [stabilityIndData, setStabilityIndData] = useState({
    stability_indicator_chart: [
      {
        value: 74,
      },
    ],
    stack_pressure: [
      {
        x: "PMStack Press1",
        y: [2.78, 2.88],
        z: 2.57,
      },
      {
        x: "PMStack Press2",
        y: [2.8, 2.9],
        z: 2.6,
      },
      {
        x: "PMStack Press3",
        y: [2.94, 3.04],
        z: 2.76,
      },
      {
        x: "PMStack Press4",
        y: [2.9, 3],
        z: 2.76,
      },
      {
        x: "PMStack Press5",
        y: [2.7, 2.9],
        z: 2.9,
      },
    ],
    stack_parameters: [
      {
        name: "Permeability (Darcy)",
        overallRange: [2.4, 3.1],
        optimalRange: [2.6, 2.7],
        currentValue: 2.79,
        impactOnProduction: 11,
        description: "PMPermeabilityJSPL",
      },
      {
        name: "Pressure Furnace Top",
        overallRange: [2.3, 2.7],
        optimalRange: [2.52, 2.57],
        currentValue: 2.36,
        impactOnProduction: 69,
        description: "PT5320",
      },
      {
        name: "Differential Pressure",
        overallRange: [1.6, 1.9],
        optimalRange: [1.72, 1.82],
        currentValue: 1.81,
        impactOnProduction: 1,
        description: "PMDifferentialPress",
      },
      {
        name: "Middle differential pressure",
        overallRange: [0.2, 0.7],
        optimalRange: [0.29, 0.39],
        currentValue: 0.34,
        impactOnProduction: 0,
        description: "DIFF_PRESS_MID",
      },
      {
        name: "Bottom differential pressure",
        overallRange: [0.7, 1.4],
        optimalRange: [1.05, 1.25],
        currentValue: 1.26,
        impactOnProduction: 0,
        description: "DIFF_PRESS_BOT",
      },
    ],
  });
  const [thermalIndData, setThermalIndData] = useState({
    thermal_indicator_chart: [
      {
        max_temperature: 100,
        temperature: 19,
      },
    ],
    target_ranges_for_stave_temp: [
      {
        x: "T1 +19378 R6",
        y: [49, 55],
        z: 57.5,
      },
      {
        x: "T2 +19666 R6",
        y: [48, 55],
        z: 57.8,
      },
      {
        x: "T3 +21934 R7",
        y: [60, 70],
        z: 79.4,
      },
      {
        x: "T4 +22222 R7",
        y: [64, 75],
        z: 84.5,
      },
      {
        x: "T5 +24301 R8",
        y: [55, 70],
        z: 79.4,
      },
      {
        x: "T6 +24589 R8",
        y: [60, 77],
        z: 85.6,
      },
      {
        x: "T7 +26501 R9",
        y: [61, 71],
        z: 82.8,
      },
      {
        x: "T8 +26789 R9",
        y: [65, 76],
        z: 89,
      },
      {
        x: "T9 +28476 R10",
        y: [67, 72],
        z: 78.9,
      },
      {
        x: "T10 +28764 R10",
        y: [72, 77.5],
        z: 83.3,
      },
      {
        x: "T11 +30676 R11",
        y: [66, 71.5],
        z: 76.35,
      },
      {
        x: "T12 +30964 R11",
        y: [72, 78],
        z: 81.4,
      },
      {
        x: "T13 +30901 R11",
        y: [68, 74],
        z: 78.3,
      },
      {
        x: "T14 +31074 R11",
        y: [71, 77],
        z: 82.2,
      },
      {
        x: "T15 +33715 R12",
        y: [95, 112],
        z: 98.5,
      },
      {
        x: "T16 +36210 R13",
        y: [75, 94],
        z: 68.75,
      },
      {
        x: "T17 +38864 R14",
        y: [66, 78],
        z: 49.1,
      },
      {
        x: "T18 +41807 R15",
        y: [50, 60],
        z: 44,
      },
    ],
    thermal_heat_map: [
      {
        name: "T1 +19378 R6",
        data: [60, 57, 55, 57],
        optimal_range: [49, 55],
      },
      {
        name: "T2 +19666 R6",
        data: [59, 57, 56, 57],
        optimal_range: [48, 55],
      },
      {
        name: "T3 +21934 R7",
        data: [71, 88, 94, 76],
        optimal_range: [60, 70],
      },
      {
        name: "T4 +22222 R7",
        data: [78, 85, 97, 87],
        optimal_range: [64, 75],
      },
      {
        name: "T5 +24301 R8",
        data: [75, 81, 83, 67],
        optimal_range: [55, 70],
      },
      {
        name: "T6 +24589 R8",
        data: [74, 92, 90, 75],
        optimal_range: [60, 77],
      },
      {
        name: "T7 +26501 R9",
        data: [82, 85, 81, 86],
        optimal_range: [61, 71],
      },
      {
        name: "T8 +26789 R9",
        data: [85, 87, 90, 88],
        optimal_range: [65, 76],
      },
      {
        name: "T9 +28476 R10",
        data: [76, 80, 80, 82],
        optimal_range: [67, 72],
      },
      {
        name: "T10 +28764 R10",
        data: [80, 84, 87, 83],
        optimal_range: [72, 77.5],
      },
      {
        name: "T11 +30676 R11",
        data: [75, 77, 77, 72],
        optimal_range: [66, 71.5],
      },
      {
        name: "T12 +30964 R11",
        data: [80, 83, 82, 76],
        optimal_range: [72, 78],
      },
      {
        name: "T13 +30901 R11",
        data: [78, 78, 79, 78],
        optimal_range: [68, 74],
      },
      {
        name: "T14 +31074 R11",
        data: [79, 83, 82, 83],
        optimal_range: [71, 77],
      },
      {
        name: "T15 +33715 R12",
        data: [101, 102, 98, 78],
        optimal_range: [95, 112],
      },
      {
        name: "T16 +36210 R13",
        data: [74, 74, 81, 51],
        optimal_range: [75, 94],
      },
      {
        name: "T17 +38864 R14",
        data: [47, 46, 53, 50],
        optimal_range: [66, 78],
      },
      {
        name: "T18 +41807 R15",
        data: [44, 43, 44, 44],
        optimal_range: [50, 60],
      },
    ],
  });
  const [recommendationFetcheddata, setRecommendationFetcheddata] = useState({
    optimal_range: [0.68, 0.76],
    values: [
      0.82, 0.83, 0.81, 0.81, 0.82, 0.81, 0.8, 0.8, 0.74, 0.76, 0.79, 0.84,
      0.77, 0.85, 0.85, 0.82, 0.84, 0.82, 0.88, 0.81, 0.78, 0.8, 0.78, 0.82,
      0.79, 0.83, 0.83, 0.83, 0.82, 0.85, 0.83, 0.78, 0.77, 0.75, 0.72, 0.74,
      0.81, 0.77, 0.8, 0.75, 0.73, 0.75, 0.73, 0.7, 0.75,
    ],
    times: [
      "02-Oct 03:41 PM",
      "02-Oct 04:11 PM",
      "02-Oct 04:46 PM",
      "02-Oct 05:16 PM",
      "02-Oct 05:46 PM",
      "02-Oct 06:16 PM",
      "02-Oct 06:46 PM",
      "02-Oct 07:21 PM",
      "02-Oct 07:51 PM",
      "02-Oct 08:21 PM",
      "02-Oct 08:56 PM",
      "02-Oct 09:26 PM",
      "02-Oct 10:01 PM",
      "02-Oct 10:31 PM",
      "02-Oct 11:01 PM",
      "02-Oct 11:31 PM",
      "03-Oct 12:01 AM",
      "03-Oct 12:31 AM",
      "03-Oct 01:01 AM",
      "03-Oct 01:36 AM",
      "03-Oct 02:06 AM",
      "03-Oct 02:41 AM",
      "03-Oct 03:11 AM",
      "03-Oct 03:41 AM",
      "03-Oct 04:16 AM",
      "03-Oct 04:46 AM",
      "03-Oct 05:21 AM",
      "03-Oct 05:51 AM",
      "03-Oct 06:21 AM",
      "03-Oct 06:56 AM",
      "03-Oct 07:26 AM",
      "03-Oct 07:56 AM",
      "03-Oct 08:29 AM",
      "03-Oct 08:59 AM",
      "03-Oct 09:31 AM",
      "03-Oct 10:04 AM",
      "03-Oct 10:36 AM",
      "03-Oct 11:09 AM",
      "03-Oct 11:41 AM",
      "03-Oct 12:14 PM",
      "03-Oct 12:44 PM",
      "03-Oct 01:16 PM",
      "03-Oct 01:49 PM",
      "03-Oct 02:21 PM",
      "03-Oct 02:54 PM",
    ],
    hot_metal_data: {
      optimal_range: [1490, 1510],
      values: [
        1510.51, 1509.82, 1512.25, 1512.3, 1511.04, 1488.15, 1502.97, 1500.73,
        1499.81, 1500.64, 1502.11, 1503.47, 1504.14, 1506.11, 1507.4, 1501.84,
        1502.86, 1514.17, 1512.2, 1510.81, 1509.6, 1486.99, 1486.34, 1481.79,
        1492.92, 1493.1, 1550.68, 1553.07, 1555.09, 1555.45, 1474.16, 1472.31,
        1479.97, 1478.08, 1489.54, 1471.44, 1474.94, 1485.44, 1502.59, 1504.19,
        1504.36, 1503.21, 1486.98, 1484.52, 1484.5,
      ],
      times: [
        "02-Oct 03:41 PM",
        "02-Oct 04:11 PM",
        "02-Oct 04:46 PM",
        "02-Oct 05:16 PM",
        "02-Oct 05:46 PM",
        "02-Oct 06:16 PM",
        "02-Oct 06:46 PM",
        "02-Oct 07:21 PM",
        "02-Oct 07:51 PM",
        "02-Oct 08:21 PM",
        "02-Oct 08:56 PM",
        "02-Oct 09:26 PM",
        "02-Oct 10:01 PM",
        "02-Oct 10:31 PM",
        "02-Oct 11:01 PM",
        "02-Oct 11:31 PM",
        "03-Oct 12:01 AM",
        "03-Oct 12:31 AM",
        "03-Oct 01:01 AM",
        "03-Oct 01:36 AM",
        "03-Oct 02:06 AM",
        "03-Oct 02:41 AM",
        "03-Oct 03:11 AM",
        "03-Oct 03:41 AM",
        "03-Oct 04:16 AM",
        "03-Oct 04:46 AM",
        "03-Oct 05:21 AM",
        "03-Oct 05:51 AM",
        "03-Oct 06:21 AM",
        "03-Oct 06:56 AM",
        "03-Oct 07:26 AM",
        "03-Oct 07:56 AM",
        "03-Oct 08:29 AM",
        "03-Oct 08:59 AM",
        "03-Oct 09:31 AM",
        "03-Oct 10:04 AM",
        "03-Oct 10:36 AM",
        "03-Oct 11:09 AM",
        "03-Oct 11:41 AM",
        "03-Oct 12:14 PM",
        "03-Oct 12:44 PM",
        "03-Oct 01:16 PM",
        "03-Oct 01:49 PM",
        "03-Oct 02:21 PM",
        "03-Oct 02:54 PM",
      ],
    },
    burden: [
      {
        name: "Existing Dist",
        IBRN_C: {
          Block_B: [0, 0, 2],
          Block_C: [2, 2, 2],
          Block_D: [3, 3, 3],
          Block_E: [3, 0, 0],
        },
        Coke_C: {
          Block_B: [0, 1, 1],
          Block_C: [1, 1, 1],
          Block_D: [1, 1, 2],
          Block_E: [2, 6, 0],
        },
      },
      {
        name: "Rec 1",
        IBRN_R1: {
          Block_B: [0, 0, 2],
          Block_C: [2, 2, 2],
          Block_D: [3, 3, 3],
          Block_E: [2, 1, 0],
        },
        Coke_R1: {
          Block_B: [0, 1, 1],
          Block_C: [1, 1, 1],
          Block_D: [1, 1, 2],
          Block_E: [2, 6, 0],
        },
      },
      {
        name: "Rec 2",
        IBRN_R2: {
          Block_B: [0, 0, 2],
          Block_C: [2, 2, 2],
          Block_D: [2, 3, 3],
          Block_E: [3, 1, 0],
        },
        Coke_R2: {
          Block_B: [0, 1, 1],
          Block_C: [1, 1, 1],
          Block_D: [1, 1, 2],
          Block_E: [2, 6, 0],
        },
      },
    ],
    m_r1: "P13",
    m_r2: "P10",
    m_i: "P14",
    wi: {
      CWI: ["1.5 - 2.2", 1.4, 0],
      PWI: ["0.68 - 0.76", 0.7, -0.1],
    },
    recommendation: "Increase PCI in steps of 5Kg/THM",
    recommendation_matrix: {
      pwi: "ir",
      hot_metal: "l",
    },
    show_burden: true,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        ` ${BASE_URL_FOR_BF}/stability_and_thermal/?client_id=${client}`
      );
      const json = await response.json();
      console.log("fetched data of stabilty and thermal===>>>", json);

      setFetcheddata(json);
      setStabilityIndData(json.stability_indicator);
      setThermalIndData(json.thermal_indicator);
    } catch (error) {
      setFetcheddata();
      console.error("Error fetching data:", error);
    }
  };

  //  useEffect(() => {

  //   fetchData();

  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 30000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // },[client]);

  useEffect(() => {
    // fetchData();
  }, [callApi]);

  const series = [
    {
      data: [
        {
          x: "Current Value",
          y: [15, 25],
          fillColor: "#FFC107",
        },
        {
          x: "Oxygen Enrichment", // First instance of Oxygen Enrichment
          y: [25, 45],
          fillColor: "#605D64",
        },
        {
          x: "Cold Blast Volume",
          y: [45, 70],
        },
        {
          x: "Flame Temperature",
          y: [70, 100],
        },
        {
          x: "Stave Cooling I Heat Loss Total",
          y: [70, 55],
        },
        {
          x: "Stave Temperature Row 9 (TB)",
          y: [55, 35],
          fillColor: "#605D64",
        },
        // {
        //   x: 'Oxygen Enrichmen', // Second instance of Oxygen Enrichment
        //   y: [45, 30],
        //   seriesIndex: 2 // Unique identifier
        // },
        {
          x: "Final Value",
          y: [35, 15],
          fillColor: "#FFC107",
        },
      ],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "rangeBar",
      toolbar: {
        show: false, // Disabling the toolbar
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Vertical bars
      },
    },
    xaxis: {
      type: "category", // Using categories for x-axis labels,
      tickPlacement: "between",
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        show: false, // Hide y-axis data labels
      },
    },
  };

  const [activeOption, setActiveOption] = useState("StabilityIndicator");

  const handleOptionClick = (option) => {
    setActiveOption(option);
    scrollToSection(option);
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // const handleContainerScroll = (e) => {
  //   const container = e.target;
  //   const scrollPosition = container.scrollTop;

  //   const sections = ["StabilityIndicator", "ThermalIndicator", "Recommendations"];
  //   const sectionPositions = sections.map((section) => {
  //     const element = document.getElementById(section);
  //     return element.offsetTop;
  //   });
  //   console.log("Scroll Position:", scrollPosition);
  //   console.log("Section Positions:", sectionPositions);

  //   let newActiveOption = "StabilityIndicator";
  //   for (let i = sectionPositions.length - 1; i >= 0; i--) {
  //     if (scrollPosition >= sectionPositions[i]) {
  //       newActiveOption = sections[i];
  //       break;
  //     }
  //   }

  //   setActiveOption(newActiveOption);
  // };

  const [isExpanded1, setIsExpanded1] = useState(true);
  const handleToggle1 = () => {
    setIsExpanded1((prevExpanded) => !prevExpanded);
  };
  const [isExpanded2, setIsExpanded2] = useState(true);
  const handleToggle2 = () => {
    setIsExpanded2((prevExpanded) => !prevExpanded);
  };
  const [isExpanded21, setIsExpanded21] = useState(true);
  const handleToggle21 = () => {
    setIsExpanded21((prevExpanded) => !prevExpanded);
  };
  const [isExpanded3, setIsExpanded3] = useState(true);
  const handleToggle3 = () => {
    setIsExpanded3((prevExpanded) => !prevExpanded);
  };
  const [isExpanded4, setIsExpanded4] = useState(true);
  const handleToggle4 = () => {
    setIsExpanded4((prevExpanded) => !prevExpanded);
  };
  const [isExpanded5, setIsExpanded5] = useState(true);
  const handleToggle5 = () => {
    setIsExpanded5((prevExpanded) => !prevExpanded);
  };

  const [parentSnooze, setParentSnooze] = useState(true);

  useEffect(() => {
    if (capture == true) {
      // captureAndDownloadScreenshot();
     
      captureAndDownloadScreenshotStability();
      captureAndDownloadScreenshotThermal()
      captureAndDownloadScreenshotRecom();
      setCapture(false);
    }

    // });
  }, [capture]);

 

  const captureAndDownloadScreenshotStability = () => {
    const componentRef = document.getElementById(
      "component-to-capture-stability"
    );

    if (componentRef) {
      // Add a small delay (e.g., 100 milliseconds) to allow the component to render
      setTimeout(() => {
        html2canvas(componentRef)
          .then((canvas) => {
            const dataUrl = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = "stabilityindicator.png";

            a.click();
          })
          .catch((error) => {
            console.error("Screenshot capture error:", error);
          });
      }, 1000); // Adjust the delay duration as needed
    }
  };

  const captureAndDownloadScreenshotThermal = () => {
    const componentRef = document.getElementById(
      "component-to-capture-thermal"
    );

    if (componentRef) {
      // Add a small delay (e.g., 100 milliseconds) to allow the component to render
      setTimeout(() => {
        html2canvas(componentRef)
          .then((canvas) => {
            const dataUrl = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = "thermalindicator.png";
            a.click();
          })
          .catch((error) => {
            console.error("Screenshot capture error:", error);
          });
      }, 1000); // Adjust the delay duration as needed
    }
  };

  const captureAndDownloadScreenshotRecom = () => {
    const componentRef = document.getElementById("component-to-capture-recom");

    if (componentRef) {
      // Add a small delay (e.g., 100 milliseconds) to allow the component to render
      setTimeout(() => {
        html2canvas(componentRef)
          .then((canvas) => {
            const dataUrl = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = "recommendation.png";
            a.click();
          })
          .catch((error) => {
            console.error("Screenshot capture error:", error);
          });
      }, 1000); // Adjust the delay duration as needed
    }
  };
  return (
    <div className="w-full h-full gap-2 flex flex-col  ">
      {/* nav */}

      <div className={`w-full h-full  flex justify-end`}>
        {!serverDown1 && (
          <AlertBell
            snooze={parentSnooze}
            handleTabChange={handleTabChange}
            pageshift={pageshift}
          />
        )}

        <Timer
          initialSeconds={30}
          callFunc={setCallApi}
          initialRender={initialRender}
          setInitialRender={setInitialRender}
        />
      </div>

      {/* body */}

      <div
        className="w-full h-[64vh] flex flex-col overflow-y-auto "
        id="component-to-capture"
      >
        <div
          // id="StabilityIndicator"
          id="component-to-capture-stability"
          className="flex flex-col w-[100%] p-2 gap-4 flex-shrink-0 rounded-[12px] "
        >
          {stabilityIndData && (
            <StabilityInd
              isExpanded1={isExpanded1}
              handleToggle1={handleToggle1}
              fetcheddata={stabilityIndData}
              client={client}
            />
          )}
          {!stabilityIndData && (
            <div className=" flex justify-center">
              <CircularProgress isIndeterminate color="green.300" />
            </div>
          )}

          <Rca
            isExpanded2={isExpanded2}
            handleToggle2={handleToggle2}
            series={series}
            options={options}
          />
        </div>

        <div
          // id="ThermalIndicator"
          id="component-to-capture-thermal"
          className="flex flex-col gap-4 w-[100%] h-[auto]  p-2 flex-shrink-0 rounded-[12px] element transition-colors duration-1000 ease-in-out "
        >
          {thermalIndData && !serverDown1 && (
            <ThermalIndicator
              isExpanded3={isExpanded3}
              handleToggle3={handleToggle3}
              fetcheddata={thermalIndData}
              client={client}
            />
          )}
          {!thermalIndData && (
            <div className=" flex justify-center">
              <CircularProgress isIndeterminate color="green.300" />
            </div>
          )}

          <Cohesivezone
            isExpanded5={isExpanded5}
            handleToggle5={handleToggle5}
          />
          <Rca
            isExpanded2={isExpanded21}
            handleToggle2={handleToggle21}
            series={series}
            options={options}
          />
        </div>

        <div
          // id="Recommendations"
          id="component-to-capture-recom"
          className="w-[100%] h-[auto] p-2 flex-shrink-0 rounded-[12px]  element transition-colors duration-1000 ease-in-out "
        >
          {recommendationFetcheddata && !serverDown1 && (
            <Recommendations
              isExpanded4={isExpanded4}
              handleToggle4={handleToggle4}
              recommendationFetcheddata={recommendationFetcheddata}
              actualRatioChartData={recommendationFetcheddata.values}
              minoptiomalChartValue={recommendationFetcheddata.optimal_range[0]}
              maxoptiomalChartValue={recommendationFetcheddata.optimal_range[1]}
              timeForChart={recommendationFetcheddata.times}
              client={client}
              callApi={callApi}
              setParentSnooze={setParentSnooze}
            />
          )}
          {!recommendationFetcheddata && !serverDown1 && (
            <div className=" flex justify-center">
              <CircularProgress isIndeterminate color="green.300" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StabilityandThermal;
