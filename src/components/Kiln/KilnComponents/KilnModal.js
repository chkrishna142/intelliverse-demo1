import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
  } from "@chakra-ui/react";
  
  const KilnModal = ({ openModal, closeModal }) => {
    let a = 30;
    return (
      <Modal isOpen={openModal} onClose={closeModal} isCentered="true">
        <ModalOverlay />
        <ModalContent style={{ borderRadius: "12px" }} maxW="375px">
          <ModalHeader padding="0px">
            <div className="py-3 pr-2 pl-6 flex justify-between items-center bg-[#F5F5F5] rounded-tr-xl rounded-tl-xl">
              <div className="flex gap-3 items-center">
                <img src="/SizingIcons/Clock.svg" />
                <p className="text-black font-semibold text-sm">
                  {new Date().toString().slice(0, 25)}
                </p>
              </div>
              <img
                src="/SizingIcons/cross.svg"
                className="cursor-pointer"
                onClick={closeModal}
              />
            </div>
          </ModalHeader>
          <ModalBody pl="0px" pr="0px" pt="16px" pb="20px" pos="relative">
            <div className="flex">
              <img
                className="sticky top-[50%] left-0 h-[32px] px-2"
                src="/SizingIcons/arrowLeft.svg"
              />
              <div className="flex flex-col gap-3">
                <div className="flex gap-[56px] p-6 pl-4 pt-5 pr-6 pb-6 rounded bg-[#fffcf2]">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-[#605D64]">Health:</p>
                    <div className="flex gap-3 items-center">
                      <img src="/KilnIcons/dusty.svg" />
                      <p className="text-[#3E3C42] font-medium text-lg">Dusty</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                      <p className="text-[#605D64] text-sm">Kiln Index</p>
                      <img src="/KilnIcons/info.svg" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="text-[#3E3C42] text-lg font-medium">6</p>
                      <p className="p-2 rounded-[34px] bg-[#F9DEDC] text-[#DC362E] text-xs font-medium">
                        Critical
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[#3E3C42] text-sm">Original Image</p>
                  <div className="relative bg-black w-full rounded-xl">
                    <img
                      className="rounded-xl h-[150px]"
                      src="https://media.istockphoto.com/id/1442909982/photo/closeup-of-a-rotary-kiln-for-clinker-production-in-a-cement-plant.jpg?s=612x612&w=0&k=20&c=nLwOPUSNyuYTBHKK5Rqq6-rLWrK0XBo9p7JjRF9kQdk="
                    />
                    <p className="absolute top-2 left-2 text-xs font-semibold text-white bg-black opacity-30 rounded p-1 hover:opacity-100">
                      Camera 1
                    </p>
                    <p className="absolute bottom-2 right-2 text-xs font-semibold text-white bg-black opacity-30 rounded p-1 hover:opacity-100">
                      09:45 pm
                    </p>
                    <p className="absolute bottom-2 left-2 text-xs font-semibold text-white bg-black opacity-30 rounded p-1 hover:opacity-100">
                      12 MAY 2023
                    </p>
                  </div>
                </div>
              </div>
              <img
                className="sticky top-[50%] right-0 h-[32px] px-2"
                src="/SizingIcons/arrowRight.svg"
              />
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
    );
  };
  
  export default KilnModal;
  