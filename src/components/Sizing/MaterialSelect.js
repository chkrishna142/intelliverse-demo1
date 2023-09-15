import MaterialCard from "./SizingComponents/MaterialCard";
import NavContext from "../NavContext";
import { baseURL, bseURL } from "../../index";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const MaterialSelect = () => {
  let param = useParams();
  const [materialData, setMaterialData] = useState({});
  const { auth } = useContext(NavContext);

  const apiCall = async () => {
    const requestData = JSON.stringify({
      email: "aman@ripik.in",
      category: param.category.toLowerCase(),
    });
    const response = await axios
      .post(baseURL + "vision/v2/product/overview/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        setMaterialData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className="h-full">
      <div className="bg-white rounded-xl shadow-md p-4 mt-5 border">
        <div className="flex flex-col gap-5">
          <div className="flex justify-start mt-2 ml-3 mr-3 mb-3">
            <img className="h-6" src="/vision.svg" />
          </div>
          <div className="flex flex-auto flex-col sm:flex-row gap-8 items-center ml-3 mb-5">
            {Object.keys(materialData).map((x, idx) => {
              return (
                <MaterialCard
                  material={x}
                  alerts={materialData[x].alerts}
                  deployments={materialData[x].deployments}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialSelect;
