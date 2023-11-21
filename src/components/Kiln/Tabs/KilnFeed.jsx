import axios from "axios";
import { useState, useEffect, useContext } from "react";
import PlantCard from "../KilnComponents/PlantCard";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";

const KilnFeed = ({ material, clientId, setPlantCamMap, Map }) => {
  const [plantData, setPlantData] = useState("noPlant");
  const { auth } = useContext(NavContext);
  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      material: material,
    });
    const response = await axios
      .post(baseURL + "vision/processMonitoring/feed/overview/", requestData, {
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
        .sort((a, b) => {
          const lengthComparison = b[1].length - a[1].length;
          // Check for the presence of values other than "healthy"
          const containsUnhealthyValuesA = a[1].some(
            (item) => plantData[a[0]][item]?.tag.toLowerCase() !== "healthy"
          );
          const containsUnhealthyValuesB = b[1].some(
            (item) => plantData[b[0]][item]?.tag.toLowerCase() !== "healthy"
          );
          // Prioritize lists with values other than "healthy"
          if (containsUnhealthyValuesA && !containsUnhealthyValuesB) {
            return -1;
          } else if (!containsUnhealthyValuesA && containsUnhealthyValuesB) {
            return 1;
          }
          // If both have or don't have unhealthy values, use the length comparison
          return lengthComparison;
        })
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      setPlantCamMap(sortedData);
    }
  }, [plantData]);

  useEffect(() => {
    apiCall();
    const intervalId = setInterval(() => {
      apiCall();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {plantData &&
        Map &&
        plantData !== "noPlant" &&
        Object.keys(Map).map((plant) => {
          return <PlantCard PlantName={plant} CamData={plantData[plant]} />;
        })}
    </div>
  );
};

export default KilnFeed;
