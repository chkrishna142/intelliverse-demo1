import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const SelectedDataModal = ({ clickedRecord, isOpen, onClose }) => {
  console.log('clickedRecord', clickedRecord);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto"
    >
      <ModalOverlay
        // backdropFilter="blur(10px) hue-rotate(90deg)"
        className="relative mt-0 w-screen max-h-full bg-[#000000] bg-opacity-10 "
        bg="blackAlpha.700"
      />
      <ModalContent
        bg={'#1e212b'}
        className="bg-[#1e212b] align-center !w-[90%] !lg:w-[50%] align-middle rounded-lg shadow"
        style={{
          // width: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '10vh',
          padding: '16px 24px',
          // marginBottom: 'auto',
        }}
      >
        {/* <ModalHeader>{clicked}</ModalHeader> */}
        <ModalCloseButton
          className="ml-auto border-[3px] border-[#426078] rounded-lg p-2"
          color="white"
        />
        <ModalBody
          textTransform="capitalize"
          style={{
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
          }}
          color={
            clickedRecord && clickedRecord.label
              ? clickedRecord.label.toLowerCase() === 'healthy'
                ? 'black'
                : 'white'
              : ''
          }
        >
          {Object.keys(clickedRecord).length > 0 && (
            <Flex direction="column" p="1rem">
              <Flex
                alignItems="center"
                justifyContent="center"
                w="100%"
                gap="10px"
              ></Flex>
              <Box
                className="flex flex-col lg:flex-row"
                columns={[1, 2]}
                mt="30px"
                justify="center"
                gap="2rem"
              >
                <Box className="basis-1/3" position="relative">
                  <Image
                    className="w-[80%] lg:w-[90%]"
                    src={clickedRecord && clickedRecord.image}
                  />
                </Box>
                <Flex
                  className="basis-2/3"
                  direction="column"
                  justifyContent="space-around"
                >
                  {/* <Progress
													w="100%"
													borderRadius="20px"
													mt="20px"
													colorScheme="yellow"
													size="md"
													value={clickedRecord && clickedRecord.value}
												/> */}
                  <Box color="white">
                    <Heading
                      textAlign="left"
                      className="text-lg sm:text-lg md:text-xl lg:text-2xl flex flex-row items-baseline"
                    >
                      Health :{' '}
                      <div
                        style={{
                          width: '25px',
                          height: '13px',
                          borderRadius: '20px',
                          background:
                            clickedRecord.index < 3 && clickedRecord.index > 0
                              ? '#FEE179'
                              : clickedRecord.index > 8 &&
                                clickedRecord.index <= 10
                              ? '#F86969'
                              : clickedRecord.index > 3 &&
                                clickedRecord.index <= 8
                              ? '#34D399'
                              : '#000000',
                          marginRight: '5px',
                          marginLeft: '5px',
                        }}
                      ></div>
                      <span
                        style={{
                          fontStyle: 'italic',
                          textTransform: 'uppercase',
                        }}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl"
                      >
                        {clickedRecord && clickedRecord.label + '  '}
                      </span>
                    </Heading>
                    <Text>
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                          // fontSize: '18px',
                          marginRight: '10px',
                        }}
                      >
                        Index :{' '}
                      </span>
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        {clickedRecord && clickedRecord.index}
                      </span>
                    </Text>
                    <Text>
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                          // fontSize: '18px',
                          marginRight: '10px',
                        }}
                      >
                        Recommended Change :{' '}
                      </span>
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        {clickedRecord.index > 7 && clickedRecord.index < 11
                          ? 'Decrease'
                          : clickedRecord.index > 0 && clickedRecord.index < 4
                          ? 'Increase'
                          : '0'}
                      </span>
                    </Text>
                    {clickedRecord && clickedRecord.probability && (
                      <Text>
                        <span
                          className="text-xs sm:text-sm md:text-base"
                          style={{
                            fontWeight: 'bold',
                            // fontSize: '18px',
                            marginRight: '10px',
                          }}
                        >
                          Probability :{' '}
                        </span>
                        <span
                          className="text-xs sm:text-sm md:text-base"
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          {clickedRecord &&
                            (+clickedRecord.probability).toFixed(2)}{' '}
                          %
                        </span>
                      </Text>
                    )}
                    <Text>
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                          // fontSize: '18px',
                          marginRight: '10px',
                        }}
                      >
                        Perimeter :{' '}
                      </span>
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        {clickedRecord && clickedRecord.perimeter.toFixed(2)} px
                      </span>
                    </Text>
                    <Text>
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                          // fontSize: '18px',
                          marginRight: '10px',
                        }}
                      >
                        Area :{' '}
                      </span>
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        {clickedRecord && clickedRecord.area.toFixed(2)} px
                      </span>
                    </Text>
                    <Text textAlign="left" fontSize="15px">
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                          // fontSize: '18px',
                          marginRight: '10px',
                        }}
                      >
                        Date :{' '}
                      </span>
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        {clickedRecord &&
                          clickedRecord.date.split('-').reverse().join('/')}
                      </span>
                    </Text>
                    <Text textAlign="left" fontSize="15px">
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                          // fontSize: '18px',
                          marginRight: '10px',
                        }}
                      >
                        Time :
                      </span>
                      <span
                        className="text-xs sm:text-sm md:text-base"
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        {clickedRecord && clickedRecord.time}
                      </span>
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter bg={'#1e212b'}>
          <Button
            className="mr-2 font-semibold bg-blue-500 text-white rounded-md pr-4 pl-4 h-[2.5rem] text-md justify-center hover:bg-blue-600"
            colorScheme="blue"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelectedDataModal;
