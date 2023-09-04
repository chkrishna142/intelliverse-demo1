import {
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Select,
  Box,
  Img,
  Textarea,
} from "@chakra-ui/react";
const UserProfile = () => {
  // handling button submit
  const handleSubmit = () => {
    console.log("click");
  };
  return (
    <>
      <Flex
        padding={"5px"}
        marginTop={"10px"}
        className="shadow-lg mt-4 border rounded-xl"
        bg="#FFFFFF"
      >
        {/* left container */}
        <VStack
          height={"80vh"}
          color={"white"}
          justifyContent={"flex-start"}
          width={"35%"}
          backgroundColor={"#034D87"}
          gap={"100px"}
          alignItems={"flex-start"}
          borderRadius={"5px"}
          px={"25px"}
          py={"40px"}
        >
          <Heading fontSize={"30px"} fontWeight={"semibold"}>
            Profile Management
          </Heading> 
          <Box position={"absolute"}  top={"30%"} left={"15%"}>
            <Img src="/profile_management.svg" />
          </Box>
        </VStack>

        {/* right conatiner */}
        <Flex
          width={"65%"}
          padding={"30px"}
          paddingTop={"40px"}
          gap={"60px"}
          flexDirection={"column"}
        >
          <div className="w-full flex justify-center">
            <img src="/profile_sample.svg" />
            <span className="bg-[#034D87] h-10 w-10 rounded-full absolute mt-32 ml-28 flex justify-center items-center cursor-pointer">
              <img src="pencil.svg" />
            </span>
          </div>
          <Flex flexDirection={"column"} gap={"30px"}>
            <Flex gap={"35px"}>
              <FormControl>
                <div>
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Full Name</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                    <input className="w-full focus:outline-none pl-2" placeholder="Enter Your Name" />                
                  </div>
                </div>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
              <FormControl>
                <div>
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Job Title / Position</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                    <input className="w-full focus:outline-none pl-2" placeholder="Enter Your Job Title" />
                     
                  </div>
                </div>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>   
            </Flex>
            <Flex gap={"35px"}>
              <FormControl>
                <div>
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Department</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                    <input className="w-full focus:outline-none pl-2" placeholder="Enter Your Department" />
                     
                  </div>
                </div>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
              <FormControl>
                <div>
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Location</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                    <input className="w-full focus:outline-none pl-2" placeholder="Enter Your Location" />
                     
                  </div>
                </div>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
              
            </Flex>
            <div className="grid grid-cols-2 gap-9">
              <FormControl>
                <div>
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Email</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center bg-gray-100">
                    <input disabled className="w-full focus:outline-none pl-2" placeholder="abc@email.com" />
                     
                  </div>
                </div>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>             
            </div>         
          </Flex>
          <Flex className="-mt-10" justifyContent={"flex-end"}>
            <Button
              bg={"#034D87"}
              _hover={{ bg: "#034D87" }}
              onClick={handleSubmit}
              color={"white"}
              borderRadius={"md"}
            >
              Save Changes
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default UserProfile;
