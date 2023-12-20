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
} from "@chakra-ui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const Viewdetails = ({ slab, idx, item }) => {
  const size = useWindowSize();
  const toast = useToast();
  const [text, setText] = useState("");
  const [exceedLimit, setExceedLimit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const clientIdbf = "sesa";
  const BASE_URL_FOR_BF = "123";

  const apiCall = async () => {
    const requestData = {
      client_id: clientIdbf,

      feedback_message: text,
      id: idx,
    };

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
  const editDates = (TimeStamp) => {
    const timestamp = TimeStamp * 1000; // Multiply by 1000 to convert from seconds to milliseconds
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  return (
    <>
      <p
        className="text-center text-[#084298]  cursor-pointer"
        onClick={onOpen}
      >
        View Details
      </p>

      <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
        <ModalOverlay />
        <ModalContent
          style={{ borderRadius: "12px" }}
          maxW={`${size.width < 768 ? "400px" : "60%"}`}
        >
          <div className=" flex justify-end p-1 text-[#79767D]">
            {" "}
            <SmallCloseIcon onClick={onClose} className="cursor-pointer" />
          </div>
          <ModalBody pos="relative" p="15px" rounded="12px">
            <div className="flex flex-col gap-6">
              <div className="flex relative gap-2 justify-between">
                <p className="text-[#79767D] text-[12px] text-base">
                  Details of Slab ID-{" "}
                  <span className="text-[#000] ">{slab}</span>
                </p>
                <p className="flex text-[#79767D] text-[12px] text-base gap-2">
                  Date
                  <span className="text-[#000] ">
                    {editDates(item.timestamp)}
                  </span>
                </p>
                <p className="flex text-[#79767D] text-[12px] text-base gap-2">
                  Shift<span className="text-[#000] ">{item.shift}</span>
                </p>
              </div>
              <div className="flex justify-between">
                <div className="w-[40%]">
                  <img src={item.img} alt="" />
                </div>
                <div className="w-[60%] flex flex-col gap-2">
                  <p className="flex text-[#79767D] text-[12px] text-base gap-2">
                    Variance
                  </p>
                  <div className="flex gap-5 ">
                    <p className="flex text-[#79767D] text-[12px] text-base gap-1">
                      Length :
                      <span className="text-[#000] ">{item.variance.l}</span>
                    </p>
                    <p className="flex text-[#79767D] text-[12px] text-base gap-1">
                      Width :
                      <span className="text-[#000] ">{item.variance.b}</span>
                    </p>
                    <p className="flex text-[#79767D] text-[12px] text-base gap-1">
                      Height :
                      <span className="text-[#000] ">{item.variance.h}</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="flex text-[#79767D] text-[12px] text-base gap-1 w-[100px]">
                      Comments :
                    </p>
                    <p className="flex  text-[12px] text-base gap-1">
                      {item.comments}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="flex text-[#79767D] text-[12px] text-base gap-1 w-[50px]">
                      Date :
                    </p>
                    <p className="flex  text-[12px] text-base gap-1">
                      {editDates(item.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Viewdetails;
