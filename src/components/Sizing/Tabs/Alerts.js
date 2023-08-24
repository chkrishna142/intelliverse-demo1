import FloatingInput from "../SizingUtils/FloatingInput";
import {
  Select,
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
  Flex,
  Image
} from "@chakra-ui/react";

const alerts = [
  {
    Plant: "Plant 1",
    Camera: "Camera 1",
    Time: "Time 1",
    Reason: Math.floor(Math.random() * 3), // Generates random number between 0 and 2
    Comment: "Comment 1",
  },
  {
    Plant: "Plant 2",
    Camera: "Camera 2",
    Time: "Time 2",
    Reason: Math.floor(Math.random() * 3),
    Comment: "Comment 2",
  },
  {
    Plant: "Plant 3",
    Camera: "Camera 3",
    Time: "Time 3",
    Reason: Math.floor(Math.random() * 3),
    Comment: "Comment 3",
  },
  {
    Plant: "Plant 4",
    Camera: "Camera 4",
    Time: "Time 4",
    Reason: Math.floor(Math.random() * 3),
    Comment: "Comment 4",
  },
  {
    Plant: "Plant 5",
    Camera: "Camera 5",
    Time: "Time 5",
    Reason: Math.floor(Math.random() * 3),
    Comment: "Comment 5",
  },
  {
    Plant: "Plant 6",
    Camera: "Camera 6",
    Time: "Time 6",
    Reason: Math.floor(Math.random() * 3),
    Comment: "Comment 6",
  },
  {
    Plant: "Plant 7",
    Camera: "Camera 7",
    Time: "Time 7",
    Reason: Math.floor(Math.random() * 3),
    Comment: "Comment 7",
  },
  {
    Plant: "Plant 8",
    Camera: "Camera 8",
    Time: "Time 8",
    Reason: Math.floor(Math.random() * 3),
    Comment: "Comment 8",
  },
  {
    Plant: "Plant 9",
    Camera: "Camera 9",
    Time: "Time 9",
    Reason: Math.floor(Math.random() * 3),
    Comment: "Comment 9",
  },
  {
    Plant: "Plant 10",
    Camera: "Camera 10",
    Time: "Time 10",
    Reason: Math.floor(Math.random() * 3),
    Comment: "Comment 10",
  },
];
const getImage = (reason) => {
  if (reason === 0) {
    return "https://img.icons8.com/color/96/null/dew-point.png";
  } else if (reason === 2) {
    return "https://cdn-icons-png.flaticon.com/512/5098/5098724.png";
  } else if (reason === 1) {
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5yzFWdE5SK3P50mbWltF_3ZLLAEHzai5VuDl9NgQD_SIcG6sztUZueLJQekHEmEFNjkE&usqp=CAU";
  }
};

const getReason = (reason) => {
  if (reason === 0) {
    return "Moisture";
  } else if (reason === 2) {
    return "Size";
  } else if (reason === 1) {
    return "Gray";
  }
};

const Alerts = () => {
  return (
    <div className="relative flex flex-col">
      <div className="absolute left-0 right-0 flex justify-center">
        <div className="p-5 pl-6 pr-6 gap-6 flex items-center bg-white rounded-xl shadow-md">
          <div>
            <FloatingInput text="From" type="datetime-local" />
          </div>
          <div>
            <FloatingInput text="To" type="datetime-local" />
          </div>
          <button className="text-center p-[10px] pl-4 pr-4 text-white text-base font-medium bg-[#084298] rounded-full">
            Show Alerts
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-11 pt-[57px] bg-white rounded-xl justify-start">
        <div className="flex gap-2 ml-6">
          <div>
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              placeholder="All Plants"
              variant="outline"
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
            />
          </div>
          <div>
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              placeholder="Reason"
              variant="outline"
              className="!rounded-2xl !text-sm !font-medium !text-[#605D64]"
            />
          </div>
        </div>
        <TableContainer className="!whitespace-normal">
          <Table variant="simple">
            <Thead className="bg-[#FAFAFA] !text-xs">
              <Tr>
                <Th color="#79767D" fontWeight={400}>SR. NO.</Th>
                <Th color="#79767D" fontWeight={400}>PLANT</Th>
                <Th color="#79767D" fontWeight={400}>CAMERA</Th>
                <Th color="#79767D" fontWeight={400}>TIME</Th>
                <Th color="#79767D" fontWeight={400}>REASON</Th>
                <Th color="#79767D" fontWeight={400}>COMMENT</Th>
                <Th color="#79767D" fontWeight={400}>{""}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {alerts.map((item, index) => {
                return (
                  <Tr key={index} className="!text-sm !text-[#3E3C42] !font-medium even:bg-[#FAFAFA] odd:bg-white">
                    <Td className="cursor-pointer">{String(index + 1).padStart(2,'0')}</Td>
                    <Td className="cursor-pointer">{item.Plant}</Td>
                    <Td className="cursor-pointer">{item.Camera}</Td>
                    <Td className="cursor-pointer">{item.Time}</Td>
                    <Td className="cursor-pointer">
                      <Flex gap="1rem" align="center">
                        <div className="flex flex-col justify-center items-center">
                          <Image
                            className="h-8 w-8"
                            src={getImage(item.Reason)}
                            alt="none"
                          />
                          <span>{getReason(item.Reason)}</span>
                        </div>
                      </Flex>{" "}
                    </Td>
                    <Td className="cursor-pointer">{item.Comment}</Td>
                    <Td>
                      <p className="text-blue-800 cursor-pointer hover:text-blue-200 font-semibold min-w-[150px]">
                        View Details
                      </p>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Alerts;
