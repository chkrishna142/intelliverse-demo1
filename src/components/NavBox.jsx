import { Flex } from "@chakra-ui/react";
import React, { useState, useRef, useEffect, createRef, useContext } from "react";
import { Link } from "react-router-dom";
import NavContext from "./NavContext";
import { useWindowSize } from "@uidotdev/usehooks";

const NavBox = () => {
    const [nav, setNav] = useState(false)
    const [text, setText] = useState(false)
    const [bar, setBar] = useState(false)
    const size = useWindowSize();
    const navRef = useRef(null)
    const textRef = useRef(null)
    const barRef = useRef(null)
    //const plant_name = query.get("plant_name");
    const { setLogin } = useContext(NavContext)

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClicks);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks);
        };
    }, [nav]);

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClicks2);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks2);
        };
    }, [text]);

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClicks3);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks3);
        };
    }, [bar]);

    const handleOutsideClicks3 = (event) => {
        if (bar && barRef.current && !barRef.current.contains(event.target)) {
            setBar(false);
        };
    };

    const handleOutsideClicks2 = (event) => {
        if (text && textRef.current && !textRef.current.contains(event.target)) {
            setText(false);
        };
    };

    const handleOutsideClicks = (event) => {
        if (nav && navRef.current && !navRef.current.contains(event.target)) {
            setNav(false);
        };
    };

    const handleLogout = async () => {
        localStorage.removeItem("logged_in")
        setLogin(false)
    }

    return (
        <>
            {size.width >= 768 ?
                <Flex
                    p="4px"
                    justify="gap"
                    w="100vw"
                    h="7vh"
                    m="auto"
                    shadow=""
                    bgColor="#FAFAFA"
                    position="fixed"
                    top="16"
                    zIndex="100"
                    align="center"
                    left="0"
                    className="border-b"
                    marginTop="-7px"
                    marginLeft="125px"
                >
                    <div className="bg-white w-[75vw] px-3 py-2 h-10 rounded-md shadow-md border flex items-center gap-2" >
                        <img className="h-5" src="/search.svg" />
                        <input className="w-full focus:outline-none " placeholder="Search Intelliverse" />
                    </div>
                    <div className="flex gap-5 items-center ml-5">
                        <img onClick={() => setBar(!bar)} className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/bar.svg" />
                        {bar === true ? <div ref={barRef} className="absolute right-80 -mr-2 top-12 z-10 mt-2 w-[22vw]  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div className="py-1 mx-3 h-[60vh] overflow-y-scroll" role="none">
                                <div className=' w-full h-full mb-5'>
                                    <div className='mt-10 md:mt-5 ml-0 md:ml-3 flex flex-wrap md:justify-start justify-center gap-4 text-sm items-center'>
                                        <Link to="/vision/Sizing" style={{ textDecoration: 'none' }}>
                                            <div>
                                                <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                    <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/sizing1.svg" /></div>

                                                </div>
                                                <div className='mt-4 flex justify-center text-[10px]  h-10 '><p className='font-bold text-[#024D87]'>Sizing Tool</p></div>
                                            </div>
                                        </Link>
                                        <Link to="/bookdemo">
                                            <div>
                                                <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                    <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/qty.svg" /></div>

                                                </div>
                                                <div className='mt-4 text-[10px] flex justify-center h-10 w-20'><p className='font-bold text-[#024D87] text-center'>Process Monitoring</p></div>
                                            </div>
                                        </Link>
                                        <Link to="/bookdemo">
                                            <div>
                                                <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                    <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/pm.svg" /></div>

                                                </div>
                                                <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Quality Inspection</p></div>
                                            </div>
                                        </Link>
                                        <Link to="/bookdemo">
                                            <div>
                                                <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                    <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/wm.svg" /></div>

                                                </div>
                                                <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Workforce Monitoring</p></div>
                                            </div>
                                        </Link>
                                        <div>
                                            <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/automation.svg" /></div>

                                            </div>
                                            <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Automate Data Digitization</p></div>
                                        </div>
                                    </div>
                                    <div className="mt-4 mb-4 w-full h-[1px] bg-[#AAC3D6] "></div>
                                    <div className="text-md text-[#024D87] font-bold ml-3">Scheduling</div>
                                    <div className='mt-10 md:mt-5 ml-0 md:ml-3 flex flex-wrap md:justify-start justify-center gap-4 text-sm items-center'>

                                        <div>
                                            <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/pp.svg" /></div>

                                            </div>
                                            <div className='mt-4 flex justify-center text-[10px] w-20 h-10 '><p className='font-bold text-center text-[#024D87]'>Production Planning</p></div>
                                        </div>

                                        <div>
                                            <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/sch.svg" /></div>

                                            </div>
                                            <div className='mt-4 text-[10px] flex justify-center h-10 w-20'><p className='font-bold text-[#024D87] text-center'>QC Scheduling</p></div>
                                        </div>

                                        <div>
                                            <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/mp.svg" /></div>

                                            </div>
                                            <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Manpower Scheduling</p></div>
                                        </div>



                                    </div>
                                    <div className="mt-4 mb-4 w-full h-[1px] bg-[#AAC3D6] "></div>
                                    <div className="text-md text-[#024D87] font-bold ml-3">Process Optimization</div>
                                    <div className='mt-10 md:mt-5 ml-0 md:ml-3 flex flex-wrap md:justify-start justify-center gap-4 text-sm items-center'>
                                        <Link to="/optimus/blastfurnace" >
                                            <div>
                                                <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                    <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/bf.svg" /></div>

                                                </div>
                                                <div className='mt-4 flex justify-center text-[10px] w-20 h-10 '><p className='font-bold text-center text-[#024D87]'>Blast Furnace</p></div>
                                            </div>
                                        </Link>

                                        <div>
                                            <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                                <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/cement_kiln.svg" /></div>
                                            </div>
                                            <div className='mt-4 text-[10px] flex justify-center h-10 w-20'><p className='font-bold text-[#024D87] text-center'>Kiln</p></div>
                                        </div>
                                        <div>
                                            <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                                <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/pot.svg" /></div>
                                            </div>
                                            <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Potline</p></div>
                                        </div>
                                    </div>
                                    <div className="mt-4 mb-4 w-full h-[1px] bg-[#AAC3D6] "></div>
                                    <div className='mt-10 md:mt-5 ml-0 md:ml-3 flex flex-wrap md:justify-start justify-center gap-4 text-sm items-center'>

                                        <Link to="/community/askanexpert" >
                                            <div>
                                                <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                    <div className='w-full flex justify-center '><img className='mt-2 h-20 w-20 p-0' src="/askexpert.svg" /></div>

                                                </div>
                                                <div className='mt-4 flex justify-center text-[10px] w-20 h-10 '><p className='font-bold text-center text-[#024D87]'>Ask An Expert</p></div>
                                            </div>
                                        </Link>

                                        <Link to="/community/advisor" >
                                            <div>
                                                <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                    <div className='w-full flex justify-center '><img className=' h-full p-0 mt-0 -ml-4 mt-2' src="/advisor.svg" /></div>

                                                </div>
                                                <div className='mt-4 text-[10px] flex justify-center h-10 w-20'><p className='font-bold text-[#024D87] text-center'>AI Advisor</p></div>
                                            </div>
                                        </Link>

                                        <div>
                                            <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                                <div className='w-full flex justify-center '><img className='mt-2 h-20 w-20 p-0' src="/people.svg" /></div>

                                            </div>
                                            <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Community</p></div>
                                        </div>



                                    </div>
                                </div>
                            </div>

                        </div> : null}
                        <Link to="/settings"><img className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/setting.svg" /></Link>
                        <img onClick={() => setText(!text)} className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/messages.svg" />
                        {text === true ? <div ref={textRef} className="absolute right-52 -mr-2 top-12 z-10 mt-2 w-80  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div className="py-1 mx-3 h-[42vh] overflow-y-scroll" role="none">
                                <div className="text-xs px-2 py-3 border-b">
                                    Expert Luc Bonte has replied to your query
                                    <div className="flex justify-end w-full mr-3 mt-3 text-xs text-gray-500">1 hour ago</div>
                                </div>
                                <div className="text-xs px-2 py-3 border-b">
                                    You have a new direct message from User_123.
                                    <div className="flex justify-end w-full mr-3 mt-3 text-xs text-gray-500">4 hours ago</div>
                                </div>
                                <div className="text-xs px-2 py-3 border-b">
                                    User 546 replied to discussion in the community forum.
                                    <div className="flex justify-end w-full mr-3 mt-3 text-xs text-gray-500">Yesterday</div>
                                </div>
                                <div className="text-xs px-2 py-3 border-b">
                                    Administrator has posted a new community notification in the JSPL group.
                                    <div className="flex justify-end w-full mr-3 mt-3 text-xs text-gray-500">2 Sep 2023</div>
                                </div>
                                <div className="text-xs px-2 py-3 border-b">
                                    Expert Luc Bonte has replied to your query
                                    <div className="flex justify-end w-full mr-3 mt-3 text-xs text-gray-500">1 Sep 2023</div>
                                </div>
                            </div>
                            <Link to="/notifications"><div onClick={() => setText(false)} className="w-full px-2 cursor-pointer py-2 bg-[#034D86] text-white text-xs font-bold flex justify-center rounded-b-md hover:transition duration-200"> View All</div></Link>
                        </div> : null}
                        <img onClick={() => setNav(!nav)} className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/profile.svg" />
                        {nav === true ? <div ref={navRef} className="absolute right-44 -mr-2 top-12 z-10 mt-2 w-40  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div className="py-1" role="none">
                                <Link to="/profile" onClick={() => setNav(false)} class="text-gray-700 block px-4 py-2 text-sm flex items-center hover:bg-gray-100 gap-3 hover:transition duration-200" role="menuitem" tabindex="-1" id="menu-item-0">
                                    <img src="/profile_dropdown.svg" />
                                    <p style={{ marginLeft: '1px' }}>Profile</p></Link>
                                <form method="POST" action="#" role="none">
                                    <button onClick={handleLogout} type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm flex items-center hover:bg-gray-100 gap-2 hover:transition duration-200" role="menuitem" tabindex="-1" id="menu-item-3">
                                        <img src="/logout.svg" />
                                        Logout</button>
                                </form>
                            </div>
                        </div> : null}
                    </div>
                </Flex> : <Flex
                    p="4px"
                    justify="gap"
                    w="100vw"
                    h="7vh"
                    m="auto"
                    shadow=""
                    bgColor="#FAFAFA"
                    position="fixed"
                    top="14"
                    zIndex="100"
                    align="center"
                    left="0"
                    className="border-b"
                    marginTop="0px"
                    marginLeft="0px"
                >
                    <div style={{ width: '75vw' }} className="bg-white px-3 py-2 h-10 rounded-md shadow-md flex items-center gap-2 ml-1" >
                        <img className="h-5" src="/search.svg" />
                        <input className="w-full focus:outline-none " placeholder="Search Intelliverse" />
                    </div>
                    <div className="flex gap-5 items-center ml-5">
                        {/* <img className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/bar.svg" /> */}
                        <Link to="/settings"><img className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/setting.svg" /></Link>
                        {/* <img className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/notification.svg" /> */}
                        <img onClick={() => setNav(!nav)} className="hover:scale-110 hover:transition duration-200 mr-1 cursor-pointer" src="/profile.svg" />
                        {nav === true ? <div ref={navRef} className="absolute right-4 md:right-44 -mr-2 top-12 z-10 mt-2 w-40  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div className="py-1" role="none">
                                <Link to="/profile" onClick={() => setNav(false)} class="text-gray-700 block px-4 py-2 text-sm flex items-center hover:bg-gray-100 gap-3 hover:transition duration-200" role="menuitem" tabindex="-1" id="menu-item-0">
                                    <img src="/profile_dropdown.svg" />
                                    <p style={{ marginLeft: '1px' }}>Profile</p></Link>
                                <form method="POST" action="#" role="none">
                                    <button onClick={handleLogout} type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm flex items-center hover:bg-gray-100 gap-2 hover:transition duration-200" role="menuitem" tabindex="-1" id="menu-item-3">
                                        <img src="/logout.svg" />
                                        Logout</button>
                                </form>
                            </div>
                        </div> : null}
                    </div>
                </Flex>}
        </>
    );
};

export default NavBox;
