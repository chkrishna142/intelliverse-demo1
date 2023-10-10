import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import ReportModalTable from "../Tables/ReportModalTable";

const ReportModal = ({ openModal, closeModal, row }) => {
  return (
    <ChakraProvider>
      <Modal isOpen={openModal} onClose={closeModal} isCentered="true">
        <ModalOverlay />
        <ModalContent style={{ borderRadius: "12px" }} maxW='700px'>
          <ModalHeader padding="0px">
            <div className="pl-6 py-3 pr-2 bg-[#F5F5F5] items-center flex justify-between text-sm whitespace-nowrap rounded-t-xl">
              <div className="flex gap-5 items-center">
                <div className="flex gap-2 items-center">
                  <p className="text-[#938F96]">TRUCK</p>
                  <p className="text-[#48464C]">{row.truckNumber}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-[#938F96]">IN TIME</p>
                  <p className="text-[#48464C]">{row.inTime}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-[#938F96]">OUT TIME</p>
                  <p className="text-[#48464C]">{row.outTime}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-[#938F96]">TAT</p>
                  <p className="text-[#48464C]">{row.tat}</p>
                </div>
              </div>
              <img src="/WorkforceSafetyIcons/cross.svg" className="cursor-pointer" onClick={() => closeModal()}/>
            </div>
          </ModalHeader>
          <ModalBody p="16px" rounded="12px">
            <ReportModalTable />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default ReportModal;
