import { IoMdMail } from "react-icons/io";
import { CgPhone } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { TEInput } from "tw-elements-react";
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
const Setting = () => {
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
            Settings
          </Heading> 
          <Box position={"absolute"}  top={"30%"} left={"15%"}>
            <Img src="/Settings.svg" />
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
          <Flex flexDirection={"column"} gap={"30px"}>
            <Flex gap={"35px"}>
              <FormControl>
                <div>
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Language Preference</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                    <select className="w-full focus:outline-none">
                      <option>English</option>
                    </select>
                  </div>
                </div>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
              <FormControl>
                <div>
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Time Zone</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                    <select className="w-full focus:outline-none">
                      <option>Delhi, India GMT +05:30</option>
                    </select>
                  </div>
                </div>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
            </Flex>
            <div className="mt-0 ml-1 flex gap-3 items-center">
              <input type="checkbox" />
              <p>Receive Email Notifications</p>

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
export default Setting;
