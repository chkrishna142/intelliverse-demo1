import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Ripik-Logo.png";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
// import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import ReportingIcon from "./Vector.svg";
import RipikVision from "./Ripik-Vision.png.png";
import { Avatar } from "@chakra-ui/react";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const InitialRoute = location.pathname === "/report" ? "report" : "real";
  const [route, setRoute] = useState(InitialRoute);
  const plantName = window.location.href.split("/")[3];

  return (
    <div
      className="sidebar"
      style={{
        position: "fixed",
        width: "95px",
        height: "calc(100vh - 120px)",
        backgroundColor: "#024D87",
        boxShadow:
          "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "85px",
        marginLeft: '20px',
        marginBottom: "20px",
        borderRadius: '24px',
        paddingBottom: "30px",
      }}
    >
      <div className="grid grid-row-3 h-40 gap-5 text-white text-center text-xs">
        <Link to="/intelliverse" style={{ textDecoration: 'none' }}>
          <div className="w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200">
            <div className="w-full flex justify-center"><img className="w-7" src="/home.svg" alt="home logo" /></div>
            <p className="font-light text-white">Home</p>
          </div>
        </Link>
        <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-7" src="/mail.svg" alt="mail logo" /></div>
          <p className="font-light">Notifications</p>
        </div>
        <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-7" src="/person.svg" alt="home logo" /></div>
          <p className="font-light">User Profile</p>
        </div>
        <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-7" src="/report.svg" alt="home logo" /></div>
          <p className="font-light">Report</p>
        </div>
        <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-7" src="/comm.svg" alt="home logo" /></div>
          <p className="font-light">Help</p>
        </div>
        {/* <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img  src="/bot.svg" alt="home logo" /></div>
          <p className="font-light">AI Advisor</p>
        </div>
        <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img  src="/group.svg" alt="home logo" /></div>
          <div className="w-full flex justify-center"><p className="font-light w-24">Community Forum</p></div>
        </div>
        <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img  src="/impact.svg" alt="home logo" /></div>
          <div className="w-full flex justify-center"><p className="font-light w-24">Impact Tracker</p></div>
        </div> */}
      </div>

      {/* <div
        className="sidebar_bottom"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          className="ripik_avatar"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar name="Ripik" src="" style={{ marginRight: "10px" }} />
          <span
            style={{ marginLeft: "10px", fontSize: "16px", lineHeight: "24px" }}
          >
            Ripik
          </span>
        </div>
        <hr
          style={{ width: "120%", marginTop: "10px", marginBottom: "10px" }}
        />
        <div
          className="logout"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogoutOutlinedIcon
            style={{
              width: "200px !important",
              marginRight: "10px",
              color: "red",
            }}
          />
          <span
            style={{ fontSize: "16px", lineHeight: "24px", marginLeft: "10px" }}
          >
            Log Out
          </span>
        </div>
      </div> */}
    </div >
  );
};

export default Sidebar;
