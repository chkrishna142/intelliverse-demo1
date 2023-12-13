import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const ConfirmationModal = ({ isOpen, onClose, size, submitted, setSubmitted, buttonText, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay />
      <ModalContent>
        <div className="text-white w-full h-16 flex bg-[#034D86] font-semibold justify-center items-center rounded-t-md">
          Confirm Action
        </div>
        <ModalCloseButton className="mt-2" color={"white"} />
        <ModalFooter>
          <div className="flex gap-[10px] items-center mt-2">
            <Button
              colorScheme="red"
              onClick={() => {
                onConfirm();
                setSubmitted(false);
              }}
            >
              {buttonText}
            </Button>
            <Button onClick={onClose} colorScheme="gray" variant="outline">
              Cancel
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
