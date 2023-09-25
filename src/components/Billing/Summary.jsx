import React from 'react'
import { Table, TableContainer, TableCaption, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react'

const Summary = () => {
    return (
        <TableContainer className='mt-[2vh] border rounded-md shadow-md bg-white mx-2 '>
            <Table variant='simple'>
                <Thead className='bg-[#F6F8FA]'>
                    <Tr>
                        <Th >
                            Module
                        </Th>
                        <Th>Active Subscriptions</Th>
                        
                        
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr className='text-sm'>
                        <Td>Vision</Td>
                        <Td>4</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>Steel</Td>
                        <Td>2</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>Pharma Optimus</Td>
                        <Td>1</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>Power (IMFA)</Td>
                        <Td>1</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>Cement</Td>
                        <Td>4</Td>
                    </Tr>
                    <Tr className='text-sm'>
                        <Td>Maintenance</Td>
                        <Td>2</Td>
                    </Tr>
                            
                </Tbody>
                <Tfoot>
                </Tfoot>
            </Table>
        </TableContainer>

    )
}

export default Summary