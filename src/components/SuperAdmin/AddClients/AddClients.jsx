import { Link } from "react-router-dom";
import ProjectCard from "./Components/ProjectCards";
import { useEffect } from "react";

import { baseURL } from "../../../index";
import NavContext from "../../NavContext";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";

const AddClients = () => {
  const { auth } = useContext(NavContext);
  const [clients, setClients] = useState([]);
  // const data = [
  //   {
  //     id: 1,
  //     founded: "12th September 2023",
  //     name: "orange detection",
  //     client: "AsianPaints",
  //     vision: "4",
  //     optimus: "3",
  //     users: "4",
  //     locations: ["baska", "Halol", "Pathankot", "pathankot"],
  //   },
  //   {
  //     id: 2,
  //     founded: "12th September 2023",
  //     name: "orange detection",
  //     client: "AsianPaints",
  //     vision: "4",
  //     optimus: "3",
  //     users: "4",
  //     locations: ["baska", "Halol", "Pathankot", "pathankot"],
  //   },
  //   {
  //     id: 2,
  //     founded: "12th September 2023",
  //     name: "orange detection",
  //     client: "AsianPaints",
  //     vision: "4",
  //     optimus: "3",
  //     users: "4",
  //     locations: ["baska", "Halol", "Pathankot", "pathankot"],
  //   },
  // ];

  const fetchClients = async () => {
    try {
      const response = await axios.get(baseURL + "iam/fetchClient", {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      });

      // Sort clients with isdeleted=true to the end
      const sortedClients = response.data.data.sort((a, b) => {
        if (a.isdeleted && !b.isdeleted) {
          return 1;
        } else if (!a.isdeleted && b.isdeleted) {
          return -1;
        } else {
          return 0;
        }
      });
      setClients(sortedClients);
      // conso/le.log("clients", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);
  console.log("cl",clients)
  return (
    <div className="mt-[3vh] flex rounded-lg bg-white p-5 border ">
      <div className="bg-[#fafafa] p-4 w-[75%] overflow-y-auto sm:h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 min-[1440px]:grid-cols-4 min-[1750px]:grid-cols-4 min-[2150px]:grid-cols-5 gap-4 text-base font-medium text-[#3E3C42]">
        <div
          className="rounded p-3 w-full flex flex-col justify-center gap-3 items-center bg-white"
          style={{
            boxShadow:
              "-4px -4px 24px 0px rgba(0, 0, 0, 0.07), 4px 4px 24px 0px rgba(0, 0, 0, 0.07)",
          }}
        >
          <Link to={"/superadmin/addclient/add"}>
            <div className="p-[10px] bg-[#DEF] text-center rounded cursor-pointer hover:scale-105">
              <img src="/selfServiceIcons/add.svg" alt="add" />
            </div>
          </Link>
          <p className="font-bold">Add new client</p>
        </div>
        {clients && clients.length !=0 && clients.map((items) => {
          return <ProjectCard data={items} fetchClientsFun={fetchClients}/>;
        })}
      </div>
      <div className="">

      </div>
    </div>
  );
};

export default AddClients;
