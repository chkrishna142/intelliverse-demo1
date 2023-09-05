import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
} from '@chakra-ui/react';

export default function Mymodal({ imageone, imageTwo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <InfoOutlineIcon onClick={onOpen} fontSize={"20px"} style={{ cursor: 'pointer' }}  />

      <Modal isOpen={isOpen} onClose={onClose} isCentered="true" >
        <ModalOverlay />
        <ModalContent maxW="900px">
          <Box position="relative border-2 border-red-500 h-[10px]">
            <ModalCloseButton
              position="absolute"
              bg="white"
              borderRadius="50%"
              top="-15px"
              
              right={"50%"}
              shadow="md"
            />
          
          </Box>
          <ModalBody maxHeight="500px" overflowY="auto" justifyItems="center" alignItems="center"  className='flex flex-col'>
            <img src={imageone} alt="" style={{marginTop:"20px",marginBottom:"20px",}}/>
            <img src={imageTwo} alt="" style={{marginTop:"20px",marginBottom:"20px"}}/>
          </ModalBody>

         
        </ModalContent>
      </Modal>
    </>
  );
}
