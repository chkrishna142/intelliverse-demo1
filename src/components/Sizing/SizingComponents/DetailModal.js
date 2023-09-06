import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import DonutChart from "../../Charts/SizingCharts/DonutChart";
import LiquidGauge from "../../Charts/SizingCharts/LiquidGauge";

const DetailModal = ({ openModal, closeModal }) => {
  let a = 30;
  return (
    <Modal isOpen={openModal} onClose={closeModal} isCentered="true">
      <ModalOverlay />
      <ModalContent style={{ borderRadius: "12px" }} maxW="800px">
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
        <ModalBody pos="relative" px="0px">
          <div className="flex">
            <img
              className="sticky top-[50%] left-0 h-[32px] pl-2"
              src="/SizingIcons/arrowLeft.svg"
            />
            <div className="flex-1 flex flex-col gap-4 p-5 w-[290px]">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-sm text-[#3E3C42] self-start">
                  Original Image
                </p>
                <div className="flex items-center justify-center w-full h-full bg-black rounded-lg">
                  <img
                    className="rounded-lg h-[150px]"
                    src="https://media.istockphoto.com/id/940251778/photo/construction-site-view-with-tower-crane.jpg?b=1&s=612x612&w=0&k=20&c=Pu71kyZmNufthz4uTC6gFFbX0qM7v6i3fe5m83O8qZg="
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
                    src="https://media.istockphoto.com/id/940251778/photo/construction-site-view-with-tower-crane.jpg?b=1&s=612x612&w=0&k=20&c=Pu71kyZmNufthz4uTC6gFFbX0qM7v6i3fe5m83O8qZg="
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
                    src="https://media.istockphoto.com/id/940251778/photo/construction-site-view-with-tower-crane.jpg?b=1&s=612x612&w=0&k=20&c=Pu71kyZmNufthz4uTC6gFFbX0qM7v6i3fe5m83O8qZg="
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-9 p-5 w-[420px]">
              <div className="flex flex-col gap-6">
                <p className="text-black text-base font-medium">
                  Size Distribution
                </p>
                <div className="h-[150px] w-full">
                  <DonutChart
                    data={[24, 56, 78, 12, 34]}
                    labels={["a", "b", "c", "d", "e"]}
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
                    style={{ width: `${a}%` }}
                    className="bg-[#79767D] rounded-lg text-white text-center h-full flex items-center justify-center"
                  >
                    {a}%
                  </div>
                  <div
                    style={{ width: `${100 - a}%` }}
                    className="bg-black rounded-lg text-white text-center h-full flex items-center justify-center"
                  >
                    {100 - a}%
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 h-[165px]">
                <p className="text-black text-base font-medium">
                  Moisture Content
                </p>
                <div className="h-full w-full">
                  <div className="flex gap-7 w-full h-full items-center">
                    <LiquidGauge moisture={23} r={50} />
                    <div className="flex flex-col items-start justify-center">
                      <p className="text-[#69B04B] text-xl font-medium">Good</p>
                      <p className="text-[#AEA9B1] text-sm">
                        Moisture content within the limit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="sticky top-[50%] right-0 h-[32px] pr-2"
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

export default DetailModal;
