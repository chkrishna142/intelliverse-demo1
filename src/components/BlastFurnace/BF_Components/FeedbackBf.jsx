import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Textarea,
    useToast,
    list,
    useDisclosure,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { baseURL } from "../../../index";
  import { useContext, useEffect, useState } from "react";
  import NavContext from "../../NavContext";
  import { InfoOutlineIcon } from "@chakra-ui/icons";
  import { BASE_URL_FOR_BF, clientIdbf } from "./urlforbf";
  
  let wordLimit = 500;
  
  const FeedbackBf = ({ name, setFeedback, feedback, recommendation,idx }) => {
    const { auth } = useContext(NavContext);
    const toast = useToast();
    const [text, setText] = useState("");
    const [exceedLimit, setExceedLimit] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
  
  const apiCall = async () => {
    const requestData = {
      client_id: clientIdbf,
      feedback_status:  name == "tick" ? "GOOD" : "BAD",
      feedback_message: text,
      recommendetion_message: recommendation,
      id:idx,
    };
  
    try {
      if (exceedLimit || text.length === 0) {
        throw new Error("Invalid data");
      }
  
      const response = await axios.post(BASE_URL_FOR_BF + "/feedbac/", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Response after feedback:", response);
  
      // Check the response data and display toasts based on it
      if (response.data.status === "Feedback Created") {
        toast({
          title: "Feedback Submitted",
          description: "Your feedback has been received",
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        setFeedback(!feedback)
      } else {
        throw new Error("Feedback submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
  
      // Display an error toast with the error message
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  
    // const apiCall = async () => {
    //   // const requestData = JSON.stringify({
    //   //   client_id: clientIdbf,
    //   //   feedback_status: name == "tick" ? "GOOD" : "BAD",
    //   //   feedback_message: text,
    //   //   recommendetion_message: recommendation,
    //   // });
    //   let requestData = JSON.stringify({
    //     "client_id": "jindalsteel",
    //     "feedback_status": "GOOD",
    //     "feedback_message": "HELLO",
    //     "recommendetion_message": "Increase PCI in steps of 5Kg/THM"
    //   });
    //   // console.log(requestData);
    //   if (exceedLimit || text.length == 0) {
    //     toast({
    //       title: "Invalid data",
    //       description: "Please ensure that data entered is valid",
    //       status: "warning",
    //       position: "top-right",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //     return;
    //   }
    //   const response = await axios
    //     .post(BASE_URL_FOR_BF + "/feedback/", requestData, {
    //       credentials: "same-origin",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Auth-Token": auth,
    //       },
    //     })
    //     .then((response) => {
    //       console.log("resposnse after feedback",response);
    //       // if (response.data.message == "Success") {
    //       //   toast({
    //       //     title: "Feedback Submitted",
    //       //     description: "Your feedback has been recieved",
    //       //     status: "success",
    //       //     position: "top-right",
    //       //     duration: 3000,
    //       //     isClosable: true,
    //       //   });
    //       //   onClose();
    //       // } else {
    //       //   toast({
    //       //     title: "Error",
    //       //     description: "Please try again",
    //       //     status: "error",
    //       //     position: "top-right",
    //       //     duration: 3000,
    //       //     isClosable: true,
    //       //   });
    //       // }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  
       
    // };
  
    const textChangeHandler = (e) => {
      const inputValue = e.target.value;
      // Split based on spaces, full stops, and common special characters
      const words = inputValue.split(/[\s.!,;?]+/).filter(Boolean);
  
      if (words.length <= wordLimit) {
        setText(inputValue);
        if (exceedLimit) setExceedLimit(false);
      } else {
        setExceedLimit(true);
      }
    };
    // console.log(feedback);
    return (
      <>
        {name == "tick" ? (
          <div
            className="bg-white rounded-md cursor-pointer"
            fontSize={"20px"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              onOpen();
              setFeedback(true);
            }}
          >
            <img src="/Bficons/tickMark.svg" alt="tick" />
          </div>
        ) : (
          <div
            className="bg-white rounded-md cursor-pointer"
            fontSize={"20px"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              onOpen();
              setFeedback(false);
            }}
          >
            <img src="/Bficons/crossMark.svg" alt="cross" />
          </div>
        )}
  
        <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
          <ModalOverlay />
          <ModalContent style={{ borderRadius: "12px" }} maxW="400px">
            <ModalBody pos="relative" p="24px" rounded="12px">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col relative">
                  <p className="text-[#141619] text-base">Your feedback</p>
                  <Textarea
                    placeholder="Please explain your concern"
                    mt="4px"
                    mb="4px"
                    isInvalid={exceedLimit}
                    onChange={textChangeHandler}
                  />
                  <p className="absolute top-0 right-0 text-xs text-gray-600">
                    Words: {text.split(/[\s.!,;?]+/).filter(Boolean).length}{" "}
                    {`(Limit ${wordLimit})`}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    className="text-white py-3 px-4 rounded-[100px] bg-[#084298] text-base font-medium w-[50%] hover:opacity-60"
                    onClick={() => apiCall()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default FeedbackBf;
  