// import { Box, Input, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
// import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDataAPI } from "../redux/App/action";
import axios from 'axios';
import './ReportDash.css';
import { DateRangePicker } from 'rsuite';
import { Link } from 'react-router-dom';
import { baseURL } from '../../index';
import { useSelector } from 'react-redux';
import { get_auth_status } from '../../redux/Auth/auth.selectors';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip, UnorderedList, ListItem } from '@chakra-ui/react';
import {
  SubdirectoryArrowLeftSharp,
  SubdirectoryArrowRightSharp,
} from '@mui/icons-material';

const ReportDash = () => {
  const { access_token, email } = useSelector(get_auth_status);
  const plant_name = window.location.href.split('/')[3];
  const [route, setRoute] = useState('report');
  useEffect(() => {
    console.log(route);
  }, [route]);
  const plant_lines = {
    dhar: 1,
    tadipatri: 2,
    reddypalyam: 1,
    bela: 1,
    jaffrabad: 1,
  };

  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
  );

  const [selectedRange, setSelectedRange] = useState([
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    new Date(new Date().getTime()),
  ]);

  const handleDateRangeSelect = (value) => {
    setSelectedRange(value);
    setStartDate(new Date(value[0].getTime()).toISOString().split('T')[0]);
    setEndDate(
      new Date(value[1].getTime() + 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]
    );
    // reqRange();
    // fetchRangeData();
    console.log('Peepaw', startDate, endDate, selectedRange);
  };

  const [hotPercent, setHotPercent] = useState(0);

  // const fetchHotPercent = async () => {
  //   try {
  //     const response = await axios.get(
  //       baseURL + `date/?plant_name=${plant_name}`,
  //       {
  //         params: {
  //           start_datetime: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
  //             .toISOString()
  //             .split('T')[0],
  //           end_datetime: new Date().toISOString().split('T')[0],
  //         },
  //         headers: {
  //           Authorization: 'Token ' + access_token,
  //         },
  //       }
  //     );
  //     console.log(response, 'Hot Data');
  //     if (response.status === 200) {
  //       let sum =
  //         response.data?.Hot + response.data?.Healthy + response.data?.Dusty;
  //       if (sum > 0) {
  //         setHotPercent(((response.data?.Hot / sum) * 100).toFixed(2));
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   fetchHotPercent();
  //   console.log('Hot percent hit');
  // }, []);

  //   useEffect(() => {
  //     dispatch(fetchDataAPI());
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const [reportdata, setReportdata] = useState([]);
  const [chartNum, setChartNum] = useState([]);
  const [feedbackChart, setFeedbackChart] = useState([]);
  const [feedbackChartNum, setFeedbackChartNum] = useState([]);

  const plant = window.location.href.split('/')[3];

  const fetchData = async (from, to) => {
    try {
      //   var fromDate = "2023-04-21";
      //   var toDate = "2023-04-23";

      const response = await axios.get(baseURL + `date/?plant_name=${plant}`, {
        params: {
          start_datetime: from,
          end_datetime: to,
        },
        headers: {
          Authorization: 'Token ' + access_token,
        },
      });

      setReportdata(response.data);
      console.log('Hi', response.data);
      const condition = [
        response.data.Dusty,
        response.data.Healthy,
        response.data.Hot,
      ];
      // response.data.forEach(({ _id, count }) => {
      //   if (_id === "healthy" || _id === "Healthy") {
      //     condition[0] += count;
      //   } else if (_id === "hot" || _id === "Hot") {
      //     condition[1] += count;
      //   } else if (_id === "dusty" || _id === "Dusty") {
      //     condition[2] += count;
      //   }
      // });
      // console.log(condition);
      setChartNum(condition);
      setHotPercent(
        response.data.Hot + response.data.Dusty + response.data.Healthy > 0
          ? (100 * response.data.Hot) /
              (response.data.Hot + response.data.Dusty + response.data.Healthy)
          : 0
      );
      console.log('Hi', chartNum);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchFeedBack = async (from, to) => {
    try {
      const response = await axios.get(
        `https://dev.ultratech-ripik.com/images/allactions/?plant_name=${plant_name}&start_date=${from}&end_date=${to}`,
        {
          headers: {
            Authorization: 'Token ' + access_token,
          },
        }
      );
      let temp = [];
      let start = new Date(from).toISOString().split('T')[0];
      let end = new Date(to);
      while (new Date(start) < end) {
        temp.push({
          date: start,
          actionYes: 0,
          actionNo: 0,
          actionUnfilled: 0,
        });
        console.log('Temp check', temp, start, end);
        start = new Date(new Date(start).getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];
      }
      let wrongPredict = 0;
      let kilnAuto = 0;
      let others = 0;
      for (let i = 0; i < response?.data?.length; i++) {
        let tempDate = response?.data[i].date;
        let j = temp.findIndex((object) => object.date === tempDate);
        console.log('datecheck', j, tempDate);
        if (
          response?.data[i].action === '' ||
          typeof response?.data[i].action === 'undefined'
        ) {
          temp[j].actionUnfilled++;
        } else if (response?.data[i].action === 'Yes') {
          temp[j].actionYes++;
        } else {
          temp[j].actionNo++;
          if (response?.data[i].action_Status === 'Wrong Prediction') {
            wrongPredict++;
          } else if (
            response?.data[i].action_Status === 'Kiln was Autocorrecting'
          ) {
            kilnAuto++;
          } else others++;
        }
        console.log(temp[j], 'Jth temp', tempDate);
      }
      console.log('Pie chart', [kilnAuto, wrongPredict, others]);
      setFeedbackChart(temp);
      setFeedbackChartNum([kilnAuto, wrongPredict, others]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [allData, setAllData] = useState([]);
  const [dustyNum, setDustyNum] = useState([]);
  const [hotNum, setHotNum] = useState([]);
  const [healthyNum, setHealthyNum] = useState([]);
  const fetchData2 = async (from, to) => {
    try {
      const response = await axios.get(baseURL + `date/?plant_name=${plant}`, {
        //When using localhost:8080, use http, when using hosted backend server, change to https
        params: {
          // plant_name: plant,
          start_datetime: from,
          end_datetime: to,
        },
        headers: {
          Authorization: 'Token ' + access_token,
        },
      });
      setAllData((prev) => [
        ...prev,
        [
          response.data.dates[0].date,
          response.data.Dusty,
          response.data.Hot,
          response.data.Healthy,
        ],
      ]);
      // console.log("Response", allData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchActionData = async () => {
    try {
      const response = await axios.get(
        baseURL + `actionTaken/?plant_name=${plant}`,
        {
          headers: {
            Authorization: 'Token ' + access_token,
          },
        }
      );
      console.log(response.data, 'Action response');
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    console.log('Updated allData:', allData);
  }, [allData]);

  const [range, setRange] = useState([]);
  useEffect(() => {
    // console.log(range);
  }, [range]);
  const reqRange = () => {
    setRange([]);
    const dates = [];
    let i = 0;
    while (true) {
      const date = new Date(
        new Date(startDate).getTime() + i * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0];
      if (date === endDate) {
        break;
      }
      dates.push(date);
      i++;
    }
    setRange(dates);
    // console.log(range);
  };

  const fetchRangeData = async () => {
    try {
      var myDate = new Date(startDate);
      // setDustyNum([]);
      // setHealthyNum([]);
      // setHotNum([]);
      setFeedbackChart([]);
      setAllData([]);
      let i = 0;
      console.log('Through Me');
      while (true) {
        const date = new Date(myDate.getTime() + i * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];
        if (date === endDate) {
          break;
        }
        await fetchData2(date, date);
        i++;
      }
      allData.sort((a, b) => a[0].localeCompare(b[0]));
      console.log('Alldata', allData);
    } catch (error) {
      // Handle any errors that occurred during fetching or data processing
      console.error(error);
    }
  };

  // useEffect(() => {}, [dustyNum, hotNum, healthyNum, allData]);
  useEffect(() => {
    setDustyNum(allData.map((innerArray) => innerArray[1]));
    setHotNum(allData.map((innerArray) => innerArray[2]));
    setHealthyNum(allData.map((innerArray) => innerArray[3]));
    // if(hotNum+healthyNum+dustyNum>0) setHotPercent(hotNum / (hotNum + healthyNum + dustyNum));
    // console.log("Great", dustyNum, hotNum, healthyNum, innerArr);
    console.log('Here I go', dustyNum, hotNum, healthyNum);
  }, [allData]);

  const handleButtonClick = () => {
    // // Replace startDate and endDate with your desired start and end datetimes
    // const startDate = new Date(filterByDateStart);
    // const endDate = new Date(filterByDateEnd);
    console.log('Huss', startDate, endDate);
    fetchData(startDate, endDate);
    fetchFeedBack(startDate, endDate);
    fetchRangeData();
    reqRange();
  };
  useEffect(() => {
    // console.log(condition);
    console.log('Initial render working');
    handleDateRangeSelect(selectedRange);
    fetchData(startDate, endDate);
    fetchRangeData();
    fetchFeedBack(startDate, endDate);
    // prevweek();
    reqRange();
    fetchActionData();
    console.log('Calling the API1');
    // fetchWeekData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);
  // useEffect(() => {
  //   fetchData(startDate, endDate);
  //   fetchRangeData();
  //   reqRange();
  //   fetchFeedBack(startDate, endDate);
  //   fetchActionData();
  // }, [startDate, endDate]);

  // useEffect(() => {
  //   handleDateRangeSelect(selectedRange);
  //   fetchRangeData();
  //   reqRange();
  // }, [selectedRange]);

  const chartData = {
    series: chartNum,
    options: {
      labels: ['Dusty', 'Healthy', 'Hot'],
      colors: [
        'rgba(254, 225, 121)',
        'rgba(52, 211, 153)',
        'rgba(248, 105, 105)',
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350,
            },
            legend: {
              show: true,
              position: 'bottom',
              labels: {
                colors: ['#000000'], // Specify the desired text color, such as white (#ffffff)
              },
              fontSize: '12px',
            },
          },
        },
        {
          breakpoint: 1280,
          options: {
            chart: {
              width: 450,
            },
            legend: {
              show: true,
              position: 'bottom',
              labels: {
                colors: ['#000000'], // Specify the desired text color, such as white (#ffffff)
              },
              fontSize: '12px',
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '10px',
          // colors:["#fff"],
        },
        background: {
          enabled: true,
          foreColor: '#000',
        },
        dropShadow: {
          enabled: false,
        },
      },
    },
  };

  const stackedBar = {
    series: [
      {
        name: 'Dusty',
        data: range.map((date) => {
          const matchingData = allData.find(([d]) => d === date);
          return matchingData ? matchingData[1] : null;
        }),
      },
      {
        name: 'Healthy',
        data: range.map((date) => {
          const matchingData = allData.find(([d]) => d === date);
          return matchingData ? matchingData[3] : null;
        }),
      },
      {
        name: 'Hot',
        data: range.map((date) => {
          const matchingData = allData.find(([d]) => d === date);
          return matchingData ? matchingData[2] : null;
        }),
      },
    ],
    options: {
      colors: [
        'rgba(254, 225, 121)',
        'rgba(52, 211, 153)',
        'rgba(248, 105, 105)',
      ],
      chart: {
        type: 'bar',
        height: '100%',
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      // title: {
      //   text: "Distribution of Instances over the Past Week",
      // },
      xaxis: {
        categories: range.map((date) =>
          new Date(date).toLocaleString('default', {
            month: 'short',
            day: 'numeric',
          })
        ),
        title: {
          text: 'Dates',
          style: {
            color: '#000000',
            fontWeight: 400, // Set the text color to white
          },
        },
        labels: {
          style: {
            colors: '#000000', // Set the text color to white
          },
        },
      },
      yaxis: {
        title: {
          text: '% of Instances',
          style: {
            color: '#000000',
            fontWeight: 400, // Set the text color to white
          },
        },
        labels: {
          style: {
            colors: '#000000', // Set the text color to white
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
        markers: {
          width: 12,
          height: 12,
          radius: 10,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '10px',
        },
      },
      responsive: [
        {
          breakpoint: 800,
          options: {
            chart: {
              height: 370,
            },
            legend: {
              show: true,
              position: 'bottom',
              labels: {
                colors: ['#000000'], // Specify the desired text color, such as white (#ffffff)
              },
              fontSize: '6px',
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '6px',
            },
            // background: {
            //   enabled: true,
            //   foreColor: '#fff',
            // },
          },
        },
        {
          brekpoint: 1024,
          options: {
            chart: {
              height: 400,
            },
            legend: {
              show: true,
              position: 'bottom',
              labels: {
                colors: ['#000000'], // Specify the desired text color, such as white (#ffffff)
              },
              fontSize: '6px',
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '6px',
            },
            background: {
              enabled: true,
              foreColor: '#fff',
            },
          },
        },
        {},
        {
          breakpoint: 2600,
          options: {
            chart: {
              height: '100%',
            },
            legend: {
              show: true,
              position: 'bottom',
              labels: {
                colors: ['#000000'], // Specify the desired text color, such as white (#ffffff)
              },
              fontSize: '6px',
            },
          },
        },
      ],
    },
  };

  //Feedback graphs
  const feedbackChartData = {
    series: feedbackChartNum,
    options: {
      labels: ['Kiln Autocorrecting', 'Wrong Prediction', 'Others'],
      colors: [
        'rgba(236, 146, 142)',
        'rgba(248, 105, 105)',
        'rgba(249, 222, 220)',
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350,
            },
            legend: {
              show: true,
              position: 'bottom',
              labels: {
                colors: ['#000000'], // Specify the desired text color, such as white (#ffffff)
              },
              fontSize: '12px',
            },
          },
        },
        {
          breakpoint: 1280,
          options: {
            chart: {
              width: 450,
            },
            legend: {
              show: true,
              position: 'bottom',
              labels: {
                colors: ['#000000'], // Specify the desired text color, such as white (#ffffff)
              },
              fontSize: '12px',
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '10px',
          // colors:["#fff"],
        },
        background: {
          enabled: true,
          foreColor: '#000',
        },
        dropShadow: {
          enabled: false,
        },
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.85,
          },
        },
      },
    },
  };

  const feedbackStackedBar = {
    series: [
      {
        name: 'Unfilled',
        data: range.map((dat) => {
          const matchingData = feedbackChart.findIndex(
            (object) => object.date === dat
          );
          return matchingData >= 0
            ? feedbackChart[matchingData].actionUnfilled
            : null;
        }),
      },
      {
        name: 'No action taken',
        data: range.map((dat) => {
          const matchingData = feedbackChart.findIndex(
            (object) => object.date === dat
          );
          return matchingData >= 0
            ? feedbackChart[matchingData].actionNo
            : null;
        }),
      },
      {
        name: 'Action taken',
        data: range.map((dat) => {
          const matchingData = feedbackChart.findIndex(
            (object) => object.date === dat
          );
          return matchingData >= 0
            ? feedbackChart[matchingData].actionYes
            : null;
        }),
      },
    ],
    options: {
      colors: [
        'rgba(202, 197, 205)',
        'rgba(248, 105, 105)',
        'rgba(52, 211, 153)',
      ],
      chart: {
        type: 'bar',
        height: '100%',
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      // title: {
      //   text: "Distribution of Instances over the Past Week",
      // },
      xaxis: {
        categories: range.map((date) =>
          new Date(date).toLocaleString('default', {
            month: 'short',
            day: 'numeric',
          })
        ),
        title: {
          text: 'Dates',
          style: {
            color: '#000000',
            fontWeight: 400, // Set the text color to white
          },
        },
        labels: {
          style: {
            colors: '#000000', // Set the text color to white
          },
        },
      },
      yaxis: {
        title: {
          text: '% of Instances',
          style: {
            color: '#000000',
            fontWeight: 400, // Set the text color to white
          },
        },
        labels: {
          style: {
            colors: '#000000', // Set the text color to white
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
        markers: {
          width: 12,
          height: 12,
          radius: 10,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '10px',
        },
      },
      responsive: [
        {
          breakpoint: 800,
          options: {
            chart: {
              height: 370,
            },
            legend: {
              show: true,
              position: 'bottom',
              labels: {
                colors: ['#000000'], // Specify the desired text color, such as white (#ffffff)
              },
              fontSize: '6px',
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '6px',
            },
            // background: {
            //   enabled: true,
            //   foreColor: '#fff',
            // },
          },
        },
        {
          brekpoint: 1024,
          options: {
            chart: {
              height: 400,
            },
            legend: {
              show: true,
              position: 'bottom',
              labels: {
                colors: ['#000000'], // Specify the desired text color, such as white (#ffffff)
              },
              fontSize: '6px',
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '6px',
            },
            background: {
              enabled: true,
              foreColor: '#fff',
            },
          },
        },
        {
          breakpoint: 2600,
          options: {
            chart: {
              height: '100%',
            },
            legend: {
              show: true,
              position: 'bottom',
              labels: {
                colors: ['#000000'], // Specify the desired text color, such as white (#ffffff)
              },
              fontSize: '6px',
            },
          },
        },
      ],
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.45,
          },
        },
      },
    },
  };

  //   var chart = new ApexCharts(document.querySelector("#chart"), options);

  const disabledAfterToday = (date) => {
    return date > new Date();
  };

  const session = { start: 0, end: 0 };
  useEffect(() => {
    session.start = new Date();
    return () => {
      session.end = new Date();
      console.log('Session', session);
    };
  }, []);

  return (
    <div
      className="reportdash px-4 mt-5 lg:px-10 xl:px-15"
      style={{
        display: 'flex',
        flexDirection: 'column',
        // paddingLeft: '60px',
        // paddingRight: '60px',
      }}
      onLoad={(fetchRangeData, reqRange)}
    >
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
        className="realtime_tabs my-5"
        style={{
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '0.5px',
          color: '#3E3C42',
          // marginTop: '20px',
          // marginBottom: '20px',
        }}
      >
        <Link
          className="p-2 xs:p-4 text-xs xs: lg:text-base"
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
          className="p-2 xs:p-4 text-xs xs: lg:text-base"
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
      <div
        className="datepicker mt-3 mb-4"
        style={{
          display: 'flex',
          marginLeft: 'auto',
          // marginBottom: '10px',
          flexDirection: 'column',
        }}
      >
        <span
          style={{ fontSize: '12px', lineHeight: '16px', marginLeft: '10px' }}
        >
          Select Date
        </span>
        <DateRangePicker
          placement={window.innerWidth > 640 ? 'bottomEnd' : 'auto'}
          before={<span>Select Date</span>}
          placeholder="Select Date Range"
          character=" - "
          className="custom-date-range-picker"
          disabledDate={disabledAfterToday}
          showOneCalendar={window.innerWidth > 640 ? false : true}
          style={{
            minWidth: '20vw',
            border: '1px solid #AEA9B1',
            borderRadius: '5px',
          }}
          preventOverflow="true"
          size={window.innerWidth > 640 ? 'md' : 'xs'}
          onChange={handleDateRangeSelect}
          value={selectedRange}
          onOk={handleButtonClick}
          cleanable={false}
        />
      </div>
      <div
        className="report_top_box flex flex-col lg:flex-row"
        style={{
          // display: 'flex',
          marginBottom: '20px',
        }}
      >
        <div
          className="pie_and_barcharts
          flex flex-col
          xl:flex-row
          pb-10
          h-auto
          !bg-white
          "
          style={{
            // display: 'flex',
            width: '100%',
            borderRadius: '5px',
            boxShadow:
              '0px 2px 6px 2px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div
            className="piechart p-4 md:p-7 lg:p-8"
            style={{
              flex: '0.5',
              backgroundColor: '#FFFFFF',
              // borderRadius: '5px',
              // marginRight: '7.5px',
              // padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // boxShadow:
              //   '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
              color: '#426078',
              maxHeight: '70vh',
            }}
          >
            <div
              className="text-lg md:text-xl"
              style={{
                // fontSize: '21px',
                // lineHeight: '30px',
                marginRight: 'auto',
                marginBottom: '50px',
              }}
            >
              Plant Kiln Condition Analysis
            </div>
            <ReactApexChart
              options={chartData.options}
              className="w-[100%] sm:w-[70%] justify-center flex"
              series={chartData.series}
              type="pie"
              style={{
                maxHeight: '70vh',
                marginLeft: '16px',
                marginRight: '16px',
              }}
            />
          </div>
          <div
            className="bargraph"
            style={{
              flex: '0.5',
              background: '#ffffff',
              display: 'flex',
              // marginLeft: '7.5px',
              // borderRadius: '5px',
              padding: '30px',
              // boxShadow:
              //   '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
              color: '#426078',
              maxHeight: '70vh',
            }}
          >
            <div
              className="wrapper"
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '300px',
              }}
            >
              <ReactApexChart
                style={{ marginTop: '40px', maxHeight: '100px' }}
                options={stackedBar.options}
                series={stackedBar.series}
                type="bar"
                stacked={true}
                // height={350}
              />
            </div>
          </div>
        </div>
      </div>
      {typeof email !== 'undefined' &&
        email?.split('@')[1].slice(0, 5) === 'ripik' && (
          <div
            className="report_bottom_box flex flex-col lg:flex-row"
            style={{
              // display: 'flex',
              marginBottom: '20px',
            }}
          >
            <div
              className="pie_and_barcharts
          flex flex-col
          xl:flex-row
          pb-10
          h-auto
          !bg-white
          "
              style={{
                // display: 'flex',
                width: '100%',
                borderRadius: '5px',
                boxShadow:
                  '0px 2px 6px 2px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div
                className="bargraph mb-5 lg:mb-3"
                style={{
                  flex: '0.5',
                  background: '#ffffff',
                  display: 'flex',
                  // marginLeft: '7.5px',
                  // borderRadius: '5px',
                  padding: '30px',
                  // boxShadow:
                  //   '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
                  color: '#426078',
                  maxHeight: '70vh',
                  marginLeft: '16px',
                }}
              >
                <div
                  className="wrapper"
                  style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '350px',
                  }}
                >
                  <div
                    className="text-md md:text-xl"
                    style={{
                      // fontSize: '21px',
                      // lineHeight: '30px',
                      marginRight: 'auto',
                      marginBottom: '30px',
                    }}
                  >
                    Action Summary
                  </div>
                  <ReactApexChart
                    style={{ maxHeight: '100px' }}
                    options={feedbackStackedBar.options}
                    series={feedbackStackedBar.series}
                    type="bar"
                    stacked={true}
                    // height={350}
                  />
                </div>
              </div>
              <div
                className="piechart p-4 md:p-7 lg:p-8"
                style={{
                  flex: '0.5',
                  backgroundColor: '#FFFFFF',
                  // borderRadius: '5px',
                  // marginRight: '7.5px',
                  // padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  // boxShadow:
                  //   '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
                  color: '#426078',
                  maxHeight: '70vh',
                }}
              >
                <div
                  className="text-md md:text-xl"
                  style={{
                    // fontSize: '21px',
                    // lineHeight: '30px',
                    marginRight: 'auto',
                    marginBottom: '50px',
                  }}
                >
                  Reasons for no action taken
                </div>
                <ReactApexChart
                  options={feedbackChartData.options}
                  className="w-[100%] sm:w-[70%] justify-center flex"
                  series={feedbackChartData.series}
                  type="pie"
                  style={{
                    maxHeight: '70vh',
                    marginLeft: '16px',
                    // marginRight: '16px',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      <div
        className="impact_tracking mb-5 w-[100%] p-5"
        style={{
          // width: '100%',
          height: '100%',
          background: '#ffffff',
          // marginRight: "7.5px",
          display: 'flex',
          flexDirection: 'column',
          // padding: '15px',
          borderRadius: '5px',
          boxShadow:
            '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div
          className="w-[100%] flex-col px-10 xl:flex-row gap-5 lg:gap-5 lg:h-[100%] justify-start items-center lg:pl-3"
          style={{
            display: 'flex',
            // flexDirection: 'column',
            background: 'rgb(52,211,153, 0.12)',
            borderRadius: '6px',
            // flexBasis: '40%',
            padding: '20px 15px',
            borderWidth: '1px',
          }}
        >
          <div
            className="w-[100%] xl:w-[20%] text-base md:text-2xl lg:text-3xl text-start items-baseline flex justify-center flex-col"
            style={{
              // fontSize: '14px',
              // lineHeight: '20px',
              letterSpacing: '0.1px',
              fontWeight: '500',
              color: '#426078',
            }}
          >
            <p>Impact Tracking</p>
            <p className="text-[#88A6BE] text-sm md:text-base normal-case">
              for{' '}
              {new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0] +
                ' to ' +
                new Date().toISOString().split('T')[0]}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-0 justify-evenly w-[100%] xl:w-[80%] items-baseline">
            <div className="w-[100%] lg:w-[30%] flex flex-row items-center lg:justify-center gap-4 justify-evenly">
              <div className=" labelIndex flex flex-col text-xs justify-start gap-1 lg:gap-3 md:text-base mt-[15px]">
                <span className=" labelspan text-[#88A6BE] text-sm md:text-lg lg:text-lg">
                  Last Week Hot {'%'}:
                </span>
                <span className="labelspan text-[#88A6BE] text-sm md:text-lg lg:text-lg">
                  Historical Hot {'%'}:
                </span>
              </div>
              <div className="labelIndex flex flex-col ml-auto xl:ml-0 text-xs justify-start gap-1 lg:gap-3 md:text-base mt-[15px] items-center">
                <div
                  className="rating_category w-[100%] flex flex-row justify-end"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    // marginLeft: '29px',
                  }}
                >
                  <span className="rating_name text-[#426078] text-base md:text-lg lg:text-lg font-semibold">
                    {hotPercent.toFixed(2)}%
                  </span>
                </div>
                <div
                  className="rating_category  w-[100%] flex flex-row justify-end"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    // marginLeft: '29px',
                  }}
                >
                  <span className="rating_name text-[#426078] text-base md:text-lg lg:text-lg font-semibold">
                    30%
                  </span>
                </div>
              </div>
            </div>
            <div
              className=" lg:w-[30%] w-[100%] text-base md:text-2xl lg:text-3xl text-center justify-evenly items-baseline flex flex-row-reverse lg:flex-col gap-2 lg:gap-3"
              style={{
                // fontSize: '14px',
                // lineHeight: '20px',
                letterSpacing: '0.1px',
                fontWeight: '500',
                color: '#426078',
              }}
            >
              <p className=" ml-auto lg:ml-0 lg:w-[100%] text-base md:text-lg lg:text-3xl font-semibold">
                {(30 - hotPercent).toFixed(2)}%
              </p>
              {/* <br /> */}
              <p className="text-[#88A6BE] w-[70%] lg:w-[100%] font-normal text-start text-sm md:text-lg normal-case lg:text-center">
                Hot percent reduction
              </p>
            </div>
            <div
              className=" lg:w-[30%] w-[100%] text-base md:text-2xl lg:text-3xl text-center justify-between items-baseline flex flex-row-reverse lg:flex-col gap-2 lg:gap-3"
              style={{
                // fontSize: '14px',
                // lineHeight: '20px',
                letterSpacing: '0.1px',
                fontWeight: '500',
                color: '#426078',
              }}
            >
              <p className="lg:w-[100%] ml-auto lg:ml-0 text-base md:text-lg lg:text-3xl font-semibold">
                10%
              </p>
              {/* <br /> */}
              <p className="text-[#88A6BE] w-[70%] text-sm md:text-lg font-normal normal-case lg:w-[100%] text-start lg:text-center">
                Extra fuel consumed in Hot Condition
              </p>
            </div>
            <div className="flex flex-col justify-center mt-2 lg:mt-0 gap-1 lg:w-[30%] mx-auto xl:mx-0">
              <p className="w-[100%] text-center font-semibold text-[#1DBA0F] text-3xl lg:text-4xl">
                {((30 - hotPercent) * 0.1).toFixed(2)} %{' '}
                <span className="text-[#938F96]">
                  <Tooltip
                    hasArrow
                    placement="bottom"
                    label={
                      <div className="!bg-gray-600 text-xs w-[100%] rounded-md">
                        Savings in fuel = 10% * {'('}historical hot - last week
                        hot{')'}
                      </div>
                    }
                    bg="gray.600"
                    borderRadius="lg"
                  >
                    <InfoOutlinedIcon />
                  </Tooltip>
                </span>
              </p>
              <p className="w-[100%] text-center font-semibold text-base md:text-lg lg:text-xl normal-case text-[#605D64]">
                Savings in Fuel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDash;
