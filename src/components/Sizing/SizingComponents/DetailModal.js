import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import DonutChart from "../../Charts/SizingCharts/DonutChart";
import LiquidGauge from "../../Charts/SizingCharts/LiquidGauge";
import axios from "axios";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";
import { useState, useContext, useRef, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

const DetailModal = ({ openModal, closeModal, data, index }) => {
  let param = useParams();
  const size = useWindowSize();
  const { auth } = useContext(NavContext);
  let material = param.material.toLowerCase();
  let clientId = param.clientId.toLowerCase();
  const indexRef = useRef();
  const idRef = useRef();
  const cameraRef = useRef();
  const plantRef = useRef();
  const [modalData, setModalData] = useState({});

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      material: material,
      plantName: plantRef.current,
      cameraId: cameraRef.current,
      recordId: idRef.current,
    });
    const response = await axios
      .post(baseURL + "vision/v2/sizing/history/single/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        setModalData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    indexRef.current = index;
    idRef.current = data[index].id;
    cameraRef.current = data[index].cameraId;
    plantRef.current = data[index].plantName;
    apiCall();
  }, []);

  const toggleMove = (val) => {
    //index -1
    let x = indexRef.current;
    if (val == 1) {
      indexRef.current = x > 0 ? x - 1 : data.length - 1;
    }
    //index +1
    else if (val == 2) {
      indexRef.current = x < data.length - 1 ? x + 1 : 0;
    }

    let idx = indexRef.current;
    cameraRef.current = data[idx].cameraId;
    idRef.current = data[idx].id;
    plantRef.current = data[idx].plantName;
    apiCall();
  };

  return (
    modalData.hasOwnProperty("originalImage") &&
    (size.width >= 768 ? (
      <Modal isOpen={openModal} onClose={closeModal} isCentered="true">
        <ModalOverlay />
        <ModalContent style={{ borderRadius: "12px" }} maxW="800px">
          <ModalHeader padding="0px">
            <div className="py-3 pr-2 pl-6 flex justify-between items-center bg-[#F5F5F5] rounded-tr-xl rounded-tl-xl">
              <div className="flex gap-3 items-center">
                <img src="/SizingIcons/Clock.svg" />
                <p className="text-black font-semibold text-sm">
                  {new Date(modalData.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }) +
                    " " +
                    new Date(modalData.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <img
                src="/SizingIcons/cross.svg"
                className="cursor-pointer"
                onClick={closeModal}
              />
            </div>
          </ModalHeader>
          <ModalBody pos="relative" px="0px">
            <div className="flex">
              {data.length > 1 && (
                <img
                  className="sticky top-[50%] left-0 h-[32px] pl-2 cursor-pointer"
                  src="/SizingIcons/arrowLeft.svg"
                  onClick={() => toggleMove(1)}
                />
              )}
              {modalData.noCoal === 0 ? (
                <>
                  <div
                    className={
                      material === "coal"
                        ? "flex-1 flex flex-col gap-4 p-5 w-[290px]"
                        : "flex-1 grid grid-cols-2 gap-4 p-5"
                    }
                  >
                    <div className="flex flex-col gap-2 items-center">
                      <p className="text-sm text-[#3E3C42] self-start">
                        Original Image
                      </p>
                      <div className="flex items-center justify-center w-full h-full bg-black rounded-lg">
                        <img
                          className="rounded-lg h-[150px]"
                          src={modalData.originalImage}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <p className="text-sm text-[#3E3C42] self-start">
                        Perspective Image
                      </p>
                      <div className="flex items-center justify-center w-full h-full bg-black rounded-lg">
                        <img
                          className="rounded-lg h-[150px]"
                          src={modalData.perspectiveImage}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <p className="text-sm text-[#3E3C42] self-start">
                        Particle Analysis
                      </p>
                      <div className="flex items-center justify-center w-full h-full bg-black rounded-lg">
                        <img
                          className="rounded-lg h-[150px]"
                          src={modalData.particleImage}
                        />
                      </div>
                    </div>
                    {material !== "coal" && (
                      <div className="flex flex-col gap-2">
                        <p className="text-black text-base font-medium">
                          Size Distribution
                        </p>
                        <div className="h-[150px] w-full">
                          <DonutChart
                            data={Object.values(modalData.size)}
                            labels={Object.keys(modalData.size)}
                            position="right"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {material === "coal" && (
                    <div className="flex-1 flex flex-col gap-9 p-5 w-[420px]">
                      <div className="flex flex-col gap-6">
                        <p className="text-black text-base font-medium">
                          Size Distribution
                        </p>
                        <div className="h-[150px] w-full">
                          <DonutChart
                            data={Object.values(modalData.size)}
                            labels={Object.keys(modalData.size)}
                            position="right"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-6 h-[120px]">
                        <p className="text-black text-base font-medium">
                          Color Distribution
                        </p>
                        <div className="flex gap-1 h-full w-full">
                          <div
                            style={{ width: `${modalData.color.gray}%` }}
                            className="bg-[#79767D] rounded-lg text-white text-center h-full flex items-center justify-center"
                          >
                            {modalData.color.gray.toFixed(2)}%
                          </div>
                          <div
                            style={{ width: `${modalData.color.black}%` }}
                            className="bg-black rounded-lg text-white text-center h-full flex items-center justify-center"
                          >
                            {modalData.color.black.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-6 h-[165px]">
                        <p className="text-black text-base font-medium">
                          Moisture Content
                        </p>
                        <div className="h-full w-full">
                          <div className="flex gap-7 w-full h-full items-center">
                            <LiquidGauge moisture={modalData.moisture} r={50} />
                            <div className="flex flex-col items-start justify-center">
                              <p className="text-[#69B04B] text-xl font-medium">
                                Good
                              </p>
                              <p className="text-[#AEA9B1] text-sm">
                                Moisture content within the limit
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex gap-4 items-center">
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-sm text-[#3E3C42] self-start">
                      Original Image
                    </p>
                    <div className="flex items-center justify-center w-full h-full bg-black rounded-lg">
                      <img
                        className="rounded-lg h-[150px]"
                        src={modalData.originalImage}
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-8 items-center justify-center">
                    <img src="/SizingIcons/noCoal.svg" className="h-[10vh]" />
                    <p>No {material} on belt</p>
                  </div>
                </div>
              )}
              {data.length > 1 && (
                <img
                  className="sticky top-[50%] right-0 h-[32px] pr-2 cursor-pointer"
                  src="/SizingIcons/arrowRight.svg"
                  onClick={() => toggleMove(2)}
                />
              )}
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="flex w-full justify-end">
              <div className="flex flex-col gap-1 items-end">
                <p className="text-[#605D64] text-base">
                  Noticed incorrect data?
                </p>
                <p className="text-[#084298] text-base font-semibold">
                  Give us feedback
                </p>
              </div>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    ) : (
      <Drawer onClose={closeModal} isOpen={openModal} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader padding="0px">
            <div className="py-3 pr-2 pl-6 flex justify-between items-center bg-[#F5F5F5] rounded-tr-xl rounded-tl-xl">
              <div className="flex gap-3 items-center">
                <img src="/SizingIcons/Clock.svg" />
                <p className="text-black font-semibold text-sm">
                  {new Date(modalData.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }) +
                    " " +
                    new Date(modalData.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <img
                src="/SizingIcons/cross.svg"
                className="cursor-pointer"
                onClick={closeModal}
              />
            </div>
          </DrawerHeader>
          <DrawerBody padding="0px">
            <div className="flex">
              {data.length > 1 && (
                <img
                  className="sticky top-[50%] left-0 h-[32px] pl-2 cursor-pointer"
                  src="/SizingIcons/arrowLeft.svg"
                  onClick={() => toggleMove(1)}
                />
              )}
              {modalData.noCoal === 0 ? (
                <div className="flex-1 grid grid-cols-1 gap-3 p-3">
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-sm text-[#3E3C42] self-start">
                      Original Image
                    </p>
                    <div className="flex items-center justify-center w-full h-full bg-black rounded-lg">
                      <img
                        className="rounded-lg h-[150px]"
                        src={modalData.originalImage}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-sm text-[#3E3C42] self-start">
                      Perspective Image
                    </p>
                    <div className="flex items-center justify-center w-full h-full bg-black rounded-lg">
                      <img
                        className="rounded-lg h-[150px]"
                        src={modalData.perspectiveImage}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-sm text-[#3E3C42] self-start">
                      Particle Analysis
                    </p>
                    <div className="flex items-center justify-center w-full h-full bg-black rounded-lg">
                      <img
                        className="rounded-lg h-[150px]"
                        src={modalData.particleImage}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-base font-medium">
                      Size Distribution
                    </p>
                    <div className="h-[250px] w-full">
                      <DonutChart
                        data={Object.values(modalData.size)}
                        labels={Object.keys(modalData.size)}
                        position="bottom"
                      />
                    </div>
                  </div>
                  {material === "coal" && (
                    <>
                      <div className="flex flex-col gap-6 h-[120px]">
                        <p className="text-black text-base font-medium">
                          Color Distribution
                        </p>
                        <div className="flex gap-1 h-full w-full">
                          <div
                            style={{ width: `${modalData.color.gray}%` }}
                            className="bg-[#79767D] rounded-lg text-white text-center h-full flex items-center justify-center"
                          >
                            {modalData.color.gray.toFixed(2)}%
                          </div>
                          <div
                            style={{ width: `${modalData.color.black}%` }}
                            className="bg-black rounded-lg text-white text-center h-full flex items-center justify-center"
                          >
                            {modalData.color.black.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-6 h-[165px]">
                        <p className="text-black text-base font-medium">
                          Moisture Content
                        </p>
                        <div className="h-full w-full">
                          <div className="flex gap-7 w-full h-full items-center">
                            <LiquidGauge moisture={modalData.moisture} r={50} />
                            <div className="max-w-[130px] min-[450px]:max-w-max flex flex-col items-start justify-center">
                              <p className="text-[#69B04B] text-xl font-medium">
                                Good
                              </p>
                              <p className="text-[#AEA9B1] text-sm">
                                Moisture content within the limit
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-3 justify-center p-3 items-center">
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-sm text-[#3E3C42] self-start">
                      Original Image
                    </p>
                    <div className="flex items-center justify-center w-full h-full bg-black rounded-lg">
                      <img
                        className="rounded-lg h-[150px]"
                        src={modalData.originalImage}
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-8 items-center justify-center">
                    <img src="/SizingIcons/noCoal.svg" className="h-[20vh]" />
                    <p>No {material} on belt</p>
                  </div>
                </div>
              )}
              {data.length > 1 && (
                <img
                  className="sticky top-[50%] right-0 h-[32px] pr-2 cursor-pointer"
                  src="/SizingIcons/arrowRight.svg"
                  onClick={() => toggleMove(2)}
                />
              )}
            </div>
          </DrawerBody>
          <DrawerFooter>
            <div className="flex w-full justify-end">
              <div className="flex flex-col gap-1 items-end">
                <p className="text-[#605D64] text-base">
                  Noticed incorrect data?
                </p>
                <p className="text-[#084298] text-base font-semibold">
                  Give us feedback
                </p>
              </div>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ))
  );
};

export default DetailModal;
