import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../..';
import {
  Spinner,
  Modal,
  ModalBody,
  ModalFooter,
  Flex,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
} from '@chakra-ui/react';

const CreditBuy = () => {
  const selected =
    'w-1/2 py-4 border-b-2 border-[#084298] text-[#084298] font-bold md:text-base text-xs';
  const non_selected =
    'w-1/2 py-4 border-b border-gray-600 text-gray-600 md:text-base text-xs';

  const [selector, setSelector] = useState(1);
  const [submitted, setSubmitted] = useState(0);
  const [loader, setLoader] = useState(false);
  const [amount, setAmount] = useState(10);
  const [url, setUrl] = useState('');

  const [tokenBalance, setTokenBalance] = useState();
  const [fullName, setFullName] = useState();
  const [submission, setSubmission] = useState(false);

  useEffect(() => {
    getTokenDetails();
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const data = await fetch(baseURL + 'user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': localStorage.getItem('auth_token'),
        },
      });
      const res = await data.json();
      setFullName(res?.data?.fullname);
    } catch (e) {
      console.log(e);
    }
  };

  const getTokenDetails = async () => {
    try {
      const data = await fetch(baseURL + 'ripiktoken/balance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': localStorage.getItem('auth_token'),
        },
      });
      const res = await data.json();
      setTokenBalance(res?.tokenBalance);
    } catch (e) {
      console.log(e);
    }
  };

  const getPaymentStatus = async (id) => {
    try {
      const data = await fetch(baseURL + 'payment/getpayments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': localStorage.getItem('auth_token'),
        },
      });
      const res = await data.json();
      const status = res?.filter((item) => {
        return item.paymentId === id;
      });
      if (
        status[0].paymentInitiated === true &&
        status[0].paymentCaptured === false
      ) {
        setSubmitted(0);
      } else if (
        status[0].paymentInitiated === true &&
        status[0].paymentCaptured === true
      ) {
        setSubmitted(2);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const generatePayment = async () => {
    try {
      const data = await fetch(baseURL + 'payment/generatepayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': localStorage.getItem('auth_token'),
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });
      const res = await data.text();
      setUrl(res);
      window.open(`https://payment.ripikintelliverse.com/pay/${res}`, '_blank');
      const converted = atob(res);
      const txn_id = converted.split(',')[0];
      setLoader(true);
      setInterval(() => {
        getPaymentStatus(txn_id);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className=" border border-[#3A74CA] rounded-md bg-white shadow-md w-[90%] mt-[5vh]">
          {submitted === 0 ? (
            <div className="mb-16">
              <div className="flex justify-center ">
                <p className="text-[#024D87] text-2xl font-semibold mt-10">
                  Token Credit Portal
                </p>
              </div>
              <div className="flex justify-center mt-10 ">
                <div className="md:w-[60%] w-[92%]">
                  <div
                    style={{ zIndex: '100px' }}
                    className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center"
                  >
                    Name
                  </div>
                  <div
                    style={{ zIndex: '10px' }}
                    className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center"
                  >
                    <input
                      className="w-full focus:outline-none pl-2"
                      placeholder="Name"
                      value={fullName}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <div className="md:w-[60%] w-[92%]">
                  <div
                    style={{ zIndex: '100px' }}
                    className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center"
                  >
                    Ripik Token Balance
                  </div>
                  <div
                    style={{ zIndex: '10px' }}
                    className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center"
                  >
                    <div className="w-full focus:outline-none pl-2">
                      {tokenBalance}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <div className="md:w-[60%] w-[92%]">
                  <div
                    style={{ zIndex: '100px' }}
                    className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center"
                  >
                    Add Credits
                  </div>
                  <div
                    style={{ zIndex: '10px' }}
                    className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center"
                  >
                    <select
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full focus:outline-none pl-2 font-semibold"
                    >
                      <option className="font-bold" value={10}>
                        ₹ 1 (10 Ripik Tokens)
                      </option>
                      <option className="font-bold" value={20}>
                        ₹ 2 (20 Ripik Tokens)
                      </option>
                      <option className="font-bold" value={30}>
                        ₹ 3 (30 Ripik Tokens)
                      </option>
                      <option className="font-bold" value={40}>
                        ₹ 4 (40 Ripik Tokens)
                      </option>
                      <option className="font-bold" value={50}>
                        ₹ 5 (50 Ripik Tokens)
                      </option>
                      <option className="font-bold" value={100}>
                        ₹ 10 (100 Ripik Tokens)
                      </option>
                      <option className="font-bold" value={500}>
                        ₹ 50 (500 Ripik Tokens)
                      </option>
                      <option className="font-bold" value={1000}>
                        ₹ 100 (1000 Ripik Tokens)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              {/* <div className='flex justify-center'>
                        <div className='flex items-center justify-between md:w-[60%] w-[92%]'>
                            <button onClick={() => setSelector(1)} className={selector === 1 ? selected : non_selected}>Self</button>
                            <button onClick={() => setSelector(2)} className={selector === 2 ? selected : non_selected}>Request Administrator</button>
                        </div>
                    </div> */}
              {/* {selector === 2 ? <div className='flex justify-center mt-2 '>
                        <div className='text-black mt-4 md:text-base text-xs w-[60%]'>
                            Send a request to your enterprise Intelliverse admin to purchase credits.
                        </div>
                    </div> : null}
                    {selector === 1 ?
                        <div>
                            <div className='flex justify-center mt-7'>
                                <div className='grid grid-cols-4 md:w-[60%] w-[92%] gap-3'>
                                    <div className='w-full col-span-2'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Card Number</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="Enter your card number" />
                                        </div>
                                    </div>
                                    <div className='w-full col-span-1'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Expiry Date</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="Date" />
                                        </div>
                                    </div>
                                    <div className='w-full col-span-1'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">CVV</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="CVV" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center mt-4'>
                                <div className='md:w-[60%] w-[92%]'>
                                    <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Street Address</div>
                                    <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                        <input className="w-full focus:outline-none pl-2" placeholder="Enter your street address" />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center mt-4 '>
                                <div className='grid grid-cols-5 md:w-[60%] w-[92%] gap-3'>
                                    <div className='w-full col-span-2'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">City</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="City" />
                                        </div>
                                    </div>
                                    <div className='w-full col-span-2'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">State</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="State" />
                                        </div>
                                    </div>
                                    <div className='w-full col-span-1'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Pincode</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="Pincode" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null} */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-6 py-2 bg-[#084298] text-white rounded-md"
                >
                  {loader === false ? <span>Buy Tokens</span> : <Spinner />}
                </button>
              </div>
            </div>
          ) : submitted === 2 ? (
            <div>
              <div className="w-full flex justify-center mt-10">
                <img src="/query.svg" />
              </div>
              <div className="w-full flex justify-center">
                <p className="font-semibold text-2xl mt-4">
                  Thank you for the purchase!
                </p>
              </div>

              <div className="mt-5 w-full flex justify-center">
                <p className="px-10 font-light">
                  <span className="font-bold">{amount} Ripik Tokens</span> have
                  been added to your account!
                </p>
              </div>
              <div className="mt-10 w-full flex justify-center mb-40">
                <p onClick={() => window.location.reload()} className="px-10">
                  <span className="text-blue-600 font-bold">Go Back</span>
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-[#084298] text-white rounded-md"
                >
                  <span>Go Back</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={'sm'}
        width={740}
      >
        <ModalOverlay />
        <ModalContent>
          <div className="text-white w-full h-16 flex bg-[#034D86] font-semibold justify-center items-center rounded-t-md">
            Payment Information
          </div>
          <ModalCloseButton className="mt-2" color={'white'} />
          <ModalBody>
            <div className="mt-5 w-full gap-4 flex flex-col">
              <div className="w-full items-center flex justify-center">
                <img src="/ripik.svg" />
              </div>
              <Flex flexDirection="column" className="w-full" margin={0}>
                <Flex className="w-full justify-between">
                  <p className="normal-case text-base text-[#605D64]">
                    Tokens to be purchased
                  </p>
                  <div className="flex gap-2">
                    <p className="text-lg text-black">{amount}</p>
                    <img src="/token.svg" />
                  </div>
                </Flex>
                <Flex className="w-full justify-between">
                  <p className="normal-case text-base text-[#605D64]">
                    Total cost
                  </p>
                  <div className="flex gap-2">
                    <p className="text-lg text-black">₹{amount / 10}</p>
                    <img src="/token.svg" className="opacity-0" />
                  </div>
                </Flex>
              </Flex>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => {
                generatePayment();
                onClose();
              }}
              className="bg-[#084298] text-white px-7 py-2 rounded-md mb-5 "
              mr={3}
            >
              Pay ₹{amount / 10}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreditBuy;
