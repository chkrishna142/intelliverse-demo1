import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TonalButton from "../../../util/Buttons/TonalButton";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import ExlCsvDownload from "../../../util/VisionUtils/ExlCsvDownload";

const AddBulkUsersModal = ({ isOpen, onClose, size, setSend, send }) => {
  const [submitted, setSubmitted] = useState(false);
  const removeFile = (index) => {
    const updatedSend = [...send];
    updatedSend.splice(index, 1); // Remove the file at the specified index
    setSend(updatedSend);
  };

  const selectPicture = (event) => {
    setSend([...send, event.target.files[0]]);
    // console.log("send", send);
  };
  useEffect(() => {
    setSubmitted(false);
  }, [onClose, selectPicture]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
        <ModalOverlay />
        <ModalContent>
          <div className="text-white w-full h-16 flex bg-[#034D86] font-semibold justify-center items-center rounded-t-md">
            Bulk Add Users
          </div>
          <ModalCloseButton className="mt-2" color={"white"} />
          <ModalBody>
            {submitted === false ? (
              <div className="p-6">
                <div className="mt-2 border-4 border-[#FFC107] border-dotted flex bg-[#FFFFED] px-6 py-3">
                  {send && send.length > 0 ? (
                    send.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 cursor-pointer mr-3"
                        >
                          {/* <img src="/pdf.svg" alt="pdf" /> */}
                          <p className="font-light text-[#AEA9B1] mb-3">
                            {item.name}
                          </p>
                          {/* <p className="mb-3">
                            <CloseIcon onClick={() => removeFile(index)} />
                          </p> */}
                        </div>
                      );
                    })
                  ) : (
                    <div className="mr-4">
                      <img src="/usermanagement/upload_file.png" alt="upload" />
                    </div>
                  )}
                  <div className="">
                    <div className="flex">
                      <label htmlFor="image" className="cursor-pointer">
                        <div className="flex justify-evenly">
                          <p className="text-[14px] text-[#447ED4] font-medium">
                            Choose file
                          </p>
                        </div>
                      </label>
                      <input
                        onChange={(e) => selectPicture(e)}
                        type="file"
                        name="image"
                        id="image"
                        style={{ display: "none" }}
                      />
                      <p className="ml-2 text-[14px] font-medium">to upload</p>
                    </div>
                    <p className="text-[13px] text-[#79767D] font-medium">
                      Supported formats: .xlsx , .csv
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <div className="flex gap-3">
                    <TonalButton
                      text={"Discard"}
                      width={"fit-content"}
                      onClick={() => removeFile(0)}
                      disable={""}
                    />
                    <PrimaryButton
                      text={"Add users"}
                      width={"fit-content"}
                      onClick={""}
                      disable={send && send.length > 0 ? false : true}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center ">
                    <div className="">
                      <p className="text-14px] font-medium">Sample format</p>
                      <p className="text-14px] font-medium text-[#AEA9B1]">
                        Upload file that follows this format , please.
                      </p>
                    </div>
                    <div>
                      <ExlCsvDownload
                        data={[""]}
                        order={[""]}
                        orderDetail={[""]}
                        enable={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl mt-3">
                  <TableContainer className="!text-left  border rounded-md bg-white">
                    <Table variant="simple">
                      <Thead className="bg-[#EBEBEB]">
                        <Tr>
                          <Th px={2}>NAME</Th>
                          <Th px={2}>EMAIL ID</Th>
                          <Th px={2}>ROLE</Th>
                          <Th px={2}>DESIGNATION</Th>
                          <Th px={2}>
                            <div>
                              <p>PRIMARY</p>
                              <p>LOCATION</p>
                            </div>
                          </Th>
                          <Th px={2}>
                            <div>
                              <p>PHONE NUMBER</p>
                              <p>(optional)</p>
                            </div>
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td px={2}>Ashok Kumar</Td>
                          <Td px={2}>ashok123@gmail.com</Td>
                          <Td px={2}>Admin</Td>
                          <Td px={2}>CXO</Td>
                          <Td px={2}>Pune</Td>
                          <Td px={2}>--</Td>
                        </Tr>
                        <Tr>
                          <Td px={2}>John Doe</Td>
                          <Td px={2}>john.doe@gmail.com</Td>
                          <Td px={2}>Regular</Td>
                          <Td px={2}>Manager</Td>
                          <Td px={2} width={"20px"}>
                            Pune
                          </Td>
                          <Td px={2}>9876354xxx</Td>
                        </Tr>
                        <Tr>
                          <Td px={2}>Jane Smith</Td>
                          <Td px={2}>jane.smith@gmail.com</Td>
                          <Td px={2}>Admin</Td>
                          <Td px={2}>Sr. Manager</Td>
                          <Td px={2} width={"20px"}>
                            Pune
                          </Td>
                          <Td px={2}>9876354xxx</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            ) : (
              <div>
                <div className="mt-5 w-full flex justify-center">
                  <img src="addusecase_submitted.svg" alt="submitted" />
                </div>
                <div className="mt-5 w-full flex justify-center font-bold text-[#034D86] text-lg">
                  Submitted
                </div>
              </div>
            )}
          </ModalBody>
          {/* <ModalFooter>
            {submitted === false ? (
              <button
                onClick={() => setSubmitted(true)}
                className="bg-[#084298] text-white px-7 py-2 rounded-md mb-5 "
                mr={3}
              >
                Submit
              </button>
            ) : (
              <button
                onClick={onClose}
                className="bg-[#084298] text-white px-7 py-2 rounded-md mb-5 "
                mr={3}
              >
                Close
              </button>
            )}
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export { AddBulkUsersModal };
