import MaterialCard from "./MaterialCard";
import NavContext from "../components/NavContext";
import { baseURL, bseURL } from "../index";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const useCase = {
  Sizing: ["Particle Sizing"],
  ProcessMonitoring: ["Colour scheme analysis"],
  qualityTracking: ["Counting and Tracking", "Quality Check"],
  workforceMonitoring: ["Object Monitoring"],
  // datadigitization: ["Automated Data Digitization"],
};

const categoryChecker = (val, match) => {
  let found = false;
  match.map((item) => {
    if (item == val) {
      found = true;
    }
  });
  return found;
};

const MaterialSelect = () => {
  let param = useParams();
  const [materialData, setMaterialData] = useState({});
  const [materials, setMaterials] = useState([]);
  const { auth, email } = useContext(NavContext);

  const apiCall = async () => {
    const requestData = JSON.stringify({
      email: email,
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

  const apiCallinit = async () => {
    const response = await axios
      .get(baseURL + "service/getallServ", {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const dummy = [];
          response.data.map((service) => {
            if (
              service.isActive &&
              categoryChecker(service.servCategory, useCase[param.category])
            ) {
              dummy.push(service.servName.toLowerCase());
            }
          });
          setMaterials(dummy);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    apiCallinit();
    apiCall();
  }, [param.category]);

  return (
    <div className="h-full">
      <div className="bg-white rounded-xl shadow-md p-4 mt-5 border">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-start mt-2 ml-3 mr-3 mb-3 gap-2">
            <Link
              to="/home"
              style={{
                textDecoration: "none",
              }}
            >
              <img src="/backtick.svg" />
            </Link>
            <img className="h-6" src="/vision.svg" />
          </div>
          <div className="flex flex-wrap gap-8 items-center ml-3 mb-5">
            {materials.map((x, idx) => {
              return (
                <MaterialCard
                  material={x}
                  alerts={0}
                  deployments={
                    materialData.hasOwnProperty(
                      x.split(" ").slice(0, 2).join("").toLowerCase()
                    )
                      ? materialData[
                          x.split(" ").slice(0, 2).join("").toLowerCase()
                        ].deployments
                      : 0
                  }
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
