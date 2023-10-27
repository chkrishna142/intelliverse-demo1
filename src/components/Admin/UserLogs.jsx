import React from 'react'
import { Table, TableContainer, TableCaption, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react'

const UserLogs = () => {
    return (
        <TableContainer className='mt-[2vh] border rounded-md shadow-md bg-white mx-2 '>
            <Table variant='simple'>
                <Thead className='bg-[#F6F8FA]'>
                    <Tr>
                        <Th >
                            Timestamp
                        </Th>
                        <Th>User</Th>
                        <Th>
                            Activity Type
                        </Th>
                        <Th>
                            Description
                        </Th>
                        <Th>
                            IP Address
                        </Th>
                        <Th>
                            Device
                        </Th>
                        <Th>
                            Location
                        </Th>
                        
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr className='text-sm'>
                        <Td>09 Sep 2023 10:15 AM</Td>
                        <Td>User 123</Td>
                        <Td>Account Login</Td>
                        <Td>Successful Login</Td>
                        <Td>192.168.0.1</Td>
                        <Td>Chrome</Td>
                        <Td>Bhubaneshwar, India</Td>
                        {/* <Td className='text-[#024D87] font-bold cursor-pointer'>View Details</Td> */}
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>09 Sep 2023 10:15 AM</Td>
                        <Td>User 123</Td>
                        <Td>Account Login</Td>
                        <Td>Successful Login</Td>
                        <Td>192.168.0.1</Td>
                        <Td>Chrome</Td>
                        <Td>Bhubaneshwar, India</Td>
                        {/* <Td className='text-[#024D87] font-bold cursor-pointer'>View Details</Td> */}
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>09 Sep 2023 10:15 AM</Td>
                        <Td>User 123</Td>
                        <Td>Account Login</Td>
                        <Td>Successful Login</Td>
                        <Td>192.168.0.1</Td>
                        <Td>Chrome</Td>
                        <Td>Bhubaneshwar, India</Td>
                        {/* <Td className='text-[#024D87] font-bold cursor-pointer'>View Details</Td> */}
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>09 Sep 2023 10:15 AM</Td>
                        <Td>User 123</Td>
                        <Td>Account Login</Td>
                        <Td>Successful Login</Td>
                        <Td>192.168.0.1</Td>
                        <Td>Chrome</Td>
                        <Td>Bhubaneshwar, India</Td>
                        {/* <Td className='text-[#024D87] font-bold cursor-pointer'>View Details</Td> */}
                    </Tr>
                </Tbody>
                <Tfoot>
                </Tfoot>
            </Table>
        </TableContainer>

    )
}

export default UserLogs