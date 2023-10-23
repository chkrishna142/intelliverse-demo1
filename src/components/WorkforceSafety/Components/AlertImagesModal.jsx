import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AlertImagesModal = ({ openModal, closeModal, row }) => {
  const [selectedImage, setSelectedImage] = useState(1);

  useEffect(() => {
    setSelectedImage(Object.keys(row.annotatedImage)[0]);
  }, []);

  return (
    <ChakraProvider>
      <Modal isOpen={openModal} onClose={closeModal} isCentered="true">
        <ModalOverlay />
        <ModalContent style={{ borderRadius: "12px" }} maxW="700px">
          <ModalHeader padding="0px">
            <div className="pl-6 py-3 pr-2 bg-[#F5F5F5] items-center flex justify-between text-sm whitespace-nowrap rounded-t-xl">
              <div className="flex gap-3 items-center text-black font-medium">
                <img src="/SizingIcons/Clock.svg" />
                <p>{new Date(row.startTs * 1000).toLocaleDateString()}</p>
              </div>
              <img
                src="/WorkforceSafetyIcons/cross.svg"
                className="cursor-pointer"
                onClick={() => closeModal()}
              />
            </div>
          </ModalHeader>
          <ModalBody p="16px" rounded="12px">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-xs text-[#605D64] font-medium">Violations</p>
                <div className="flex flex-col gap-2 py-3 pl-4 pr-6 bg-[#FCEEEE] text-[#3E3C42] text-sm font-medium rounded-xl h-full">
                  <p>{row.subEvent}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                  {Object.keys(row.annotatedImage).map((val) => {
                    return (
                      <Button
                        colorScheme="gray"
                        variant="link"
                        fontSize="12px"
                        isDisabled={selectedImage == val}
                        onClick={() => setSelectedImage(val)}
                      >
                        {val}
                      </Button>
                    );
                  })}
                </div>
                <div className="relative w-[400px] h-[300px] bg-black rounded-xl flex justify-center items-center">
                  <img src={row.annotatedImage[selectedImage]} />
                  <div className="absolute bottom-2 right-2 bg-black rounded-md opacity-70 p-[2px]">
                    <p className="text-white text-xs font-semibold bg-black rounded-lg">
                      {new Date(row.startTs * 1000).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black rounded-md opacity-70 p-[2px]">
                    <p className="text-white text-xs font-semibold bg-black rounded-lg">
                      {new Date(row.endTs * 1000).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default AlertImagesModal;
