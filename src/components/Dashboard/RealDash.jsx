import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import LineChart from '../Charts/LineChart';
import { getDataAPI } from '../../redux/App/action';
import {
  useToast,
  useDisclosure,
  Button,
  ButtonGroup,
  Input,
} from '@chakra-ui/react';

import GaugeChart from 'react-gauge-chart';
import SelectedDataModal from '../Dashboard/SelectedDataModal';
import Pagination from '../Pagination/Pagination';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Tooltip,
} from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import axios from 'axios';
import './RealDash.css';
import { Link } from 'react-router-dom';
import { DatePicker } from 'rsuite';
import { getElementData } from '../../util/util';
import { get_auth_status } from '../../redux/Auth/auth.selectors';
import { baseURL } from '../../index';
import Contact from './ContactUs';

let PageSize = 6;

const RealDash = () => {
  const toast = useToast({
    isClosable: true,
    duration: 3000,
  });

  const plant_lines = {
    dhar: 1,
    tadipatri: 2,
    reddypalyam: 1,
    bela: 1,
    jaffrabad: 1,
  };

  const { isAuth, default_plant, access_token } = useSelector(get_auth_status);
  const [constDateWiseData, setConstDateWiseData] = useState([]);
  const [latestElementFeedback, setLatestElementFeedback] = useState(false);

  const [dateWiseData, setDateWiseData] = useState([]);
  const dispatch = useDispatch();
  const plant_name = window.location.href.split('/')[3];
  const dateFormat = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };
  console.log({ plant_name });
  useEffect(() => {
    if (plant_name) {
      dispatch(getDataAPI(plant_name, access_token));
    } else {
      toast({
        title: 'Plant name missing',
        description: 'Please provide a valid plant name',
        status: 'warning',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getDataAPI(plant_name, access_token));
    }, 120000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { blobdata } = useSelector((state) => state.appReducer);

  const getProgressBarValue = (elem) => {
    if (elem && elem.predictions) {
      return elem && Math.floor(elem.predictions[0].probability * 100);
    }
  };

  const getValue = (elem) => {
    if (elem && elem.predictions) {
      return elem && Math.floor(elem.predictions[0].probability * 100);
    }
  };

  const [latestElementData, setLatestElementData] = useState(null);

  useEffect(() => {
    if (blobdata && blobdata[0]) {
      const elementData = blobdata[0];
      setLatestElementData(elementData);
      setLatestElementFeedback(false);
    }
    console.log(blobdata);
  }, [blobdata]);

  const [label, setLabel] = useState('All');
  const [clickedRecord, setClickedRecord] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();
  const {
    isOpen: isOpen4,
    onOpen: onOpen4,
    onClose: onClose4,
  } = useDisclosure();
  const handleModal = (elem) => {
    setClickedRecord(elem);
    console.log(elem);
    onOpen();
    console.log('handling modal');
  };

  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (blobdata && blobdata.length > 0) {
      setNewData(blobdata);
      //   console.log("YO", blobdata);
      //   console.log("YO", newData);
    }
  }, [blobdata]);
  useEffect(() => {
    // setTotal(newData.length);
    console.log(newData);
  }, [newData]);

  useEffect(() => {
    if (selectedDate === new Date().toISOString().split('T')[0]) {
      let temp = [...blobdata];
      if (label === 'All') {
        // setClickedRecord({});
        if (blobdata.length === 0) {
          dispatch(getDataAPI(plant_name, access_token));
        } else {
          setNewData(blobdata);
        }
      } else if (label) {
        temp = temp.filter(
          (el) => el.label.toLowerCase() === label.toLowerCase()
        );
      }
      setNewData(temp);
    } else if (selectedDate) {
      let temp = [...constDateWiseData];
      if (label === 'All') {
        fetchDatewiseData(selectedDate, plant_name);
      } else if (label) {
        // fetchDatewiseData(selectedDate, plant_name);
        temp = temp.filter(
          (el) => el.label.toLowerCase() === label.toLowerCase()
        );
      }
      setDateWiseData(temp);
    }
  }, [
    label,
    // filterByDateStart,
    // page,
    // pageSize2,
    blobdata,
    dispatch,
    // filterByDateEnd,
  ]);

  function ObjectsToCsv(rows, delimiter = ',') {
    const keys = Object.keys(rows[0]).filter(
      (key) =>
        key !== 'coal_feedrate_median' &&
        key !== 'label' &&
        key !== 'time' &&
        key !== 'date' &&
        key !== 'color' &&
        key !== 'recommended_delta_coal_feedrate' &&
        key !== 'area' &&
        key !== 'perimeter' &&
        key !== 'recommended_action' &&
        key !== 'predictions'
    );
    const columnDelimiter = delimiter;
    const lineDelimiter = '\n';
    const csvColumnHeader = keys.join(columnDelimiter);
    rows = rows.map((row) => {
      const [date, time] = row.photoName
        .split('photo_')[1]
        .split('.png')[0]
        .split('_');
      const timeFormatted = time.replace(/-/g, ':');
      return {
        ...row,
        dateTime: `${date} ${timeFormatted}`,
      };
    });

    const csvRows = rows.map((row) => {
      return keys
        .map((key) => {
          return row[key];
        })
        .join(columnDelimiter);
    });
    const csv = csvColumnHeader + lineDelimiter + csvRows.join(lineDelimiter);
    return csv;
  }

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedOption, setSelectedOption] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState('');
  const [predictionForm, setPredictionForm] = useState(false);
  const [predictionVal, setPredictionVal] = useState('');

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setStatus(selectedValue.toString());
    setShowForm(selectedValue === 'Others');
    setPredictionForm(selectedValue === 'Wrong Prediction');
  };

  const handleFormChange = (event) => {
    const value = event.target.value;
    setFormData(value);
    setStatus(`${selectedOption}-${value}`);
  };

  const handleFilterChange = (event) => {
    const selectedValue1 = event.target.value;
    setLabel(selectedValue1);
    setCurrentPage(1);
  };

  const [action, setAction] = useState('');
  const [photo, setPhoto] = useState('');
  // const [plant, setPlant] = useState('');
  const [status, setStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date()).toISOString().split('T')[0]
  );

  useEffect(() => {
    console.log('Status', status);
  }, [formData, selectedOption, status]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Simulating the completion of the download after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up the timer when the component unmounts or when isLoading changes
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  const [route, setRoute] = useState('real');
  useEffect(() => {
    console.log(route);
  }, [route]);

  const fetchDatewiseData = async (selectedDate, plant_name) => {
    try {
      const response = await axios.get(
        baseURL +
          `ceo-give-date/?start_date=${selectedDate}&end_date=${selectedDate}&plant_name=${plant_name}`,
        {
          headers: {
            Authorization: 'Token ' + access_token,
          },
        }
      );

      let payload = response.data;
      payload = payload.map((e) => getElementData(e));
      setDateWiseData(payload);
      setConstDateWiseData(payload);
      console.log(payload, 'Datewise data received');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const disabledAfterToday = (date) => {
    return (
      date > new Date(latestElementData ? latestElementData.date : new Date())
    );
  };

  useEffect(() => {
    fetchDatewiseData(selectedDate, plant_name);
  }, [selectedDate]);

  const [currentPlantData, setCurrentPlantData] = useState([]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    // console.log(
    //   selectedDate,
    //   new Date().toISOString().split('T')[0],
    //   'selectedDate'
    // );
    if (selectedDate === new Date().toISOString().split('T')[0]) {
      setCurrentPlantData(newData.slice(firstPageIndex, lastPageIndex));
    } else {
      setCurrentPlantData(dateWiseData.slice(firstPageIndex, lastPageIndex));
    }
  }, [currentPage, newData, selectedDate, dateWiseData]);

  //Wrong Prediction API and State
  const [wrongPredictImage, setWrongPredictImage] = useState('');
  // const [newPredict, setNewPredict] = useState('');
  const [newTagID, setNewTagID] = useState('');
  const [oldPredict, setOldPredict] = useState('');

  const postFeedback = async () => {
    const data2 = {
      photoName: photo,
      plant_name: plant_name,
      action: action,
      action_Status: status,
    };

    try {
      const response = await axios.post(baseURL + 'action/', data2, {
        headers: {
          Authorization: 'Token ' + access_token,
        },
      });
      console.log(response.data); // Handle the response data here
      console.log(status, 'status check');
      if (data2.action_Status === 'Wrong Prediction') {
        postWrongPredict();
      }
      onClose1();
      onClose2();
      onClose4();
      setSelectedOption('');
      setFormData('');
      setAction('');
      setPhoto('');
      // setPlant('');
      setStatus('');
    } catch (error) {
      console.error(error); // Handle any errors that occur during the request
    }
  };

  const postWrongPredict = async () => {
    try {
      let postData = {
        image_url: encodeURIComponent(wrongPredictImage),
        plant_name: plant_name.toLowerCase(),
        newtag: newTagID[0].tagId,
        newcondition: predictionVal,
        oldcondition: oldPredict[0].toUpperCase() + oldPredict.slice(1),
      };
      console.log(postData, newTagID, 'Wrong Predict Payload');
      const response = await axios.get(
        baseURL +
          `add-image/?image_url=${postData.image_url}&plant_name=${postData.plant_name}&newtag=${postData.newtag}&oldcondition=${postData.oldcondition}&newcondition=${postData.newcondition}`,
        {
          headers: {
            Authorization: 'Token ' + access_token,
          },
        }
      );
      console.log(response.data, 'Wrong Predict Response');
      setWrongPredictImage('');
      setNewTagID('');
      setOldPredict('');
      setPredictionForm(false);
      setPredictionVal('');
    } catch (error) {
      console.error(error);
    }
  };

  const retrainModel = async () => {
    try {
      console.log('Clicked retrain');
      let payload = {
        plant_name: plant_name,
        tag1: newData[0].predictions[0].tagId,
        tag2: newData[0].predictions[1].tagId,
        tag3: newData[0].predictions[2].tagId,
      };
      const response = await axios.post(baseURL + 'train-plant/', payload, {
        headers: {
          Authorization: 'Token ' + access_token,
        },
      });
      console.log(response.data, 'Retrain Model Response');
    } catch (error) {
      console.error(error);
    }
    onClose3();
  };

  const handleRetrainButtonClick = () => {
    onOpen3();
    // retrainModel();
  };

  const postLatestFeedback = () => {
    setLatestElementFeedback(true);
    postFeedback();
    onClose4();
  };

  return (
    <div
      className="realtime_dash px-4 mt-5 lg:px-10 xl:px-15"
      style={
        {
          // padding: '20px 40px 0 40px',
        }
      }
    >
      {/* {console.log(blobdata)} */}
      <div
        className="flex flex-col justify-center items-center"
        style={{
          justifyItems: 'center',
          // padding: '20px 40px 0 40px',
        }}
      >
        <span
          className="text-2xl sm:text-3xl"
          style={{
            // fontSize: '28px',
            // lineHeight: '36px',
            position: 'relative',
            // left: '45%',
            color: '#426078',
            // marginBottom: '20px',
            justifyContent: 'center',
          }}
        >
          {plant_name} Kiln Analyser
        </span>
        <p className="text-lg sm:text-xl">
          {'('}Line {plant_lines[plant_name]}
          {')'}
        </p>
      </div>
      <div
        className="realtime_tabs"
        style={{
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '0.5px',
          color: '#3E3C42',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Link
          className="p-2 xs:p-4 text-xs xs:text-sm lg:text-base"
          to={`/${plant_name}`}
          style={{
            // padding: '15px 15px',
            borderBottom:
              route === 'real' ? '3px solid #084298' : '1px solid #3E3C42',
            color: route === 'real' ? '#084298' : '',
            textDecoration: 'none',
          }}
          onClick={() => {
            setRoute('real');
          }}
        >
          Realtime Dashboard
        </Link>
        <Link
          className="p-2 xs:p-4 text-xs xs:text-sm lg:text-base"
          to={`/${plant_name}/report`}
          style={{
            // padding: '15px 15px',
            borderBottom:
              route === 'report' ? '3px solid #084298' : '1px solid #3E3C42',
            color: route === 'report' ? '#084298' : '',
            textDecoration: 'none',
          }}
          onClick={() => {
            setRoute('report');
          }}
        >
          Reporting Dashboard
        </Link>
      </div>
      <div className="retrain_div flex justify-end p-2 w-full gap-4 items-baseline">
        {console.log('Defaultplant', default_plant)}
        {(typeof default_plant === 'undefined' ||
          default_plant.length === 0) && (
          <Link
            className="text-xs xs:text-sm lg:text-base text-blue-500"
            to={`/home`}
          >
            Back to Home
          </Link>
        )}
        <Button
          // className="ml-auto"
          colorScheme="red"
          onClick={handleRetrainButtonClick}
        >
          Retrain
        </Button>
        <Modal
          isOpen={isOpen3}
          onClose={onClose3}
          onSubmit={retrainModel}
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
              height: '250px',
              // marginBottom: 'auto',
            }}
          >
            <ModalHeader className="text-lg text-[#000000] !p-4 font-medium">
              Are you sure you want to retrain the model?
            </ModalHeader>
            <ModalCloseButton className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" />
            <ModalBody className="pb-3 !pt-0">
              <span className="text-sm text-gray-500">
                The model retraining will be on the basis of user feedbacks
                given by the plant team since the last training of the model
              </span>
            </ModalBody>
            <ModalFooter className="pl-2 pr-2 pt-4">
              <Button
                className="bg-white hover:bg-gray-200 text-black text-md rounded-md pr-4 pl-4 h-[2.5rem] font-semibold"
                variant="ghost"
                onClick={onClose3}
              >
                No
              </Button>
              <Button
                className="mr-2 font-semibold bg-blue-500 text-white rounded-md pr-4 pl-4 h-[2.5rem] text-md justify-center hover:bg-blue-600"
                colorScheme="blue"
                mr={3}
                onClick={retrainModel}
              >
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Contact access_token={access_token} />
      </div>
      <div
        className="real_top flex flex-col xl:flex-row"
        style={{
          // display: 'flex',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <div
          className="top_card w-full md:h-[350px] lg:h-[400px] xl:w-[55%] 3xl:h-[430px]"
          style={{
            padding: '5px 25px 40px 25px',
            display: 'flex',
            flexDirection: 'column',
            // width: '55%',
            // height: 'auto',
            background: '#ffffff',
            borderRadius: '5px',
            marginTop: '15px',
            marginBottom: '15px',
            marginRight: '7.5px',
            boxShadow:
              '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div className="flex flex-row justify-between mt-3">
            <div
              className="heading_kiln text-base"
              style={{
                display: 'flex',
                alignItems: 'center',
                // fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.15px',
                fontWeight: '500',
                color: '#426078',
                paddingBottom: '5px',
              }}
            >
              Realtime Kiln
            </div>
            <div
              className="live_style"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                margin: '3px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#6FF9AE',
                  marginRight: '5px',
                }}
              ></div>
              <span className="text-sm" style={{ lineHeight: '16px' }}>
                Live
              </span>
            </div>
          </div>
          <div
            className="image_portion flex items-center flex-col md:flex-row"
            style={{
              // display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <img
              src={latestElementData && latestElementData.image}
              alt="Kiln Realtime"
              className="h-[75%] lg:h-[65%] max-h-[250px] md:max-h-max"
              style={{
                borderRadius: '8px',
                marginRight: '5px',
                cover: 'object-fit',
                alignSelf: 'center',
              }}
            />
            <div
              className="h-[100%] gap-0 lg:gap-3 mb-1 lg:mb-3"
              style={{
                width: '100%',
                // height: '75%',
                display: 'flex',
                justifyContent: 'end',
                flexDirection: 'column',
                // justifyContent: "center",
                // alignItems: "center",
                // padding: '20px 15px 5px 15px',
                // background: '#EFF6FF',
                // borderRadius: '6px',
                // marginLeft: '5px',
                // borderWidth: '1px',
              }}
            >
              <div
                className="img_data h-[75%] md:ml-[5px] mt-2 md:mt-0 lg:h-[65%]"
                style={{
                  width: '100%',
                  // height: '75%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  // justifyContent: "center",
                  // alignItems: "center",
                  padding: '20px 15px 5px 15px',
                  background: '#EFF6FF',
                  borderRadius: '6px',
                  // marginLeft: '5px',
                  borderWidth: '1px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '15px',
                  }}
                >
                  <span
                    className="text-xs md:text-sm lg:text-base"
                    style={{
                      // fontSize: '14px',
                      // lineHeight: '20px',
                      letterSpacing: '0.1px',
                      color: '#426078',
                      // marginBottom: '10px',
                      fontWeight: '500',
                      // marginBottom: '7px',
                    }}
                  >
                    Date{' & '}Time:
                  </span>
                  <span
                    className="text-xs md:text-sm lg:text-base "
                    style={{
                      // fontSize: '16px',
                      // lineHeight: '20px',
                      letterSpacing: '0.5px',
                      marginLeft: '5px',
                      fontWeight: '500',
                    }}
                  >
                    {/* {console.log(
                    dateFormat(latestElementData.dateTime.$date),
                    'latestElementData'
                  )} */}
                    {latestElementData &&
                      new Date(latestElementData.date)
                        .toDateString()
                        .split(' ')
                        .slice(0, 3)
                        .join(' ')}
                    {','}
                    {latestElementData
                      ? latestElementData.time?.split('-')[0] == 12
                        ? `${
                            latestElementData.time?.split('-')[0] +
                            ':' +
                            latestElementData.time?.split('-')[1] +
                            ' PM'
                          }`
                        : latestElementData.time?.split('-')[0] == 0
                        ? `${
                            12 +
                            ':' +
                            latestElementData.time?.split('-')[1] +
                            ' AM'
                          }`
                        : latestElementData.time?.split('-')[0] > 12
                        ? `${
                            latestElementData.time?.split('-')[0] -
                            12 +
                            ':' +
                            latestElementData.time?.split('-')[1] +
                            ' PM'
                          }`
                        : `${
                            latestElementData.time?.split('-')[0] +
                            ':' +
                            latestElementData.time?.split('-')[1] +
                            ' AM'
                          }`
                      : 'Loading'}
                  </span>
                </div>

                <div
                  className="mb-4"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <span
                    className="text-xs md:text-sm lg:text-base flex flex-row gap-2"
                    style={{
                      // fontSize: '14px',
                      // lineHeight: '20px',
                      letterSpacing: '0.1px',
                      fontWeight: '500',
                      color: '#426078',
                      // marginBottom: '7px',
                      marginRight: '10px',
                    }}
                  >
                    Health:
                  </span>
                  <div
                    className="current_condition"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      // justifyItems: "center",
                      // justifyContent: "center",
                      // marginBottom: '10px',
                    }}
                  >
                    <div
                      style={{
                        width: '30px',
                        height: '12px',
                        borderRadius: '20px',
                        backgroundColor:
                          latestElementData &&
                          latestElementData.label === 'dusty'
                            ? '#FEE179'
                            : latestElementData &&
                              latestElementData.label === 'hot'
                            ? '#F86969'
                            : latestElementData &&
                              latestElementData.label === 'healthy'
                            ? '#34D399'
                            : '#000000',
                        marginRight: '10px',
                      }}
                    ></div>
                    <span
                      className="text-xs md:text-sm lg:text-base"
                      style={{
                        // fontSize: '16px',
                        // lineHeight: '20px',
                        letterSpacing: '0.1px',
                        // color: '#426078',
                        fontWeight: '500',
                      }}
                    >
                      {latestElementData && latestElementData.label}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    className="text-xs md:text-sm lg:text-base"
                    style={{
                      // fontSize: '14px',
                      // lineHeight: '20px',
                      letterSpacing: '0.1px',
                      color: '#426078',
                      // marginBottom: '7px',
                      fontWeight: '500',
                      marginRight: '10px',
                    }}
                  >
                    Recommended Change:
                  </span>
                  {latestElementData &&
                  latestElementData.label === 'healthy' ? (
                    <span className="text-xs md:text-sm lg:text-base font-semibold">
                      No Action Required
                    </span>
                  ) : latestElementData &&
                    latestElementData.recommended_delta_coal_feedrate < 0 ? (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        <ArrowDropDownIcon
                          className="text-xl lg:text-2xl"
                          style={{
                            color: 'rgb(248, 105, 105)',
                            // fontSize: '50px',
                          }}
                        />
                        <span
                          className="text-xs md:text-sm lg:text-base font-semibold"
                          style={
                            {
                              // fontSize: '14px',
                            }
                          }
                        >
                          Decrease Coal Rate
                        </span>
                      </div>
                      <span className="text-[9px] normal-case md:text-xs font-semibold ">
                        Hot condition consumes 10% more fuel
                      </span>
                    </>
                  ) : latestElementData &&
                    latestElementData.recommended_delta_coal_feedrate > 0 ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <ArrowDropUpIcon
                        className="text-xl lg:text-2xl"
                        style={{
                          color: 'rgb(52 211, 121)',
                          // fontSize: '50px',
                          paddingBottom: 0,
                        }}
                      />
                      <span
                        className="text-xs md:text-sm lg:text-base font-semibold"
                        style={
                          {
                            // fontSize: '14px',
                          }
                        }
                      >
                        Increase Coal Rate
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs md:text-base font-semibold">
                      No Action Required
                    </span>
                  )}
                </div>
              </div>
              <span className="items-end ml-auto xl:ml-0 2xl:ml-auto text-sm 2xl:text-base normal-case !h-[40px] text-[#837F86]">
                {latestElementFeedback ? (
                  'Thank you for feedback'
                ) : (
                  <>
                    Is the Kiln Health correct?{' '}
                    <Button
                      className="text-base hover:!bg-green !px-2 !py-0 !text-[#AEA9B1] hover:!text-black"
                      variant="outline"
                      _hover={{ bg: '#34D399', color: '#000000' }}
                      onClick={() => setLatestElementFeedback(true)}
                    >
                      Yes
                    </Button>{' '}
                    <Button
                      className="text-base !px-2 !py-0 !text-[#AEA9B1] hover:!text-black"
                      variant="outline"
                      _hover={{ bg: '#E46962', color: '#000000' }}
                      onClick={() => {
                        setAction('No');
                        onOpen4();
                        setPhoto(
                          latestElementData && latestElementData.photoName
                        );
                      }}
                    >
                      No
                    </Button>
                    <Modal
                      isOpen={isOpen4}
                      onClose={onClose4}
                      onSubmit={postLatestFeedback}
                      isCentered
                      className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto"
                    >
                      <ModalOverlay className="relative mt-0 w-screen max-h-full bg-[#000000] bg-opacity-10 " />
                      <ModalContent
                        className="bg-white align-center w-24 align-middle rounded-lg shadow"
                        style={{
                          width: '448px',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          marginTop: '25vh',
                          padding: '16px 24px',
                          // marginBottom: 'auto',
                        }}
                      >
                        <ModalHeader className="text-lg text-[#000000] font-medium mb-6">
                          Enter the correct alternative:
                        </ModalHeader>
                        <ModalCloseButton className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" />
                        <ModalBody className="pb-3">
                          <Select
                            className="border-2 text-black rounded-md pl-[1rem] pr-[1rem] h-[2.5rem] justify-center text-lg w-full mt-2"
                            // placeholder="Select correct alternative"
                            value={predictionVal}
                            onChange={(e) => {
                              // console.log('Elem image', latestElementData && latestElementData.image);
                              setSelectedOption('Wrong Prediction');
                              setStatus('Wrong Prediction');
                              setWrongPredictImage(
                                latestElementData && latestElementData.image
                              );
                              setPredictionVal(e.target.value);
                              setOldPredict(
                                latestElementData && latestElementData.label
                              );
                              setNewTagID(
                                latestElementData &&
                                  latestElementData.predictions.filter(
                                    (val) => val.tagName === e.target.value
                                  )
                              );
                            }}
                          >
                            <option
                              value=""
                              selected
                              hidden
                              disabled
                              className="!text-gray-500"
                            >
                              Select correct alternative
                            </option>
                            {latestElementData &&
                              latestElementData.label !== 'dusty' && (
                                <option value="Dusty">Dusty</option>
                              )}
                            {latestElementData &&
                              latestElementData.label !== 'healthy' && (
                                <option value="Healthy">Healthy</option>
                              )}
                            {latestElementData &&
                              latestElementData.label !== 'hot' && (
                                <option value="Hot">Hot</option>
                              )}
                          </Select>
                        </ModalBody>
                        <ModalFooter className="pl-2 pr-2 pt-4">
                          <Button
                            className="bg-white hover:bg-gray-200 text-black text-md rounded-md pr-4 pl-4 h-[2.5rem] font-semibold"
                            variant="ghost"
                            onClick={onClose4}
                          >
                            Close
                          </Button>
                          <Button
                            className="mr-2 font-semibold bg-blue-500 text-white rounded-md pr-4 pl-4 h-[2.5rem] text-md justify-center hover:bg-blue-600"
                            colorScheme="blue"
                            mr={3}
                            onClick={postLatestFeedback}
                          >
                            Submit
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
        <div
          className="anglechart p-4 w-[100%] h-auto xl:w-[45%] md:h-[350px] lg:h-[400px] 3xl:h-[430px] xl:ml-[7.5px] mb-3 xl:mb-0"
          style={{
            // width: '45%',
            // height: '350px',
            background: '#ffffff',
            // marginLeft: '7.5px',
            display: 'flex',
            flexDirection: 'column',
            // padding: '15px',
            borderRadius: '5px',
            boxShadow:
              '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.15)',
          }}
        >
          <span
            className="text-base"
            style={{
              // fontSize: '16px',
              // lineHeight: '24px',
              letterSpacing: '0.15px',
              color: '#426078',
              fontWeight: '500',
            }}
          >
            Kiln Index
          </span>
          <div
            className="angularplot_box mb-3 flex flex-col md:flex-row lg:h-[100%]"
            style={{
              width: '100%',
              // display: 'flex',
              // flexDirection: "column",
              // justifyContent: "center",
              alignItems: 'center',
              marginTop: '40px',
              // maxWidth: '800px',
            }}
          >
            <div
              className="angular_left mb-2 md:mb-0 2xl:mb-3 lg:h-[75%]"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexBasis: '60%',
                maxWidth: '500px',
              }}
            >
              <GaugeChart
                // className="!2xl:h-[90%]"
                id="gauge-chart5"
                nrOfLevels={420}
                arcsLength={[0.2, 0.6, 0.2]}
                colors={['#FEE179', '#34D399', '#F86969']}
                percent={latestElementData && latestElementData.index / 10}
                arcPadding={0.02}
                hideText={true}
              />
              <span
                className="text-xs md:text-sm lg:text-base"
                style={{
                  // fontSize: '14px',
                  // lineHeight: '20px',
                  letterSpacing: '0.1px',
                  color: '#426078',
                  fontWeight: '500',
                  // marginTop: "60px",
                }}
              >
                Kiln Index: {latestElementData && latestElementData.index}
              </span>
              <span
                className="text-xs md:text-sm lg:text-base"
                style={{
                  // fontSize: '14px',
                  // lineHeight: '20px',
                  letterSpacing: '0.1px',
                  color: '#426078',
                  fontWeight: '500',
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Condition: {latestElementData && latestElementData.label} */}
                Health :{' '}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '25px',
                      height: '13px',
                      borderRadius: '20px',
                      background:
                        latestElementData && latestElementData.label === 'dusty'
                          ? '#FEE179'
                          : latestElementData &&
                            latestElementData.label === 'hot'
                          ? '#F86969'
                          : latestElementData &&
                            latestElementData.label === 'healthy'
                          ? '#34D399'
                          : '#000000',
                      marginRight: '5px',
                    }}
                  ></div>
                  {latestElementData && latestElementData.label}
                </div>
              </span>
            </div>
            <div
              className="angular_right w-[100%] lg:h-[75%] lg:pl-3"
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#EFF6FF',
                borderRadius: '6px',
                // flexBasis: '40%',
                padding: '20px 15px',
                borderWidth: '1px',
              }}
            >
              <span
                className="text-xs md:text-sm lg:text-base"
                style={{
                  // fontSize: '14px',
                  // lineHeight: '20px',
                  letterSpacing: '0.1px',
                  fontWeight: '500',
                  color: '#426078',
                  marginRight: 'auto',
                }}
              >
                Range :
              </span>
              <div className="flex flex-row justify-center gap-2">
                <div className="labelIndex flex flex-col text-xs justify-start gap-3 md:text-base mt-[15px] items-center">
                  <span className="labelspan">1-2</span>
                  <span className="labelspan">3-8</span>
                  <span className="labelspan">9-10</span>
                </div>
                <div className="labelIndex flex flex-col text-xs justify-start gap-3 md:text-base mt-[15px] items-center">
                  <div
                    className="rating_category w-[100%] flex flex-row justify-start"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      // marginLeft: '29px',
                    }}
                  >
                    <div
                      className="rating_box"
                      style={{
                        width: '25px',
                        height: '12px',
                        borderRadius: '20px',
                        background: '#FEE179',
                        marginRight: '10px',
                      }}
                    ></div>
                    <span className="rating_name">Dusty</span>
                  </div>
                  <div
                    className="rating_category  w-[100%] flex flex-row justify-start"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      // marginLeft: '29px',
                    }}
                  >
                    <div
                      className="rating_box"
                      style={{
                        width: '25px',
                        height: '12px',
                        borderRadius: '20px',
                        background: '#34D399',
                        marginRight: '10px',
                      }}
                    ></div>
                    <span className="rating_name">Healthy</span>
                  </div>
                  <div
                    className="rating_category w-[100%] flex flex-row justify-start"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      className="rating_box"
                      style={{
                        width: '25px',
                        height: '12px',
                        borderRadius: '20px',
                        background: '#F86969',
                        marginRight: '10px',
                      }}
                    ></div>
                    <span className="rating_name">Hot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="kiln_charts_impact_tracking flex flex-col lg:flex-row gap-4 lg:h-[500px]"
        style={{
          width: '100%',
          marginBottom: '15px',
          minHeight: '500px',
          // display: 'flex',
        }}
      >
        <div
          className="linechart w-[100%]"
          style={{
            // width: '100%',
            height: '100%',
            background: '#ffffff',
            // marginRight: "7.5px",
            display: 'flex',
            flexDirection: 'column',
            padding: '15px',
            borderRadius: '5px',
            boxShadow:
              '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.15)',
          }}
        >
          <span
            className="text-base"
            style={{
              // fontSize: '16px',
              // lineHeight: '24px',
              letterSpacing: '0.15px',
              color: '#426078',
              fontWeight: '500',
              marginLeft: '7px',
            }}
          >
            Kiln Index Chart
          </span>
          <LineChart />
        </div>
      </div>
      <div
        className="dash_bottom overflow-x-scroll md:overflow-x-hidden"
        style={{
          background: '#ffffff',
          borderRadius: '5px',
          boxShadow:
            '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.15)',
          padding: '15px',
          marginBottom: '15px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span
          className="text-sm md:text-base"
          style={{
            // fontSize: '16px',
            // lineHeight: '24px',
            letterSpacing: '0.15px',
            color: '#426078',
            fontWeight: '500',
            marginLeft: '7px',
          }}
        >
          Kiln Analyser History
        </span>
        <div
          className="dashbottom_mid items-baseline flex-col mt-4 md:mt-0 md:flex-row gap-2"
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <div
            style={{
              marginRight: '30px',
              // color: 'white',
              // width: '200px',
              cursor: 'pointer',
            }}
          >
            <DatePicker
              placeholder="Select Date"
              style={{ width: 200 }}
              onChange={handleDateChange}
              value={new Date(selectedDate)}
              // onOk={handleButtonClick}
              disabledDate={disabledAfterToday}
              cleanable={false}
            />
          </div>
          <div className="flex flex-row">
            <div
              style={{
                marginRight: '30px',
                // color: 'white',
                width: '200px',
                cursor: 'pointer',
              }}
            >
              <Select
                //   placeholder="Filter By"
                className="text-xs md:text-base"
                value={label}
                onChange={handleFilterChange}
                style={{ width: '100%', cursor: 'pointer', color: 'black' }}
              >
                <option value="All">All</option>
                <option value="Dusty">Dusty</option>
                <option value="Hot">Hot</option>
                <option value="Healthy">Healthy</option>
              </Select>
            </div>
            <Button
              onClick={() => {
                const csv =
                  selectedDate === new Date().toISOString().split('T')[0]
                    ? ObjectsToCsv(newData)
                    : ObjectsToCsv(dateWiseData);
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('hidden', '');
                a.setAttribute('href', url);
                a.setAttribute('download', 'data.csv');
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setIsLoading(true);
              }}
              colorScheme="white"
              variant="outline"
              loadingText="Downloading"
              isLoading={isLoading}
              className="text-xs md:text-base"
              style={{
                border: '2px solid #EBEBEB',
                // fontSize: '15px',
                // lineHeight: '10px',
                padding: '10px',
                borderRadius: '5px',
                letterSpacing: '0.15px',
                fontWeight: '400',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Export to CSV
            </Button>
          </div>
        </div>
        <table
          className="overflow-x-scroll"
          style={{ width: '100%', marginTop: '15px', marginLeft: '7px' }}
        >
          <thead>
            <tr
              className="text-xs whitespace-nowrap md:text-base"
              style={{
                // fontSize: '14px',
                // lineHeight: '20px',
                letterSpacing: '0.1px',
                fontWeight: '500',
                background: '#A6C4DC',
                textAlign: 'left',
              }}
            >
              <th style={{ padding: '18px 16px 18px 16px' }}>Date & Time</th>
              <th style={{ padding: '18px 16px 18px 16px', minWidth: '125px' }}>
                Health
              </th>
              <th style={{ padding: '18px 16px 18px 16px' }}>Index</th>
              <th
                style={{ padding: '18px 16px 18px 16px', textAlign: 'center' }}
              >
                View Details
              </th>
              <th style={{ padding: '18px 16px 18px 16px' }}>Action Taken</th>
            </tr>
          </thead>
          <tbody>
            {currentPlantData?.length > 0 &&
              currentPlantData?.map((elem, i) => {
                return (
                  <tr key={i}>
                    <td
                      className="text-xs md:text-base w-[150px] px-3 lg:px-4 py-4 md:w-[180px] lg:w-auto"
                      style={{
                        borderWidth: '1px 0 1px 1px',
                        borderStyle: 'solid',
                        borderColor: '#EBEBEB',

                        // padding: '18px 16px 18px 16px',
                        // fontSize: '14px',
                        // lineHeight: '20px',
                        letterSpacing: '0.25px',
                      }}
                    >
                      {/* 01.06.2023 15:20:02 */}
                      {elem &&
                        new Date(elem.date)
                          .toDateString()
                          .split(' ')
                          .slice(0, 3)
                          .join(' ')}
                      {', '}
                      {elem.time.split('-')[0] > 12
                        ? `${
                            elem.time.split('-')[0] -
                            12 +
                            ':' +
                            elem.time.split('-')[1] +
                            ' PM'
                          }`
                        : `${
                            elem.time.split('-')[0] +
                            ':' +
                            elem.time.split('-')[1] +
                            ' AM'
                          }`}
                    </td>
                    <td
                      className="text-xs md:text-base"
                      style={{
                        borderWidth: '1px 0 1px 0',
                        borderStyle: 'solid',
                        borderColor: '#EBEBEB',
                        padding: '18px 16px 18px 16px',
                        // fontSize: '14px',
                        // lineHeight: '20px',
                        letterSpacing: '0.25px',
                        minWidth: '125px',
                      }}
                    >
                      <div
                        style={{
                          width: '27px',
                          height: '20px',
                          borderRadius: '10px',
                          background:
                            elem.label === 'dusty'
                              ? '#FEE179'
                              : elem.label === 'hot'
                              ? '#F86969'
                              : elem.label === 'healthy'
                              ? '#34D399'
                              : '#000000',
                          marginRight: '10px',
                          float: 'left',
                        }}
                      ></div>
                      {/* Dusty */}
                      {elem.label}
                    </td>
                    <td
                      className="text-xs md:text-base"
                      style={{
                        borderWidth: '1px 0 1px 0',
                        borderStyle: 'solid',
                        borderColor: '#EBEBEB',
                        padding: '18px 16px 18px 25px',
                        // fontSize: '14px',
                        // lineHeight: '20px',
                        letterSpacing: '0.25px',
                      }}
                    >
                      {elem.index}
                    </td>
                    <td
                      style={{
                        borderWidth: '1px 0 1px 0',
                        borderStyle: 'solid',
                        borderColor: '#EBEBEB',
                        textAlign: 'center',
                        padding: '18px auto 18px auto',
                      }}
                    >
                      <Tooltip label="View" fontSize="md" hasArrow bg="#AEA9B1">
                        <VisibilityIcon
                          // style={{ fontSize: '30px' }}
                          onClick={() => handleModal(elem)}
                          style={{
                            cursor: 'pointer',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                          }}
                        />
                      </Tooltip>
                      {/* <DownloadIcon style={{ width: "16px", height: "16px" }} /> */}
                    </td>
                    <td
                      style={{
                        borderWidth: '1px 1px 1px 0',
                        borderStyle: 'solid',
                        borderColor: '#EBEBEB',
                        height: '100%',
                        padding: '18px 16px 18px 16px',
                      }}
                    >
                      {(elem.index === 1 ||
                        elem.index === 2 ||
                        elem.index === 9 ||
                        elem.index === 10) && (
                        <>
                          <div
                            style={{
                              width: '35px',
                              height: '35px',
                              border: '1px solid #EBEBEB',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              float: 'left',
                              cursor: 'pointer',
                              marginRight: '1px',
                              background: 'rgba(56, 248, 86, 0.08)',
                            }}
                            onClick={() => {
                              onOpen1();
                              setAction('Yes');
                              setPhoto(elem.photoName);
                              // setPlant('Dhar');
                            }}
                          >
                            <DoneIcon
                              style={{ fontSize: '25px', color: '#1DBA0F' }}
                            />
                          </div>
                          <div
                            style={{
                              width: '35px',
                              height: '35px',
                              border: '1px solid #EBEBEB',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              cursor: 'pointer',
                              background: '#FFDEDE',
                            }}
                            onClick={() => {
                              onOpen2();
                              setAction('No');
                              setPhoto(elem.photoName);
                              // setPlant('Dhar');
                            }}
                          >
                            <ClearIcon
                              style={{ fontSize: '25px', color: '#DC362E' }}
                            />
                          </div>
                          <Modal
                            isOpen={isOpen1}
                            onClose={onClose1}
                            onSubmit={postFeedback}
                            isCentered
                            className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto"
                          >
                            <ModalOverlay className="relative mt-0 w-screen max-h-full bg-[#000000] bg-opacity-10 " />
                            <ModalContent
                              className="bg-white align-center w-24 align-middle rounded-lg shadow"
                              style={{
                                width: '448px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: '25vh',
                                padding: '16px 24px',
                                // marginBottom: 'auto',
                              }}
                            >
                              <ModalHeader className="text-lg text-[#000000] font-medium mb-6">
                                What Action was Taken?
                              </ModalHeader>
                              <ModalCloseButton className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" />
                              <ModalBody className="pb-3">
                                <FormControl>
                                  <FormLabel className="text-md mb-2 text-500">
                                    Answer
                                  </FormLabel>
                                  <Input
                                    className="border-2 rounded-md pl-[1rem] pr-[1rem] h-[2.5rem] justify-center text-lg w-full"
                                    type="text"
                                    placeholder="Enter the Action Taken"
                                    onChange={(e) => setStatus(e.target.value)}
                                  />
                                  <FormHelperText className="text-sm mt-[0.5rem]">
                                    Your Feedback is invaluable to us.
                                  </FormHelperText>
                                </FormControl>
                              </ModalBody>
                              <ModalFooter className="pl-2 pr-2 pt-4">
                                <Button
                                  className="bg-white hover:bg-gray-200 text-black text-md rounded-md pr-4 pl-4 h-[2.5rem] font-semibold"
                                  variant="ghost"
                                  onClick={onClose1}
                                >
                                  Close
                                </Button>
                                <Button
                                  className="mr-2 font-semibold bg-blue-500 text-white rounded-md pr-4 pl-4 h-[2.5rem] text-md justify-center hover:bg-blue-600"
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={postFeedback}
                                >
                                  Submit
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                          <Modal
                            isOpen={isOpen2}
                            onClose={onClose2}
                            onSubmit={postFeedback}
                            isCentered
                            className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto"
                          >
                            <ModalOverlay className="relative mt-0 w-screen max-h-full bg-[#000000] bg-opacity-10 " />
                            <ModalContent
                              className="bg-white align-center w-24 align-middle rounded-lg shadow"
                              style={{
                                width: '448px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: '25vh',
                                padding: '16px 24px',
                                // marginBottom: 'auto',
                              }}
                            >
                              <ModalHeader className="text-lg text-[#000000] font-medium mb-6">
                                Why was no Action taken?
                              </ModalHeader>
                              <ModalCloseButton className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" />
                              <ModalBody className="pb-3">
                                <div className="text-white">
                                  <Select
                                    className="border-2 text-black rounded-md pl-[1rem] pr-[1rem] h-[2.5rem] justify-center text-lg w-full"
                                    placeholder="Select option"
                                    value={selectedOption}
                                    onChange={handleDropdownChange}
                                  >
                                    <option value="Wrong Prediction">
                                      Wrong Prediction
                                    </option>
                                    <option value="Kiln was Autocorrecting">
                                      Kiln was Autocorrecting
                                    </option>
                                    <option value="Others">Others</option>
                                  </Select>
                                </div>
                                {console.log(elem, 'Element Wrong predict')}
                                {predictionForm && (
                                  <Select
                                    className="border-2 text-black rounded-md pl-[1rem] pr-[1rem] h-[2.5rem] justify-center text-lg w-full mt-2"
                                    placeholder="Select correct alternative"
                                    value={predictionVal}
                                    onChange={(e) => {
                                      // console.log('Elem image', elem.image);
                                      setWrongPredictImage(elem.image);
                                      setPredictionVal(e.target.value);
                                      setOldPredict(elem.label);
                                      setNewTagID(
                                        elem.predictions.filter(
                                          (val) =>
                                            val.tagName === e.target.value
                                        )
                                      );
                                    }}
                                  >
                                    {elem.label !== 'dusty' && (
                                      <option value="Dusty">Dusty</option>
                                    )}
                                    {elem.label !== 'healthy' && (
                                      <option value="Healthy">Healthy</option>
                                    )}
                                    {elem.label !== 'hot' && (
                                      <option value="Hot">Hot</option>
                                    )}
                                  </Select>
                                )}
                                {showForm && (
                                  <FormControl marginTop="10px">
                                    <FormLabel className="text-md mb-2 text-500">
                                      Please Specify the Reason
                                    </FormLabel>
                                    <Input
                                      className="border-2 rounded-md pl-[1rem] pr-[1rem] h-[2.5rem] justify-center text-lg w-full"
                                      type="text"
                                      value={formData}
                                      onChange={handleFormChange}
                                      placeholder="Enter the Reason"
                                    />
                                  </FormControl>
                                )}
                              </ModalBody>
                              <ModalFooter className="pl-2 pr-2 pt-4">
                                <Button
                                  className="bg-white hover:bg-gray-200 text-black text-md rounded-md pr-4 pl-4 h-[2.5rem] font-semibold"
                                  variant="ghost"
                                  onClick={onClose2}
                                >
                                  Close
                                </Button>
                                <Button
                                  className="mr-2 font-semibold bg-blue-500 text-white rounded-md pr-4 pl-4 h-[2.5rem] text-md justify-center hover:bg-blue-600"
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={postFeedback}
                                >
                                  Submit
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={
            selectedDate === new Date().toISOString().split('T')[0]
              ? newData.length
              : dateWiseData.length
          }
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <>
        {' '}
        <SelectedDataModal
          clickedRecord={clickedRecord}
          onClose={onClose}
          isOpen={isOpen}
        />
      </>
    </div>
  );
};

export default React.memo(RealDash);
