import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
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
  ModalCloseButton,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";

let wordLimit = 500;

const Feedback = ({ slab, idx, comment }) => {
  const toast = useToast();
  const [text, setText] = useState("");
  const [exceedLimit, setExceedLimit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const clientIdbf = "sesa";
  const BASE_URL_FOR_BF = "123";

  useEffect(() => {
    setText(comment);
  }, [comment]);

  const apiCall = async () => {
    const requestData = {
      feedback_message: text,
      id: idx,
    };
    console.log(requestData);
    try {
      if (exceedLimit || text.length === 0) {
        throw new Error("Invalid data");
      }

      const response = await axios.post(
        BASE_URL_FOR_BF + "/feedback/",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response after feedback:", response);

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
      } else {
        throw new Error("Feedback submission failed");
      }
    } catch (error) {
      console.error("Error:", error);

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
    <>
      <Tooltip label={comment} placement="top">
        <div
          className="w-full flex justify-center items-center gap-2"
          onClick={() => {
            onOpen();
          }}
        >
          {comment != "" && (
            <p className=" ">
              {comment.split(" ").length > 3
                ? comment.split(" ").slice(0, 3).join(" ") + "..."
                : comment}
            </p>
          )}

          <EditIcon />
        </div>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
        <ModalOverlay />
        <ModalContent style={{ borderRadius: "12px" }} maxW="400px">
          <div className=" flex justify-end p-2 text-[#79767D]">
            {" "}
            <SmallCloseIcon onClick={onClose} className="cursor-pointer" />
          </div>
          <ModalBody pos="relative" p="12px" rounded="12px">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col relative gap-2">
                <p className="text-[#79767D] text-[14px]">
                  Operator's feedback
                </p>
                <p className="text-[#79767D] text-[12px] text-base">
                  Slab ID- <span className="text-[#000] ">{slab}</span>
                </p>
                <Textarea
                  placeholder="Please explain... "
                  mt="4px"
                  mb="4px"
                  isInvalid={exceedLimit}
                  onChange={textChangeHandler}
                  value={text}
                />
                <p className="absolute top-0 right-0 text-xs text-gray-600">
                  Words: {text.split(/[\s.!,;?]+/).filter(Boolean).length}{" "}
                  {`(Limit ${wordLimit})`}
                </p>
              </div>
              <div className="flex justify-end">
                <PrimaryButton
                  text={"Submit"}
                  width={"fit-content"}
                  onClick={() => apiCall()}
                />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Feedback;
