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
} from "@chakra-ui/react";
import Feedback from "./Feedback";
import { useParams } from "react-router-dom";
import SpiderChart from "../../Charts/QualityCharts/SpiderChart";
import axios from "axios";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";
import { useState, useContext, useRef, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

const DetailModal = ({ openModal, closeModal, data, index }) => {
  let param = useParams();
  const size = useWindowSize();
  const { auth } = useContext(NavContext);
  let material = 'fabric';
  let clientId = param.clientId.toLowerCase();
  const indexRef = useRef();
  const idRef = useRef();
  const cameraRef = useRef();
  const plantRef = useRef();
  const [modalData, setModalData] = useState({});
  const [openFeedback, setopenFeedback] = useState(false);

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      useCase: material,
      plantName: plantRef.current,
      cameraId: cameraRef.current,
      recordId: idRef.current,
    });
    const response = await axios
      .post(
        baseURL + "vision/v2/qualityTracking/history/single/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      )
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
    modalData.hasOwnProperty("originalImage") && (
      <>
        {size.width >= 768 ? (
          <Modal isOpen={openModal} onClose={closeModal} isCentered="true">
            <ModalOverlay />
            <ModalContent style={{ borderRadius: "12px" }} maxW="800px">
              <ModalHeader padding="0px">
                <div className="py-3 pr-2 pl-6 flex justify-between items-center bg-[#F5F5F5] rounded-tr-xl rounded-tl-xl">
                  <div className="flex gap-3 items-center">
                    <p className="text-[#AEA9B1] font-semibold text-xl">
                      {data[indexRef.current].hasOwnProperty("idx") &&
                        data[indexRef.current]["idx"] + "."}
                    </p>
                    <p className="text-black font-semibold text-sm">
                      {new Date(modalData.timestamp).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }
                      ) +
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
                  <div className="flex-1 grid grid-cols-2 gap-4 p-5">
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
                          src={modalData.analysisImage}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-black text-base font-medium">
                        Size Distribution
                      </p>
                      <div className="h-full w-full">
                        <SpiderChart
                          points={modalData.avgGapWidths[0]}
                          labels={modalData.partitions[0]}
                        />
                      </div>
                    </div>
                  </div>
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
                    <p
                      className="text-[#084298] text-base font-semibold cursor-pointer hover:opacity-60"
                      onClick={() => setopenFeedback(true)}
                    >
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
                    <p className="text-[#AEA9B1] font-semibold text-xl">
                      {data[indexRef.current].hasOwnProperty("idx") &&
                        data[indexRef.current]["idx"] + "."}
                    </p>
                    <p className="text-black font-semibold text-sm">
                      {new Date(modalData.timestamp).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }
                      ) +
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
                          src={modalData.analysisImage}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-black text-base font-medium">
                        Size Distribution
                      </p>
                      <div className="h-[250px] w-full">
                        <SpiderChart
                          points={modalData.avgGapWidths[0]}
                          labels={modalData.partitions[0]}
                        />
                      </div>
                    </div>
                  </div>
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
                    <p
                      className="text-[#084298] text-base font-semibold cursor-pointer hover:opacity-60"
                      onClick={() => setopenFeedback(true)}
                    >
                      Give us feedback
                    </p>
                  </div>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
        {openFeedback && (
          <Feedback
            openModal={openFeedback}
            closeModal={() => setopenFeedback(false)}
            clientId={clientId}
            material={material}
            cameraId={cameraRef.current}
            plantName={plantRef.current}
            id={idRef.current}
          />
        )}
      </>
    )
  );
};

export default DetailModal;
