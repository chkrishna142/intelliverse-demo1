import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
// import CustomCard from '../CustomCard';
import ReactApexChart from 'react-apexcharts';
import './LineChart.css';
// import { mappingData } from "../../util/mappingData";
const LineChart = () => {
  const { blobdata } = useSelector((state) => state.appReducer);
  console.log('blobdata', blobdata[0]);
  const [seriesCategories, setSeriesCategories] = useState({
    series: [
      {
        name: 'Kiln Index Chart',
        data: [...blobdata]?.map((item) => item && item.index).reverse(),
      },
    ],
    categories: [...blobdata]
      ?.map((item) =>
        new Date(
          `${item && item.date}T${item && item.time.split('-').join(':')}`
        ).getTime()
      )
      .reverse(),
  });
  useEffect(() => {
    setSeriesCategories({
      series: [
        {
          name: 'Kiln Index Chart',
          data: [...blobdata]?.map((item) => item && item.index).reverse(),
        },
      ],
      categories: [...blobdata]

        ?.map((item) =>
          new Date(
            `${item && item.date}T${item && item.time.split('-').join(':')}`
          ).getTime()
        )
        .reverse(),
    });
  }, [blobdata]);

  // useEffect(() => {
  // 	console.log("series", seriesCategories);
  // }, [seriesCategories]);

  const [options, setOptions] = useState({
    series: seriesCategories.series,
    chart: {
      height: 350,
      width: 500,
      type: 'line',
      zoom: {
        enabled: true,
      },
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    // title: {
    //   text: "Kiln Index Chart",
    //   align: "left",
    //   style: {
    //     fontFamily: "Poppins, sans-serif",
    //     colors: ["#426078"],
    //     fontSize: "16px",
    //     lineHeight: "24px",
    //     letterSpacing: "0.15px",
    //     fontWeight: "500",
    //   },
    // },
    xaxis: {
      type: 'datetime',
      categories: seriesCategories.categories,
      labels: {
        // return date in the format of "dd-MMM HH:mm"
        formatter: function (value) {
          // console.log("value", value);
          // return new Date(value).toLocaleString("en-US", {   Here date in MM/dd format
          return new Date(value).toLocaleString('en-GB', {
            //Here date in dd/MM format
            day: '2-digit',
            month: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        },
        style: {
          colors: '#000000',
        },
      },
      min: new Date(
        `${blobdata[10] && blobdata[10].date}T${
          blobdata[10] && blobdata[10].time.split('-').join(':')
        }`
      ).getTime(),
      max: new Date(
        `${blobdata[0] && blobdata[0].date}T${
          blobdata[0] && blobdata[0].time.split('-').join(':')
        }`
      ).getTime(),
    },
    yaxis: {
      min: 0,
      max: 10,
      labels: {
        style: {
          colors: '#000000',
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 470,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 450,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      series: seriesCategories.series,
      xaxis: {
        ...prev.xaxis,
        categories: seriesCategories.categories,
        min: new Date(
          `${blobdata[10] && blobdata[10].date}T${
            blobdata[10] && blobdata[10].time?.split('-').join(':')
          }`
        ).getTime(),
        max: new Date(
          `${blobdata[0] && blobdata[0].date}T${
            blobdata[0] && blobdata[0].time?.split('-').join(':')
          }`
        ).getTime(),
      },
    }));
  }, [seriesCategories]);

  // useEffect(() => {
  // 	const d = document.querySelector("#SvgjsSvg3549");
  // 	// console.log("d", d);
  // }, [seriesCategories]);

  return (
    <Box id="linearChart">
      {/* <CustomCard
        style={{
          borderWidth: "0",
        }}
        body={
          <ReactApexChart
            options={{
              ...options,
              // gradient background color
              chart: {
                ...options.chart,
                toolbar: {
                  ...options.chart.toolbar,
                  autoSelected: "pan",
                  tools: {
                    download: false,
                  },
                },
              },
              tooltip: {
                enabled: true,
                // followCursor: true,
                custom: function ({ series, seriesIndex, dataPointIndex }) {
                  const kilnIndexValue = series[seriesIndex][dataPointIndex];
                  return `<div style="padding: 10px; 
                  border-radius:5px; font-size:16px;">
                  <p style="font-weight:600" ><span style="font-weight:bold;" >Kiln Index: </span>${kilnIndexValue}</p>
                  </div>`;
                },
              },
              stroke: {
                curve: "smooth",
                width: 2,
                dashArray: 5, // adjust the dash length as needed
                colors: "#000000", // black color
              },
              markers: {
                size: 3,
              },
              colors: ["#fff"],
              grid: {
                borderColor: "#ffffff",
                borderWidth: 3,
                row: {
                  colors: [
                    "#F86969",
                    "#F86969",
                    "#F86969",
                    "#34D399",
                    "#34D399",
                    "#34D399",
                    "#34D399",
                    // "#0f0",
                    "#FEE179",
                    "#FEE179",
                    "#FEE179",
                    // "#00f",
                  ], // takes an array which will be repeated on columns
                  opacity: 1,
                },
              },
              xaxis: {
                ...options.xaxis,
                type: "datetime",

                labels: {
                  ...options.xaxis.labels,
                  hideOverlappingLabels: false,
                  rotateAlways: false,
                  style: {
                    // array of ten white colors
                    colors: "#000000",
                  },
                },
              },
              yaxis: {
                ...options.yaxis,
                labels: {
                  ...options.yaxis.labels,
                  style: {
                    // array of ten white colors
                    colors: "#000000",
                  },
                },
              },
              // title: {
              //   ...options.title,
              //   style: {
              //     ...options.title.style,
              //     // color: "#000000",
              //   },
              // },
            }}
            width={
              // depending on the screen size the chart width will be set
              window.innerWidth - 130
            }
            height={
              // depending on the screen size the chart height will be set
              window.innerWidth > 600 ? 430 : window.innerWidth - 100
            }
            series={seriesCategories.series}
          />
        }
        // boxShadow="0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.15)"
      /> */}
      <ReactApexChart
        options={{
          ...options,
          // gradient background color
          chart: {
            ...options.chart,
            toolbar: {
              ...options.chart.toolbar,
              autoSelected: 'pan',
              tools: {
                download: false,
              },
            },
          },
          tooltip: {
            enabled: true,
            // followCursor: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
              const kilnIndexValue = series[seriesIndex][dataPointIndex];
              return `<div style="padding: 10px; 
                  border-radius:5px; font-size:16px;">
                  <p style="font-weight:600" ><span style="font-weight:bold;" >Kiln Index: </span>${kilnIndexValue}</p>
                  </div>`;
            },
          },
          stroke: {
            curve: 'smooth',
            width: 2,
            dashArray: 5, // adjust the dash length as needed
            colors: '#000000', // black color
          },
          markers: {
            size: 3,
          },
          colors: ['#fff'],
          grid: {
            borderColor: '#ffffff',
            borderWidth: 3,
            row: {
              colors: [
                '#F86969',
                '#F86969',
                '#34D399',
                '#34D399',
                '#34D399',
                '#34D399',
                '#34D399',
                // "#0f0",
                '#34D399',
                '#FEE179',
                '#FEE179',
                // "#00f",
              ], // takes an array which will be repeated on columns
              opacity: 1,
            },
          },
          xaxis: {
            ...options.xaxis,
            type: 'datetime',

            labels: {
              ...options.xaxis.labels,
              hideOverlappingLabels: false,
              rotateAlways: false,
              style: {
                // array of ten white colors
                colors: '#000000',
              },
            },
          },
          yaxis: {
            ...options.yaxis,
            labels: {
              ...options.yaxis.labels,
              style: {
                // array of ten white colors
                colors: '#000000',
              },
            },
          },
          // title: {
          //   ...options.title,
          //   style: {
          //     ...options.title.style,
          //     // color: "#000000",
          //   },
          // },
        }}
        width={
          // depending on the screen size the chart width will be set
          '100%'
        }
        height={
          // depending on the screen size the chart height will be set
          window.innerWidth > 600 ? 430 : window.innerWidth - 100
        }
        series={seriesCategories.series}
      />
    </Box>
  );
};

export default React.memo(LineChart);

{
  /* <p style="font-weight:600"><span style="font-weight:bold">Recommended Coal Feed Change: </span>${(() => {
                    const recommended_delta_coal_feedrate =
                      kilnIndexValue === 9
                        ? 0.2
                        : kilnIndexValue === 5
                        ? 0
                        : -0.2;
                    return +recommended_delta_coal_feedrate <= 0
                      ? recommended_delta_coal_feedrate
                      : "+" + recommended_delta_coal_feedrate;
                  })()}</p> */
}
