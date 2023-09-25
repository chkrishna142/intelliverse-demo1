import React, { useState } from 'react'
import {
    Flex,
    HStack,
    Heading,
    Icon,
    Text,
    Input,
    Button,
    FormControl,
    FormLabel,
    VStack,
    Select,
    Box,
    Img,
    Textarea,
} from "@chakra-ui/react";

const AddNew = () => {

    const [contact, setContact] = useState("")

    const [whatsapp, setWhatsapp] = useState(false)
    const [emailInvitation, setEmailInvitation] = useState(false)

    return (
        <div className="p-[30px] pt-[40px] flex flex-col gap-[60px] md:w-[60vw] w-full"
        >
            <Flex flexDirection={"column"} gap={"30px"}>

                <FormControl>
                    <div>
                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Full Name</div>
                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                            <input className="w-full focus:outline-none pl-2" placeholder="Enter Your Name" />
                        </div>
                    </div>
                    {/* <Input placeholder="Enter Your Name" /> */}
                </FormControl>
                <FormControl>
                    <div>
                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Email ID</div>
                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                            <input className="w-full focus:outline-none pl-2" placeholder="Email ID" />
                        </div>
                    </div>
                    {/* <Input placeholder="Enter Your Official Email Id" /> */}
                </FormControl>


                <FormControl>
                    <div>
                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Phone Number</div>
                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                            <input value={contact} onChange={(e) => setContact(e.target.value)} className="w-full focus:outline-none pl-2" placeholder="Phone Number (Optional)" />
                        </div>
                    </div>
                    {/* <Input placeholder="Enter Your Name" /> */}
                </FormControl>
                <FormControl>

                    <div>
                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Role</div>
                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                            <select className="w-full focus:outline-none">
                                <option>Admin</option>
                                <option>Regular</option>
                                <option>CXO</option>
                            </select>
                        </div>
                    </div>
                    {/* <Input placeholder="Enter Your Name" /> */}

                </FormControl>
                <div className='flex items-center gap-6 font-light'>
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" disabled={contact?.length !== 10} onSelect={() => setWhatsapp(!whatsapp)} />
                        Enable WhatsApp Integration
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" onSelect={() => setEmailInvitation(!emailInvitation)} />
                        Send Invitation Email
                    </div>
                </div>
            </Flex>
            <Flex justifyContent={"flex-start"}>
                <Button
                    bg={"#034D87"}
                    _hover={{ bg: "#034D87" }}
                    onClick={""}
                    color={"white"}
                    borderRadius={"md"}
                >
                    Submit
                </Button>
            </Flex>
        </div>
    )
}

export default AddNew