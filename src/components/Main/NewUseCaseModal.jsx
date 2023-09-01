import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'


const NewUseCaseModal = ({ isOpen, onOpen, onClose }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader><div className='text-[#034D86] w-full h-10 flex justify-center items-center rounded-md'>
                        Request New Use Case

                    </div></ModalHeader>
                    <ModalCloseButton />      
                    <ModalBody>
                        <div className='mt-2'>
                            <p className='text-[#034D86] font-semibold '>Title</p>
                            <textarea placeholder='Be concise and include the most important requirement' className='h-12 w-full border rounded-md mt-3 px-2 py-2 text-sm' />

                        </div>
                        <div className='mt-2'>
                            <p className='text-[#034D86] font-semibold '>Details</p>
                            <p className='font-light text-sm mt-2'>Provide a clear and concise description of the new use case. Kindly include information about its objectives, intended benefit, and usage. Feel free to elaborate on any specific requirements or unique aspects of the use case that you believe are important for us to consider. The more information you provide, the better we can assess the feasibility and potential impact of adding this use case to our plattorm.</p>
                            <textarea placeholder='Enter the details' className='h-12 w-full border rounded-md mt-3 px-2 py-2 text-sm' />
                        </div>
                        <div className='grid grid-cols-2 gap-6'>
                        <div className='mt-2'>
                            <p className='text-[#034D86] font-semibold '>Name</p>
                            <textarea placeholder='Enter Your Full Name' className='h-12 w-full border rounded-md mt-3 px-2 py-2 text-sm' />

                        </div>
                        <div className='mt-2'>
                            <p className='text-[#034D86] font-semibold '>Email ID</p>
                            <textarea placeholder='Enter Organization Email ID' className='h-12 w-full border rounded-md mt-3 px-2 py-2 text-sm' />

                        </div>

                        </div>

                    </ModalBody>

                    <ModalFooter>
                        <button className='bg-[#084298] text-white px-7 py-2 rounded-md mb-5 ' mr={3} >
                            Submit
                        </button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewUseCaseModal;
