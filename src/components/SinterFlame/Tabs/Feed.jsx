import axios from "axios";
import { useState, useEffect, useContext } from "react";
import PlantCard from "../components/PlantCard";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";

const dummy = {
  plants: {
    chanderia: {
      sinterflame: {
        burner3: [
          {
            _id: {
              timestamp: 1697101448,
              date: "2023-10-12T09:04:08.000+00:00",
            },
            rgb: {
              r: 77,
              g: 73,
              b: 78,
            },
            healthIndex: 0,
            flags: {
              flapClosed: false,
              viewObstructed: false,
            },
            hasAlert: false,
            originalImage:
              "https://esl-vision-images-nb.s3.ap-south-1.amazonaws.com/sinterflame/originalImage/burner3/12-10-2023/14/originalImage-2023-10-12%2014%3A34%3A04.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231012T111749Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Credential=AKIAWMM7GHFY2B5BNOQE%2F20231012%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=3b6f95cdbdc6b727c8f984e1821bec7f638a36f9cd7c8402443e5c25b4b02ff2",
            cameraId: "burner3",
            clientId: "hindustanzinc",
            material: "sinterflame",
            createdAt: 1697101444,
            timestamp: "2023-10-12 14:34:04",
            id: "6527b688d9c5000a8db52406",
            plantName: "chanderia",
          },
        ],
        burner2: [
          {
            _id: {
              timestamp: 1697109434,
              date: "2023-10-12T11:17:14.000+00:00",
            },
            rgb: {
              r: 48,
              g: 46,
              b: 53,
            },
            healthIndex: 0,
            flags: {
              flapClosed: false,
              viewObstructed: false,
            },
            hasAlert: false,
            originalImage:
              "https://esl-vision-images-nb.s3.ap-south-1.amazonaws.com/sinterflame/originalImage/burner2/12-10-2023/16/originalImage-2023-10-12%2016%3A47%3A07.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231012T111749Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=AKIAWMM7GHFY2B5BNOQE%2F20231012%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=40283f1c10610e84b04da7a62deb315fa77256319b94b870ef29f52b9f47c632",
            cameraId: "burner2",
            clientId: "hindustanzinc",
            material: "sinterflame",
            createdAt: 1697129227,
            timestamp: "2023-10-12 16:47:07",
            id: "6527d5ba66bd80c67a8f64ce",
            plantName: "chanderia",
          },
        ],
        burner8s: [
          {
            _id: {
              timestamp: 1697101537,
              date: "2023-10-12T09:05:37.000+00:00",
            },
            rgb: {
              r: 79,
              g: 79,
              b: 81,
            },
            healthIndex: 0,
            flags: {
              flapClosed: false,
              viewObstructed: false,
            },
            hasAlert: false,
            originalImage:
              "https://esl-vision-images-nb.s3.ap-south-1.amazonaws.com/sinterflame/originalImage/burner8s/12-10-2023/14/originalImage-2023-10-12%2014%3A35%3A31.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231012T111749Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=AKIAWMM7GHFY2B5BNOQE%2F20231012%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=af0f8ae75d74d545d6c406f41d60240d631b2dbbebcf0999a7959b5bf6fb66a6",
            cameraId: "burner8s",
            clientId: "hindustanzinc",
            material: "sinterflame",
            createdAt: 1697101531,
            timestamp: "2023-10-12 14:35:31",
            id: "6527b6e11dbc45909ffc0e45",
            plantName: "chanderia",
          },
        ],
        burner7: [
          {
            _id: {
              timestamp: 1697101518,
              date: "2023-10-12T09:05:18.000+00:00",
            },
            rgb: {
              r: 255,
              g: 213,
              b: 232,
            },
            healthIndex: 0,
            flags: {
              flapClosed: false,
              viewObstructed: false,
            },
            hasAlert: false,
            originalImage:
              "https://esl-vision-images-nb.s3.ap-south-1.amazonaws.com/sinterflame/originalImage/burner7/12-10-2023/14/originalImage-2023-10-12%2014%3A35%3A15.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231012T111749Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Credential=AKIAWMM7GHFY2B5BNOQE%2F20231012%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=97e801072e264793538a0e408f79a408cb93c718b13b767d7ba50120e978a3b9",
            cameraId: "burner7",
            clientId: "hindustanzinc",
            material: "sinterflame",
            createdAt: 1697101515,
            timestamp: "2023-10-12 14:35:15",
            id: "6527b6cedb60e3987835ada1",
            plantName: "chanderia",
          },
        ],
        burner5: [
          {
            _id: {
              timestamp: 1697101496,
              date: "2023-10-12T09:04:56.000+00:00",
            },
            rgb: {
              r: 249,
              g: 223,
              b: 248,
            },
            healthIndex: 0,
            flags: {
              flapClosed: false,
              viewObstructed: false,
            },
            hasAlert: false,
            originalImage:
              "https://esl-vision-images-nb.s3.ap-south-1.amazonaws.com/sinterflame/originalImage/burner5/12-10-2023/14/originalImage-2023-10-12%2014%3A34%3A53.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231012T111749Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Credential=AKIAWMM7GHFY2B5BNOQE%2F20231012%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=0b6f201c0441e2db1224d85773f9c0937b1d1f6ab2b7dab664561663f4aabed5",
            cameraId: "burner5",
            clientId: "hindustanzinc",
            material: "sinterflame",
            createdAt: 1697101493,
            timestamp: "2023-10-12 14:34:53",
            id: "6527b6b88992bf182d67f337",
            plantName: "chanderia",
          },
        ],
        burner4: [
          {
            _id: {
              timestamp: 1697101465,
              date: "2023-10-12T09:04:25.000+00:00",
            },
            rgb: {
              r: 246,
              g: 255,
              b: 221,
            },
            healthIndex: 0,
            flags: {
              flapClosed: false,
              viewObstructed: false,
            },
            hasAlert: false,
            originalImage:
              "https://esl-vision-images-nb.s3.ap-south-1.amazonaws.com/sinterflame/originalImage/burner4/12-10-2023/14/originalImage-2023-10-12%2014%3A34%3A20.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231012T111749Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=AKIAWMM7GHFY2B5BNOQE%2F20231012%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be4a3bf1ea50a9be2a6c66a0ded55c1bb8414dc28100d8c78430399470cc9d3c",
            cameraId: "burner4",
            clientId: "hindustanzinc",
            material: "sinterflame",
            createdAt: 1697101460,
            timestamp: "2023-10-12 14:34:20",
            id: "6527b699c7cb1656ee7ff1ca",
            plantName: "chanderia",
          },
        ],
        burner1n: [
          {
            _id: {
              timestamp: 1697109267,
              date: "2023-10-12T11:14:27.000+00:00",
            },
            rgb: {
              r: 61,
              g: 60,
              b: 64,
            },
            healthIndex: 0,
            flags: {
              flapClosed: false,
              viewObstructed: false,
            },
            hasAlert: false,
            originalImage:
              "https://esl-vision-images-nb.s3.ap-south-1.amazonaws.com/sinterflame/originalImage/burner1n/12-10-2023/16/originalImage-2023-10-12%2016%3A44%3A23.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231012T111749Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Credential=AKIAWMM7GHFY2B5BNOQE%2F20231012%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=b8bc64cf7a91ae509af688d81bcc4c8962f6950aa26bb1bc7c5ff320e6e18442",
            cameraId: "burner1n",
            clientId: "hindustanzinc",
            material: "sinterflame",
            createdAt: 1697129063,
            timestamp: "2023-10-12 16:44:23",
            id: "6527d513b1eae91257a87f26",
            plantName: "chanderia",
          },
        ],
      },
    },
  },
};

const Feed = ({ material, clientId, setPlantCamMap }) => {
  const [plantData, setPlantData] = useState("noPlant");
  const { auth } = useContext(NavContext);
  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      plantName: "all",
      useCase: material.toUpperCase(),
      cameraId: "all",
    });
    const response = await axios
      .post(
        baseURL + "vision/v2/processMonitoring/analysis/overview/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
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
      Object.keys(plantCamMap).map((plant) => {
        plantCamMap[plant].sort((a, b) => {
          const indexA = parseInt(a.match(/\d+/)[0], 10);
          const indexB = parseInt(b.match(/\d+/)[0], 10);
          return indexA - indexB;
        });
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
    apiCall();
    const intervalId = setInterval(() => {
      apiCall();
    }, 15 * 60 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
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
