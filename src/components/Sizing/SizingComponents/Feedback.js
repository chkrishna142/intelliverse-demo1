import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea,
  useToast,
  list,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../../../index";
import { useContext, useEffect, useState } from "react";
import NavContext from "../../NavContext";

let wordLimit = 100;

const Feedback = ({
  openModal,
  closeModal,
  clientId,
  material,
  cameraId,
  plantName,
  id,
}) => {
  const { auth } = useContext(NavContext);
  const toast = useToast();
  const [issue, setIssue] = useState([]);
  const [text, setText] = useState("");
  const [exceedLimit, setExceedLimit] = useState(false);

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      material: material,
      plantName: plantName,
      cameraId: cameraId,
      recordId: id,
      feedbackStatus: "BAD",
      feedbackMessage: text,
    });
    if (issue.length == 0 || exceedLimit || text.length == 0) {
      toast({
        title: "Invalid data",
        description: "Please ensure that data entered is valid",
        status: "warning",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    const response = await axios
      .post(baseURL + "vision/v2/sizing/feedback/single/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        if (response.data.message == "Success") {
          toast({
            title: "Feedback Submitted",
            description: "Your feedback has been recieved",
            status: "success",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
          closeModal();
        } else {
          toast({
            title: "Error",
            description: "Please try again",
            status: "error",
            position: "top-right",
            duration: 1000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeHandler = (val) => {
    setIssue((prev) => {
      const list = prev.slice(); // Create a copy of the previous state array
      const idx = list.indexOf(val);

      if (idx !== -1) {
        list.splice(idx, 1); // Remove the element if it exists
      } else {
        list.push(val); // Add the element if it doesn't exist
      }

      return list; // Return the updated array
    });
  };

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

  return (
    <Modal isOpen={openModal} onClose={closeModal} isCentered="true">
      <ModalOverlay />
      <ModalContent style={{ borderRadius: "12px" }} maxW="400px">
        <ModalBody pos="relative" p="24px" rounded="12px">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <p className="text-base text-[#141619]">
                Select the parameter(s) you found incorrect{" "}
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    name="size"
                    className="h-4 w-4"
                    onChange={(e) => changeHandler(e.target.name)}
                  />
                  <p className="text-[#605D64] text-base">Size distribution</p>
                </div>
                {material === "coal" && (
                  <>
                    <div className="flex gap-3 items-center">
                      <input
                        type="checkbox"
                        name="color"
                        className="h-4 w-4"
                        onChange={(e) => changeHandler(e.target.name)}
                      />
                      <p className="text-[#605D64] text-base">
                        Color distribution
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <input
                        type="checkbox"
                        name="moisture"
                        className="h-4 w-4"
                        onChange={(e) => changeHandler(e.target.name)}
                      />
                      <p className="text-[#605D64] text-base">Moisture</p>
                    </div>
                  </>
                )}
              </div>
            </div>
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
  );
};

export default Feedback;
