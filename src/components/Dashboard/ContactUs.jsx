import React, { useRef, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  extendTheme,
  ChakraProvider,
  InputLeftAddon,
  InputGroup,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import { baseURL } from '../../index';
import FloatingInput from './FloatingInput';
import { Loader } from 'rsuite';
import { useSelector } from 'react-redux';
// import './ContactUs.css';

const Contact = ({ access_token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const {access_token} = useSelector('get_auth_state')

  const handleContactButtonClick = () => {
    onOpen();
  };
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const phoneRef = useRef();
  const [responseWait, setResponseWait] = useState(false);

  const handleContact = async () => {
    try {
      let requestData = {
        phone_no: phoneRef.current.value,
        user_email: encodeURIComponent(emailRef.current.value),
        name: encodeURIComponent(nameRef.current.value),
        message: encodeURIComponent(messageRef.current.value),
      };
      console.log('Contact', requestData);
      setResponseWait(true);
      const response = await axios.get(
        baseURL +
          `contact-us/?user_email=${requestData.user_email}&phone_no=${requestData.phone_no}&message=${requestData.message}&name=${requestData.name}`,
        {
          headers: {
            Authorization: 'Token ' + access_token,
          },
        }
      );
      onClose();
      setResponseWait(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Button
        // className="ml-auto"
        colorScheme="blue"
        onClick={handleContactButtonClick}
      >
        Contact Us
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleContact}
        isCentered
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto"
      >
        <ModalOverlay className="relative mt-0 w-screen max-h-full bg-[#000000] bg-opacity-10 " />
        <ModalContent
          className="bg-white align-center w-24 align-middle rounded-lg shadow"
          style={{
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '25vh',
            padding: '16px 24px',
            maxWidth: '500px',
            height: 'auto',
            // marginBottom: 'auto',
          }}
        >
          <ModalHeader className="text-lg text-[#000000] !p-4 font-medium">
            Enter your details:
          </ModalHeader>
          <ModalCloseButton className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" />
          <ModalBody className="pb-3 flex flex-col gap-4 !pt-0">
            <FloatingInput text={'Full Name'} inputRef={nameRef} />
            <div className="flex gap-2">
              <FloatingInput text={'Email address'} inputRef={emailRef} />
              <FloatingInput text={'Phone number'} inputRef={phoneRef} />
            </div>
            <div className="flex flex-col gap-1">
              {/* <FloatingInput text={'Subject'} inputRef={subjectRef} /> */}
              <Textarea placeholder="Enter feedback" ref={messageRef} />
            </div>
          </ModalBody>
          <ModalFooter className="pl-2 pr-2 pt-4">
            <Button
              className="bg-white hover:bg-gray-200 text-black mr-2 text-md rounded-md pr-4 pl-4 h-[2.5rem] font-semibold text-sm md:text-base"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="mr-2 font-semibold bg-blue-500 text-white w-[100px] rounded-md pr-4 pl-4 h-[2.5rem] text-md justify-center hover:bg-blue-600 text-sm md:text-base"
              colorScheme="blue"
              mr={3}
              onClick={handleContact}
            >
              {responseWait ? <Loader /> : 'Submit'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Contact;
