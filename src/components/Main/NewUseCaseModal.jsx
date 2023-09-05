import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'


const NewUseCaseModal = ({ isOpen, onOpen, onClose , size}) => {

    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        setSubmitted(false)
    }, [onClose])

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
                <ModalOverlay />
                <ModalContent>
                    <div className='text-white w-full h-16 flex bg-[#034D86] font-semibold justify-center items-center rounded-t-md'>
                        Request a New Use Case
                    </div>
                    <ModalCloseButton className='mt-2' color={"white"} />
                    <ModalBody>
                        {submitted === false ? <div><div className='mt-2'>
                            <p className='text-[#034D86] font-semibold '>Title</p>
                            <textarea placeholder='Be concise and include the most important requirement' className='h-18 w-full border rounded-md mt-3 px-2 py-2 md:text-sm text-[10px]' />

                        </div>
                            <div className='mt-2'>
                                <p className='text-[#034D86] font-semibold '>Details</p>
                                <p className='font-light md:text-sm text-[10px] mt-2'>Provide a clear and concise description of the new use case. Kindly include information about its objectives, intended benefit, and usage. Feel free to elaborate on any specific requirements or unique aspects of the use case that you believe are important for us to consider. The more information you provide, the better we can assess the feasibility and potential impact of adding this use case to our plattorm.</p>
                                <textarea placeholder='Enter the details' className='h-20 w-full border rounded-md mt-3 px-2 py-2 md:text-sm text-[10px]' />
                            </div>
                            <div className='grid grid-cols-2 gap-6'>
                                <div className='mt-2'>
                                    <p className='text-[#034D86] font-semibold '>Name</p>
                                    <textarea placeholder='Enter Your Full Name' className='h-12 w-full border rounded-md mt-3 px-2 py-2 md:text-sm text-[10px]' />
                                </div>
                                <div className='mt-2'>
                                    <p className='text-[#034D86] font-semibold '>Email ID</p>
                                    <textarea placeholder='Enter Organization Email ID' className='h-12 w-full border rounded-md mt-3 px-2 py-2 md:text-sm text-[10px]' />
                                </div>
                            </div> </div> :
                            <div>
                                <div className='mt-5 w-full flex justify-center'>
                                    <img src="addusecase_submitted.svg" alt='submitted' />
                                </div>
                                <div className='mt-5 w-full flex justify-center font-bold text-[#034D86] text-lg'>
                                    Request Submitted
                                </div>
                                <div className='text-[#141619] font-light text-sm flex justify-center w-full px-2  mt-4'>
                                    Thank you for submitting your request to add a new use case to our platform. Your input is valuable to us as we continue to enhance our services. We appreciate the effort you've taken to provide the details.
                                </div>
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {submitted === false ? <button onClick={() => setSubmitted(true)} className='bg-[#084298] text-white px-7 py-2 rounded-md mb-5 ' mr={3} >
                            Submit
                        </button> : <button onClick={onClose} className='bg-[#084298] text-white px-7 py-2 rounded-md mb-5 ' mr={3} >
                            Close
                        </button>}

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewUseCaseModal;
