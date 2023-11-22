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
import { indexWordMap } from "../Sinterflame";
import { useParams } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { TriangleDownIcon } from "@chakra-ui/icons";

const CompareModal = ({ openModal, closeModal, data, setData }) => {
  let param = useParams();
  const size = useWindowSize();

  const handleDelete = (id) => {
    if (data.length > 2) {
      setData((prev) => {
        let updatedData = [...prev];
        let idx = updatedData.findIndex((item) => item.id === id);
        updatedData.splice(idx, 1);

        return updatedData;
      });
    }
  };

  return (
    <>
      {size.width >= 768 ? (
        <Modal isOpen={openModal} onClose={closeModal} isCentered="true">
          <ModalOverlay />
          <ModalContent style={{ borderRadius: "12px" }} maxW="650px">
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
            <ModalBody p="24px">
              <div className="grid grid-cols-2 gap-6 items-center">
                {[...Array(4)].map((i, idx) => {
                  console.log(data[idx], idx, "burner");
                  return data.length >= idx + 1 ? (
                    <div
                      className="px-6 pb-4 pt-4 rounded-lg flex flex-col items-center gap-2"
                      style={{
                        boxShadow:
                          "4px 4px 7px 0px rgba(0, 0, 0, 0.05), -4px -4px 7px 0px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex gap-2 items-center">
                          <p className="text-base text-[#525056] font-medium capitalize">
                            {data[idx].cameraId}
                          </p>
                          <p className="text-sm text-[#938F96]">
                            {new Date(data[idx].timestamp).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }
                            )}
                          </p>
                          <p className="text-sm text-[#938F96]">
                            {new Date(data[idx].timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        <img
                          src="/delete.svg"
                          alt="Not supported"
                          className="w-[12px] h-[14px] cursor-pointer"
                          onClick={() => handleDelete(data[idx].id)}
                          style={{
                            filter: data.length > 2 ? "" : "grayscale(100%)",
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-4 items-center w-full">
                        <div className="h-full w-full flex justify-center items-center bg-black rounded-lg">
                          <img
                            src={data[idx].annotatedImage}
                            alt="not supported"
                            className="w-auto h-[140px] rounded-lg"
                          />
                        </div>
                        <div className="flex gap-3 items-end self-start w-full h-[40px]">
                          <p className="text-[#605D64] text-sm font-medium">
                            Quality
                          </p>
                          {data[idx].healthIndex != 0 ? (
                            <div className="flex gap-1 w-full">
                              {[...Array(5)].map((val, j) => {
                                let i = j + 1;
                                return (
                                  <div
                                    className="h-3 w-full rounded-xl relative flex items-center justify-center"
                                    style={{
                                      backgroundColor:
                                        i <= data[idx].healthIndex
                                          ? "#FFA500"
                                          : "#F2F2F2",
                                    }}
                                  >
                                    {i == data[idx].healthIndex && (
                                      <div className="flex flex-col gap-0 absolute top-[-35px] items-center">
                                        <p
                                          className="px-2 py-1 text-[#FFA500] font-bold text-sm rounded-md z-0 whitespace-nowrap bg-white"
                                          style={{
                                            boxShadow:
                                              "4px 4px 4px 0px rgba(226, 240, 220, 0.51), -4px -4px 18px 0px rgba(226, 240, 220, 0.38)",
                                          }}
                                        >
                                          {indexWordMap[data[idx].healthIndex]}
                                        </p>
                                        <TriangleDownIcon
                                          style={{
                                            color: "#CCCCCC",
                                            marginTop: "-5px",
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-[#FFA500] font-bold text-sm">
                              No flame
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 self-start mt-2">
                          <p className="text-xs text-[#938F96]">
                            Model accuracy
                          </p>
                          <p className="text-sm text-[#69B04B]">
                            {data[idx]?.conf?.toFixed(2) + "%"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="px-6 pb-4 pt-4 rounded-lg flex flex-col items-center gap-2 h-full w-full"
                      style={{
                        boxShadow:
                          "4px 4px 7px 0px rgba(0, 0, 0, 0.05), -4px -4px 7px 0px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <div className="rounded-2xl border-2 border-[#79767D] border-dashed w-full h-full flex justify-center items-center">
                        <div className="flex gap-3 items-center">
                          <img
                            src="/SinterflameIcons/addBurner.svg"
                            alt="No support"
                            className="cursor-pointer w-[40px] h-[40px]"
                            onClick={closeModal}
                          />
                          <p className="text-[#79767D] text-base">Add Burner</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Drawer onClose={closeModal} isOpen={openModal} size="full">
          <DrawerOverlay />
          <DrawerContent height={"fit-content"}>
            <DrawerHeader padding="0px">
              <div className="flex justify-center items-center">
                <img
                  className="rounded-[39px] p-[10px] bg-white cursor-pointer"
                  style={{ boxShadow: "0px 2px 35px 0px rgba(0, 0, 0, 0.06)" }}
                  src="/SinterflameIcons/cross.svg"
                  alt="Not supported"
                  onClick={closeModal}
                />
              </div>
            </DrawerHeader>
            <DrawerBody padding="24px">
              <div className="grid grid-cols-1 gap-6 items-center">
                {[...Array(4)].map((i, idx) => {
                  console.log(data[idx], idx, "burner");
                  return data.length >= idx + 1 ? (
                    <div
                      className="px-6 pb-4 pt-2 rounded-lg flex flex-col items-center gap-2"
                      style={{
                        boxShadow:
                          "4px 4px 7px 0px rgba(0, 0, 0, 0.05), -4px -4px 7px 0px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex gap-2 items-center">
                          <p className="text-base text-[#525056] font-medium capitalize">
                            {data[idx].cameraId}
                          </p>
                          <p className="text-sm text-[#938F96]">
                            {new Date(data[idx].timestamp).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }
                            )}
                          </p>
                          <p className="text-sm text-[#938F96]">
                            {new Date(data[idx].timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        <img
                          src="/delete.svg"
                          alt="Not supported"
                          className="w-[12px] h-[14px] cursor-pointer"
                          onClick={() => handleDelete(data[idx].id)}
                          style={{
                            filter: data.length > 2 ? "" : "grayscale(100%)",
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-4 items-center w-full">
                        <div className="h-full w-full flex justify-center items-center bg-black rounded-lg">
                          <img
                            src={data[idx].annotatedImage}
                            alt="not supported"
                            className="w-auto h-[190px] rounded-lg"
                          />
                        </div>
                        <div className="flex gap-3 items-end self-start w-full h-[40px]">
                          <p className="text-[#605D64] text-sm font-medium">
                            Quality
                          </p>
                          {data[idx].healthIndex != 0 ? (
                            <div className="flex gap-1 w-full">
                              {[...Array(5)].map((val, j) => {
                                let i = j + 1;
                                return (
                                  <div
                                    className="h-3 w-full rounded-xl relative flex items-center justify-center"
                                    style={{
                                      backgroundColor:
                                        i <= data[idx].healthIndex
                                          ? "#FFA500"
                                          : "#F2F2F2",
                                    }}
                                  >
                                    {i == data[idx].healthIndex && (
                                      <div className="flex flex-col gap-0 absolute top-[-35px] items-center">
                                        <p
                                          className="px-2 py-1 text-[#FFA500] font-bold text-sm rounded-md z-0 whitespace-nowrap bg-white"
                                          style={{
                                            boxShadow:
                                              "4px 4px 4px 0px rgba(226, 240, 220, 0.51), -4px -4px 18px 0px rgba(226, 240, 220, 0.38)",
                                          }}
                                        >
                                          {indexWordMap[data[idx].healthIndex]}
                                        </p>
                                        <TriangleDownIcon
                                          style={{
                                            color: "#CCCCCC",
                                            marginTop: "-5px",
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-[#FFA500] font-bold text-sm">
                              No flame
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 self-start mt-2">
                          <p className="text-xs text-[#938F96]">
                            Model accuracy
                          </p>
                          <p className="text-sm text-[#69B04B]">
                            {data[idx]?.conf?.toFixed(2) + "%"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="px-6 pb-4 pt-4 rounded-lg flex flex-col items-center gap-2 h-[300px] w-full"
                      style={{
                        boxShadow:
                          "4px 4px 7px 0px rgba(0, 0, 0, 0.05), -4px -4px 7px 0px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <div className="rounded-2xl border-2 border-[#79767D] border-dashed w-full h-full flex justify-center items-center">
                        <div className="flex gap-3 items-center">
                          <img
                            src="/SinterflameIcons/addBurner.svg"
                            alt="No support"
                            className="cursor-pointer w-[40px] h-[40px]"
                            onClick={closeModal}
                          />
                          <p className="text-[#79767D] text-base">Add Burner</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>{" "}
              <div className="flex justify-center items-center h-full"></div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default CompareModal;
