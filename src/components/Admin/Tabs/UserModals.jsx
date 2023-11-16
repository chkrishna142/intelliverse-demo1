import React, { useState, useEffect, useContext } from 'react';
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
import axios from 'axios';
import { baseURL } from '../../..';
import NavContext from '../../NavContext';

const DeleteUserModal = ({ isOpen, onClose, userID }) => {
  const { auth } = useContext(NavContext);

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        baseURL + `iam/users/?userid=${userID}`,
        {
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': auth,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFunc = () => {
    deleteUser();
  };

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
              deleteFunc();
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

export { DeleteUserModal, AddNewModal };
