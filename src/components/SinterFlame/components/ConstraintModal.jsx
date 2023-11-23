import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Slider,
  SliderMark,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useState } from "react";

const ConstraintModal = ({ openModal, closeModal }) => {
  const [alertVal, setAlertVal] = useState(0);
  return (
    <Modal isOpen={openModal} onClose={closeModal} isCentered="true">
      <ModalOverlay />
      <ModalContent style={{ borderRadius: "12px" }} maxW="300px">
        <ModalHeader
          padding="0px"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
        >
          <img
            className="absolute top-[-20px] rounded-[39px] p-[10px] bg-white cursor-pointer"
            style={{ boxShadow: "0px 2px 35px 0px rgba(0, 0, 0, 0.06)" }}
            src="/SinterflameIcons/cross.svg"
            alt="Not supported"
            onClick={closeModal}
          />
        </ModalHeader>
        <ModalBody px="24px">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold">Alert Value</p>
            <Slider
              aria-label="slider-ex-6"
              min={0}
              max={5}
              step={1}
              mt={'20px'}
              onChange={(val) => setAlertVal(val)}
              value={alertVal}
            >
              {[...Array(6)].map((i, idx) => {
                return (
                  <SliderMark value={idx} mt={-6} ml={-0.5} fontSize={'sm'} hidden={idx == alertVal}>
                    {idx}
                  </SliderMark>
                );
              })}
              <SliderMark
                value={alertVal}
                textAlign="center"
                bg="#084298"
                color="white"
                mt="-8"
                ml="-5"
                w="8"
                rounded={4}
              >
                {alertVal}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Button
              alignSelf={"self-end"}
              colorScheme="facebook"
              onClick={closeModal}
              size={"sm"}
            >
              Confirm
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConstraintModal;
