import { IoMdMail } from "react-icons/io";
import { CgPhone } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { TEInput } from "tw-elements-react";
import { useWindowSize } from "@uidotdev/usehooks";
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
const ConatctUs = () => {
  // handling button submit
  const size = useWindowSize();
  const handleSubmit = () => {
    console.log("click");
  };
  return (
    <>
      <div className="shadow-lg bg-white mt-4 p-2 w-full flex">
        {/* left container */}
        {size.width > 640 ? <VStack
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
          <Heading fontSize={"24px"} fontWeight={"semibold"}>
            Contact Us for a Live Demo
          </Heading>
          <Flex flexDirection={"column"} gap={"30px"}>
            <HStack gap={"25px"} alignItems={"center"}>
              <Icon as={CgPhone} boxSize={5} />

              <Text>+1234 567</Text>
            </HStack>
            <HStack gap={"25px"} alignItems={"center"}>
              <Icon as={IoMdMail} boxSize={5} />
              <Text>xyz@ripik.ai</Text>
            </HStack>
            <HStack gap={"25px"} alignItems={"center"}>
              <Icon as={FaLocationDot} boxSize={5} />
              <Text>Greater Delhi Region, India</Text>
            </HStack>
          </Flex>

          <Box position={"relative"} top={"-10"} left={"250"}>
            <Img src="contactusellipse.svg" />
          </Box>
          <Box position={"absolute"} boxSize={"100px"} top={"71%"} left={"28%"}>
            <Img src="contactusellipse.svg" />
          </Box>
        </VStack> : null}

        {/* right conatiner */}
        <div className="p-[30px] pt-[40px] flex flex-col gap-[60px] md:w-[60vw] w-full"
        >
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
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Full Name</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                    <input className="w-full focus:outline-none pl-2" placeholder="Email ID" />
                  </div>
                </div>
                {/* <Input placeholder="Enter Your Official Email Id" /> */}
              </FormControl>
            </Flex>
            <Flex gap={"35px"}>
              <FormControl>
                <div>
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Full Name</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                    <input className="w-full focus:outline-none pl-2" placeholder="Company Name" />
                  </div>
                </div>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
              <FormControl>
                <select className="h-14 border border-[#084298] rounded-md w-full px-2 py-2">
                  <option value="">Company Size</option>
                </select>
              </FormControl>
            </Flex>
          </Flex>
          <Flex flexDirection={"column"} gap={"30px"}>
            <FormControl>
              <FormLabel fontSize={"12px"}>
                Current Point of Contact (Optional)
              </FormLabel>
              <Input
                type="text"
                border={"1px solid #6CA6FC"}
                placeholder="Your Response"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"12px"}>
                Additional Remarks (Optional)
              </FormLabel>
              <Textarea
                type="text"
                border={"1px solid #6CA6FC"}
                placeholder="Your Response"
              />
            </FormControl>
          </Flex>
          <Flex justifyContent={"flex-end"}>
            <Button
              bg={"#034D87"}
              _hover={{ bg: "#034D87" }}
              onClick={handleSubmit}
              color={"white"}
              borderRadius={"md"}
            >
              Submit
            </Button>
          </Flex>
        </div>
      </div>
    </>
  );
};
export default ConatctUs;
