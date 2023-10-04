import axios from "axios";
import { useState, useEffect, useContext } from "react";
import PlantCard from "../KilnComponents/PlantCard";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";

const dummyData = {
  jaffrabad: {
    jaffrabad1: [
      {
        cameraId: "jaffrabad1",
        plantName: "jaffrabad",
        _id: {
          $oid: "650c350ccaa1705feb508476",
        },
        photoName: "5photo_2023-09-21_17-50-24_jaffrabad",
        date: "2023-09-21",
        time: "17-50-24",
        dateTime: {
          $date: "2023-09-21T17:50:24Z",
        },
        area: 0,
        perimeter: 0,
        image:
          "https://may20.blob.core.windows.net/jaffrabad-container/5photo_2023-09-21_17-50-24_jaffrabad.png",
        images: [
          "https://may20.blob.core.windows.net/jaffrabad-container/5photo_2023-09-21_17-50-24_jaffrabad.png",
          "https://may20.blob.core.windows.net/jaffrabad-container/4photo_2023-09-21_17-50-14_jaffrabad.png",
          "https://may20.blob.core.windows.net/jaffrabad-container/3photo_2023-09-21_17-50-05_jaffrabad.png",
          "https://may20.blob.core.windows.net/jaffrabad-container/2photo_2023-09-21_17-49-55_jaffrabad.png",
          "https://may20.blob.core.windows.net/jaffrabad-container/1photo_2023-09-21_17-49-46_jaffrabad.png",
        ],
        condition: "Negative",
        tag: "Negative",
        probability: 54.392085079999994,
        index: 0,
        __v: 0,
        action: "",
        action_Status: "",
        changed: "",
        id: "5b458f3f-7022-446d-ba2b-1d227b7cde54",
        project: "71c03eb6-61bf-4025-bb4b-cda6980da9f0",
        iteration: "b471560c-e91c-4f9b-9225-f047e0827877",
        created: "2023-09-21T12:20:28.085Z",
        predictions: [
          {
            probability: 0.5439208508,
            tagId: "eb1a5c92-3bd5-4a06-962f-f603ae16e1b6",
            tagName: "Negative",
          },
          {
            probability: 0.4560764692,
            tagId: "629bcf95-ef65-4033-a557-09804ce42b8a",
            tagName: "Dusty",
          },
          {
            probability: 1.697688548e-6,
            tagId: "b1afd876-a625-4f93-914a-7062d7f89e6e",
            tagName: "Hot",
          },
          {
            probability: 9.90880636e-7,
            tagId: "e7e1442c-478e-43c6-853b-f2f3775f258d",
            tagName: "Healthy",
          },
        ],
        image_url:
          "https://may20.blob.core.windows.net/jaffrabad-container/5photo_2023-09-21_17-50-24_jaffrabad.png",
      },
    ],
    jaffrabad2: [
      {
        cameraId: "jaffrabad1",
        plantName: "jaffrabad",
        _id: {
          $oid: "650c350ccaa1705feb508476",
        },
        photoName: "5photo_2023-09-21_17-50-24_jaffrabad",
        date: "2023-09-21",
        time: "17-50-24",
        dateTime: {
          $date: "2023-09-21T17:50:24Z",
        },
        area: 0,
        perimeter: 0,
        image:
          "https://may20.blob.core.windows.net/jaffrabad-container/5photo_2023-09-21_17-50-24_jaffrabad.png",
        images: [
          "https://may20.blob.core.windows.net/jaffrabad-container/5photo_2023-09-21_17-50-24_jaffrabad.png",
          "https://may20.blob.core.windows.net/jaffrabad-container/4photo_2023-09-21_17-50-14_jaffrabad.png",
          "https://may20.blob.core.windows.net/jaffrabad-container/3photo_2023-09-21_17-50-05_jaffrabad.png",
          "https://may20.blob.core.windows.net/jaffrabad-container/2photo_2023-09-21_17-49-55_jaffrabad.png",
          "https://may20.blob.core.windows.net/jaffrabad-container/1photo_2023-09-21_17-49-46_jaffrabad.png",
        ],
        condition: "Negative",
        tag: "Negative",
        probability: 54.392085079999994,
        index: 0,
        __v: 0,
        action: "",
        action_Status: "",
        changed: "",
        id: "5b458f3f-7022-446d-ba2b-1d227b7cde54",
        project: "71c03eb6-61bf-4025-bb4b-cda6980da9f0",
        iteration: "b471560c-e91c-4f9b-9225-f047e0827877",
        created: "2023-09-21T12:20:28.085Z",
        predictions: [
          {
            probability: 0.5439208508,
            tagId: "eb1a5c92-3bd5-4a06-962f-f603ae16e1b6",
            tagName: "Negative",
          },
          {
            probability: 0.4560764692,
            tagId: "629bcf95-ef65-4033-a557-09804ce42b8a",
            tagName: "Dusty",
          },
          {
            probability: 1.697688548e-6,
            tagId: "b1afd876-a625-4f93-914a-7062d7f89e6e",
            tagName: "Hot",
          },
          {
            probability: 9.90880636e-7,
            tagId: "e7e1442c-478e-43c6-853b-f2f3775f258d",
            tagName: "Healthy",
          },
        ],
        image_url:
          "https://may20.blob.core.windows.net/jaffrabad-container/5photo_2023-09-21_17-50-24_jaffrabad.png",
      },
    ],
  },
  reddypalyam: {
    reddypalyam1: [
      {
        _id: {
          $oid: "650c363dcaa1705feb5084a9",
        },
        photoName: "5photo_2023-09-21_17-55-28_reddypalyam",
        date: "2023-09-21",
        time: "17-55-28",
        dateTime: {
          $date: "2023-09-21T17:55:28Z",
        },
        area: 0,
        perimeter: 0,
        image:
          "https://may20.blob.core.windows.net/reddypalyam-container/5photo_2023-09-21_17-55-28_reddypalyam.png",
        images: [
          "https://may20.blob.core.windows.net/reddypalyam-container/5photo_2023-09-21_17-55-28_reddypalyam.png",
          "https://may20.blob.core.windows.net/reddypalyam-container/4photo_2023-09-21_17-55-18_reddypalyam.png",
          "https://may20.blob.core.windows.net/reddypalyam-container/3photo_2023-09-21_17-55-07_reddypalyam.png",
          "https://may20.blob.core.windows.net/reddypalyam-container/2photo_2023-09-21_17-54-57_reddypalyam.png",
          "https://may20.blob.core.windows.net/reddypalyam-container/1photo_2023-09-21_17-54-46_reddypalyam.png",
        ],
        condition: "Negative",
        tag: "Negative",
        probability: 99.99991460000001,
        index: 0,
        __v: 0,
        action: "",
        action_Status: "",
        changed: "",
        id: "7e3e248b-7ec5-4967-93f9-0b34852db339",
        project: "29bacce1-9aa0-4bf7-a595-d066c3a382c5",
        iteration: "da0fcb3e-bedc-40ae-9961-7cc155dc06ee",
        created: "2023-09-21T12:25:33.836Z",
        predictions: [
          {
            probability: 0.9999991460000001,
            tagId: "05788992-0a81-45f9-ae41-275e56c9f9fd",
            tagName: "Negative",
          },
          {
            probability: 8.93452592e-7,
            tagId: "816f0a58-cf25-4e6e-92e3-ee7e37024f4c",
            tagName: "Dusty",
          },
          {
            probability: 7.11263122e-13,
            tagId: "04969672-f99e-4282-b25d-af104d8583c8",
            tagName: "Healthy",
          },
          {
            probability: 1.24045558e-16,
            tagId: "041753c1-9b19-4557-8dac-5549362ca62c",
            tagName: "Hot",
          },
        ],
        image_url:
          "https://may20.blob.core.windows.net/reddypalyam-container/5photo_2023-09-21_17-55-28_reddypalyam.png",
      },
    ],
    reddypalyam2: [
      {
        _id: {
          $oid: "650c363dcaa1705feb5084a9",
        },
        photoName: "5photo_2023-09-21_17-55-28_reddypalyam",
        date: "2023-09-21",
        time: "17-55-28",
        dateTime: {
          $date: "2023-09-21T17:55:28Z",
        },
        area: 0,
        perimeter: 0,
        image:
          "https://may20.blob.core.windows.net/reddypalyam-container/5photo_2023-09-21_17-55-28_reddypalyam.png",
        images: [
          "https://may20.blob.core.windows.net/reddypalyam-container/5photo_2023-09-21_17-55-28_reddypalyam.png",
          "https://may20.blob.core.windows.net/reddypalyam-container/4photo_2023-09-21_17-55-18_reddypalyam.png",
          "https://may20.blob.core.windows.net/reddypalyam-container/3photo_2023-09-21_17-55-07_reddypalyam.png",
          "https://may20.blob.core.windows.net/reddypalyam-container/2photo_2023-09-21_17-54-57_reddypalyam.png",
          "https://may20.blob.core.windows.net/reddypalyam-container/1photo_2023-09-21_17-54-46_reddypalyam.png",
        ],
        condition: "Negative",
        tag: "Negative",
        probability: 99.99991460000001,
        index: 0,
        __v: 0,
        action: "",
        action_Status: "",
        changed: "",
        id: "7e3e248b-7ec5-4967-93f9-0b34852db339",
        project: "29bacce1-9aa0-4bf7-a595-d066c3a382c5",
        iteration: "da0fcb3e-bedc-40ae-9961-7cc155dc06ee",
        created: "2023-09-21T12:25:33.836Z",
        predictions: [
          {
            probability: 0.9999991460000001,
            tagId: "05788992-0a81-45f9-ae41-275e56c9f9fd",
            tagName: "Negative",
          },
          {
            probability: 8.93452592e-7,
            tagId: "816f0a58-cf25-4e6e-92e3-ee7e37024f4c",
            tagName: "Dusty",
          },
          {
            probability: 7.11263122e-13,
            tagId: "04969672-f99e-4282-b25d-af104d8583c8",
            tagName: "Healthy",
          },
          {
            probability: 1.24045558e-16,
            tagId: "041753c1-9b19-4557-8dac-5549362ca62c",
            tagName: "Hot",
          },
        ],
        image_url:
          "https://may20.blob.core.windows.net/reddypalyam-container/5photo_2023-09-21_17-55-28_reddypalyam.png",
      },
    ],
  },
};

const KilnFeed = ({ material, clientId, setPlantCamMap, Map }) => {
  const [plantData, setPlantData] = useState("noPlant");
  const { auth } = useContext(NavContext);
  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      material: material,
    });
    const response = await axios
      .get(baseURL + "vision/processMonitoring/feed/overview/", {
        params: requestData,
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        setPlantData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (plantData !== "noPlant") {
      const plantCamMap = {};
      Object.keys(plantData).map((plant) => {
        plantCamMap[plant] = Object.keys(plantData[plant]);
      });
      const sortedData = Object.entries(plantCamMap)
        .sort((a, b) => b[1].length - a[1].length)
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      setPlantCamMap(sortedData);
    }
  }, [plantData]);

  useEffect(() => {
    // apiCall();
    // const intervalId = setInterval(() => {
    //   apiCall();
    // }, 30000);
    // return () => {
    //   clearInterval(intervalId);
    // };
    setPlantData(dummyData);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {plantData && Map &&
        plantData !== "noPlant" &&
        Object.keys(Map).map((plant) => {
          return <PlantCard PlantName={plant} CamData={plantData[plant]} />;
        })}
    </div>
  );
};

export default KilnFeed;
