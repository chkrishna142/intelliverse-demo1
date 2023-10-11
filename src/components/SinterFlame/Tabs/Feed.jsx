import axios from "axios";
import { useState, useEffect, useContext } from "react";
import PlantCard from "../components/PlantCard";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";

const dummy = {
  Chanderia: {
    "Burner 1 (N)": {
      img: "https://gmk.center/wp-content/uploads/2023/09/image-1-2023-09-22T121503.866.jpg",
      index: 1,
      hasAlert: false,
      created: 1633958103000,
      lidDown: true,
    },
    "Burner 2": {
      img: "https://gmk.center/wp-content/uploads/2023/09/image-1-2023-09-22T121503.866.jpg",
      index: 2,
      hasAlert: true,
      created: 1633958104000,
      lidDown: false,
    },
    "Burner 3": {
      img: "https://gmk.center/wp-content/uploads/2023/09/image-1-2023-09-22T121503.866.jpg",
      index: 3,
      hasAlert: false,
      created: 1633958105000,
      lidDown: true,
    },
    "Burner 4": {
      img: "https://gmk.center/wp-content/uploads/2023/09/image-1-2023-09-22T121503.866.jpg",
      index: 4,
      hasAlert: true,
      created: 1633958106000,
      lidDown: false,
    },
    "Burner 5": {
      img: "https://gmk.center/wp-content/uploads/2023/09/image-1-2023-09-22T121503.866.jpg",
      index: 5,
      hasAlert: false,
      created: 1633958107000,
      lidDown: true,
    },
    "Burner 6": {
      img: "https://gmk.center/wp-content/uploads/2023/09/image-1-2023-09-22T121503.866.jpg",
      index: 1,
      hasAlert: false,
      created: 1633958108000,
      lidDown: false,
    },
    "Burner 7": {
      img: "https://gmk.center/wp-content/uploads/2023/09/image-1-2023-09-22T121503.866.jpg",
      index: 2,
      hasAlert: true,
      created: 1633958109000,
      lidDown: true,
    },
    "Burner 8 (S)": {
      img: "https://gmk.center/wp-content/uploads/2023/09/image-1-2023-09-22T121503.866.jpg",
      index: 3,
      hasAlert: false,
      created: 1633958110000,
      lidDown: false,
    },
  },
};

const Feed = ({ material, clientId, setPlantCamMap }) => {
  //   const [plantData, setPlantData] = useState("noPlant");
  const [plantData, setPlantData] = useState(dummy);
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
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {plantData &&
        plantData !== "noPlant" &&
        Object.keys(plantData).map((plant) => {
          return <PlantCard PlantName={plant} CamData={plantData[plant]} />;
        })}
    </div>
  );
};

export default Feed;
