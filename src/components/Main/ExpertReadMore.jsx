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


const ExpertReadMore = ({ isOpen, onOpen, onClose, expert }) => {

    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        setSubmitted(false)
    }, [onClose])

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"3xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton className='mt-2' />
                    <ModalBody>
                        {expert === 2 ? <div className='mt-5 pb-10 pt-2 w-full grid grid-cols-3 gap-0'>
                            <div className='col-span-1 flex justify-center items-center'>
                                <img className='rounded-md shadow-md h-40' src="/advisor3.png" />

                            </div>
                            <div className='col-span-2 w-full pr-8'>
                                <p className='text-[#034D86] font-semibold'>Luc Bonte</p>
                                <p className='text-xs w-full mt-2'><span className='font-bold'>Industry or Functional Focus:</span> Human Resources, Operational Excellence, Maintenance methodology, Capex and Opex modeling, Environment, Corporate responsibility, Change Management, Communication, Ironmaking & Steel</p>
                                <p className='text-xs w-full mt-3'><span className='font-bold'>Experience:</span> Corporate experience as CEO of important local business unit in steelmaking (Gent Belgium), Technical Director in steelmaking (Arcelor North France), President ArcelorMittal South Africa. Broad experience in Iron Making Joseph Award).
                                    Previous Head of ArcelorMittal Operational Excellence worldwide</p>
                                <p className='text-xs w-full mt-3'><span className='font-bold'>Education:</span> PhD State University of Ghent, Belgium (Grid Connected Photovoltaic Energy Applications)</p>
                            </div>
                        </div> : expert === 0 ? <div className='mt-5 pb-10 pt-2 w-full grid grid-cols-3 gap-0'>
                            <div className='col-span-1 flex justify-center items-center'>
                                <img className='rounded-md shadow-md h-40' src="/advisor1.png" />

                            </div>
                            <div className='col-span-2 w-full pr-8'>
                                <p className='text-[#034D86] font-semibold'>Florian Budde</p>
                                <p className='text-xs w-full mt-2'><span className='font-bold'>Industry or Functional Focus:</span> Chemistry and Technology, Business Strategy and Operations - Served clients across Europe, North America, Asia and Middle East </p>
                                <p className='text-xs w-full mt-3'><span className='font-bold'>Experience:</span> Senior Partner Emeritus, McKinsey and Company - Established and led Global Chemicals and Ag Practice </p>
                                <p className='text-xs w-full mt-3'><span className='font-bold'>Education:</span> PhD, Physical Chemistry & Surface Science, Freie Universität Berlin</p>
                            </div>
                        </div> : expert === 1 ?
                            <div className='mt-5 pb-10 pt-2 w-full grid grid-cols-3 gap-0'>
                                <div className='col-span-1 flex justify-center items-center'>
                                    <img className='rounded-md shadow-md h-40' src="/advisor2.png" />

                                </div>
                                <div className='col-span-2 w-full pr-8'>
                                    <p className='text-[#034D86] font-semibold'>
                                        Shripad Nadkarni</p>
                                    <p className='text-xs w-full mt-2'><span className='font-bold'>Industry or Functional Focus:</span>  Automobiles, Food and Beverages, Apparels</p>
                                    <p className='text-xs w-full mt-3'><span className='font-bold'>Experience:</span> Vice President - Marketing & Business Head , Johnson & Johnson Limited, Vice President - Marketing & Head, Coca Cola India
                                    </p>
                                    <p className='text-xs w-full mt-3'><span className='font-bold'>Education:</span> MBA, Indian Institute of Management Bangalore</p>
                                </div>
                            </div> : <div className='mt-5 pb-10 pt-2 w-full grid grid-cols-3 gap-0'>
                                <div className='col-span-1 flex justify-center items-center'>
                                    <img className='rounded-md shadow-md h-40' src="/advisor4.png" />

                                </div>
                                <div className='col-span-2 w-full pr-8'>
                                    <p className='text-[#034D86] font-semibold'>Sujesh Vasudevan</p>
                                    <p className='text-xs w-full mt-2'><span className='font-bold'>Industry or Functional Focus:</span> More than 30 years of experience in Pharma Industry, Strategic leadership
                                    </p>
                                    <p className='text-xs w-full mt-3'><span className='font-bold'>Experience:</span> Senior Advisor for Boston Consulting Group, Independent Director of ERIS Lifesciences, Ex-President Glenmark Pharmaceuticals - India Formulations, Middle East & Africa, Ex-Direrctor Marketing and Sales for Abbott</p>
                                    <p className='text-xs w-full mt-3'><span className='font-bold'>Education:</span>  Advanced Management Program, Harvard Business School</p>
                                </div>
                            </div>}
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    );
};

export default ExpertReadMore;
