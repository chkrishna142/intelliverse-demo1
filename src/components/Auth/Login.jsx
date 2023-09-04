import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  get_auth_process_states,
  get_auth_status,
} from '../../redux/Auth/auth.selectors';
import { useNavigate } from 'react-router-dom';
import { login_action } from '../../redux/Auth/auth.actions';
import axios from 'axios';
import { Box, Select, background, Button,Spinner } from '@chakra-ui/react';
import { Input, Dropdown, Loader } from 'rsuite';
import OTPInput from 'react-otp-input';
import { baseURL } from '../../index';
import { EditIcon } from '@chakra-ui/icons';
import FloatingInput from './FloatingInput';
import NavContext from '../NavContext';
import { useContext } from 'react';

const Login = () => {

  const dispatch = useDispatch();
  const { setLogin } = useContext(NavContext)
  const { isAuth, default_plant } = useSelector(get_auth_status);
  const { auth_process_loading, auth_process_failure, auth_error_message } =
  useSelector(get_auth_process_states);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth]);

  // const [email, setEmail] = useState('');
  const emailRef = useRef();
  const [plant, setPlant] = useState(default_plant || 'Dhar');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmitOTP = (e) => {
    e.preventDefault();
    setSendingOTP(false);
    let user_type = userType;
    // let email = emailRef?.current?.value;
    localStorage.setItem('logged_in', true)
    setLogin(true)
    dispatch(login_action({ email, password, user_type, plant }));

    console.log(
      'Error',
      auth_error_message,
      auth_process_failure,
      auth_process_loading
    );
    if (auth_process_failure) {
      setErrorOTP(auth_error_message);
    }
  };
  const [sentOTP, setSentOTP] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [errorOTP, setErrorOTP] = useState('');

  const sendOTPCall = async () => {
    try {

      const data = await fetch(baseURL + 'login', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            "email": emailRef?.current?.value,

          }
        )
      })

      if (data.status === 202) {
        setSentOTP(true);
        setEmail(emailRef.current?.value);
        setErrorOTP('');

      }
    } catch (e) {
      setSendingOTP(false);
      console.log(e);
      if (userType.length === 0) {
        setErrorOTP('Please select a user');
      } else if (emailRef?.current?.value?.length > 0) {
        setErrorOTP('Unauthorized or invalid email address');
      } else setErrorOTP('Please enter an email address');
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setSendingOTP(true);
    sendOTPCall();
  };

  return (
    <div className="bg-gradient-to-tl w-screen h-screen from-[#0B295E] to-[#3C8FD4]">
      <div className="absolute top-0 bottom-0 left-0 right-0 h-[70%] m-auto w-[80%] md:h-[65%] md:w-[50%] bg-white rounded-xl flex flex-row normal-case">
        <div className="lg:w-[60%] w-[100%] p-4 pb-0 flex flex-col justify-center gap-20 lg:gap-[25%]">
          <img
            src="ripik.svg"
            alt="Ripik Logo"
            className="h-[30px] lg:h-[40px] absolute top-[2%] justify-self-center self-center lg:top-4 lg:left-4 lg:justify-self-start lg:self-start "
          />
          <div className="self-center grid">
            {sentOTP === false ? (
              <>
                <p className="text-xl mb-6 text-center justify-self-center">
                  <img className='w-44' src="/verse.jpg" />
                </p>
                {/* <Input
                  type="email"
                  placeholder="Email"
                  className="mb-6 !w-[200px] !text-base !text-black"
                  // onChange={handleEmailChange}
                  ref={emailRef}
                /> */}
                <div className="mb-6 w-[200px]">
                  <FloatingInput text={'Email'} inputRef={emailRef} />
                </div>
                {/* <div className="flex flex-col gap-6 w-[200px] mb-6">
                  <Select
                    className="!w-[100%] !text-start !text-base"
                    value={userType}
                    disabled = {true}
                    onChange={handleUserChange}
                    style={{ width: '200px' }}
                  >
                    <option
                      value=""
                      selected
                      hidden
                      disabled 
                      className="!text-gray-500"
                    >
                      Select user
                    </option>                 
                    <option value="Admin"> Ripik </option>
                    <option value="Plant Operator">Plant User</option>
                  </Select>
                  {userType === 'Plant Operator' && (
                    <Select
                      className="!w-[100%] !text-start !text-base"
                      value={plant}
                      onChange={(e) => setPlant(e.target.value)}
                      style={{ width: '200px' }}
                    >
                      <option value="Dhar">Dhar</option>
                      <option value="Jaffrabad"> Jaffrabad </option>
                      <option value="Reddypalyam">Reddypalyam</option>
                      <option value="Tadipatri">Tadipatri</option>
                      <option value="Bela">Bela</option>
                    </Select>
                  )}
                </div> */}
                <button
                  className="w-[200px] !rounded-full !justify-center !text-center bg-[#3D8FD2] text-white px-2 py-2 cursor-pointer hover:bg-[#0B295E] hover:transition duration-200 "
                  onClick={handleSubmitForm}
                  style={{ textAlign: 'center' }}
                >
                  {sendingOTP ? <Spinner /> : 'Get OTP'}
                </button>
                <p className="text-red-500">{errorOTP}</p>
              </>
            ) : (
              <>
                <p className="text-xl text-center mb-2">Enter OTP</p>
                <span className="mb-10 text-gray-500 text-xs md:text-sm">
                  We've sent an OTP to{' '}
                  <span className="font-semibold">
                    {email.slice(0, email.indexOf('@')).toLowerCase() +
                      email.slice(email.indexOf('@')).toLowerCase() +
                      ' '}
                  </span>
                  <EditIcon
                    className="!text-blue-500 text-xs"
                    onClick={() => {
                      setSentOTP(false);
                      setSendingOTP(false);
                    }}
                  />
                </span>
                <OTPInput
                  // className="w-[200px]"
                  value={password}
                  onChange={setPassword}
                  numInputs={6}
                  renderSeparator={<span>{'  '}</span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    border: '0.5px solid #79767D',
                    padding: '8px',
                    width: '25%',
                    borderRadius: '5px',
                    // backgroundColor: '#f5f5f5',
                  }}
                  containerStyle={{
                    width: '220px',
                    gap: '5px',
                    marginBottom: '32px',
                    justifySelf: 'center',
                  }}
                />
                <button
                  className="w-[200px] ml-[2vw] !rounded-full !justify-center !text-center bg-[#3D8FD2] text-white px-2 py-2 cursor-pointer hover:bg-[#0B295E] hover:transition duration-200 "
                  onClick={handleSubmitOTP}
                  appearance='primary'
                >
                  {sendingOTP ? 'Login' : <Spinner />}
                </button>
                <p className="text-red-500">{errorOTP}</p>
              </>
            )}
          </div>

        </div>
        <div className='lg:bg-[#0B295E] lg:rounded-r-xl lg:grid lg:grid-rows-3 hidden'>
          <div className='-ml-10'><img
            src="/loginT.svg"
            className=''

            alt="login top svg"
          /></div>
          <div className='-mt-12'><img
            src="/loginR.svg"
            className='pl-10'

            alt="login top svg"
          />
          </div>
          <div className='mt-24 pt-1'><img
            src="/loginB.svg"
            className=''

            alt="login top svg"
          /></div>

        </div>
      </div>
    </div>
  );
};

export default Login;
