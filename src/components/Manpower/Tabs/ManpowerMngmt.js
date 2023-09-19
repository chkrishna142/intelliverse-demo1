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
} from '@chakra-ui/react';
import { useState } from 'react';

const profileData = [
  {
    name: 'John Smith',
    username: 'john.smith123',
    email: 'john.smith@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'David Miller',
    username: 'davemiller',
    email: 'david.m@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Michael Brown',
    username: 'mbrown',
    email: 'michael.b@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Daniel Anderson',
    username: 'danderson',
    email: 'daniel.a@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Matthew Johnson',
    username: 'mattj',
    email: 'matthew.j@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Andrew White',
    username: 'awhite',
    email: 'andrew.white@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'William Hernandez',
    username: 'whernandez',
    email: 'william.h@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'James Taylor',
    username: 'jamest',
    email: 'james.t@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Alexander Green',
    username: 'agreen',
    email: 'alexander.g@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Ethan Harris',
    username: 'eharris',
    email: 'ethan.h@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Matthew Hall',
    username: 'mhall',
    email: 'matthew.h@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Jackson King',
    username: 'jacksonk',
    email: 'jackson.k@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Logan Anderson',
    username: 'landerson',
    email: 'logan.a@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Lucas Collins',
    username: 'lucas.c',
    email: 'lucas.c@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Noah Hill',
    username: 'nhill',
    email: 'noah.h@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Benjamin Lopez',
    username: 'blopez',
    email: 'benjamin.l@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Alexander Green',
    username: 'agreen',
    email: 'alexander.g@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Ethan Harris',
    username: 'eharris',
    email: 'ethan.h@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Matthew Hall',
    username: 'mhall',
    email: 'matthew.h@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Jackson King',
    username: 'jacksonk',
    email: 'jackson.k@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Logan Anderson',
    username: 'landerson',
    email: 'logan.a@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Lucas Collins',
    username: 'lucas.c',
    email: 'lucas.c@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Noah Hill',
    username: 'nhill',
    email: 'noah.h@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'William Richardson',
    username: 'wrichardson',
    email: 'william.r@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'James Bailey',
    username: 'jbailey',
    email: 'james.b@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Elijah Green',
    username: 'egreen',
    email: 'elijah.g@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Liam Martinez',
    username: 'liamm',
    email: 'liam.m@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Samuel Turner',
    username: 'sturner',
    email: 'samuel.t@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Mason Williams',
    username: 'mwilliams',
    email: 'mason.w@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Benjamin Davis',
    username: 'bdavis',
    email: 'benjamin.d@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Henry Thompson',
    username: 'hthompson',
    email: 'henry.t@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Joseph Wilson',
    username: 'jwilson',
    email: 'joseph.w@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'John Hall',
    username: 'jhall',
    email: 'john.h@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Caleb Adams',
    username: 'cadams',
    email: 'caleb.a@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Nathan Thomas',
    username: 'nthomas',
    email: 'nathan.t@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/66.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Matthew Brown',
    username: 'mbrown',
    email: 'matthew.b@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Samuel Lewis',
    username: 'slewis',
    email: 'samuel.l@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/70.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'David Hill',
    username: 'dhill',
    email: 'david.h@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Christopher Young',
    username: 'cyoung',
    email: 'christopher.y@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/74.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Jackson Turner',
    username: 'jturner',
    email: 'jackson.t@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Ethan Miller',
    username: 'emiller',
    email: 'ethan.m@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Daniel Harris',
    username: 'dharris',
    email: 'daniel.h@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/80.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Matthew Johnson',
    username: 'mjohnson',
    email: 'matthew.j@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/82.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Samuel Martin',
    username: 'smartin',
    email: 'samuel.m@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/84.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Joseph Clark',
    username: 'jclark',
    email: 'joseph.c@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Daniel Rodriguez',
    username: 'drodriguez',
    email: 'daniel.r@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Liam Evans',
    username: 'levans',
    email: 'liam.e@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/90.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Samuel Garcia',
    username: 'sgarcia',
    email: 'samuel.g@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'William Martinez',
    username: 'wmartinez',
    email: 'william.m@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/94.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'Mason Brown',
    username: 'mbrown',
    email: 'mason.b@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/96.jpg',
    availability: 5 * Math.random(),
  },
  {
    name: 'David Walker',
    username: 'dwalker',
    email: 'david.w@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/98.jpg',
    availability: 5 * Math.random(),
  },
  // Repeat the same entries to have a total of 10
  // Feel free to add more unique entries if needed
  {
    name: 'Dan Abrahmov',
    avatar: 'https://bit.ly/dan-abramov',
    availability: 5 * Math.random(),
  },
  {
    name: 'Kola Tioluwani',
    avatar: 'https://bit.ly/tioluwani-kolawole',
    availability: 5 * Math.random(),
  },
  {
    name: 'Kent Dodds',
    avatar: 'https://bit.ly/kent-c-dodds',
    availability: 5 * Math.random(),
  },
];

