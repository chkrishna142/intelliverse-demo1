import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavContext from "./NavContext";
import { useWindowSize } from "@uidotdev/usehooks";
import MessageNav from "./Main/Messages/MessageNav";
import ProfileNav from "./Main/ProfileNav";
import AppNav from "./Main/AppNav";


const NavBox = () => {
    const size = useWindowSize();
    const { setLogin } = useContext(NavContext)

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
                        <input className="w-full focus:outline-none" placeholder="Search Intelliverse" />
                    </div>
                    <div className="flex gap-5 items-center ml-5">
                        <AppNav />
                        <Link to="/settings"><img className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/setting.svg" /></Link>
                        <MessageNav />
                        <ProfileNav setLogin={setLogin} />
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
                        <Link to="/settings"><img className="hover:scale-110 hover:transition duration-200 cursor-pointer h-7" src="/setting.svg" /></Link>
                        <ProfileNav setLogin={setLogin} />
                    </div>
                </Flex>}
        </>
    );
};

export default NavBox;
