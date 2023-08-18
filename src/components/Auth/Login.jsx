import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  get_auth_process_states,
  get_auth_status,
} from '../../redux/Auth/auth.selectors';
import { useNavigate } from 'react-router-dom';
import { login_action } from '../../redux/Auth/auth.actions';
import axios from 'axios';
import { Box, Select, background } from '@chakra-ui/react';
import { Input, Dropdown, Button, Loader } from 'rsuite';
import OTPInput from 'react-otp-input';
import { baseURL } from '../../index';
import { EditIcon } from '@chakra-ui/icons';
import FloatingInput from '../Dashboard/FloatingInput';
import NavContext from '../NavContext';
import { useContext } from 'react';

const Login = () => {
  
  const dispatch = useDispatch();
  const { isAuth, default_plant } = useSelector(get_auth_status);
  const { auth_process_loading, auth_process_failure, auth_error_message } =
    useSelector(get_auth_process_states);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/intelliverse');
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
      // await data
      //   const form = new FormData();
      //   form.append('email', emailRef?.current?.value);

      //   // const response = { status: 200 };
      //   const response = await axios.post(baseURL + 'login', form);
      if (data.status === 202) {
        setSentOTP(true);
        setEmail(emailRef.current?.value);
        setErrorOTP('');
        // alert('New user created');
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
  // const handleEmailChange = (e) => {
  //   if (e && e.target && e.target.value) setEmail(e.target.value);
  // };

  const handleUserChange = (e) => {
    setUserType(e.target.value);
    console.log('User changed', userType);
  };

  return (
    <div className="bg-gradient-to-tl w-screen h-screen from-[#0B295E] to-[#3C8FD4]">
      <Box className="absolute top-0 bottom-0 left-0 right-0 h-[70%] m-auto w-[80%] md:h-[65%] md:w-[50%] bg-white rounded-xl flex flex-row normal-case">
        <Box className="lg:w-[60%] w-[100%] p-4 pb-0 flex flex-col justify-center gap-20 lg:gap-[25%]">
          <img
            src="ripik.svg"
            alt="Ripik Logo"
            className="h-[30px] lg:h-[40px] absolute top-[2%] justify-self-center self-center lg:top-4 lg:left-4 lg:justify-self-start lg:self-start "
          />
          <Box className="self-center grid">
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
                <div className="flex flex-col gap-6 w-[200px] mb-6">
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
                </div>

                <Button
                  className="w-[200px] !rounded-full !justify-center !text-center"
                  onClick={handleSubmitForm}
                  style={{ textAlign: 'center' }}
                >
                  {sendingOTP ? <Loader /> : 'Get OTP'}
                </Button>
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
                    width: '200px',
                    gap: '5px',
                    marginBottom: '32px',
                    justifySelf: 'center',
                  }}
                />
                <Button
                  className="w-[200px] mt-2 !rounded-full !justify-self-center !text-center !justify-center"
                  onClick={handleSubmitOTP}
                >
                  {sendingOTP ? 'Login' : <Loader />}
                </Button>
                <p className="text-red-500">{errorOTP}</p>
              </>
            )}
          </Box>
          {/* <div className="flex">
            {' '}
            <div className="h-[5px] bg-blue-950 w-[33%]"></div>
            {sentOTP && <div className="h-[5px] bg-blue-950 w-[33%]"></div>}
          </div> */}
        </Box>
        <Box className="bg-[#0b295e] flex flex-col w-0 lg:w-[40%] rounded-r-xl">
          <img
            src="loginT.svg"
            className="top-1 left-[55%] right-0 absolute w-0 lg:w-[10%]"
            alt="login top svg"
          />
          <img
            src="loginR.svg"
            className="lg:w-[30%] right-0 top-[30%] w-0 absolute"
            alt="Login right svg"
          />
          <img
            src="loginB.svg"
            className="lg:w-[10%] left-[60%] bottom-0 w-0 absolute"
            alt="login bottom svg"
          />
        </Box>
      </Box>
    </div>
  );
};

export default Login;
