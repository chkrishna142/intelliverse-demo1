import React from 'react'
import { Table, TableContainer, TableCaption, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react'

const UserRolesTable = () => {
    return (
        <TableContainer className='mt-[2vh] border rounded-md shadow-md bg-white mx-2'>
            <Table variant='simple' >
                <Thead className='bg-[#F6F8FA]'>
                    <Tr>
                        <Th >
                            User ID
                        </Th>
                        <Th>Name</Th>
                        <Th>
                            Email
                        </Th>
                        <Th>
                            Role
                        </Th>
                        <Th>
                            Permissions
                        </Th>
                        <Th>
                            Last Login
                        </Th>
                        <Th>
                            Status
                        </Th>
                        <Th>
                            Actions (Edit/Delete)
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr className='text-sm'>
                        <Td>601</Td>
                        <Td>Amit Kashyap</Td>
                        <Td>abc@email.com</Td>
                        <Td>Admin</Td>
                        <Td>Full Access</Td>
                        <Td>8 Sep 2023 10:15 AM</Td>
                        <Td>Active</Td>
                        <Td className='text-[#024D87] font-semibold'>Edit / Delete</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>602</Td>
                        <Td>Raj Singh</Td>
                        <Td>abc@email.com</Td>
                        <Td>Regular</Td>
                        <Td>Read Only</Td>
                        <Td>8 Sep 2023 10:15 AM</Td>
                        <Td>Active</Td>
                        <Td className='text-[#024D87] font-semibold'>Edit / Delete</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>603</Td>
                        <Td>Amit Kashyap</Td>
                        <Td>abc@email.com</Td>
                        <Td>Admin</Td>
                        <Td>Full Access</Td>
                        <Td>8 Sep 2023 10:15 AM</Td>
                        <Td>Active</Td>
                        <Td className='text-[#024D87] font-semibold'>Edit / Delete</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>604</Td>
                        <Td>Amit Kashyap</Td>
                        <Td>abc@email.com</Td>
                        <Td>Admin</Td>
                        <Td>Full Access</Td>
                        <Td>8 Sep 2023 10:15 AM</Td>
                        <Td>Active</Td>
                        <Td className='text-[#024D87] font-semibold'>Edit / Delete</Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                </Tfoot>
            </Table>
        </TableContainer>

    )
}

export default UserRolesTable