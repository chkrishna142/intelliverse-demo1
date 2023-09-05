import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Table, TableContainer, TableCaption, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react';

const Messages = () => {

    return (
        <>
            <p className="text-3xl mt-[4vh] sm:text-4xl font-semibold text-[#024D87]">
                Notifications
            </p>
            <TableContainer className='mt-[2vh] border rounded-md shadow-md bg-white'>
                <Table variant='simple' >
                    <TableCaption>
                        <div className='w-full flex justify-between mb-3 items-center'>
                            <div className='flex items-center gap-1'>
                                <span>
                                    <img src="/pro_tip.svg" />
                                </span>
                                <span className='font-bold'>ProTip!</span>
                                When viewing a notification, press <span className='text-xs rounded-xl border px-2 py-1'>shift u</span> to mark it as Unread.
                            </div>
                            <div className='flex items-center'>
                                <p className='mr-10'><span className='font-bold'>1-1</span> of 1</p>
                                <button className='px-6 py-2 bg-[#F6F8FA] border text-[#084298] rounded-l-md'>Prev</button>
                                <button className='px-6 py-2 bg-[#F6F8FA] border text-[#084298] rounded-r-md'>Next</button>
                            </div>
                        </div>
                    </TableCaption>
                    <Thead className='bg-[#F6F8FA]'>
                        <Tr>
                            <Th className='flex items-center gap-4 '>
                                <input type="checkbox" />
                                <p className='font-bold'>Select All</p>
                            </Th>
                            <Th></Th>
                            <Th className='flex items-center gap-3 justify-end'>
                                <img className='hover:scale-110 hover:transition duration-200 cursor-pointer' src="/mark_unread.svg" alt="mark_unread" />
                                <img className='hover:scale-110 hover:transition duration-200 cursor-pointer' src="/delete_message.svg" alt="delete" />
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr className='font-semibold'>
                            <Td className='flex items-center gap-4'>
                                <span className='bg-blue-500 h-2 w-2 rounded-full absolute -ml-4'></span>
                                <input type="checkbox" />
                                <p className='text-sm'>Expert Luc Bonte has replied to your query.</p>
                            </Td>
                            <Td className='text-sm'>Luc Bonte</Td>
                            <Td className='text-sm' isNumeric>10:01 AM</Td>
                        </Tr>
                        <Tr>
                            <Td className='flex items-center gap-4 '>
                                <input type="checkbox" />
                                <p className='text-sm'>User 546 replied to discussion in the community forum.</p>
                            </Td>
                            <Td className='text-sm'>User 546</Td>
                            <Td className='text-sm' isNumeric>Sep 4</Td>
                        </Tr>

                        <Tr>
                            <Td className='flex items-center gap-4 '>
                                <input type="checkbox" />
                                <p className='text-sm'>Administrator has posted a new community notification in the JSPL group.</p>
                            </Td>
                            <Td className='text-sm'>Admin</Td>
                            <Td className='text-sm' isNumeric>Sep 3</Td>
                        </Tr>
                        <Tr>
                            <Td className='flex items-center gap-4 '>
                                <input type="checkbox" />
                                <p className='text-sm'>Administrator has posted a new community notification in the JSPL group.</p>
                            </Td>
                            <Td className='text-sm'>Admin</Td>
                            <Td className='text-sm' isNumeric>Sep 2</Td>
                        </Tr>
                        <Tr>
                            <Td className='flex items-center gap-4 '>
                                <input type="checkbox" />
                                <p className='text-sm'>Administrator has posted a new community notification in the JSPL group.</p>
                            </Td>
                            <Td className='text-sm'>Admin</Td>
                            <Td className='text-sm' isNumeric>Sep 1</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>

                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    );
};

export default Messages;
