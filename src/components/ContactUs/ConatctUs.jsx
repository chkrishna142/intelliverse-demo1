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
} from "@chakra-ui/react";
const ConatctUs = () => {
  // handling button submit
  const handleSubmit = () => {
    console.log("click");
  };
  return (
    <>
      <Flex
        padding={"5px"}
        marginTop={"10px"}
        className="shadow-lg"
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
                <TEInput type="text" id="name" label="Username"></TEInput>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
              <FormControl>
                <TEInput type="text" id="name" label="Email Id"></TEInput>
                {/* <Input placeholder="Enter Your Official Email Id" /> */}
              </FormControl>
            </Flex>
            <Flex gap={"35px"}>
              <FormControl>
                <TEInput type="text" id="name" label="Company Name"></TEInput>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
              <FormControl>
                <Select>
                  <option value="">Company Size</option>
                </Select>
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
              <Input
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
              borderRadius={"3xl"}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default ConatctUs;
