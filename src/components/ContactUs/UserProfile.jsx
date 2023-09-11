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
  Spinner,
} from "@chakra-ui/react";
import NavContext from "../NavContext";
import { useContext, useEffect, useState } from "react";
import { baseURL } from "../..";
const UserProfile = () => {

  const [auth, setAuth] = useState()
  //Update states
  const [fullName, setFullName] = useState()
  const [jobTitle, setJobTitle] = useState()
  const [department, setDepartment] = useState()
  const [location, setLocation] = useState()
  const [email, setEmail] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [sendImage, setSendImage] = useState()
  //Spinner State
  const [spinner, setSpinner] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setAuth(localStorage.getItem('auth_token'))
    getProducts(localStorage.getItem('auth_token'))
  }, [])

  const getProducts = async (auth) => {
    try {
      const data = await fetch(baseURL + 'user', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth
        },
      })
      const res = await data.json()
      setFullName(res?.data?.fullname)
      setJobTitle(res?.data?.jobtitle)
      setDepartment(res?.data?.department)
      setLocation(res?.data?.location)
      setEmail(res?.data?.email)
      setImageUrl(res?.data?.imageurl)
    } catch (e) {
      console.log(e);
    }
  };

  const updateProfile = async () => {
    setSpinner(true)
    var myHeaders = new Headers();
    myHeaders.append("X-Auth-Token", auth);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "fullname": fullName,
      "jobtitle": jobTitle,
      "organistaion": "",
      "department": department,
      "location": location
    });
    var requestOptions = {
      credentials: 'same-origin',
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const data = await fetch("https://intelliverse.backend-ripik.com/api/user", requestOptions)
    await imageUpload()
    const res = await data.json()
    setSpinner(false)
    setSuccess(true)
    getProducts(auth)
  }

  const imageUpload = async () => {
    const data = new FormData();
    data.append("image", sendImage);
    const call = await fetch('https://intelliverse.backend-ripik.com/api/user/uploadimage', {
      method: "POST",
      headers: {
        "X-Auth-Token": auth
      },
      body: data
    })
    const res = await call.json()
  }

  const selectPicture = (event) => {
    console.log(event.target.files[0])
    var profile = event.target.files[0]
    setSendImage(profile)
    setImageUrl(URL.createObjectURL(profile))
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false)
      }, 2000)
    }
  }, [success])


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
          <Box position={"absolute"} top={"30%"} left={"15%"}>
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
            <img className={imageUrl !== null ? "h-44" : null} src={imageUrl === null ? "/profile_sample.svg" : imageUrl} />
            <span className="bg-[#034D87] h-10 w-10 rounded-full absolute mt-32 ml-28 flex justify-center items-center cursor-pointer">
              <img className="absolute cursor-pointer" src="pencil.svg" alt="pencil" />
              <input className="opacity-0 cursor-pointer" type="file" onChange={(e) => selectPicture(e)} />
            </span>
          </div>
          <Flex flexDirection={"column"} gap={"30px"}>
            <Flex gap={"35px"}>
              <FormControl>
                <div>
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Full Name</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                    <input value={fullName} placeholder={"Enter Full Name"} onChange={(e) => setFullName(e.target.value)} className="w-full focus:outline-none pl-2 " />
                  </div>
                </div>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
              <FormControl>
                <div>
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Job Title / Position</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                    <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full focus:outline-none pl-2" placeholder="Enter Your Job Title" />

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
                    <input value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full focus:outline-none pl-2" placeholder="Enter Your Department" />

                  </div>
                </div>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
              <FormControl>
                <div>
                  <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Location</div>
                  <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                    <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full focus:outline-none pl-2" placeholder="Enter Your Location" />

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
                    <input disabled value={email} className="w-full focus:outline-none pl-2" placeholder="abc@email.com" />

                  </div>
                </div>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
            </div>
          </Flex>
          <Flex className="-mt-10" justifyContent={"flex-end"}>
            {success === false ? <Button
              bg={"#034D87"}
              _hover={{ bg: "#034D87" }}
              onClick={updateProfile}
              color={"white"}
              borderRadius={"md"}
              width={'150px'}
            >
              {spinner === false ? <p>Save Changes</p> : <Spinner />}
            </Button> : <Button
              bg={"green"}
              _hover={{ bg: "green" }}
              color={"white"}
              borderRadius={"md"}
              width={'150px'}
            >
              Success
            </Button>}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default UserProfile;
