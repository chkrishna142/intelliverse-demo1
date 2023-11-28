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
  useToast,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";

const ConstraintModal = ({
  openModal,
  closeModal,
  plantName,
  material,
  clientId,
}) => {
  const [alertVal, setAlertVal] = useState(1);
  const { auth } = useContext(NavContext);
  const toast = useToast();

  const getApi = async () => {
    const requestBody = JSON.stringify({
      clientId: clientId,
      useCase: material.toUpperCase(),
      plantName: plantName,
      cameraId: "all",
    });
    try {
      const response = await axios.post(
        baseURL + "vision/v2/processMonitoring/alerts/params/get/",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      setAlertVal((prev) => {
        const data = response.data?.alertParams;
        for (let burner in data) {
          return data[burner]?.healthIndex?.high;
        }
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Some error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const setApi = async () => {
    const requestBody = JSON.stringify({
      clientId: clientId,
      useCase: material.toUpperCase(),
      plantName: "chanderia",
      cameraId: "all",
      alertParam: "healthIndex",
      limitHigh: alertVal,
    });
    try {
      const response = await axios.post(
        baseURL + "vision/v2/processMonitoring/alerts/params/set/",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );

      if (response.status === 200 && response.data.message === "Success") {
        toast({
          title: "Alert limit updated",
          description: "Alert limit changed to " + alertVal,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        closeModal();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Some error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleClick = () => {
    setApi();
  };

  useEffect(() => {
    getApi();
  }, []);

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
              min={1}
              max={5}
              step={1}
              mt={"20px"}
              onChange={(val) => setAlertVal(val)}
              value={alertVal}
            >
              {[...Array(5)].map((i, b) => {
                var idx = b + 1;
                return (
                  <SliderMark
                    value={idx}
                    mt={-6}
                    ml={-0.5}
                    fontSize={"sm"}
                    hidden={idx == alertVal}
                  >
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
              onClick={handleClick}
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
