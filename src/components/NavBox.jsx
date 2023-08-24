import { Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "../util/util";
import Vision from "./Navbar.svg";

const NavBox = () => {
    let query = useQuery();
    const plant_name = query.get("plant_name");
    return (
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
            <input style={{width:'75vw'}} className="bg-white px-3 h-10 py-2 rounded-md shadow-md border  " placeholder="Search Intelliverse"/> 
            <div className="flex gap-5 items-center ml-5">
                <img src="/bar.svg" />
                <img src="/setting.svg" />
                <img src="/notification.svg" />
                <img src="/profile.svg" />

            </div>
            {/* <form style={{width:'70vw'}}>
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Intelliverse"  />
                        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form> */}


            {/* <Heading
				fontSize={["md", "2xl"]}
				fontWeight="bold"
				textTransform="capitalize"
				color="black"
				fontStyle="italic">
				Kiln Analyzer {plant_name && `- ${plant_name}`}
			</Heading>
			<Flex alignItems="center"> */}
            {/* //https://i.ibb.co/84MjLRt/Ripik-Vision.png */}
            {/* <Image
          h="60px"
          src="https://media-exp1.licdn.com/dms/image/C4D0BAQFX0dxczQGdgw/company-logo_200_200/0/1601122161236?e=1674691200&v=beta&t=iaVZkyz1w96-vERbMRNsmxR9FF2SIwnuGRuRQ81wOd0"
        /> */}
            {/* <Image
					h={["25px", "60px"]}
					src="https://i.ibb.co/84MjLRt/Ripik-Vision.png"
				/>
			</Flex> */}
        </Flex>
    );
};

export default NavBox;
