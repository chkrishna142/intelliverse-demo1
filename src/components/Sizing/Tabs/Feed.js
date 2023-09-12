import PlantCard from "../SizingComponents/PlantCard";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";

const Feed = ({ material, clientId, setPlantCamMap }) => {
  const [plantData, setPlantData] = useState("noPlant");
  const {auth} = useContext(NavContext);
  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      material: material,
      cameraId: "all",
      plantName: "all",
    });
    const response = await axios
      .post(
        baseURL + "vision/v2/sizing/analysis/overview/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth
          },
        }
      )
      .then((response) => {
        setPlantData(response.data.plants);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (plantData !== "noPlant") {
      const plantCamMap = {};
      Object.keys(plantData).map((plant) => {
        plantCamMap[plant] = Object.keys(plantData[plant][material]);
      });
      setPlantCamMap(plantCamMap);
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
    <div className="grid grid-cols-1 gap-4">
      {plantData &&
        plantData !== "noPlant" &&
        Object.keys(plantData).map((plant) => {
          return (
            <PlantCard PlantName={plant} CamData={plantData[plant][material]} />
          );
        })}
    </div>
  );
};

export default Feed;
