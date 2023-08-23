import { Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "../util/util";
import Vision from "./Navbar.svg";

const Navbar = () => {
  let query = useQuery();
  const plant_name = query.get("plant_name");
  return (
    <Flex
      p="4px"
      justify="space-between"
      w="100vw"
      m="auto"
      shadow="md"
      bgColor="white"
      position="fixed"
      top="0"
      zIndex="1000000000"
      align="center"
      left="0"
      borderRadius="0px 0px 12px 12px"
    >
      <Flex alignItems="center" marginLeft="10px"
        style={{
          backgroundColor: "#ffffff",
          padding: "0px 10px",
        }}
      >
        <Image
          className=""
          // src="https://www.ultratechcement.com/content/dam/ultratechcementwebsite/new-header-design/desk.png"
          src={"/logo.svg"}
        />
       
      </Flex>
      <Flex alignItems="center" marginRight="30px">
        <img className='w-40 h-12' src="/verse.jpg" alt="heading"/>
      </Flex>
      <Flex alignItems="center" marginRight="30px">
        <div className="px-2 py-2 italic text-xl font-blue-">Steel Co.</div>
      </Flex>
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

export default Navbar;