const dummyData2 = [
  {
    employee: 'Karn Dev',
    block: 'A',
    code: 'JD001',
    skill: 'Granulation',
    allocation: 80,
  },
  {
    employee: 'Rumit Garg',
    block: 'B',
    code: 'JS002',
    skill: 'Compression',
    allocation: 60,
  },
  {
    employee: 'Mukesh Kumar',
    block: 'C',
    code: 'MJ003',
    skill: 'Granulation',
    allocation: 75,
  },
  {
    employee: 'Dev Mishra',
    block: 'A',
    code: 'ED004',
    skill: 'Compression',
    allocation: 90,
  },
  {
    employee: 'Abhishek Yadav',
    block: 'B',
    code: 'DL005',
    skill: 'Coating',
    allocation: 70,
  },
  {
    employee: 'Sumit Verma',
    block: 'C',
    code: 'SW006',
    skill: 'Coating',
    allocation: 85,
  },
  {
    employee: 'Himesh Goyal',
    block: 'A',
    code: 'MC007',
    skill: 'Compression',
    allocation: 80,
  },
  {
    employee: 'Jitesh Verma',
    block: 'B',
    code: 'LB008',
    skill: 'Coating',
    allocation: 70,
  },
  {
    employee: 'Danish Karim',
    block: 'C',
    code: 'DS009',
    skill: 'Granulation',
    allocation: 75,
  },
  {
    employee: 'Rakesh Singh',
    block: 'A',
    code: 'OT010',
    skill: 'Compression',
    allocation: 85,
  },
];

const ManpowerMngmt = () => {
  const headers = ['type of shift', 'granulation', 'compression', 'coating'];
  const headers2 = ['employee', 'block', 'code', 'skill', 'allocation'];
  const dummyData = ['First Shift', 'Second Shift', 'Third Shift'];
  const [clicked, setClicked] = useState(false);
  const [assign, setAssign] = useState(Array(10).fill(false));

  const handleAssign = (idx) => {
    setAssign((prev) => {
      const list = prev.slice();
      list[idx] = !list[idx];
      return list;
    });
  };

  console.log(assign, 'values');

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
                      pl={i == 0 ? '12px' : '8px'}
                      py="12px"
                      pr={i == 7 ? '12px' : '8px'}
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
                        pr={i == 5 ? '12px' : '8px'}
                      >
                        <div className="flex gap-4 overflow-x-auto w-[26vw]">
                          {profileData
                            .slice(18 * index + 6 * i, 18 * index + 6 * i + 6)
                            .map((item, idx) => {
                              return (
                                <Avatar
                                  name={item.name}
                                  src={item.avatar}
                                  borderWidth={3}
                                  borderColor={
                                    item.availability > 3
                                      ? '#F36969'
                                      : '#420678'
                                  }
                                  opacity={item.availability > 3 ? 0.7 : 1}
                                  onClick={() => {
                                    if (item.availability > 3) {
                                      setClicked(true);
                                    }
                                  }}
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
                            pl={i == 0 ? '12px' : '8px'}
                            py="12px"
                            pr={i == 4 ? '12px' : '8px'}
                          >
                            {i === 'allocation' ? (
                              <button
                                className={`w-[70%] px-3 py-2 text-white text-xs rounded-[80px]`}
                                style={{
                                  backgroundColor: assign[index]
                                    ? '#545F71'
                                    : '#084298',
                                }}
                                onClick={() => handleAssign(index)}
                              >
                                {assign[index] ? 'Assigned' : 'Assign Shift'}
                              </button>
                            ) : i === 'employee' ? (
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
