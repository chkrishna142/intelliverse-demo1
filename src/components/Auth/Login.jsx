import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import OTPInput from 'react-otp-input';
import { baseURL } from '../../index';
import { EditIcon } from '@chakra-ui/icons';
import FloatingInput from './FloatingInput';
import NavContext from '../NavContext';
import { useContext } from 'react';
import mixpanel from 'mixpanel-browser';

const Login = () => {
  const { setLogin, login } = useContext(NavContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      navigate('/home');
    }
  }, [login]);

  const emailRef = useRef();
  const [plant, setPlant] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState('');

  //OTP States
  const [sentOTP, setSentOTP] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [submittingOTP, setSubmittingOTP] = useState(false);
  const [errorOTP, setErrorOTP] = useState('');

  const handleSubmitOTP = (e) => {
    e.preventDefault();
    setSendingOTP(false);
    setSubmittingOTP(true);
    let user_type = userType;
    login_action({
      email,
      password,
      user_type,
      plant,
      authToken,
      setLogin,
      setErrorOTP,
      setPassword,
      setSubmittingOTP,
    });
  };

  const sendOTPCall = async () => {
    try {
      const data = await fetch(baseURL + 'login', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailRef?.current?.value,
        }),
      });
      if (data.status === 202) {
        //console.log(data?.headers?.get('x-auth-token'))
        setAuthToken(data?.headers?.get('x-auth-token'));
        setSendingOTP(false);
        setSentOTP(true);
        setEmail(emailRef.current?.value);
        setErrorOTP('');
      } else if (data.status === 500) {
        setSendingOTP(false);
        if (emailRef?.current?.value?.length > 0) {
          setErrorOTP('Unauthorized or invalid email address');
        } else setErrorOTP('Please enter an email address');
      }
    } catch (e) {
      setSendingOTP(false);
      console.log(e);
      if (emailRef?.current?.value?.length > 0) {
        setErrorOTP('Unauthorized or invalid email address');
      } else setErrorOTP('Please enter an email address');
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setSendingOTP(true);
    sendOTPCall();
  };

  const login_action = async ({
    email,
    password,
    user_type,
    plant,
    authToken,
    setLogin,
    setErrorOTP,
    setPassword,
    setSubmittingOTP,
  }) => {
    try {
      console.log('making a post request for login');
      const login_response = await fetch(
        baseURL + 'verify',
        {
          credentials: 'same-origin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': authToken,
          },
          body: JSON.stringify({
            otp: password,
          }),
        }
      );
      const data = login_response.status;
      if (data === 202) {
        localStorage.setItem('logged_in', true);
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('email', email);
        console.log('token', authToken);
        fetchUserProfile();
        setSubmittingOTP(false);
      } else if (data === 403) {
        setErrorOTP('Please check the OTP you have entered!');
        setPassword('');
        setSubmittingOTP(false);
      }
    } catch (err) {
      setErrorOTP('Error: Please try again!');
      setSubmittingOTP(false);
      setPassword('');
    }
  };

  const fetchUserProfile = async () => {
    try {
      const data = await fetch(baseURL + 'user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': localStorage.getItem('auth_token'),
        },
      });
      const res = await data.json();
      localStorage.setItem('user_type', res?.data?.role);
      localStorage.setItem('organisation', res?.data?.organisation);
      localStorage.setItem('location', res?.data?.location);
      localStorage.setItem('fullname', res?.data?.fullname);
      localStorage.setItem(
        'phone',
        res?.data?.phoneNumber ? res?.data?.phoneNumber : ''
      );
      mixpanel.identify(email);
      mixpanel.people.set('$email', email);
      mixpanel.people.set('$name', res?.data?.fullname);
      mixpanel.people.set('organisation', res?.data?.organisation);
      mixpanel.people.set('role', res?.data?.role);
      mixpanel.people.set('$region', res?.data?.location);
      mixpanel.people.set(
        '$phone',
        res?.data?.phoneNumber ? res?.data?.phoneNumber : ''
      );
      mixpanel.register({
        email: email,
        role: res?.data?.role,
        organisation: res?.data?.organisation,
      });
      mixpanel.track('User login', {
        location: res?.data?.location,
      });
      setLogin(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gradient-to-tl w-screen h-screen from-[#0B295E] to-[#3C8FD4]">
      <div className="absolute top-0 bottom-0 left-0 right-0 h-[70%] m-auto w-[80%] md:h-[65%] md:w-[50%] bg-white rounded-xl flex flex-row normal-case">
        <div className="lg:w-[60%] w-[100%] p-4 pb-0 flex flex-col justify-center gap-20 lg:gap-[25%]">
          <img
            src="/ripik.svg"
            alt="Ripik Logo"
            className="h-[30px] lg:h-[40px] absolute top-[2%] justify-self-center self-center lg:top-4 lg:left-4 lg:justify-self-start lg:self-start "
          />
          <div className="self-center grid">
            {sentOTP === false ? (
              <>
                <p className="text-xl mb-6 text-center justify-self-center">
                  <img className="w-44" src="/verse.jpg" />
                </p>
                {/* <Input
                  type="email"
                  placeholder="Email"
                  className="mb-6 !w-[200px] !text-base !text-black"
                  // onChange={handleEmailChange}
                  ref={emailRef}
                /> */}
                <form>
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
                    type="submit"
                    className="w-[200px] !rounded-full !justify-center !text-center bg-[#3D8FD2] text-white px-2 py-2 cursor-pointer hover:bg-[#0B295E] hover:transition duration-200 "
                    onClick={handleSubmitForm}
                    style={{ textAlign: 'center' }}
                  >
                    {sendingOTP ? <Spinner /> : 'Get OTP'}
                  </button>
                </form>
                <p className="text-red-500 mt-4 text-sm flex justify-center">
                  {errorOTP}
                </p>
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
                  type="number"
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
                  type="submit"
                  className="w-full !rounded-full !justify-center !text-center bg-[#3D8FD2] text-white px-2 py-2 cursor-pointer hover:bg-[#0B295E] hover:transition duration-200 "
                  onClick={handleSubmitOTP}
                  appearance="primary"
                >
                  {submittingOTP === false ? 'Login' : <Spinner />}
                </button>

                <p className="text-red-500 mt-4 text-sm">{errorOTP}</p>
              </>
            )}
          </div>
        </div>
        <div className="lg:bg-[#0B295E] lg:rounded-r-xl lg:grid lg:grid-rows-3 hidden">
          <div className="-ml-10">
            <img src="/loginT.svg" className="" alt="login top svg" />
          </div>
          <div className="-mt-12">
            <img src="/loginR.svg" className="pl-10" alt="login top svg" />
          </div>
          <div className="mt-24 pt-1">
            <img src="/loginB.svg" className="" alt="login top svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
