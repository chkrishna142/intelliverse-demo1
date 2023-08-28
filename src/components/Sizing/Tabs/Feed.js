import PlantCard from "../SizingComponents/PlantCard";
import axios from "axios";
import { useState, useEffect } from "react";

const Feed = ({ material, clientId }) => {
  const [plantData, setPlantData] = useState("noPlant");

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      material: material,
    });
    const response = await axios
      .post(
        " https://intelliverse.backend-ripik.com/vision/v1/sizing/fetchOverviewAnalysis/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
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
      {plantData && plantData !== "noPlant" &&
        Object.keys(plantData).map((plant) => {
          return (
            <PlantCard PlantName={plant} CamData={plantData[plant][material]} />
          );
        })}
    </div>
  );
};

export default Feed;
