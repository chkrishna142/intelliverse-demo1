import React, { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Spinner,
} from '@chakra-ui/react';

const AddNew = () => {
  const [contact, setContact] = useState('');
  const [whatsapp, setWhatsapp] = useState(false);
  const [emailInvitation, setEmailInvitation] = useState(false);

  return (
    <div className="p-[30px] pt-[40px] flex flex-col gap-[60px] md:w-[60vw] w-full">
      <Flex flexDirection={'column'} gap={'30px'}>
        <FormControl>
          <div>
            <div
              style={{ zIndex: '100px' }}
              className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center"
            >
              Full Name
            </div>
            <div
              style={{ zIndex: '10px' }}
              className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center"
            >
              <input
                className="w-full focus:outline-none pl-2"
                placeholder="Enter Your Name"
              />
            </div>
          </div>
          {/* <Input placeholder="Enter Your Name" /> */}
        </FormControl>
        <FormControl>
          <div>
            <div
              style={{ zIndex: '100px' }}
              className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center"
            >
              Email ID
            </div>
            <div
              style={{ zIndex: '10px' }}
              className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center"
            >
              <input
                className="w-full focus:outline-none pl-2"
                placeholder="Email ID"
              />
            </div>
          </div>
          {/* <Input placeholder="Enter Your Official Email Id" /> */}
        </FormControl>
        <FormControl>
          <div>
            <div
              style={{ zIndex: '100px' }}
              className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center"
            >
              Phone Number
            </div>
            <div
              style={{ zIndex: '10px' }}
              className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center"
            >
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full focus:outline-none pl-2"
                placeholder="Phone Number (Optional)"
              />
            </div>
          </div>
          {/* <Input placeholder="Enter Your Name" /> */}
        </FormControl>
        <FormControl>
          <div>
            <div
              style={{ zIndex: '100px' }}
              className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center"
            >
              Role
            </div>
            <div
              style={{ zIndex: '10px' }}
              className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center"
            >
              <select className="w-full focus:outline-none">
                <option>Admin</option>
                <option>Regular</option>
                <option>CXO</option>
              </select>
            </div>
          </div>
          {/* <Input placeholder="Enter Your Name" /> */}
        </FormControl>
        <div className="flex items-center gap-6 font-light">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              disabled={contact?.length !== 10}
              onSelect={() => setWhatsapp(!whatsapp)}
            />
            Enable WhatsApp Integration
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onSelect={() => setEmailInvitation(!emailInvitation)}
            />
            Send Invitation Email
          </div>
        </div>
      </Flex>
      <Flex justifyContent={'flex-start'}>
        <Button
          bg={'#034D87'}
          _hover={{ bg: '#034D87' }}
          onClick={''}
          color={'white'}
          borderRadius={'md'}
        >
          Submit
        </Button>
      </Flex>
    </div>
  );
};

const DeleteUserModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'} width={740}>
      <ModalOverlay />
      <ModalContent>
        <div className="text-white w-full h-10 flex bg-[#E46962] font-semibold justify-center items-center rounded-t-md">
          Delete User
        </div>
        {/* <ModalCloseButton className="mt-2" color={'white'} /> */}
        <ModalBody>
          <div className="mt-5 w-full gap-4 flex flex-col">
            <div className="w-full items-center flex justify-center">
              <img src="/delete.svg" />
            </div>
            <Flex flexDirection="column" className="w-full mb-6" margin={0}>
              <p className="text-base font-semibold text-black">
                Are you sure you want to delete the user?
              </p>
              <p className="text-sm  text-[#938F96]">
                This person will no longer be able to access the tool.
              </p>
            </Flex>
          </div>
        </ModalBody>
        <ModalFooter className="!w-full !flex !flex-row !items-center !justify-center !gap-2">
          <button
            onClick={() => {
              onClose();
            }}
            className="bg-[#084298] text-sm h-10 text-white px-7 py-2 rounded-md mb-5 "
            mr={3}
          >
            Yes
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            className="border-[#938F96] text-sm h-10 border text-[#2660B6] bg-white px-7 py-2 rounded-md mb-5 "
            mr={3}
          >
            No
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const AddNewModal = ({ isOpen, onClose }) => {
  const [contact, setContact] = useState('');
  const [whatsapp, setWhatsapp] = useState(false);
  const [emailInvitation, setEmailInvitation] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'} width={740}>
      <ModalOverlay />
      <ModalContent>
        <div className="text-white w-full h-10 flex bg-[#2660B6] font-semibold justify-center items-center rounded-t-md">
          Delete User
        </div>
        {/* <ModalCloseButton className="mt-2" color={'white'} /> */}
        <ModalBody className="mt-6">
          <Flex flexDirection={'column'} gap={'30px'}>
            <FormControl className="!h-12">
              <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                Full Name
              </div>
              <input
                className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                placeholder="Enter full name"
              />
            </FormControl>
            <FormControl className="!h-12">
              <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                E-mail ID
              </div>
              <input
                className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                placeholder="Enter valid email ID"
              />
            </FormControl>
            <FormControl className="!h-12">
              <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                Phone Number{' '}
                <span className="text-[#CAC5CD] text-xs">(optional)</span>
              </div>
              <input
                className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                placeholder="Enter valid phone number"
              />
            </FormControl>
            <FormControl className="!h-12 mb-2 font-semibold">
              <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                Role
              </div>
              <select className="w-full border rounded text-sm border-[#938F96] py-2 px-5">
                <option>Admin</option>
                <option>Regular</option>
                <option>CXO</option>
              </select>
              {/* <Input placeholder="Enter Your Name" /> */}
            </FormControl>
            <div className="flex flex-col items-start gap-2 text-xs font-light">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  disabled={contact?.length !== 10}
                  onSelect={() => setWhatsapp(!whatsapp)}
                />
                Enable WhatsApp Integration
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onSelect={() => setEmailInvitation(!emailInvitation)}
                />
                Send Invitation Email
              </div>
            </div>
          </Flex>
        </ModalBody>
        <ModalFooter className="!w-full !flex !flex-row !items-center !justify-start !gap-2">
          <button
            onClick={() => {
              onClose();
            }}
            className="bg-[#084298] text-sm h-10 text-white px-7 py-2 rounded-md mb-5 "
            mr={3}
          >
            Save
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            className="border-[#938F96] text-sm h-10 border text-[#2660B6] bg-white px-7 py-2 rounded-md mb-5 "
            mr={3}
          >
            Close
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const EditUserModal = (isOpen, onClose) => {
  const [contact, setContact] = useState('');
  const [whatsapp, setWhatsapp] = useState(false);
  const [emailInvitation, setEmailInvitation] = useState(false);
  const user = {
    userName: 'Sudhanshu Prasad',
    email: 'sudhanshu.12prasad@gmail.com',
    lastLogin: "8 Sep '23 10:15 AM",
    phoneNumber: '9856417823',
    role: 'Admin',
  };
  useEffect(() => {
    console.log('OncloseE', onClose, isOpen);
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'} width={740}>
      <ModalOverlay />
      <ModalContent>
        <div className="text-white w-full h-10 flex bg-[#2660B6] font-semibold justify-center items-center rounded-t-md">
          Edit User
        </div>
        {/* <ModalCloseButton className="mt-2" color={'white'} /> */}
        <ModalBody className="mt-6">
          <Flex flexDirection={'column'} gap={'30px'}>
            <FormControl className="!h-12">
              <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                Full Name
              </div>
              <input
                className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                placeholder="Enter full name"
                value={user?.userName}
              />
            </FormControl>
            <FormControl className="!h-12">
              <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                E-mail ID
              </div>
              <input
                className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                placeholder="Enter valid email ID"
                value={user?.email}
              />
            </FormControl>
            <FormControl className="!h-12">
              <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                Phone Number{' '}
                <span className="text-[#CAC5CD] text-xs">(optional)</span>
              </div>
              <input
                className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                placeholder="Enter valid phone number"
                value={user?.phoneNumber}
              />
            </FormControl>
            <FormControl className="!h-12 mb-2 font-semibold">
              <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                Role
              </div>
              <select
                value={user?.role}
                className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
              >
                <option>Admin</option>
                <option>Regular</option>
                <option>CXO</option>
              </select>
              {/* <Input placeholder="Enter Your Name" /> */}
            </FormControl>
            <div className="flex flex-col items-start gap-2 text-xs font-light">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  disabled={contact?.length !== 10}
                  onSelect={() => setWhatsapp(!whatsapp)}
                />
                Enable WhatsApp Integration
              </div>
              {/* <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onSelect={() => setEmailInvitation(!emailInvitation)}
                />
                Send Invitation Email
              </div> */}
            </div>
          </Flex>
        </ModalBody>
        <ModalFooter className="!w-full !flex !flex-row !items-center !justify-start !gap-2">
          <button
            onClick={() => {
              onClose();
            }}
            className="bg-[#084298] text-sm h-10 text-white px-7 py-2 rounded-md mb-5 "
            mr={3}
          >
            Save
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            className="border-[#DC362E] text-sm h-10 border text-[#DC632E] bg-white px-7 py-2 rounded-md mb-5 "
            mr={3}
          >
            Delete user
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddNew, DeleteUserModal, AddNewModal, EditUserModal };
