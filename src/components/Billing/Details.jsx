import React from 'react'
import { Table, TableContainer, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react'

const Details = () => {
    return (
        <TableContainer className='mt-[2vh] border rounded-md shadow-md bg-white mx-2 '>
            <Table variant='simple'>
                <Thead className='bg-[#F6F8FA]'>
                    <Tr>
                        <Th >
                            Plant
                        </Th>
                        <Th>Module</Th>
                        <Th>Subscription</Th>
                        <Th>Status</Th>                  
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr className='text-sm'>
                        <Td>Angul</Td>
                        <Td>Blast Furnace</Td>
                        <Td>Premium</Td>
                        <Td>Active till 31 Aug 2024</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>Goa</Td>
                        <Td>Vision</Td>
                        <Td>Standard</Td>
                        <Td>Active till 01 Nov 2024</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>Angul</Td>
                        <Td>Blast Furnace</Td>
                        <Td>Premium</Td>
                        <Td>Active till 31 Aug 2024</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>Angul</Td>
                        <Td>Blast Furnace</Td>
                        <Td>Premium</Td>
                        <Td>Active till 31 Aug 2024</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>Angul</Td>
                        <Td>Blast Furnace</Td>
                        <Td>Premium</Td>
                        <Td>Active till 31 Aug 2024</Td>
                    </Tr>
                    
                            
                </Tbody>
                <Tfoot>
                </Tfoot>
            </Table>
        </TableContainer>

    )
}

export default Details