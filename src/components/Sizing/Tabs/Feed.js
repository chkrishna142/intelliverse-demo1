import FeedCard from "../SizingComponents/FeedCard";
import axios from "axios";
import { useState } from "react";

const Feed = () => {
  const [plantData, setPlantData] = useState("");

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: "jspl",
      material: "sinter",
    });
    const response = await fetch(
      " https://intelliverse.backend-ripik.com/vision/v1/sizing/fetchOverviewAnalysis/",
      {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          clientId: "jspl",
          material: "sinter",
        }),
      }
    )
      .then((response) => {
        console.log(response?.plants, "plants data");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // apiCall();
  return (
    <div className="grid grid-cols-1 gap-4">
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </div>
  );
};

export default Feed;
