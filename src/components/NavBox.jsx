import { Flex } from "@chakra-ui/react";
import React, { useState, useRef, useEffect, createRef, useContext } from "react";
import { Link } from "react-router-dom";
import NavContext from "./NavContext";
import { useWindowSize } from "@uidotdev/usehooks";

const NavBox = () => {
    const [nav, setNav] = useState(false)
    const size = useWindowSize();
    const navRef = useRef(null)
    //const plant_name = query.get("plant_name");
    const { setLogin } = useContext(NavContext)

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClicks);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks);
        };
    }, [nav]);

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
                    zIndex="1000000000"
                    align="center"
                    left="0"
                    className="border-b"
                    marginTop="-7px"
                    marginLeft="127px"
                >
                    <div className="bg-white w-[75vw] px-3 py-2 h-10 rounded-md shadow-md border flex items-center gap-2" >
                        <img className="h-5" src="/search.svg" />
                        <input className="w-full focus:outline-none " placeholder="Search Intelliverse" />
                    </div>
                    <div className="flex gap-5 items-center ml-5">
                        <img className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/bar.svg" />
                        <Link to="/settings"><img className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/setting.svg" /></Link>
                        <img className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/messages.svg" />
                        <img onClick={() => setNav(!nav)} className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/profile.svg" />
                        {nav === true ? <div ref={navRef} className="absolute right-44 -mr-2 top-12 z-10 mt-2 w-40  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
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
