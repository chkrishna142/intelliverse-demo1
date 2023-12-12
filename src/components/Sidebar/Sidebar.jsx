import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
// import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import { useWindowSize } from '@uidotdev/usehooks';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import './Sidebar.css';

const Sidebar = ({userRole}) => {
  const location = useLocation();
  const size = useWindowSize();
  const InitialRoute = location.pathname === '/report' ? 'report' : 'real';
  const [route, setRoute] = useState(InitialRoute);

  //const plantName = window.location.href.split("/")[3];
  return (
    <>
      {size.width >= 768 ? (
        <div
          className=" "
          style={{
            position: 'fixed',
            width: '90px',
            height: 'calc(100vh - 80px)',
            backgroundColor: '#024D87',
            boxShadow:
              '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '65px',
            marginLeft: '20px',
            marginBottom: '20px',
            borderRadius: '24px',
            paddingBottom: '30px',
          }}
        >
          <div className="grid grid-row-3 h-40 gap-5 text-white text-center text-xs">
            {/* <Link to="/intelliverse" style={{ textDecoration: 'none' }}>
          <div className="w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200">
            <div className="w-full flex justify-center"><img className="w-6" src="/home.svg" alt="home logo" /></div>
            <p className="font-light text-white">Home</p>
          </div>
        </Link> */}
            {/* <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-6" src="/mail.svg" alt="mail logo" /></div>
          <p className="font-light">Notifications</p>
        </div> */}
            {/* <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-7 pb-2" src="/new1.svg" alt="home logo" /></div>
          <p className="font-light">Vision</p>
        </div>
        <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-8 pb-2" src="/new2.svg" alt="home logo" /></div>
          <p className="font-light">Optimus</p>
        </div>
        <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-6" src="/comm.svg" alt="home logo" /></div>
          <p className="font-light">Help</p>
        </div> */}
            <Accordion allowToggle>
              <AccordionItem className="border-none">
                <h2>
                  <Link to="/home">
                    <AccordionButton
                      _hover={false}
                      className="flex justify-center items-center hover:bg-none"
                    >
                      <div
                        className={
                          location.pathname.includes('/home')
                            ? 'w-full mt-6 cursor-pointer  rounded-md  px-5 py-2 bg-[#F7F7F7]'
                            : 'w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200 rounded-md p-2'
                        }
                      >
                        <div className="w-full flex justify-center">
                          <img
                            className={
                              location.pathname.includes('/home')
                                ? 'w-6'
                                : 'w-5'
                            }
                            src={
                              location.pathname.includes('/home')
                                ? '/home_curved_selected.svg'
                                : '/home_curved.svg'
                            }
                            alt="home logo"
                          />
                        </div>
                        <p
                          className={
                            location.pathname.includes('/home')
                              ? 'font-bold text-xs text-[#024D87]'
                              : 'font-light text-xs'
                          }
                        >
                          Home
                        </p>
                      </div>
                    </AccordionButton>
                  </Link>
                </h2>
              </AccordionItem>
              <AccordionItem className="border-none -mt-4">
                <h2>
                  <Link to="/vision">
                    <AccordionButton
                      _hover={false}
                      className="flex justify-center"
                    >
                      <div
                        className={
                          location.pathname.includes('/vision')
                            ? 'w-full mt-6 cursor-pointer  rounded-md p-2 bg-[#F7F7F7]'
                            : 'w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200 rounded-md p-2'
                        }
                      >
                        <div className="w-full flex justify-center">
                          <img
                            className={
                              location.pathname.includes('/vision')
                                ? 'w-11 pb-2'
                                : 'w-7 pb-2'
                            }
                            src={
                              location.pathname.includes('/vision')
                                ? '/vision_updated.svg'
                                : '/new1.svg'
                            }
                            alt="home logo"
                          />
                        </div>
                        <p
                          className={
                            location.pathname.includes('/vision')
                              ? 'font-bold text-xs text-[#024D87] -mt-2'
                              : 'font-light text-xs -mt-1'
                          }
                        >
                          Vision
                        </p>
                      </div>
                    </AccordionButton>
                  </Link>
                </h2>
                <AccordionPanel className="-mt-2" pb={0}>
                  <Link to="/vision/Sizing">
                    <div
                      className={
                        location.pathname.includes('/vision/Sizing')
                          ? 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center bg-[#F7F7F7] text-[#024D87]  rounded-md'
                          : 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center font-light'
                      }
                    >
                      Sizing Tool
                    </div>
                  </Link>
                  <Link to="/vision/ProcessMonitoring">
                    <div
                      className={
                        location.pathname.includes('/vision/ProcessMonitoring')
                          ? 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center bg-[#F7F7F7] text-[#024D87]  rounded-md'
                          : 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center font-light'
                      }
                    >
                      Flare/Flame Monitoring
                    </div>
                  </Link>
                  <Link to="/vision/qualityTracking">
                    <div
                      className={
                        location.pathname.includes('/vision/qualityTracking')
                          ? 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center bg-[#F7F7F7] text-[#024D87]  rounded-md'
                          : 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center font-light'
                      }
                    >
                      Quality Tracking / Monitoring
                    </div>
                  </Link>
                  <Link to="/vision/workforceMonitoring">
                    <div
                      className={
                        location.pathname.includes('/vision/workforceMonitoring')
                          ? 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center bg-[#F7F7F7] text-[#024D87]  rounded-md'
                          : 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center font-light'
                      }
                    >
                      Workforce Monitoring
                    </div>
                  </Link>
                  {/* <div className="text-xs cursor-pointer px-2 py-2 border-b border-gray-400 h-14 flex items-center  font-light">
                    Automate Data Digitization
                  </div> */}
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem className="border-none -mt-4">
                <h2>
                  <Link to="/optimus">
                    <AccordionButton
                      _hover={false}
                      className="flex justify-center"
                    >
                      <div
                        className={
                          location.pathname.includes('/optimus')
                            ? 'w-full mt-6 cursor-pointer  rounded-md p-2 bg-[#F7F7F7]'
                            : 'w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200 rounded-md p-2'
                        }
                      >
                        <div className="w-full flex justify-center">
                          <img
                            className={
                              location.pathname.includes('/optimus')
                                ? 'w-7 pb-2'
                                : 'w-9 pb-2'
                            }
                            src={
                              location.pathname.includes('/optimus')
                                ? '/optimus_new.svg'
                                : '/new2.svg'
                            }
                            alt="home logo"
                          />
                        </div>
                        <p
                          className={
                            location.pathname.includes('/optimus')
                              ? 'font-bold text-xs text-[#024D87] -mt-2'
                              : 'font-light text-xs -mt-1'
                          }
                        >
                          Optimus
                        </p>
                      </div>
                    </AccordionButton>
                  </Link>
                </h2>
                <AccordionPanel pb={0} className="-mt-2">
                  <div className="text-xs px-2 py-2 border-y border-gray-400 h-12 flex items-center font-light">
                    Production Planning
                  </div>
                  <div className="text-xs px-2 py-2 border-b border-gray-400 h-12 flex items-center font-light">
                    QC Scheduling
                  </div>
                  <div className="text-xs px-2 py-2 border-b border-gray-400 h-12 flex items-center font-light">
                    Manpower Scheduling
                  </div>
                  <Link to="/optimus/blastfurnace">
                    <div
                      className={
                        location.pathname.includes('/optimus/blastfurnace')
                          ? 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center bg-[#F7F7F7] text-[#024D87]  rounded-md'
                          : 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center font-light'
                      }
                    >
                      Blast Furnace
                    </div>
                  </Link>
                  <div className="text-xs justify-center px-2 py-2 border-b border-gray-400 h-12 flex items-center font-light">
                    Kiln
                  </div>
                  <div className="text-xs justify-center px-2 py-2 border-b border-gray-400 h-12 flex items-center font-light">
                    Potline
                  </div>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem className="border-none -mt-4">
                <h2>
                  <Link to="/community">
                    <AccordionButton
                      _hover={false}
                      className="flex justify-center items-center "
                    >
                      <div
                        className={
                          location.pathname.includes('/community')
                            ? 'w-full mt-6 cursor-pointer rounded-md p-1 bg-[#F7F7F7]'
                            : 'w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200 rounded-md p-2'
                        }
                      >
                        <div className="w-full flex justify-center">
                          <img
                            className={
                              location.pathname.includes('/community')
                                ? 'w-7 pb-2'
                                : 'w-7 pb-2'
                            }
                            src={
                              location.pathname.includes('/community')
                                ? '/comm_selected.svg'
                                : '/comm.svg'
                            }
                            alt="home logo"
                          />
                        </div>
                        <p
                          className={
                            location.pathname.includes('/community')
                              ? 'font-bold text-xs text-[#024D87] -mt-1'
                              : 'font-light text-xs -mt-1'
                          }
                        >
                          Community
                        </p>
                      </div>
                    </AccordionButton>
                  </Link>
                </h2>
                <AccordionPanel pb={0} className="-mt-2">
                  <Link to="/community/askanexpert">
                    <div
                      className={
                        location.pathname.includes('/askanexpert')
                          ? 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center bg-[#F7F7F7] text-[#024D87]  rounded-md'
                          : 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center font-light'
                      }
                    >
                      Ask An Expert
                    </div>
                  </Link>
                  <Link to="/community/advisor">
                    <div
                      className={
                        location.pathname.includes('/advisor')
                          ? 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center bg-[#F7F7F7] text-[#024D87]  rounded-md'
                          : 'text-xs cursor-pointer px-2 py-2 border-y border-gray-400 h-12 flex items-center font-light'
                      }
                    >
                      AI Advisor
                    </div>
                  </Link>
                  <a href="https://community.ripikintelliverse.com/" target="_blank">
                  <div className="text-xs justify-center px-2 py-2 border-b border-gray-400 h-12 flex items-center font-light">
                    Community
                  </div>
                  </a>
                </AccordionPanel>
              </AccordionItem>
              {userRole === "ADMIN" || userRole === "SUPERADMIN" && (<AccordionItem className="border-none -mt-4">
                <h2>
                  <Link to="/admin/usermanagement">
                    <AccordionButton
                      _hover={false}
                      className="flex justify-center items-center "
                    >
                      <div
                        className={
                          location.pathname.includes('/admin')
                            ? 'w-full mt-6 cursor-pointer rounded-md p-1 bg-[#F7F7F7]'
                            : 'w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200 rounded-md p-2'
                        }
                      >
                        <div className="w-full flex justify-center">
                          <img
                            className={
                              location.pathname.includes('/admin')
                                ? 'w-7 pb-2'
                                : 'w-7 pb-2'
                            }
                            src={
                              location.pathname.includes('/admin')
                                ? '/admin_selected.svg'
                                : '/admin.svg'
                            }
                            alt="home logo"
                          />
                        </div>
                        <p
                          className={
                            location.pathname.includes('/admin')
                              ? 'font-bold text-xs text-[#024D87] -mt-1'
                              : 'font-light text-xs -mt-1'
                          }
                        >
                          Admin
                        </p>
                      </div>
                    </AccordionButton>
                  </Link>
                </h2>
              </AccordionItem>)}
              {userRole === "SUPERADMIN" && (<AccordionItem className="border-none -mt-4">
                <h2>
                  <Link to="/superadmin/addclient">
                    <AccordionButton
                      _hover={false}
                      className="flex justify-center items-center "
                    >
                      <div
                        className={
                          location.pathname.includes('/superadmin')
                            ? 'w-full mt-6 cursor-pointer rounded-md p-1 bg-[#F7F7F7]'
                            : 'w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200 rounded-md p-2'
                        }
                      >
                        <div className="w-full flex">
                          <img
                            className={
                              location.pathname.includes('/superadmin')
                                ? 'w-9 pb-2 ml-2'
                                : 'w-9 pb-2 ml-1'
                            }
                            src={
                              location.pathname.includes('/superadmin')
                                ? '/supericon1.png'
                                : '/supericon2.png'
                            }
                            alt="home logo"
                          />
                        </div>
                        <p
                          className={
                            location.pathname.includes('/superadmin')
                              ? 'font-bold text-xs text-[#024D87] -mt-1 mr-1'
                              : 'font-light text-xs -mt-1 mr-1'
                          }
                        >
                          Super Admin
                        </p>
                      </div>
                    </AccordionButton>
                  </Link>
                </h2>
              </AccordionItem>)}
              <AccordionItem className="border-none -mt-4">
                <h2>
                  <Link to="/Sandbox">
                    <AccordionButton
                      _hover={false}
                      className="flex justify-center items-center "
                    >
                      <div
                        className={
                          location.pathname.includes('/Sandbox')
                            ? 'w-full mt-6 cursor-pointer rounded-md p-1 bg-[#F7F7F7]'
                            : 'w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200 rounded-md p-2'
                        }
                      >
                        <div className="w-full flex justify-center">
                          <img
                            className={
                              location.pathname.includes('/Sandbox')
                                ? 'w-7 pb-2'
                                : 'w-7 pb-2'
                            }
                            src={
                              location.pathname.includes('/Sandbox')
                                ? '/selfService_selected.svg'
                                : '/selfService.svg'
                            }
                            alt="home logo"
                          />
                        </div>
                        <p
                          className={
                            location.pathname.includes('/Sandbox')
                              ? 'font-bold text-xs text-[#024D87] -mt-1 text-center'
                              : 'font-light text-xs -mt-1 text-center'
                          }
                        >
                          AI Sandbox
                        </p>
                      </div>
                    </AccordionButton>
                  </Link>
                </h2>
              </AccordionItem>
            </Accordion>
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
        </div>
      ) : (
        <div
          className=" "
          style={{
            position: 'fixed',
            width: '100%',
            height: '76px',
            bottom: '0px',
            backgroundColor: '#024D87',
            boxShadow:
              '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '0px',
            marginLeft: '0px',
            marginBottom: '0px',
            borderRadius: '8px 8px 0px 0px',
            paddingBottom: '30px',
            zIndex: 1000,
          }}
        >
          <div className="text-white text-center text-xs ">
            {/* <Link to="/intelliverse" style={{ textDecoration: 'none' }}>
          <div className="w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200">
            <div className="w-full flex justify-center"><img className="w-6" src="/home.svg" alt="home logo" /></div>
            <p className="font-light text-white">Home</p>
          </div>
        </Link> */}
            {/* <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-6" src="/mail.svg" alt="mail logo" /></div>
          <p className="font-light">Notifications</p>
        </div> */}
            {/* <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-7 pb-2" src="/new1.svg" alt="home logo" /></div>
          <p className="font-light">Vision</p>
        </div>
        <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-8 pb-2" src="/new2.svg" alt="home logo" /></div>
          <p className="font-light">Optimus</p>
        </div>
        <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200">
          <div className="w-full flex justify-center"><img className="w-6" src="/comm.svg" alt="home logo" /></div>
          <p className="font-light">Help</p>
        </div> */}

            <Accordion allowToggle className="flex items-center">
              <AccordionItem className="border-none">
                <h2>
                  <Link to="/home">
                    <AccordionButton
                      _hover={false}
                      className="flex justify-center items-center hover:bg-none"
                    >
                      <div
                        className={
                          location.pathname.includes('/home')
                            ? 'w-full mt-6 cursor-pointer  rounded-md  px-5 py-2 bg-[#F7F7F7]'
                            : 'w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200 rounded-md p-2'
                        }
                      >
                        <div className="w-full flex justify-center">
                          <img
                            className={
                              location.pathname.includes('/home')
                                ? 'w-6'
                                : 'w-5'
                            }
                            src={
                              location.pathname.includes('/home')
                                ? '/home_curved_selected.svg'
                                : '/home_curved.svg'
                            }
                            alt="home logo"
                          />
                        </div>
                        <p
                          className={
                            location.pathname.includes('/home')
                              ? 'font-bold text-xs text-[#024D87]'
                              : 'font-light text-xs'
                          }
                        >
                          Home
                        </p>
                      </div>
                    </AccordionButton>
                  </Link>
                </h2>
              </AccordionItem>
              <AccordionItem className="border-none">
                <h2>
                  <Link to="/vision">
                    <AccordionButton
                      _hover={false}
                      className="flex justify-center"
                    >
                      <div
                        className={
                          location.pathname.includes('/vision')
                            ? 'w-full mt-6 cursor-pointer  rounded-md p-2 bg-[#F7F7F7]'
                            : 'w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200 rounded-md p-2'
                        }
                      >
                        <div className="w-full flex justify-center">
                          <img
                            className={
                              location.pathname.includes('/vision')
                                ? 'w-11 pb-2'
                                : 'w-7 pb-2'
                            }
                            src={
                              location.pathname.includes('/vision')
                                ? '/vision_updated.svg'
                                : '/new1.svg'
                            }
                            alt="home logo"
                          />
                        </div>
                        <p
                          className={
                            location.pathname.includes('/vision')
                              ? 'font-bold text-xs text-[#024D87] -mt-2'
                              : 'font-light text-xs -mt-1'
                          }
                        >
                          Vision
                        </p>
                      </div>
                    </AccordionButton>
                  </Link>
                </h2>
              </AccordionItem>
              <AccordionItem className="border-none">
                <h2>
                  <Link to="/optimus">
                    <AccordionButton
                      _hover={false}
                      className="flex justify-center"
                    >
                      <div
                        className={
                          location.pathname.includes('/optimus')
                            ? 'w-full mt-6 cursor-pointer  rounded-md p-2 bg-[#F7F7F7]'
                            : 'w-full mt-6 cursor-pointer hover:scale-110 hover:transition duration-200 rounded-md p-2'
                        }
                      >
                        <div className="w-full flex justify-center">
                          <img
                            className={
                              location.pathname.includes('/optimus')
                                ? 'w-7 pb-2'
                                : 'w-9 pb-2'
                            }
                            src={
                              location.pathname.includes('/optimus')
                                ? '/optimus_new.svg'
                                : '/new2.svg'
                            }
                            alt="home logo"
                          />
                        </div>
                        <p
                          className={
                            location.pathname.includes('/optimus')
                              ? 'font-bold text-xs text-[#024D87] -mt-2'
                              : 'font-light text-xs -mt-1'
                          }
                        >
                          Optimus
                        </p>
                      </div>
                    </AccordionButton>
                  </Link>
                </h2>
              </AccordionItem>
              {/* <AccordionItem className="border-none -mt-4">
            <h2>
              <AccordionButton _hover={false} className="flex justify-center items-center ">
                <div className="w-full mt-4 cursor-pointer hover:scale-110 hover:transition duration-200 p-2">
                  <div className="w-full flex justify-center"><img className="w-6" src="/comm.svg" alt="home logo" /></div>
                  <p className="font-light text-white text-xs">Community</p>
                </div>
              </AccordionButton>
            </h2>
          </AccordionItem> */}
            </Accordion>
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
        </div>
      )}
    </>
  );
};

export default Sidebar;
