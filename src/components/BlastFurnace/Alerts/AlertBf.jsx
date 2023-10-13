import {
    Select,
    Table,
    Td,
    Tr,
    Thead,
    Tbody,
    TableContainer,
    Th,
    Flex,
    Image,
    Spinner,
  } from "@chakra-ui/react";
  import { useContext, useEffect, useRef, useState } from "react";
  import { useParams } from "react-router-dom";
  import NavContext from "../../NavContext";
 
  import axios from "axios";
  import { baseURL } from "../../..";
  import DetailModal from "../../Sizing/SizingComponents/DetailModal";
  import { BASE_URL_FOR_BF, clientIdbf } from "../BF_Components/urlforbf";
  import ColorBox from "./ColorBox";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import Paginator from "../../../util/VisionUtils/Paginator";
  
  const AlertBf = () => {
    const param = useParams();
    const { auth } = useContext(NavContext);
    let material = "sinter";
    let clientId = "jindalsteel";
    // let material = param.material.toLowerCase();
    // let clientId = param.clientId.toLowerCase();
    const indexRef = useRef();
    const [alerts, setAlerts] = useState({
      order: [
        "Timestamp",
        "PWI (kg/tHM)",
        "HMT",
        "Recommendations",
        "Feedback",
        "Feedback Time",
        "Comments",
      ],
      data: [
        {
          pk: "7fe43d01-0710-408a-9f27-f42bcfe4d3f6",
          snooze_time: null,
          created_at: "2023-10-11",
          recommendetion: "Change Burden Distribution",
          pwi_optimal_range: [
            0.68,
            0.76
          ],
          hot_metal_optimal_range: [
            1490,
            1510
          ],
          pwi_24hrs: 0.785738095238081,
          pwi_8hrs: 0.785108359133122,
          pwi_1hrs: 0.823217391304348,
          pwi_current: 0.7956069778732375,
          hot_metal_24hrs: 1507.24077380952,
          hot_metal_8hrs: 1502.5489370485,
          hot_metal_1hrs: 1510.83391304348,
          hot_metal_current: 1493.07604558854,
          feedback_status: "GOOD",
          feedback_message: "Everything is good",
          feedback_time: "2023-10-11"
        }
      ],
    });
  
    //   order: [
  
    //     "Timestamp",
    //     "PWI (kg/tHM)",
    //     "HMT",
    //     "Recommendations",
    //     "Feedback",
    //     "Feedback Time",
    //     "Comments",
  
    //   ],
    //   data: [
    //     {
    //       _id: {
    //         timestamp: 1696231660,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
  
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
  
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
  
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.22,
    //       size: {
    //         "0-10mm": 2.55,
    //         "10-20mm": 32.08,
    //         "20-30mm": 39.13,
    //         "30-40mm": 16.12,
    //         "40-50mm": 8.02,
    //         "50+mm": 2.11,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:58:10.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:58:10.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:58:10.jpg",
    //       minuteAverage: 18.614340033937708,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "low",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251490,
    //       timestamp: "2023-10-02 12:58:10",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e6",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231807,
    //         date: "2023-10-02T07:30:07.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 16.99,
    //       size: {
    //         "0-10mm": 10.24,
    //         "10-20mm": 33.21,
    //         "20-30mm": 32.19,
    //         "30-40mm": 17.01,
    //         "40-50mm": 4.83,
    //         "50+mm": 2.52,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:58:49.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:58:49.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:58:49.jpg",
    //       minuteAverage: 18.4888500159085,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "in range",
    //       HMT: "low",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251529,
    //       timestamp: "2023-10-02 12:58:49",
    //       plantName: "angul",
    //       id: "651a717fad9d88a520276335",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231807,
    //         date: "2023-10-02T07:30:07.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.21,
    //       size: {
    //         "0-10mm": 2.91,
    //         "10-20mm": 29.34,
    //         "20-30mm": 39.01,
    //         "30-40mm": 18.42,
    //         "40-50mm": 10.32,
    //         "50+mm": 0.0,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:59:28.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:59:28.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:59:28.jpg",
    //       minuteAverage: 18.53521671524195,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "in range",
    //       HMT: "in range",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251568,
    //       timestamp: "2023-10-02 12:59:28",
    //       plantName: "angul",
    //       id: "651a717fad9d88a520276336",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231807,
    //         date: "2023-10-02T07:30:07.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 20.43,
    //       size: {
    //         "0-10mm": 0.14,
    //         "10-20mm": 24.81,
    //         "20-30mm": 39.14,
    //         "30-40mm": 18.16,
    //         "40-50mm": 13.92,
    //         "50+mm": 3.84,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 13:00:06.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 13:00:06.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 13:00:06.jpg",
    //       minuteAverage: 18.613207484980038,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "in range",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251606,
    //       timestamp: "2023-10-02 13:00:06",
    //       plantName: "angul",
    //       id: "651a717fad9d88a520276337",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231925,
    //         date: "2023-10-02T07:32:05.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 20.35,
    //       size: {
    //         "0-10mm": 0.26,
    //         "10-20mm": 26.02,
    //         "20-30mm": 36.83,
    //         "30-40mm": 20.51,
    //         "40-50mm": 8.56,
    //         "50+mm": 7.83,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 13:00:47.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 13:00:47.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 13:00:47.jpg",
    //       minuteAverage: 18.650136439423477,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "in range",
    //       HMT: "low",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251647,
    //       timestamp: "2023-10-02 13:00:47",
    //       plantName: "angul",
    //       id: "651a71f5eb99e930eca72eb1",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231925,
    //         date: "2023-10-02T07:32:05.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.77,
    //       size: {
    //         "0-10mm": 2.37,
    //         "10-20mm": 25.99,
    //         "20-30mm": 41.9,
    //         "30-40mm": 21.34,
    //         "40-50mm": 8.4,
    //         "50+mm": 0.0,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 13:01:25.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 13:01:25.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 13:01:25.jpg",
    //       minuteAverage: 19.12609754884749,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251685,
    //       timestamp: "2023-10-02 13:01:25",
    //       plantName: "angul",
    //       id: "651a71f5eb99e930eca72eb2",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231925,
    //         date: "2023-10-02T07:32:05.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 20.95,
    //       size: {
    //         "0-10mm": 0.0,
    //         "10-20mm": 26.1,
    //         "20-30mm": 31.34,
    //         "30-40mm": 22.57,
    //         "40-50mm": 12.98,
    //         "50+mm": 7.01,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 13:02:04.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 13:02:04.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 13:02:04.jpg",
    //       minuteAverage: 19.193051574918695,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251724,
    //       timestamp: "2023-10-02 13:02:04",
    //       plantName: "angul",
    //       id: "651a71f5eb99e930eca72eb3",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696232042,
    //         date: "2023-10-02T07:34:02.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.9,
    //       size: {
    //         "0-10mm": 1.95,
    //         "10-20mm": 23.38,
    //         "20-30mm": 43.35,
    //         "30-40mm": 19.71,
    //         "40-50mm": 9.92,
    //         "50+mm": 1.69,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 13:02:43.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 13:02:43.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 13:02:43.jpg",
    //       minuteAverage: 19.243440168607737,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251763,
    //       timestamp: "2023-10-02 13:02:43",
    //       plantName: "angul",
    //       id: "651a726aad9d88a520276339",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696232042,
    //         date: "2023-10-02T07:34:02.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 20.16,
    //       size: {
    //         "0-10mm": 2.41,
    //         "10-20mm": 27.45,
    //         "20-30mm": 31.9,
    //         "30-40mm": 20.78,
    //         "40-50mm": 13.0,
    //         "50+mm": 4.46,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 13:03:22.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 13:03:22.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 13:03:22.jpg",
    //       minuteAverage: 19.44172306026722,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251802,
    //       timestamp: "2023-10-02 13:03:22",
    //       plantName: "angul",
    //       id: "651a726aad9d88a52027633a",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696232042,
    //         date: "2023-10-02T07:34:02.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.23,
    //       size: {
    //         "0-10mm": 1.68,
    //         "10-20mm": 31.92,
    //         "20-30mm": 36.2,
    //         "30-40mm": 23.4,
    //         "40-50mm": 4.51,
    //         "50+mm": 2.28,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 13:04:01.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 13:04:01.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 13:04:01.jpg",
    //       minuteAverage: 19.485148229331426,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251841,
    //       timestamp: "2023-10-02 13:04:01",
    //       plantName: "angul",
    //       id: "651a726aad9d88a52027633b",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.87,
    //       size: {
    //         "0-10mm": 1.74,
    //         "10-20mm": 26.22,
    //         "20-30mm": 37.95,
    //         "30-40mm": 25.34,
    //         "40-50mm": 6.59,
    //         "50+mm": 2.17,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:57:31.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:57:31.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:57:31.jpg",
    //       minuteAverage: 18.685366645375606,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.87,
    //       size: {
    //         "0-10mm": 1.74,
    //         "10-20mm": 26.22,
    //         "20-30mm": 37.95,
    //         "30-40mm": 25.34,
    //         "40-50mm": 6.59,
    //         "50+mm": 2.17,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:57:31.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:57:31.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:57:31.jpg",
    //       minuteAverage: 18.685366645375606,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.87,
    //       size: {
    //         "0-10mm": 1.74,
    //         "10-20mm": 26.22,
    //         "20-30mm": 37.95,
    //         "30-40mm": 25.34,
    //         "40-50mm": 6.59,
    //         "50+mm": 2.17,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:57:31.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:57:31.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:57:31.jpg",
    //       minuteAverage: 18.685366645375606,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.87,
    //       size: {
    //         "0-10mm": 1.74,
    //         "10-20mm": 26.22,
    //         "20-30mm": 37.95,
    //         "30-40mm": 25.34,
    //         "40-50mm": 6.59,
    //         "50+mm": 2.17,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:57:31.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:57:31.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:57:31.jpg",
    //       minuteAverage: 18.685366645375606,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.87,
    //       size: {
    //         "0-10mm": 1.74,
    //         "10-20mm": 26.22,
    //         "20-30mm": 37.95,
    //         "30-40mm": 25.34,
    //         "40-50mm": 6.59,
    //         "50+mm": 2.17,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:57:31.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:57:31.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:57:31.jpg",
    //       minuteAverage: 18.685366645375606,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.87,
    //       size: {
    //         "0-10mm": 1.74,
    //         "10-20mm": 26.22,
    //         "20-30mm": 37.95,
    //         "30-40mm": 25.34,
    //         "40-50mm": 6.59,
    //         "50+mm": 2.17,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:57:31.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:57:31.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:57:31.jpg",
    //       minuteAverage: 18.685366645375606,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.87,
    //       size: {
    //         "0-10mm": 1.74,
    //         "10-20mm": 26.22,
    //         "20-30mm": 37.95,
    //         "30-40mm": 25.34,
    //         "40-50mm": 6.59,
    //         "50+mm": 2.17,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:57:31.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:57:31.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:57:31.jpg",
    //       minuteAverage: 18.685366645375606,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.87,
    //       size: {
    //         "0-10mm": 1.74,
    //         "10-20mm": 26.22,
    //         "20-30mm": 37.95,
    //         "30-40mm": 25.34,
    //         "40-50mm": 6.59,
    //         "50+mm": 2.17,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:57:31.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:57:31.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:57:31.jpg",
    //       minuteAverage: 18.685366645375606,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.87,
    //       size: {
    //         "0-10mm": 1.74,
    //         "10-20mm": 26.22,
    //         "20-30mm": 37.95,
    //         "30-40mm": 25.34,
    //         "40-50mm": 6.59,
    //         "50+mm": 2.17,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:57:31.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:57:31.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:57:31.jpg",
    //       minuteAverage: 18.685366645375606,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.87,
    //       size: {
    //         "0-10mm": 1.74,
    //         "10-20mm": 26.22,
    //         "20-30mm": 37.95,
    //         "30-40mm": 25.34,
    //         "40-50mm": 6.59,
    //         "50+mm": 2.17,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:57:31.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:57:31.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:57:31.jpg",
    //       minuteAverage: 18.685366645375606,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //     {
    //       _id: {
    //         timestamp: 1696231691,
    //         date: "2023-10-02T07:28:11.000+00:00",
    //       },
    //       noCoal: 0,
    //       mps: 19.87,
    //       size: {
    //         "0-10mm": 1.74,
    //         "10-20mm": 26.22,
    //         "20-30mm": 37.95,
    //         "30-40mm": 25.34,
    //         "40-50mm": 6.59,
    //         "50+mm": 2.17,
    //       },
    //       originalImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-originalImage-2023-10-02 12:57:31.jpg",
    //       perspectiveImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-perspectiveImage-2023-10-02 12:57:31.jpg",
    //       particleImage:
    //         "https://jspl-datafiles-dev.s3.ap-south-1.amazonaws.com/cam432-particleImage-2023-10-02 12:57:31.jpg",
    //       minuteAverage: 18.685366645375606,
    //       alertHourly: true,
    //       alertCodes: [1],
    //       alertMessages: ["MPS has been less than 14 for the past minute."],
    //       PWI: "high",
    //       HMT: "high",
    //       cameraId: "cam432",
    //       clientId: "jspl",
    //       material: "sinter",
    //       createdAt: 1696251451,
    //       timestamp: "2023-10-02 12:57:31",
    //       plantName: "angul",
    //       id: "651a710bdbaf7e445e5524e5",
    //     },
    //   ],
    // });
    const [displayData, setDisplayData] = useState([]);
    const [alertsChanging, setAlertsChanging] = useState(false);
    const [fromTime, setFromTime] = useState(
      new Date(new Date().getTime() - 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    );
    const [toTime, setToTime] = useState(
      new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    );
  
    const apiCall = async () => {
      try {
        const response = await fetch(
          `${BASE_URL_FOR_BF}/alerts/?client_id=${clientIdbf}&start_date=${fromTime}&end_date=${toTime}`
        );
        const json = await response.json();
        console.log("fetched data of alert===>>>", json);
        setAlerts((prevAlerts) => ({
          ...prevAlerts,
          data: json,
        }));
        setAlertsChanging(false);
      } catch (error) {
        setAlertsChanging(false);
        console.error("Error fetching data:", error);
      }
    };
  
    const handleClick = () => {
      setAlertsChanging(false);
      apiCall();
    };
  
    useEffect(() => {
      handleClick();
    }, []);
  
  
  
    return (
      <div className="relative flex flex-col">
        <div className="absolute left-0 right-0 flex justify-center">
          <div className="p-5 pl-6 pr-6 gap-6 flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md">
            <div>
              <FloatingInput
                text="From"
                type="date"
                setDateTime={setFromTime}
                value={fromTime}
              />
            </div>
            <div>
              <FloatingInput
                text="To"
                type="date"
                setDateTime={setToTime}
                value={toTime}
              />
            </div>
            <button
              className="text-center p-[10px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#084298] rounded-full"
              onClick={handleClick}
            >
              {alertsChanging ? <Spinner /> : "Show Alerts"}
            </button>
          </div>
        </div>
        {alertsChanging ? (
          <div className="w-full h-full  mt-[200px] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-[160px] md:mt-11 pt-[57px] bg-white rounded-xl justify-start ">
            <div className="flex justify-end gap-3 ">
              {alerts.hasOwnProperty("data") && (
                <Paginator
                  data={alerts.data}
                  limit={50}
                  setDisplayData={setDisplayData}
                />
              )}
            </div>
            {alerts.data.length != 0 && (
              <TableContainer className="!max-h-[50vh] !overflow-y-auto">
                <Table variant="simple">
                  <Thead className="bg-[#FAFAFA] !text-xs !sticky !top-0">
                    <Tr>
                      <Th color="#79767D" fontWeight={400}>
                        SR. NO.
                      </Th>
                      {alerts.order.map((item) => {
                        return (
                          <Th color="#79767D" fontWeight={400} className="">
                            <p className="text-center">{item.toUpperCase()}</p>
                            {(item.toUpperCase() == "PWI (KG/THM)" ||
                              item.toUpperCase() == "HMT") && (
                              <div className="flex mt-[10px]">
                                <div className="w-[80px] text-center">24hrs</div>
                                <div className="w-[80px] text-center">8hrs</div>
                                <div className="w-[80px] text-center">1hrs</div>
                                <div className="w-[80px] text-center">
                                  Current
                                </div>
                              </div>
                            )}
                          </Th>
                        );
                      })}
                      {/* <Th color="#79767D" fontWeight={400}>
                      {"hello "}
                    </Th> */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {displayData.map((item, index) => {
                      return (
                        <Tr
                          key={index}
                          className="!text-sm !text-[#3E3C42] text-center !font-medium even:bg-[#FAFAFA] odd:bg-white"
                        >
                          {/* sl */}
                          <Td className="">
                            {String(item["idx"]).padStart(2, "0")}
                          </Td>
                          {/* timestamp */}
                          <Td className="">{item.created_at}</Td>
                          {/* pwi */}
                          <Td className="">
                            <div className="flex gap-2">
                              {/* 24hrs */}
                              <ColorBox
                                currentValue={item.pwi_24hrs.toFixed(2)}
                                UpperLimit={item.pwi_optimal_range[1]}
                                LowerLimit={item.pwi_optimal_range[0]}
                              />
                              {/* 8hrs */}
                              <ColorBox
                                currentValue={item.pwi_8hrs.toFixed(2)}
                                UpperLimit={item.pwi_optimal_range[1]}
                                LowerLimit={item.pwi_optimal_range[0]}
                              />
                              {/* 1hr */}
                              <ColorBox
                                currentValue={item.pwi_1hrs.toFixed(2)}
                                UpperLimit={item.pwi_optimal_range[1]}
                                LowerLimit={item.pwi_optimal_range[0]}
                              />
                              {/* current */}
                              <ColorBox
                                currentValue={item.pwi_current.toFixed(2)}
                                UpperLimit={item.pwi_optimal_range[1]}
                                LowerLimit={item.pwi_optimal_range[0]}
                              />
                            </div>
                          </Td>
                          {/* hmt */}
                          <Td className="">
                            <div className="flex gap-2">
                              {/* 24hrs */}
                              <ColorBox
                                currentValue={item.hot_metal_24hrs.toFixed(0)}
                                UpperLimit={item.hot_metal_optimal_range[1]}
                                LowerLimit={item.hot_metal_optimal_range[0]}
                              />
                              {/* 8hrs */}
                              <ColorBox
                                currentValue={item.hot_metal_8hrs.toFixed(0)}
                                UpperLimit={item.hot_metal_optimal_range[1]}
                                LowerLimit={item.hot_metal_optimal_range[0]}
                              />
                              {/* 1hr */}
                              <ColorBox
                                currentValue={item.hot_metal_1hrs.toFixed(0)}
                                UpperLimit={item.hot_metal_optimal_range[1]}
                                LowerLimit={item.hot_metal_optimal_range[0]}
                              />
                              {/* current */}
                              <ColorBox
                                currentValue={item.hot_metal_current.toFixed(0)}
                                UpperLimit={item.hot_metal_optimal_range[1]}
                                LowerLimit={item.hot_metal_optimal_range[0]}
                              />
                            </div>
                          </Td>
                          {/*  */}
                          {/* recommendation text */}
                          <Td className="!w-[250] !h-[100px] text-center">
                            <textarea
                              className="w-[250px] h-[100px] p-2 overflow-y-auto text-center bg-transparent font-semibold"
                              value={item.recommendetion}
                              readOnly
                            />
                          </Td>
                          {/* feedback sts */}
                          <Td className="!text-center">
                            {item.feedback_status ? item.feedback_status : "-"}
                          </Td>
                          {/* feedback time */}
                          <Td className="!text-center">
                            {" "}
                            {item.feedback_time ? item.feedback_time : "-"}
                          </Td>
                          <Td className="!w-[300] !h-[100px] text-center">
                            <textarea
                              className="w-[300px] h-[100px] p-2 overflow-y-auto text-center bg-transparent font-semibold"
                              value= {item.feedback_message
                                ? item.feedback_message
                                : "-"}
                              readOnly
                            />
                          </Td>
                         
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default AlertBf;
  