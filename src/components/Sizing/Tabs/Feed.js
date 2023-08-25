import PlantCard from "../SizingComponents/PlantCard";
import axios from "axios";
import { useState, useEffect } from "react";

const Feed = ({ material }) => {
  const [plantData, setPlantData] = useState("");

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: "jspl",
      material: "sinter",
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
      {plantData &&
        Object.keys(plantData).map((plant) => {
          return (
            <PlantCard PlantName={plant} CamData={plantData[plant]["sinter"]} />
          );
        })}
    </div>
  );
};

export default Feed;
