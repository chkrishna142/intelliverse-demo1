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
} from "@chakra-ui/react";

const dummyData = [
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

const ColorDot = ({ color }) => {
  const dotStyle = {
    backgroundColor: color,
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "5px", // Adjust as needed for spacing
  };

  return <span style={dotStyle}></span>;
};

function formatDateToCustomString(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = "01"; // Fixed to '01' as per the format
  const month = months[date.getMonth()]; // Get the month abbreviation
  const year = date.getFullYear(); // Get the full year

  return `${day} ${month} ${year}`;
}

const Weekly = () => {
  let headers = ["Employee Name"];
  for (let i = 1; i <= 6; i++) {
    headers.push(
      formatDateToCustomString(
        new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000)
      )
    );
  }
  return (
    <div className="flex flex-col gap-4 pt-4 bg-white">
      <div className="flex justify-between px-3">
        <div>
          <Select placeholder="Select block">
            <option value="A">Block A</option>
            <option value="B">Block B</option>
            <option value="C">Block C</option>
          </Select>
        </div>
        <button className="text-center p-[10px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#084298] rounded-full">
          Generate Schedule
        </button>
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
                    pl={i == 0 ? "12px" : ""}
                    px="8px"
                    py="12px"
                    pr={i == 7 ? "12px" : ""}
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
                    <div className="flex gap-2 items-center">
                      <Avatar name={item.name} src={item.url} />
                      <p>{item.name}</p>
                    </div>
                  </Td>
                  {[...Array(6)].map((_, i) => (
                    <Td key={i} px="8px" py="12px" pr={i == 5 ? "12px" : ""}>
                      <Select
                        id={item.name}
                        defaultValue="Available"
                        border="0px"
                        icon={false}
                      >
                        <option value="A">
                          {<ColorDot color="#69B04B" />} Available
                        </option>
                        <option value="B">
                          {<ColorDot color="#DC362E" />} On Leave
                        </option>
                      </Select>
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

export default Weekly;
