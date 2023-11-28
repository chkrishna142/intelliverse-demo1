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
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
  Spinner,
} from "@chakra-ui/react";
import OperatorSelect from "./OperatorSelect";
import { useWindowSize } from "@uidotdev/usehooks";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { useState } from "react";

const ShiftSelectModal = ({ openModal, closeModal }) => {
  const columns = [
    "Date",
    "Shift A (6AM to 2PM)",
    "Shift B (2PM to 10PM)",
    "Shift C (10PM to 6AM)",
  ];
  const [dataChanging, setDataChanging] = useState(false);
  const [fromTime, setFromTime] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]
  );
  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]
  );
  const size = useWindowSize();

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <>
      {size.width >= 768 ? (
        <Modal isOpen={openModal} onClose={closeModal} isCentered="true">
          <ModalOverlay />
          <ModalContent style={{ borderRadius: "12px" }} maxW="830px">
            <ModalHeader
              padding="0px"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              position={"relative"}
            >
              <img
                className="absolute top-[-30px] rounded-[39px] p-[10px] bg-white cursor-pointer"
                style={{ boxShadow: "0px 2px 35px 0px rgba(0, 0, 0, 0.06)" }}
                src="/SinterflameIcons/cross.svg"
                alt="Not supported"
                onClick={closeModal}
              />
              <div className="w-full px-3 py-4 gap-6 flex flex-col md:flex-row items-center">
                <div>
                  <FloatingInput
                    text="From"
                    type="date"
                    setDateTime={setFromTime}
                    value={fromTime}
                  />
                </div>
                <div>
                  <FloatingInput
                    text="To"
                    type="date"
                    setDateTime={setToTime}
                    value={toTime}
                  />
                </div>
                <button
                  className="text-center p-[10px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#084298] rounded-md"
                  onClick={handleClick}
                >
                  {dataChanging ? <Spinner /> : "Show"}
                </button>
              </div>
            </ModalHeader>
            <ModalBody p={0} py={"12px"}>
              <div className="w-full flex justify-center">
                <TableContainer
                  className="!max-h-[80vh] !overflow-y-auto w-[98%] shadow-md"
                  rounded={"12px"}
                >
                  <Table variant="simple">
                    <Thead className="bg-[#CFE2F3] !text-xs !sticky !top-0">
                      <Tr>
                        {columns.map((id, idx) => {
                          return id == "Date" ? (
                            <Th
                              key={idx}
                              color="#79767D"
                              fontWeight={400}
                              borderX={"1px solid #D3D3D3"}
                            >
                              {id.toUpperCase()}
                            </Th>
                          ) : (
                            <Th
                              key={idx}
                              color="#79767D"
                              fontWeight={400}
                              padding={0}
                              px={2}
                              borderRight={"1px solid #D3D3D3"}
                            >
                              <div className="w-full flex flex-col gap-0 justify-center">
                                <p className="self-start uppercase">{id}</p>
                                <div className="flex gap-2 justify-between items-center font-medium">
                                  <p>Shift Incharge</p>
                                  <p>Field Operator</p>
                                </div>
                              </div>
                            </Th>
                          );
                        })}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {[...Array(5)].map((val, idx) => {
                        return (
                          <Tr
                            key={idx}
                            className="!text-sm !text-[#3E3C42] even:bg-[#FAFAFA] odd:bg-white"
                          >
                            <Td
                              className=""
                              padding={0}
                              px={2}
                              fontWeight={400}
                              borderX={"1px solid #D3D3D3"}
                            >
                              {new Date().toLocaleDateString()}
                            </Td>
                            <OperatorSelect />
                            <OperatorSelect />
                            <OperatorSelect />
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Drawer onClose={closeModal} isOpen={openModal} size="full">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader padding="0px">
              <div className="flex items-center justify-center sm:justify-start px-2 relative">
                <img
                  className="rounded-[39px] p-[10px] bg-white cursor-pointer absolute top-1 right-1"
                  style={{ boxShadow: "0px 2px 35px 0px rgba(0, 0, 0, 0.06)" }}
                  src="/SinterflameIcons/cross.svg"
                  alt="Not supported"
                  onClick={closeModal}
                />
                <div className="px-3 py-4 gap-6 flex flex-col sm:flex-row items-center">
                  <div>
                    <FloatingInput
                      text="From"
                      type="date"
                      setDateTime={setFromTime}
                      value={fromTime}
                    />
                  </div>
                  <div>
                    <FloatingInput
                      text="To"
                      type="date"
                      setDateTime={setToTime}
                      value={toTime}
                    />
                  </div>
                  <button
                    className="text-center p-[10px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#084298] rounded-md"
                    onClick={handleClick}
                  >
                    {dataChanging ? <Spinner /> : "Show"}
                  </button>
                </div>
              </div>
            </DrawerHeader>
            <DrawerBody p={0} py={"12px"}>
              <div className="w-full flex justify-center">
                <TableContainer
                  className="!max-h-[100vh] !overflow-y-auto w-[98%] shadow-md"
                  rounded={"12px"}
                >
                  <Table variant="simple">
                    <Thead className="bg-[#CFE2F3] !text-xs !sticky !top-0">
                      <Tr>
                        {columns.map((id, idx) => {
                          return id == "Date" ? (
                            <Th
                              key={idx}
                              color="#79767D"
                              fontWeight={400}
                              borderX={"1px solid #D3D3D3"}
                            >
                              {id.toUpperCase()}
                            </Th>
                          ) : (
                            <Th
                              key={idx}
                              color="#79767D"
                              fontWeight={400}
                              padding={0}
                              px={2}
                              borderRight={"1px solid #D3D3D3"}
                            >
                              <div className="w-full flex flex-col gap-0 justify-center">
                                <p className="self-start uppercase">{id}</p>
                                <div className="flex gap-2 justify-between items-center font-medium">
                                  <p>Shift Incharge</p>
                                  <p>Field Operator</p>
                                </div>
                              </div>
                            </Th>
                          );
                        })}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {[...Array(5)].map((val, idx) => {
                        return (
                          <Tr
                            key={idx}
                            className="!text-sm !text-[#3E3C42] even:bg-[#FAFAFA] odd:bg-white"
                          >
                            <Td
                              className=""
                              padding={0}
                              px={2}
                              fontWeight={400}
                              borderX={"1px solid #D3D3D3"}
                            >
                              {new Date().toLocaleDateString()}
                            </Td>
                            <OperatorSelect />
                            <OperatorSelect />
                            <OperatorSelect />
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ShiftSelectModal;
