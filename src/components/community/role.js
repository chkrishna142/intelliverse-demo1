import axios from "axios";
import { baseURL } from "../..";
import { useContext } from "react";
import NavContext from ".././NavContext";

export const userRole = async()=>{
  const { auth } = useContext(NavContext);

    try {
        const response = await axios.get(baseURL + "user", {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        });
        
      } catch (e) {
        console.error(e);
      }
}