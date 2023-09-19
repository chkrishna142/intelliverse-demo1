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
  Image,
  Avatar,
  Input,
} from "@chakra-ui/react";

const profileData = [
  {
    name: "Dan Abrahmov",
    url: "https://bit.ly/dan-abramov",
  },
  {
    name: "Kola Tioluwani",
    url: "https://bit.ly/tioluwani-kolawole",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  // Repeat the same entries to have a total of 10
  // Feel free to add more unique entries if needed
  {
    name: "Dan Abrahmov",
    url: "https://bit.ly/dan-abramov",
  },
  {
    name: "Kola Tioluwani",
    url: "https://bit.ly/tioluwani-kolawole",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
];

const ManpowerMngmt = () => {
  const headers = ["type of shift", "granulation", "compression", "coating"];
  const dummyData = ["First Shift", "Second Shift", "Third Shift"];

  return (
    <div className="flex flex-col gap-4 pt-4 bg-white">
      <div className="flex justify-start gap-4 px-3">
        <div>
          <Select placeholder="Select block">
            <option value="A">Block A</option>
            <option value="B">Block B</option>
            <option value="C">Block C</option>
          </Select>
        </div>
        <div>
          <Input type="date" />
        </div>
      </div>
      <TableContainer className="!max-h-[80vh] !overflow-y-auto">
        <Table variant="simple">
          <Thead className="bg-[#ddeeff] !text-xs">
            <Tr>
              {headers.map((item, i) => {
                return (
                  <Th
                    color="#605D64"
                    fontWeight={500}
                    pl={i == 0 ? "12px" : "8px"}
                    py="12px"
                    pr={i == 7 ? "12px" : "8px"}
                    textAlign="center"
                  >
                    {item.toUpperCase()}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {dummyData.map((item, index) => {
              return (
                <Tr
                  key={index}
                  className="!text-sm !text-[#3E3C42] !font-medium"
                >
                  <Td pl="12px" py="12px" pr="8px">
                    {item}
                  </Td>
                  {[...Array(3)].map((_, i) => (
                    <Td key={i} pl="8px" py="12px" pr={i == 5 ? "12px" : "8px"}>
                      <div className="flex gap-6 overflow-x-auto w-[26vw]">
                        {profileData.map((item, idx) => {
                          return <Avatar name={item.name} src={item.url}/>;
                        })}
                      </div>
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManpowerMngmt;
