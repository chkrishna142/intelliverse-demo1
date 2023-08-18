import React, { useState, useEffect } from 'react';
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import ReactApexChart from 'react-apexcharts';
import DoneIcon from '@mui/icons-material/Done';
import { Button, ButtonGroup, Select } from '@chakra-ui/react';
import DownloadIcon from '@mui/icons-material/Download';
import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker, Dropdown } from 'rsuite';
// import "./HeadDash.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL } from '../../index';
import { useSelector } from 'react-redux';
import { get_auth_status } from '../../redux/Auth/auth.selectors';

const HeadDash = (props) => {
  const vals = [2.9, 0.3, 2.3, 6.3, 6.0, 5.3];
  const getColor = (value) => {
    // const hue = (value * 360) / 10; // Calculate hue value
    const hue = Math.floor((1 - value / 10) * 255); // Calculate red value based on the value
    return `rgb(${hue}, 0, 0)`;
  };
  // const chartNum = [28, 12, 90, 15, 33];
  const [pieNum, setPieNum] = useState([]);
  const [pieNumAll, setPieNumAll] = useState([]);
  const [intervalDates, setIntervalDates] = useState([]);
  const [dustyAll, setDustyAll] = useState([]);
  const [hotAll, setHotAll] = useState([]);
  const [healthyAll, setHealthyAll] = useState([]);
  const [dustyBar, setDustyBar] = useState([]);
  const [hotBar, setHotBar] = useState([]);
  const [healthyBar, setHealthyBar] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
  );
  const [route, setRoute] = useState('report');

  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const [selectedRange, setSelectedRange] = useState([
    new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
    new Date().getTime(),
  ]);

  useEffect(() => {
    const end = new Date(endDate);
    const start = new Date(startDate);
    const dateArray = [];
    while (start <= end) {
      dateArray.push(
        new Date(start).toLocaleString('default', {
          month: 'short',
          day: 'numeric',
        })
      );
      start.setDate(start.getDate() + 1);
    }
    setIntervalDates(dateArray);
    console.log('Past One interval', dateArray);
  }, [selectedRange]);
  useEffect(() => {
    console.log(intervalDates);
  }, [intervalDates]);

  const chartData = {
    series: pieNum,
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

  const chartDataAll = {
    series: pieNumAll,
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
  const [status, setStatus] = useState(false);
  const [pos, setPos] = useState(false);
  useEffect(() => {
    console.log(status);
  }, [status]);

  const chartData2 = {
    series: [
      {
        name: 'Dusty Instances',
        // data: [24, 15, 89, 45, 12, 76, 14],
        data: dustyBar,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
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
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: true,
        color: '#000000',
      },
      xaxis: {
        categories: intervalDates.map((date) =>
          new Date(date).toLocaleString('default', {
            month: 'short',
            day: 'numeric',
          })
        ),
        title: {
          text: 'Days',
          style: {
            color: '#000000', // Set the text color to white
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
          text: 'Frequency',
          style: {
            color: '#000000', // Set the text color to white
          },
        },
        labels: {
          style: {
            colors: '#000000', // Set the text color to white
          },
        },
      },
      fill: {
        colors: ['rgba(0, 0, 255, 0.5)'],
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => val,
        },
        theme: 'light',
      },
    },
  };

  const chartData3 = {
    series: [
      {
        name: 'Hot Instances',
        // data: [24, 15, 89, 45, 12, 76, 14],
        data: hotBar,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
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
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: true,
        color: '#000000',
      },
      xaxis: {
        categories: intervalDates,
        title: {
          text: 'Days',
          style: {
            color: '#000000', // Set the text color to white
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
          text: 'Frequency',
          style: {
            color: '#000000', // Set the text color to white
          },
        },
        labels: {
          style: {
            colors: '#000000', // Set the text color to white
          },
        },
      },
      fill: {
        colors: ['rgba(255, 0, 0, 0.5)'],
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => val,
        },
        theme: 'light',
      },
    },
  };

  const stackedBargraph = {
    series: [
      {
        name: 'Dusty',
        data: dustyBar,
      },
      {
        name: 'Healthy',
        data: healthyBar,
      },
      {
        name: 'Hot',
        data: hotBar,
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
        categories: intervalDates,
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
    },
  };
  const stackedBargraphAll = {
    series: [
      {
        name: 'Dusty',
        data: dustyAll,
      },
      {
        name: 'Healthy',
        data: healthyAll,
      },
      {
        name: 'Hot',
        data: hotAll,
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
        categories: intervalDates,
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
    },
  };

  const [selectedValue, setSelectedValue] = useState('Jaffrabad');
  const { access_token } = useSelector(get_auth_status);

  const handleDropdownChange = (eventKey) => {
    setSelectedValue(eventKey.target.value);
    console.log(eventKey, 'Dropdown changed');
  };

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

  const datepickerStyle = { backgroundColor: '#979797' };

  const [intervalData, setIntervalData] = useState([]);
  const [plantPerformance, setPlantPerformance] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  // const [bottomPlants, setBottomPlants] = useState([]);
  const [totalData, setTotalData] = useState([]);

  const handleButtonClick = () => {
    // // Replace startDate and endDate with your desired start and end datetimes
    // const startDate = new Date(filterByDateStart);
    // const endDate = new Date(filterByDateEnd);
    console.log('Huss', startDate, endDate);
    // fetchCombData(startDate, endDate);
  };

  const fetchCombData = async (from, to) => {
    try {
      const response = await axios.get(
        baseURL + `ceo-date/?start=${from}&end=${to}`,
        {
          headers: {
            Authorization: 'Token ' + access_token,
          },
        }
      );
      console.log(response.data);
      const payload = response.data;
      setTotalData(payload);
      console.log(payload, from, to, 'payload');
      let dusty = 0;
      let hot = 0;
      let healthy = 0;
      payload?.forEach((e) => {
        dusty += e.Dusty;
        healthy += e.Healthy;
        hot += e.Hot;
      });
      setIntervalData([dusty, healthy, hot]);
      let interval = [];
      payload?.forEach((e) => {
        // fetchPlantData(from, to, e.plant_name);
        const sum = e.Dusty + e.Healthy + e.Hot;
        let percent = 0;
        let dpercent = 0;
        let hpercent = 0;
        if (sum !== 0) {
          percent = (e.Healthy / sum) * 100;
          dpercent = (e.Dusty / sum) * 100;
          hpercent = (e.Hot / sum) * 100;
        } else {
          percent = 0;
        }
        console.log(percent);
        // setPlantPerformance([
        //   ...plantPerformance,
        //   { plant_name: e.plant_name, percentage: percent },
        // ]);
        interval.push({
          plant_name: e.plant_name,
          percentage: percent,
          hot: hpercent,
          dusty: dpercent,
        });
      });
      // plantPerformance.sort((a, b) => a[1] - b[1]);
      interval.sort((a, b) => a.percentage - b.percentage);
      setPlantPerformance(interval);
      console.log('Inside Console', interval);

      // let topfive = [];
      // let bottomfive = [];
      let leaderboard = [];
      for (let i = 1; i <= interval.length; i++) {
        leaderboard.push(interval[interval.length - i]);
        // topfive.push(interval[interval.length - i]);
        // bottomfive.push(interval[i - 1]);
      }
      // console.log('Top', topfive, 'Bottom', bottomfive);
      console.log('leaderboard', leaderboard);
      setLeaderboard(leaderboard);
      // setBottomPlants(bottomfive);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    if (new Date(endDate).toDateString() === new Date().toDateString()) {
      fetchCombData(startDate, endDate);
      // totalData && setSelectedValue(totalData[0].plant_name.charAt(0).toUpperCase() + totalData[0].plant_name.slice(1));
    }
  }, []);
  useEffect(() => {
    console.log(intervalData);
  }, [intervalData]);
  useEffect(() => {
    console.log('Outside Console', plantPerformance);
  }, [plantPerformance]);
  useEffect(() => {
    console.log(leaderboard);
  }, [leaderboard]);
  useEffect(() => {
    console.log('Total Data', totalData);
  }, [totalData]);

  useEffect(() => {
    fetchCombData(startDate, endDate);
    // setSelectedValue(
    //   totalData[0].plant_name.charAt(0).toUpperCase() +
    //     totalData[0].plant_name.slice(1)
    // );
    // console.log("called");
  }, [selectedRange]);

  useEffect(() => {
    let temp = [...totalData];
    // console.log(selectedRange, startDate, endDate, 'Dates');
    if (totalData.length == 0) {
      fetchCombData(startDate, endDate);
      // setSelectedValue(
      //   totalData[0].plant_name.charAt(0).toUpperCase() +
      //     totalData[0].plant_name.slice(1)
      // );
    } else {
      setTotalData(totalData);
      setPieNumAll(intervalData);
      setDustyAll([]);
      setHotAll([]);
      setHealthyAll([]);
      for (let i = 0; i < intervalDates.length; i++) {
        let dusty = 0;
        let healthy = 0;
        let hot = 0;
        temp?.forEach((e) => {
          dusty += e.dates[i].Dusty;
          healthy += e.dates[i].Healthy;
          hot += e.dates[i].Hot;
        });
        setDustyAll((prevDustyAll) => [...prevDustyAll, dusty]);
        setHotAll((prevHotAll) => [...prevHotAll, hot]);
        setHealthyAll((prevHealthyAll) => [...prevHealthyAll, healthy]);
      }
    }
  }, [totalData, selectedRange]);

  useEffect(() => {
    let temp = [...totalData];
    // if (selectedValue === "All") {
    //   if (totalData.length === 0) {
    //     fetchCombData();
    //   } else {
    //     setTotalData(totalData);
    //     setPieNum(intervalData);
    //     setDustyBar([]);
    //     setHotBar([]);
    //     setHealthyBar([]);
    //     console.log("Temp", temp);
    //     for (let i = 0; i <= 7; i++) {
    //       let dusty = 0;
    //       let hot = 0;
    //       let healthy = 0;
    //       temp.forEach((e) => {
    //         dusty += e.dates[i].Dusty;
    //         hot += e.dates[i].Hot;
    //         healthy += e.dates[i].Healthy;
    //       });
    //       setDustyBar((prevDustyBar) => [...prevDustyBar, dusty]);
    //       setHotBar((prevHotBar) => [...prevHotBar, hot]);
    //       setHealthyBar((prevHealthyBar) => [...prevHealthyBar, healthy]);
    //     }
    //   } else
    if (selectedValue) {
      // temp = temp.filter(
      //   (el) => el.condition.toLowerCase() === selectedValue.toLowerCase()
      // );
      temp = temp.filter((el) => el.plant_name === selectedValue.toLowerCase());
      temp?.reduce((acc, el) => {
        setDustyBar([]);
        setHotBar([]);
        setHealthyBar([]);
        el?.dates?.forEach((e) => {
          setDustyBar((prevDustyBar) => [...prevDustyBar, e.Dusty]);
          setHotBar((prevHotBar) => [...prevHotBar, e.Hot]);
          setHealthyBar((prevHealthyBar) => [...prevHealthyBar, e.Healthy]);
        });
      }, []);
      const dustySum = temp.reduce((sum, el) => sum + el.Dusty, 0);
      const healthySum = temp.reduce((sum, el) => sum + el.Healthy, 0);
      const hotSum = temp.reduce((sum, el) => sum + el.Hot, 0);
      setPieNum([dustySum, healthySum, hotSum]);
    }

    console.log(pieNum);

    console.log(dustyBar, hotBar);
  }, [selectedValue, totalData, selectedRange]);

  useEffect(() => {
    console.log(dustyBar, hotBar, pieNum);
  }, [dustyBar, hotBar, pieNum]);

  const disabledAfterToday = (date) => {
    return date > new Date();
  };

  return (
    <div
      className="headdash bg-[#fafafa] px-4 lg:px-10 pb-0"
      // style={{ paddingBottom: '30px' }}
    >
      <div
        className="head_top"
        style={{
          marginTop: '20px',
        }}
      >
        <div
          className="flex justify-center items-center"
          style={{
            justifyItems: 'center',
            // padding: '20px 40px 0 40px',
          }}
        >
          <span
            className="text-3xl"
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
            CXO View
          </span>
        </div>
        <div
          className="realtime_top"
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
            className="p-2 xs:p-4 text-xs xs: lg:text-base"
            to={`/home`}
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
            to={`/home/report`}
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
      </div>
      <div
        className="head_middle_bottom"
        style={{
          display: 'flex',
          // marginLeft: "15px",
          // marginRight: "15px",
          backgroundColor: 'rgba(255, 255, 255)',
          flexDirection: 'column',
          padding: '16px 20px 25px 20px',
          marginTop: '31px',
          boxShadow:
            '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* <div
          className="combinedcharts_top"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '15px',
          }}
        > */}
        <div
          className="datepicker"
          style={{
            display: 'flex',
            marginLeft: 'auto',
            marginBottom: '16px',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              lineHeight: '16px',
              marginLeft: '0px',
              marginBottom: '8px',
            }}
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
        {/* <Dropdown
            title={
              selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1) ||
              'Select Plant'
            }
            style={{
              marginLeft: '10px',
              zIndex: '100000',
              border: '1px solid #888888',
              borderRadius: '5px',
            }}
            onSelect={handleDropdownChange}
          >
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            {totalData?.map((e, i) => (
              <Dropdown.Item key={i} eventKey={e.plant_name}>
                {e.plant_name}
              </Dropdown.Item> */}

        {/* ))} */}
        {/* <Dropdown.Item eventKey="Plant-1">Plant-1</Dropdown.Item>
            <Dropdown.Item eventKey="Plant-2">Plant-2</Dropdown.Item>
            <Dropdown.Item eventKey="Plant-3">Plant-3</Dropdown.Item>
            <Dropdown.Item eventKey="Plant-4">Plant-4</Dropdown.Item>
            <Dropdown.Item eventKey="Plant-5">Plant-5</Dropdown.Item>
            <Dropdown.Item eventKey="Plant-6">Plant-6</Dropdown.Item>
            <Dropdown.Item eventKey="Plant-7">Plant-7</Dropdown.Item> */}
        {/* </Dropdown> */}
        {/* </div> */}
        <div
          className="pie_and_barcharts
          flex flex-col
          xl:flex-row
          pb-10
          "
          style={{
            // display: 'flex',
            width: '100%',
            borderRadius: '5px',
            boxShadow:
              '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            className="piechart justify-start p-4 md:p-7 lg:p-8"
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
              Overall Kiln Condition Analysis
            </div>
            <ReactApexChart
              className="w-[100%] sm:w-[70%] justify-center flex"
              options={chartDataAll.options}
              series={chartDataAll.series}
              type="pie"
              style={{
                maxHeight: '70vh',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </div>
          <div
            className="bargraph p-4 md:p-7 lg:p-8"
            style={{
              flex: '0.5',
              background: '#ffffff',
              display: 'flex',
              // marginLeft: '7.5px',
              // borderRadius: '5px',
              // padding: '30px',
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
                options={stackedBargraphAll.options}
                series={stackedBargraphAll.series}
                type="bar"
                stacked={true}
                // height={350}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="leaderboard"
        style={{
          display: 'flex',
          // marginLeft: "15px",
          // marginRight: "15px",
          backgroundColor: '#fafafa',
          padding: '25px 20px 25px 20px',
        }}
      >
        <div
          className="leaderboard overflow-x-scroll md:overflow-x-hidden"
          style={{
            flex: '1',
            // background: '#ffffff',
            marginRight: '7.5px',
            padding: '20px 15px 20px 15px',
            borderRadius: '5px',
            boxShadow:
              '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="table" style={{ width: '100%' }}>
            <div
              className="text-lg md:text-xl"
              style={{
                // fontSize: '24px',
                // lineHeight: '36px',
                color: '#426078',
              }}
            >
              Leaderboard
            </div>
            <table
              className="overflow-x-scroll"
              style={{ width: '100%', marginTop: '15px' }}
            >
              <thead style={{ backgroundColor: '#A6C4DC', width: '100%' }}>
                <tr
                  className="overflow-x-scroll text-xs md:text-base"
                  style={{
                    width: '100%',
                    // fontSize: '14px',
                    // lineHeight: '24px',
                    backgroundColor: '#A6C4DC',
                  }}
                >
                  <th style={{ flex: '0.2', padding: '18px 20px' }}>Sno.</th>
                  <th style={{ flex: '0.5', padding: '18px 20px' }}>
                    Plant Name
                  </th>
                  <th style={{ flex: '0.3', padding: '18px 20px' }}>
                    Healthy Kiln Index %
                  </th>
                  <th style={{ flex: '0.3', padding: '18px 20px' }}>
                    Dusty Kiln Index %
                  </th>
                  <th style={{ flex: '0.3', padding: '18px 20px' }}>
                    Hot Kiln Index %
                  </th>
                </tr>
              </thead>
              <tbody style={{ width: '100%' }}>
                {leaderboard?.map((plant, i) => (
                  <tr
                    className="overflow-x-scroll"
                    // key={plant.serialNo}
                    key={i}
                    style={{
                      borderBottom: '1px solid #EBEBEB',
                      width: '100%',
                      fontSize: '14px',
                      lineHeight: '17px',
                    }}
                  >
                    <td
                      style={{
                        flex: '0.1',
                        textAlign: 'center',
                        padding: '18px 20px',
                      }}
                    >
                      {/* {plant.serialNo} */}
                      {i + 1}
                    </td>
                    <td
                      style={{
                        flex: '0.3',
                        textAlign: 'center',
                        padding: '18px 20px',
                      }}
                    >
                      {/* {plant.plantName} */}
                      <Link to={'/' + plant.plant_name}>
                        {plant.plant_name}
                      </Link>
                    </td>
                    <td
                      style={{
                        flex: '0.2',
                        // display: 'flex',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '18px 20px',
                      }}
                    >
                      {/* {console.log(plant)} */}
                      {plant.percentage.toFixed(2)}%
                    </td>
                    <td
                      style={{
                        flex: '0.2',
                        // display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        alignItems: 'center',
                        padding: '18px 20px',
                      }}
                    >
                      {plant.dusty.toFixed(2)}%
                    </td>
                    <td
                      style={{
                        flex: '0.2',
                        // display: 'flex',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '18px 20px',
                      }}
                    >
                      {plant.hot.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* ) : ( */}

          {/* )} */}
        </div>
      </div>
      <div
        className="head_middle_bottom"
        style={{
          display: 'flex',
          // marginLeft: "15px",
          // marginRight: "15px",
          backgroundColor: 'rgba(255, 255, 255)',
          flexDirection: 'column',
          padding: '16px 20px 25px 20px',
          boxShadow:
            '0px 2px 0px 2px rgba(0, 0, 0, 0.15), 0px 1px 1px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div
          className="combinedcharts_top"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '15px',
          }}
        >
          <div style={{ width: '150px', cursor: 'pointer' }}>
            <Select
              //   placeholder="Filter By"
              value={selectedValue}
              onChange={handleDropdownChange}
              style={{ width: '100%', cursor: 'pointer' }}
            >
              {/* {totalData.map((e, i) => {
                return (
                  <option value={e.plant_name} style={{ width: '140px' }}>
                    {e.plant_name.charAt(0).toUpperCase() +
                      e.plant_name.slice(1)}
                  </option>
                );
              })} */}
              <option value="Jaffrabad" style={{ width: '140px' }}>
                Jaffrabad
              </option>
              <option value="Dhar" style={{ width: '140px' }}>
                Dhar
              </option>
              <option value="Reddypalyam" style={{ width: '140px' }}>
                Reddypalyam
              </option>
              <option value="Tadipatri" style={{ width: '140px' }}>
                Tadipatri
              </option>
              <option value="Bela" style={{ width: '140px' }}>
                Bela
              </option>
            </Select>
          </div>
        </div>
        <div
          className="pie_and_barcharts
          flex flex-col
          xl:flex-row
          "
          style={{
            // display: 'flex',
            width: '100%',
            borderRadius: '5px',
            boxShadow:
              '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
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
              className="w-[100%] sm:w-[70%] justify-center flex"
              options={chartData.options}
              series={chartData.series}
              type="pie"
              style={{
                maxHeight: '70vh',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </div>
          <div
            className="bargraph p-4 md:p-7 lg:p-8"
            style={{
              flex: '0.5',
              background: '#ffffff',
              display: 'flex',
              // marginLeft: '7.5px',
              // borderRadius: '5px',
              // padding: '30px',
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
              {/* <div
                className="bar_title"
                style={{ fontSize: '21px', lineHeight: '30px' }}
              >
                Plant Kiln Condition Bar Graph
              </div> */}
              <ReactApexChart
                style={{ marginTop: '30px' }}
                options={stackedBargraph.options}
                series={stackedBargraph.series}
                type="bar"
                stacked={true}
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadDash;
