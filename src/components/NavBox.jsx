import { Flex } from "@chakra-ui/react";
import React, { useState, useRef, useEffect, createRef, useContext } from "react";
import { Link } from "react-router-dom";
import NavContext from "./NavContext";
import { useWindowSize } from "@uidotdev/usehooks";

const NavBox = () => {
    const [nav, setNav] = useState(false)
    const [text, setText] = useState(false)
    const size = useWindowSize();
    const navRef = useRef(null)
    const textRef = useRef(null)
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
                        <img className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/bar.svg" />
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
                            <Link to="/messages"><div onClick={()=>setText(false)} className="w-full px-2 cursor-pointer py-2 bg-[#034D86] text-white text-xs font-bold flex justify-center rounded-b-md hover:transition duration-200"> View All</div></Link>
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
                    zIndex="1000000000"
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
                                    <img src="profile_dropdown.svg" />
                                    <p style={{ marginLeft: '1px' }}>Profile</p></Link>
                                <form method="POST" action="#" role="none">
                                    <button onClick={handleLogout} type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm flex items-center hover:bg-gray-100 gap-2 hover:transition duration-200" role="menuitem" tabindex="-1" id="menu-item-3">
                                        <img src="logout.svg" />
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
