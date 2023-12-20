import {
  Select,
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
  Flex,
  Image,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
//   import ReactSearchBox from "react-search-box";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useWindowSize } from "@uidotdev/usehooks";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import Paginator from "../../../util/VisionUtils/Paginator";
import { ThemeProvider, createTheme } from "@mui/material";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
const MuiTheme = createTheme();

const Alert = () => {
  const size = useWindowSize();
  const [serverd, setServerd] = useState(true);
  const [alerts, setAlerts] = useState({
    data: [
      {
        timestamp: 1696231691,

        slab_id: "232323",
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: 123,
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: "232323",
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: 123,
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: "232323",
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: 123,
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: "232323",
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: 123,
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: "232323",
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: 123,
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: "232323",
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: 123,
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: "232323",
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: 123,
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: "232323",
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: 123,
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: "232323",
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: 123,
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: "232323",
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: 123,
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: "232323",
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
      {
        timestamp: 1696231691,

        slab_id: 123,
        id: "6111",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",
        comments:
          "There was a variance of 2% and the edges had a curve of radius 2 mm",
        img: "/images/slabPic.jpg",
      },
    ],
  });
  const [filetAlers, setFiletAlerts] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [alertsChanging, setAlertsChanging] = useState(false);
  //   const [selectedValue, setSelectedValue] = useState(null);

  const alertsData = alerts.data;
  const searchData = alertsData.map((item) => {
    return { label: item.slab_id.toString() };
  });
  const uniqueSearchData = Array.from(
    new Set(searchData.map((item) => item.label))
  ).map((label) => {
    return {
      label,
    };
  });
  const [fromTime, setFromTime] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );
  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );
  // const apiCall = async () => {
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL_FOR_BF}/alerts/?client_id=${clientIdbf}&start_date=${fromTime}&end_date=${toTime}`
  //     );
  //     const json = await response.json();
  //     console.log("fetched data of alert===>>>", json);
  //     setAlerts((prevAlerts) => ({
  //       ...prevAlerts,
  //       data: json,
  //     }));
  //     setAlertsChanging(false);
  //     setServerd(true);
  //   } catch (error) {
  //     setAlertsChanging(true);
  //     setServerd(false);

  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handleClick = () => {
    setAlertsChanging(false);
    //   apiCall();
  };

  useEffect(() => {
    handleClick();
  }, []);

  //   search bar

  const editDates = (TimeStamp) => {
    const timestamp = TimeStamp * 1000; // Multiply by 1000 to convert from seconds to milliseconds
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  const handleAutocompleteChange = (event, selectedValue) => {
    if (selectedValue && selectedValue.label) {
      const filteredAlerts = alerts.data.filter(
        (alert) => alert.slab_id == selectedValue.label
      );
      setFiletAlerts(filteredAlerts);
    } else {
      setFiletAlerts([]);
    }
  };

  return (
    <div className="relative flex flex-col p-1">
      <div className={`absolute left-0 right-0 flex justify-center z-50 `}>
        <div className="p-5 pl-6 pr-6 gap-6 flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md">
          <div>
            <FloatingInput
              text="From"
              type="date"
              setDateTime={setFromTime}
              value={fromTime}
            />
          </div>
          <div>
            <FloatingInput
              text="To"
              type="date"
              setDateTime={setToTime}
              value={toTime}
            />
          </div>

          {serverd ? (
            alertsChanging ? (
              <Spinner />
            ) : (
              <PrimaryButton
                text={"Apply"}
                width={"fit-content"}
                onClick={handleClick}
              />
            )
          ) : (
            <PrimaryButton
              text={"Apply"}
              width={"fit-content"}
              onClick={handleClick}
            />
          )}
        </div>
      </div>
      {serverd ? (
        alertsChanging ? (
          <div className="w-full h-full  mt-[200px] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-[160px] md:mt-8 pt-[57px] bg-white rounded-xl justify-start  ">
            {alerts.hasOwnProperty("data") && (
              <div className="w-full flex justify-between">
                <ThemeProvider theme={MuiTheme}>
                  <Autocomplete
                    disablePortal
                    //   value={selectedValue}
                    id="combo-box-demo"
                    options={uniqueSearchData}
                    onChange={handleAutocompleteChange}
                    sx={{
                      width: "200px",
                      "& .MuiInputBase-root": {
                        height: "40px", // Adjust the height here
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Slab ID"
                        sx={{
                          width: "100%",
                          height: "100%",

                          "& .MuiInputLabel-root": {
                            transform: "translate(14px, 10px) scale(1)", // Adjust the label position
                            fontSize: "14px", // Adjust the label font size
                          },
                          "& .MuiInputLabel-shrink": {
                            transform: "translate(14px, -6px) scale(0.75)", // Adjust the shrunk label position
                          },
                        }}
                      />
                    )}
                  />
                </ThemeProvider>

                <Paginator
                  data={filetAlers.length != 0 ? filetAlers : alerts.data}
                  limit={5}
                  setDisplayData={setDisplayData}
                />
              </div>
            )}

            {filetAlers.length != 0 ? (
              <TableContainer
                className={` ${
                  size.width < 768 ? "h-[50vh] mb-[50px]" : "h-[44vh]"
                }  w-[91vw]  `}
              >
                <Table variant="simple">
                  <Thead className="bg-[#DDEEFF] !text-xs !h-[30px] !sticky !top-0">
                    <Tr>
                      <Th
                        color="#79767D"
                        fontWeight={400}
                        style={{ width: "50px", textAlign: "center" }}
                      >
                        SR. NO.
                      </Th>
                      <Th
                        color="#79767D"
                        fontWeight={400}
                        style={{ width: "100px", textAlign: "center" }}
                      >
                        SLAB ID
                      </Th>
                      <Th
                        color="#79767D"
                        fontWeight={400}
                        style={{ width: "200px", textAlign: "center" }}
                      >
                        SHIFT
                      </Th>
                      <Th
                        color="#79767D"
                        fontWeight={400}
                        style={{ width: "100px", textAlign: "center" }}
                      >
                        TIME
                      </Th>
                      <Th
                        color="#79767D"
                        fontWeight={400}
                        style={{ width: "300px", textAlign: "center" }}
                      >
                        VARIANCE
                      </Th>
                      <Th
                        color="#79767D"
                        fontWeight={400}
                        style={{ width: "400px", textAlign: "center" }}
                      >
                        COMMENT
                      </Th>
                      <Th
                        color="#79767D"
                        fontWeight={400}
                        style={{ width: "200px", textAlign: "center" }}
                      >
                        DETAIL
                      </Th>

                      {/* <Th color="#79767D" fontWeight={400}>
                     {"hello "}
                   </Th> */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {displayData.map((item, index) => {
                      return (
                        <Tr
                          key={index}
                          className="!text-sm !text-[#3E3C42] text-center !h-[30px] !font-medium even:bg-[#FAFAFA] odd:bg-white"
                        >
                          {/* sl */}
                          <Td style={{ width: "50px", textAlign: "center" }}>
                            {String(item["idx"]).padStart(2, "0")}
                          </Td>
                          {/* slab id */}
                          <Td style={{ width: "100px", textAlign: "center" }}>
                            {item.slab_id}
                          </Td>
                          {/* shift */}
                          <Td style={{ width: "100px", textAlign: "center" }}>
                            {item.shift}
                          </Td>
                          {/* timestamp */}
                          <Td style={{ width: "200px", textAlign: "center" }}>
                            {editDates(item.timestamp)}
                          </Td>
                          {/* variance */}
                          <Td className="flex gap-2 p-2  w-full !justify-between ">
                            {/* length */}
                            <div className="w-[80px] flex gap-1">
                              <p>L :</p>{" "}
                              {item.variance.l != 0 ? (
                                <p className="text-[#E46962]">
                                  {item.variance.l + "mm"}
                                </p>
                              ) : (
                                <img src="/slabsizing/greentick.svg" alt="" />
                              )}{" "}
                            </div>
                            {/* breadth */}
                            <div className="w-[80px] flex gap-1">
                              <p>B :</p>{" "}
                              {item.variance.b != 0 ? (
                                <p className="text-[#E46962]">
                                  {item.variance.b + "mm"}
                                </p>
                              ) : (
                                <img src="/slabsizing/greentick.svg" alt="" />
                              )}{" "}
                            </div>
                            {/* height */}
                            <div className="w-[80px] flex gap-1">
                              <p>H :</p>{" "}
                              {item.variance.h != 0 ? (
                                <p className="text-[#E46962]">
                                  {item.variance.h + "mm"}
                                </p>
                              ) : (
                                <img src="/slabsizing/greentick.svg" alt="" />
                              )}{" "}
                            </div>
                          </Td>
                          <Td className=" gap-2  w-[400px]">
                            <Tooltip label={item.comments} placement="top">
                              <p className=" ">
                                {item.comments.split(" ").length > 10
                                  ? item.comments
                                      .split(" ")
                                      .slice(0, 10)
                                      .join(" ") + "..."
                                  : item.comments}
                              </p>
                            </Tooltip>
                          </Td>

                          <Td className=" gap-2 justify-between w-[200px]">
                            {/* <Viewdetails
                             slab={item.slab_id}
                             idx={item.id}
                             item={item}
                           /> */}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              alerts.data.length != 0 && (
                <TableContainer
                  className={` ${
                    size.width < 768 ? "h-[50vh] mb-[50px]" : "h-[44vh]"
                  }  w-[91vw] `}
                >
                  <Table variant="simple">
                    <Thead className="bg-[#DDEEFF] !text-xs !h-[30px] !sticky !top-0">
                      <Tr>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "50px", textAlign: "center" }}
                        >
                          SR. NO.
                        </Th>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "100px", textAlign: "center" }}
                        >
                          SLAB ID
                        </Th>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "200px", textAlign: "center" }}
                        >
                          SHIFT
                        </Th>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "100px", textAlign: "center" }}
                        >
                          TIME
                        </Th>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "300px", textAlign: "center" }}
                        >
                          VARIANCE
                        </Th>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "400px", textAlign: "center" }}
                        >
                          COMMENT
                        </Th>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "200px", textAlign: "center" }}
                        >
                          DETAIL
                        </Th>

                        {/* <Th color="#79767D" fontWeight={400}>
                        {"hello "}
                      </Th> */}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {displayData.map((item, index) => {
                        return (
                          <Tr
                            key={index}
                            className="!text-sm !text-[#3E3C42] !h-[30px]  text-center !font-medium even:bg-[#FAFAFA] odd:bg-white"
                          >
                            {/* sl */}
                            <Td style={{ width: "50px", textAlign: "center" }}>
                              {String(item["idx"]).padStart(2, "0")}
                            </Td>
                            {/* slab id */}
                            <Td style={{ width: "100px", textAlign: "center" }}>
                              {item.slab_id}
                            </Td>
                            {/* shift */}
                            <Td style={{ width: "100px", textAlign: "center" }}>
                              {item.shift}
                            </Td>
                            {/* timestamp */}
                            <Td style={{ width: "200px", textAlign: "center" }}>
                              {editDates(item.timestamp)}
                            </Td>
                            {/* variance */}
                            <Td className="flex gap-2 p-2  w-full !justify-between ">
                              {/* length */}
                              <div className="w-[80px] flex gap-1">
                                <p>L :</p>{" "}
                                {item.variance.l != 0 ? (
                                  <p className="text-[#E46962]">
                                    {item.variance.l + "mm"}
                                  </p>
                                ) : (
                                  <img src="/slabsizing/greentick.svg" alt="" />
                                )}{" "}
                              </div>
                              {/* breadth */}
                              <div className="w-[80px] flex gap-1">
                                <p>B :</p>{" "}
                                {item.variance.b != 0 ? (
                                  <p className="text-[#E46962]">
                                    {item.variance.b + "mm"}
                                  </p>
                                ) : (
                                  <img src="/slabsizing/greentick.svg" alt="" />
                                )}{" "}
                              </div>
                              {/* height */}
                              <div className="w-[80px] flex gap-1">
                                <p>H :</p>{" "}
                                {item.variance.h != 0 ? (
                                  <p className="text-[#E46962]">
                                    {item.variance.h + "mm"}
                                  </p>
                                ) : (
                                  <img src="/slabsizing/greentick.svg" alt="" />
                                )}{" "}
                              </div>
                            </Td>
                            <Td className=" gap-2  w-[400px]">
                              <Tooltip label={item.comments} placement="top">
                                <p className=" ">
                                  {item.comments.split(" ").length > 10
                                    ? item.comments
                                        .split(" ")
                                        .slice(0, 10)
                                        .join(" ") + "..."
                                    : item.comments}
                                </p>
                              </Tooltip>
                            </Td>

                            <Td className=" gap-2 justify-between w-[200px]">
                              {/* <Viewdetails
                                slab={item.slab_id}
                                idx={item.id}
                                item={item}
                              /> */}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              )
            )}
          </div>
        )
      ) : (
        <div className="w-full mt-[70px] ">No Data Found</div>
      )}
    </div>
  );
};

export default Alert;
