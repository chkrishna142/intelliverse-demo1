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
import { useState } from "react";

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
const dummyData2 = [
  {
    employee: "John Doe",
    block: "A",
    code: "JD001",
    skill: "Programming",
    allocation: 80,
  },
  {
    employee: "Jane Smith",
    block: "B",
    code: "JS002",
    skill: "Design",
    allocation: 60,
  },
  {
    employee: "Michael Johnson",
    block: "C",
    code: "MJ003",
    skill: "Database Management",
    allocation: 75,
  },
  {
    employee: "Emily Davis",
    block: "A",
    code: "ED004",
    skill: "Project Management",
    allocation: 90,
  },
  {
    employee: "David Lee",
    block: "B",
    code: "DL005",
    skill: "Testing",
    allocation: 70,
  },
  {
    employee: "Sarah Williams",
    block: "C",
    code: "SW006",
    skill: "UI/UX Design",
    allocation: 85,
  },
  {
    employee: "Matthew Clark",
    block: "A",
    code: "MC007",
    skill: "System Administration",
    allocation: 80,
  },
  {
    employee: "Laura Brown",
    block: "B",
    code: "LB008",
    skill: "Data Analysis",
    allocation: 70,
  },
  {
    employee: "Daniel Smith",
    block: "C",
    code: "DS009",
    skill: "DevOps",
    allocation: 75,
  },
  {
    employee: "Olivia Taylor",
    block: "A",
    code: "OT010",
    skill: "Cybersecurity",
    allocation: 85,
  },
];

const ManpowerMngmt = () => {
  const headers = ["type of shift", "granulation", "compression", "coating"];
  const headers2 = ["employee", "block", "code", "skill", "allocation"];
  const dummyData = ["First Shift", "Second Shift", "Third Shift"];
  const [clicked, setClicked] = useState(false);
  const [assign, setAssign] = useState(Array(10).fill(false));

  const handleAssign = (idx) => {
    setAssign((prev) => {
      const list = prev.slice();
      list[idx] = !list[idx];
      return list;
    });
  };

  console.log(assign, "values");

  return (
    <div className="flex flex-col gap-8">
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
                      <Td
                        key={i}
                        pl="8px"
                        py="12px"
                        pr={i == 5 ? "12px" : "8px"}
                      >
                        <div className="flex gap-6 overflow-x-auto w-[26vw]">
                          {profileData.map((item, idx) => {
                            return (
                              <Avatar
                                name={item.name}
                                src={item.url}
                                onClick={() => setClicked(true)}
                              />
                            );
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
      {clicked && (
        <div className="flex flex-col gap-4 bg-white rounded-xl">
          <p className="text-[#447ED4] text-base font-bold mt-4 ml-[60px]">
            Employee Assignment Options
          </p>
          <TableContainer className="!max-h-[50vh] !overflow-y-auto">
            <Table variant="simple">
              <Thead className="bg-[#ddeeff] !text-xs">
                <Tr>
                  {headers2.map((item, i) => {
                    return (
                      <Th
                        color="#605D64"
                        fontWeight={500}
                        pl={i == 0 ? "12px" : "8px"}
                        py="12px"
                        pr={i == 7 ? "12px" : "8px"}
                      >
                        {item.toUpperCase()}
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {dummyData2.map((item, index) => {
                  return (
                    <Tr
                      key={index}
                      className="!text-sm !text-[#3E3C42] !font-medium"
                    >
                      {Object.keys(item).map((i) => {
                        return (
                          <Td
                            key={i}
                            pl={i == 0 ? "12px" : "8px"}
                            py="12px"
                            pr={i == 4 ? "12px" : "8px"}
                          >
                            {i === "allocation" ? (
                              <button
                                className={`w-[70%] px-3 py-2 text-white text-xs rounded-[80px]`}
                                style={{
                                  backgroundColor: assign[index]
                                    ? "#545F71"
                                    : "#084298",
                                }}
                                onClick={() => handleAssign(index)}
                              >
                                {assign[index] ? "Assigned" : "Assign Shift"}
                              </button>
                            ) : i === "employee" ? (
                              <div className="flex gap-2 items-center">
                                <Avatar src="" />
                                <p>{item[i]}</p>
                              </div>
                            ) : (
                              item[i]
                            )}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default ManpowerMngmt;
