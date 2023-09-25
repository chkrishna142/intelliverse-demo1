import React from 'react'
import { Table, TableContainer, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react'

const Recommendations = () => {
    return (
        <TableContainer className='mt-[2vh] border rounded-md shadow-md bg-white mx-2 '>
            <Table variant='simple'>
                <Thead className='bg-[#F6F8FA]'>
                    <Tr>
                        <Th >
                            Invoice Number
                        </Th>
                        <Th>Date</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>    
                        <Th>Actions</Th>                
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr className='text-sm'>
                        <Td>INV 2023-001</Td>
                        <Td>2023-08-15</Td>
                        <Td>$39.00</Td>
                        <Td>Paid</Td>
                        <Td className='text-blue-600'>View / Download</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>INV 2023-002</Td>
                        <Td>2023-08-15</Td>
                        <Td>$39.00</Td>
                        <Td>Paid</Td>
                        <Td className='text-blue-600'>View / Download</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>INV 2023-003</Td>
                        <Td>2023-08-15</Td>
                        <Td>$39.00</Td>
                        <Td>Paid</Td>
                        <Td className='text-blue-600'>View / Download</Td>
                    </Tr>
                               
                </Tbody>
                <Tfoot>
                </Tfoot>
            </Table>
        </TableContainer>

    )
}

export default Recommendations