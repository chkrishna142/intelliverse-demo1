import { IoMdMail } from 'react-icons/io';
import { CgPhone } from 'react-icons/cg';
import { FaLocationDot } from 'react-icons/fa6';
import { TEInput } from 'tw-elements-react';
import { useWindowSize } from '@uidotdev/usehooks';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { EmailChipInput } from './EmailChipInput';
import { useState } from 'react';

const EmailActivation = () => {
  // handling button submit
  const size = useWindowSize();
  const handleSubmit = () => {
    console.log('click');
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <div className="shadow-lg bg-white mt-4 p-2 w-full flex">
        <div className="p-[30px] pt-[40px] flex flex-col items-center gap-[10px] w-full">
          <Flex flexDirection={'column'} gap={'28px'}>
            <Text color="#1C56AC" size={28} fontWeight={500} alignSelf="center">
              Activate tool for new users
            </Text>
            <FormControl>
              <FormLabel fontSize={'12px'}>Company name</FormLabel>
              <Input
                type="text"
                border={'1px solid #6CA6FC'}
                placeholder="Ex. - Ultratech"
                minWidth={360}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'12px'}>Plant name (Optional)</FormLabel>
              <Input
                type="text"
                border={'1px solid #6CA6FC'}
                placeholder="Plant Name"
                minWidth={360}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'12px'}>Select tool</FormLabel>
              <select className="h-10 border border-[#6CA6FC] rounded-md w-full px-2 py-2">
                <option value="">Click to expand</option>
              </select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'12px'}>E-mail activation</FormLabel>
              <EmailChipInput />
            </FormControl>
            <FormControl>
              <Flex flexDirection="row" alignItems="baseline">
                <input type="checkbox" />
                <FormLabel fontSize={'12px'} flexDirection="row" marginLeft={1}>
                  Activate for anyone with the following email address
                </FormLabel>
              </Flex>
              <Input
                type="text"
                border={'1px solid #6CA6FC'}
                placeholder="@ultratech.com"
                minWidth={360}
              />
            </FormControl>
            <Flex justifyContent={'flex-end'}>
              <Button
                bg={'#034D87'}
                _hover={{ bg: '#034D87' }}
                onClick={handleSubmit}
                color={'white'}
                borderRadius={'md'}
              >
                Activate
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={'lg'}
        width={740}
      >
        <ModalOverlay />
        <ModalContent>
          <div className="text-white w-full h-16 flex bg-[#034D86] font-semibold justify-center items-center rounded-t-md">
            Tool Activated
          </div>
          <ModalCloseButton className="mt-2" color={'white'} />
          <ModalBody>
            <div>
              <div className="mt-5 w-full gap-4 flex">
                <div className="">
                  <div className="w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer">
                    <img
                      className="h-10 relative -top-2 left-20 z-10"
                      src="/WorkforceSafetyIcons/tick.svg"
                    />
                    <div className="w-full flex justify-center ">
                      <img className=" h-20 w-24  p-2" src="/sizing1.svg" />
                    </div>
                  </div>
                </div>
                <Flex flexDirection="column" className="w-full" margin={0}>
                  <div className="mt-5 font-semibold text-black text-sm">
                    "Sinter Sizing tool" has been activated for following
                    e-mails/extensions
                  </div>
                  <div className="text-[#141619] font-light text-sm flex justify-center  px-2  mt-4">
                    <ol type="1" className="ml-0 list-decimal">
                      <li style={{ display: 'list-item' }}>
                        rasis@jindalsteels.com
                      </li>
                      <li style={{ display: 'list-item' }}>
                        For all users with extension “jindalsteel.com”
                      </li>
                    </ol>
                  </div>
                </Flex>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={onClose}
              className="bg-[#084298] text-white px-7 py-2 rounded-md mb-5 "
              mr={3}
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EmailActivation;
