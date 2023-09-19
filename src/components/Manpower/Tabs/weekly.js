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
} from '@chakra-ui/react';
import { useState } from 'react';

const dummyData = [
  {
    name: 'Uday Ratan',
    url: 'https://bit.ly/dan-abramov',
  },
  {
    name: 'Ram Singh',
    url: 'https://bit.ly/tioluwani-kolawole',
  },
  {
    name: 'Suresh Nath',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Rishabh Singh',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Praveen Kumar',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Dinesh Rathi',
    url: 'https://bit.ly/code-beast',
  },
  {
    name: 'Sahil Ansari',
    url: 'https://bit.ly/sage-adebayo',
  },
  // Repeat the same entries to have a total of 10
  // Feel free to add more unique entries if needed
  {
    name: 'Rahul Verma',
    url: 'https://bit.ly/dan-abramov',
  },
  {
    name: 'Jatin Bansal',
    url: 'https://bit.ly/tioluwani-kolawole',
  },
  {
    name: 'Prateek Kumar',
    url: 'https://bit.ly/kent-c-dodds',
  },
];

const dummyData2 = {
  0: [
    'F0122',
    'on Leave',
    'plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
  ],
  1: [
    'F0122',
    'on Leave',
    'plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
  ],
  2: [
    'F0122',
    'on Leave',
    'plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
  ],
  3: [
    'F0122',
    'on Leave',
    'plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
  ],
  4: [
    'F0122',
    'on Leave',
    'plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
  ],
  5: [
    'F0122',
    'on Leave',
    'plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
  ],
  6: [
    'F0122',
    'on Leave',
    'plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
  ],
  7: [
    'F0122',
    'on Leave',
    'plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
  ],
  8: [
    'F0122',
    'on Leave',
    'plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
  ],
  9: [
    'F0122',
    'on Leave',
    'plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
    'F0122 on Leave',
    'F0122 plant Holiday',
  ],
};

function formatDateToCustomString(date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = ('0' + date.getDate()).slice(-2); // Fixed to '01' as per the format
  const month = months[date.getMonth()]; // Get the month abbreviation
  const year = date.getFullYear(); // Get the full year

  return `${day} ${month} ${year}`;
}

const dots = {
  Available: (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="7"
        height="7"
        rx="3.5"
        fill="#7AC958"
        stroke="#69B04B"
      />
    </svg>
  ),
  'On leave': (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="11"
        height="11"
        rx="5.5"
        fill="#E46962"
        stroke="#DC362E"
      />
    </svg>
  ),
};

const Weekly = () => {
  const [submitted, setSubmitted] = useState(false);
  let headers = ['Employee Name'];
  for (let i = 1; i <= 7; i++) {
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
        {!submitted && (
          <button
            className="text-center p-[10px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#084298] rounded-full"
            onClick={() => setSubmitted(true)}
          >
            Generate Schedule
          </button>
        )}
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
                    pl={i == 0 ? '12px' : '8px'}
                    py="12px"
                    pr={i == 7 ? '12px' : '8px'}
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
                  {!submitted &&
                    [...Array(7)].map((_, i) => (
                      <Td
                        key={i}
                        pl="8px"
                        py="12px"
                        pr={i == 5 ? '12px' : '8px'}
                      >
                        <Select
                          id={item.name}
                          defaultValue="A"
                          border="0px"
                          icon={false}
                        >
                          <option value="A">Available</option>
                          <option value="B">On Leave</option>
                        </Select>
                      </Td>
                    ))}
                  {submitted &&
                    dummyData2[index].map((j, i) => {
                      return (
                        <Td
                          key={i}
                          pl="8px"
                          py="12px"
                          pr={i == 6 ? '12px' : '8px'}
                        >
                          {j}
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
  );
};

export default Weekly;
