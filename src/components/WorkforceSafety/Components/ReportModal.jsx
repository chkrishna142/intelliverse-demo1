import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import ReportModalTable from "../Tables/ReportModalTable";

const formatTime = (rawTime) => {
  const date = new Date(rawTime);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12

  const formattedTime = `${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;
  return formattedTime;
};

const TatCalculator = (row) => {
  const timeDifferenceInSeconds = Math.abs(row.createdAt - row.lastUpdatedAt);
  const timeDifferenceDate = new Date(timeDifferenceInSeconds * 1000);
  const hours = timeDifferenceDate.getUTCHours();
  const minutes = timeDifferenceDate.getUTCMinutes();
  const seconds = timeDifferenceDate.getUTCSeconds();

  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return timeString;
};

const ReportModal = ({ openModal, closeModal, row }) => {
  return (
    <ChakraProvider>
      <Modal isOpen={openModal} onClose={closeModal} isCentered="true">
        <ModalOverlay />
        <ModalContent style={{ borderRadius: "12px" }} maxW="700px">
          <ModalHeader padding="0px">
            <div className="pl-6 py-3 pr-2 bg-[#F5F5F5] items-center flex justify-between text-sm whitespace-nowrap rounded-t-xl">
              <div className="flex gap-5 items-center">
                <div className="flex gap-2 items-center">
                  <p className="text-[#938F96]">TRUCK</p>
                  <p className="text-[#48464C]">{row.vehicleNo}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-[#938F96]">IN TIME</p>
                  <p className="text-[#48464C]">
                    {new Date(row.createdAt * 1000).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-[#938F96]">OUT TIME</p>
                  <p className="text-[#48464C]">
                    {new Date(row.lastUpdatedAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-[#938F96]">TAT</p>
                  <p className="text-[#48464C]">{TatCalculator(row)}</p>
                </div>
              </div>
              <img
                src="/WorkforceSafetyIcons/cross.svg"
                className="cursor-pointer"
                onClick={() => closeModal()}
              />
            </div>
          </ModalHeader>
          <ModalBody p="16px" rounded="12px">
            <ReportModalTable rowData={row} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default ReportModal;
