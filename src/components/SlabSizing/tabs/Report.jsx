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
import { ThemeProvider, createTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import ReactSearchBox from "react-search-box";
import { EditIcon, SmallCloseIcon, SpinnerIcon } from "@chakra-ui/icons";
import { useWindowSize } from "@uidotdev/usehooks";
// import DownloadExcel from "../utils/DownloadExcel";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import Paginator from "../../../util/VisionUtils/Paginator";
import HistoryCharts from "../components/HistoryCharts";
import Feedback from "../components/Feedback";
import Viewdetails from "../components/Viewdetails";
import DownloadExcel from "../components/DownloadExcel";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
const MuiTheme = createTheme();

const Report = () => {
  const size = useWindowSize();
  const [serverd, setServerd] = useState(true);
  const [order, setOrder] = useState("desc");
  const [displayData, setDisplayData] = useState([]);
  const [historyChanging, setHistoryChanging] = useState(false);
  const [fromTime, setFromTime] = useState(
    new Date(
      new Date().getTime() - 6 * 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10)
  );
  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );
  const [history, setHistory] = useState({
    data: [
      {
        timestamp: 1626231291,

        uId: 1,
        slab_id: "232323",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",

        length: {
          actual: 1200,
          standard: 1000,
        },
        width: {
          actual: 800,
          standard: 1000,
        },
        height: {
          actual: 800,
          standard: 800,
        },
        status: "pass",
        comment:
          "this is operator's comments for 232323 and this is for testing",
        img: "/slabsizing/slabPic.jpg",
      },
      {
        timestamp: 1626231291,

        uId: 1,
        slab_id: "232323",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",

        length: {
          actual: 1200,
          standard: 1000,
        },
        width: {
          actual: 800,
          standard: 1000,
        },
        height: {
          actual: 800,
          standard: 800,
        },
        status: "pass",
        comment:
          "this is operator's comments for 232323 and this is for testing",
        img: "/slabsizing/slabPic.jpg",
      },
      {
        timestamp: 1626231291,

        uId: 1,
        slab_id: "232323",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",

        length: {
          actual: 1200,
          standard: 1000,
        },
        width: {
          actual: 800,
          standard: 1000,
        },
        height: {
          actual: 800,
          standard: 800,
        },
        status: "pass",
        comment:
          "this is operator's comments for 232323 and this is for testing",
        img: "/slabsizing/slabPic.jpg",
      },
      {
        timestamp: 1626231291,

        uId: 1,
        slab_id: "232323",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",

        length: {
          actual: 1200,
          standard: 1000,
        },
        width: {
          actual: 800,
          standard: 1000,
        },
        height: {
          actual: 800,
          standard: 800,
        },
        status: "pass",
        comment:
          "this is operator's comments for 232323 and this is for testing",
        img: "/slabsizing/slabPic.jpg",
      },
      {
        timestamp: 1636231691,

        uId: 1,
        slab_id: "232323",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",

        length: {
          actual: 1200,
          standard: 1000,
        },
        width: {
          actual: 800,
          standard: 1000,
        },
        height: {
          actual: 800,
          standard: 800,
        },
        status: "pass",
        comment:
          "this is operator's comments for 232323 and this is for testing",
        img: "/slabsizing/slabPic.jpg",
      },
      {
        timestamp: 1646231691,

        uId: 1,
        slab_id: "232323",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",

        length: {
          actual: 1200,
          standard: 1000,
        },
        width: {
          actual: 800,
          standard: 1000,
        },
        height: {
          actual: 800,
          standard: 800,
        },
        status: "pass",
        comment:
          "this is operator's comments for 232323 and this is for testing",
        img: "/slabsizing/slabPic.jpg",
      },
      {
        timestamp: 1656231691,

        uId: 1,
        slab_id: "232323",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "A",

        length: {
          actual: 1200,
          standard: 1000,
        },
        width: {
          actual: 800,
          standard: 1000,
        },
        height: {
          actual: 800,
          standard: 800,
        },
        status: "pass",
        comment:
          "this is operator's comments for 232323 and this is for testing",
        img: "/slabsizing/slabPic.jpg",
      },

      {
        timestamp: 1696261693,

        uId: 2,

        slab_id: "223232",
        variance: {
          l: +200,
          b: -200,
          h: 0,
        },
        shift: "B",

        length: {
          actual: 800,
          standard: 600,
        },
        width: {
          actual: 1000,
          standard: 1200,
        },
        height: {
          actual: 800,
          standard: 800,
        },
        status: "fail",
        comment: "",
        img: "/slabsizing/slabPic.jpg",
      },

      {
        timestamp: 1696291993,

        uId: 3,
        slab_id: "123466",
        variance: {
          l: 0,
          b: -400,
          h: +300,
        },
        shift: "C",
        length: {
          actual: 800,
          standard: 800,
        },
        width: {
          actual: 800,
          standard: 1200,
        },
        height: {
          actual: 1100,
          standard: 800,
        },
        status: "pass",
        comment: "this is operator's comments2",
        img: "/slabsizing/slabPic.jpg",
      },
    ],
  });
  const [searchStatus, setSearchstatus] = useState(false);
  const [searchinput, setSearchInput] = useState(0);
  const [filterhistory, setFilterHistory] = useState([]);

  // const apiCall = async () => {
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL_FOR_BF}/history/?client_id=${clientIdbf}&start_date=${fromTime}&end_date=${toTime}`
  //     );
  //     const json = await response.json();
  //     console.log("fetched data of alert===>>>", json);
  //     setHistory((prevhistory) => ({
  //       ...prevhistory,
  //       data: json,
  //     }));
  //     setHistoryChanging(false);
  //     setServerd(true);
  //   } catch (error) {
  //     setHistoryChanging(true);
  //     setServerd(false);

  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handleClick = () => {
    setHistoryChanging(false);
    //   apiCall();
    // handleSortChange("desc");
  };

  useEffect(() => {
    handleClick();
    const sortedData =
      filterhistory.length > 0 ? [...filterhistory] : [...history.data];

    if (order === "desc") {
      sortedData.sort((a, b) => b.timestamp - a.timestamp);
    } else if (order === "asc") {
      sortedData.sort((a, b) => a.timestamp - b.timestamp);
    }

    if (filterhistory.length > 0) {
      setFilterHistory(sortedData);
    } else {
      setHistory((prevHistory) => ({
        ...prevHistory,
        data: sortedData,
      }));
    }
  }, [order]);

  //   search bar

  const historyData = history.data;

  const searchData = historyData.map((item) => {
    return { label: item.slab_id.toString() };
  });
  const uniqueSearchData = Array.from(
    new Set(searchData.map((item) => item.label))
  ).map((label) => {
    return {
      label,
    };
  });

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
      const filteredAlerts = history.data.filter(
        (history) => history.slab_id == selectedValue.label
      );
      setFilterHistory(filteredAlerts);
    } else {
      console.log("removing");
      setFilterHistory([]);
      setOrder("desc");
    }
  };

  console.log("filter", filterhistory);
  console.log("filter", order);

  return (
    <div className="relative flex flex-col">
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
            historyChanging ? (
              <SpinnerIcon />
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
        historyChanging ? (
          <div className="w-full h-full  mt-[200px] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-[160px]  md:mt-6 pt-[57px] bg-white rounded-xl justify-start ">
            <div className="w-full h-250px ">
              <HistoryCharts fromTime={fromTime} toTime={toTime} />
            </div>

            <div className=" relative  w-full h-full">
              {history.hasOwnProperty("data") && (
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
                  <div
                    className={`flex gap-2 ${
                      size.width < 768 ? "flex-col" : ""
                    }`}
                  >
                    <div className="p-1">
                      <Paginator
                        data={
                          filterhistory.length != 0
                            ? filterhistory
                            : history.data
                        }
                        limit={5}
                        setDisplayData={setDisplayData}
                      />
                    </div>
                    <div className="p-1 w-full">
                      <DownloadExcel data={history.data} />
                    </div>
                  </div>
                </div>
              )}

              {filterhistory.length != 0 ? (
                <TableContainer
                  className={` ${
                    size.width < 768 ? "h-[56vh] mb-[50px]" : "h-[45vh]"
                  }  w-[91vw]  `}
                >
                  <Table variant="simple">
                    <Thead className="bg-[#DDEEFF] !text-xs !sticky !top-0">
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
                          style={{ width: "200px", textAlign: "center" }}
                        >
                          <div className="flex flex-col w-[150px] gap-2">
                            <div>TIME</div>
                            <div className="w-full flex justify-center items-center text-[#938F96] text-[16px] h-[25px] ">
                              <select
                                name=""
                                id=""
                                style={{ width: "100%", height: "100%" }}
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                              >
                                <option value="desc" className="text-[#938F96]">
                                  Latest
                                </option>
                                <option value="asc">Oldest</option>
                              </select>
                            </div>
                          </div>
                        </Th>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "200px", textAlign: "center" }}
                          className=""
                        >
                          <div className="flex flex-col gap-3">
                            <div> Length</div>
                            <div className="flex gap-4 w-full justify-between">
                              <p>Act.</p>
                              <p>Std.</p>
                            </div>
                          </div>
                        </Th>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "200px", textAlign: "center" }}
                          className=""
                        >
                          <div className="flex flex-col gap-3">
                            <div> Width</div>

                            <div className="flex gap-4 w-full justify-between">
                              <p>Act.</p>
                              <p>Std.</p>
                            </div>
                          </div>
                        </Th>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "200px", textAlign: "center" }}
                          className=""
                        >
                          <div className="flex flex-col gap-3">
                            <div> Heigth</div>

                            <div className="flex gap-4 w-full justify-between">
                              <p>Act.</p>
                              <p>Std.</p>
                            </div>
                          </div>
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
                          style={{ width: "100px", textAlign: "center" }}
                        >
                          PASS / FAIL
                        </Th>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "100px", textAlign: "center" }}
                        >
                          OPERATOR COMMENT
                        </Th>
                        <Th
                          color="#79767D"
                          fontWeight={400}
                          style={{ width: "200px", textAlign: "center" }}
                        >
                          DETAIL
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {displayData.map((item, index) => {
                        return (
                          <Tr
                            key={index}
                            className="!text-sm !text-[#3E3C42] text-center !font-medium even:bg-[#FAFAFA] odd:bg-white"
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
                            <Td style={{ width: "200px", textAlign: "center" }}>
                              <div className="flex gap-4 justify-between ">
                                <p> {item.length.actual}</p>
                                <p> {item.length.standard}</p>
                              </div>
                            </Td>
                            {/* width */}
                            <Td style={{ width: "200px", textAlign: "center" }}>
                              <div className="flex gap-4 justify-between ">
                                <p> {item.width.actual}</p>
                                <p> {item.width.standard}</p>
                              </div>
                            </Td>
                            {/* height */}
                            <Td style={{ width: "200px", textAlign: "center" }}>
                              <div className="flex gap-4 justify-between ">
                                <p> {item.height.actual}</p>
                                <p> {item.height.standard}</p>
                              </div>
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
                            <Td className=" gap-2  w-[100px]">
                              <div className="w-full text-center uppercase">
                                {item.status}
                              </div>
                            </Td>
                            <Td className=" gap-2  w-[100px]">
                              <div className="flex w-full justify-center cursor-pointer">
                                <Feedback
                                  slab={item.slab_id}
                                  idx={item.id}
                                  comment={item.comment}
                                />
                              </div>
                            </Td>

                            <Td className=" gap-2 justify-between w-[200px]">
                              <Viewdetails
                                slab={item.slab_id}
                                idx={item.id}
                                item={item}
                              />
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                history.data.length != 0 && (
                  <TableContainer
                    className={` ${
                      size.width < 768 ? "h-[56vh] mb-[50px]" : "h-[45vh]"
                    }  w-[91vw]  `}
                  >
                    <Table variant="simple">
                      <Thead className="bg-[#DDEEFF] !text-xs !sticky !top-0">
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
                            style={{ width: "200px", textAlign: "center" }}
                          >
                            <div className="flex flex-col w-[150px] gap-2">
                              <div>TIME</div>
                              <div className="w-full flex justify-center items-center text-[#938F96] text-[16px] h-[25px] ">
                                <select
                                  name=""
                                  id=""
                                  style={{ width: "100%", height: "100%" }}
                                  value={order}
                                  onChange={(e) => setOrder(e.target.value)}
                                >
                                  <option
                                    value="desc"
                                    className="text-[#938F96]"
                                  >
                                    Latest
                                  </option>
                                  <option value="asc">Oldest</option>
                                </select>
                              </div>
                            </div>
                          </Th>
                          <Th
                            color="#79767D"
                            fontWeight={400}
                            style={{ width: "200px", textAlign: "center" }}
                            className=""
                          >
                            <div className="flex flex-col gap-3">
                              <div> Length</div>
                              <div className="flex gap-4 w-full justify-between">
                                <p>Act.</p>
                                <p>Std.</p>
                              </div>
                            </div>
                          </Th>
                          <Th
                            color="#79767D"
                            fontWeight={400}
                            style={{ width: "200px", textAlign: "center" }}
                            className=""
                          >
                            <div className="flex flex-col gap-3">
                              <div> Width</div>

                              <div className="flex gap-4 w-full justify-between">
                                <p>Act.</p>
                                <p>Std.</p>
                              </div>
                            </div>
                          </Th>
                          <Th
                            color="#79767D"
                            fontWeight={400}
                            style={{ width: "200px", textAlign: "center" }}
                            className=""
                          >
                            <div className="flex flex-col gap-3">
                              <div> Heigth</div>

                              <div className="flex gap-4 w-full justify-between">
                                <p>Act.</p>
                                <p>Std.</p>
                              </div>
                            </div>
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
                            style={{ width: "100px", textAlign: "center" }}
                          >
                            PASS / FAIL
                          </Th>
                          <Th
                            color="#79767D"
                            fontWeight={400}
                            style={{ width: "100px", textAlign: "center" }}
                          >
                            OPERATOR COMMENT
                          </Th>
                          <Th
                            color="#79767D"
                            fontWeight={400}
                            style={{ width: "200px", textAlign: "center" }}
                          >
                            DETAIL
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {displayData.map((item, index) => {
                          return (
                            <Tr
                              key={index}
                              className="!text-sm !text-[#3E3C42] text-center !font-medium even:bg-[#FAFAFA] odd:bg-white"
                            >
                              {/* sl */}
                              <Td
                                style={{ width: "50px", textAlign: "center" }}
                              >
                                {String(item["idx"]).padStart(2, "0")}
                              </Td>
                              {/* slab id */}
                              <Td
                                style={{ width: "100px", textAlign: "center" }}
                              >
                                {item.slab_id}
                              </Td>
                              {/* shift */}
                              <Td
                                style={{ width: "100px", textAlign: "center" }}
                              >
                                {item.shift}
                              </Td>
                              {/* timestamp */}
                              <Td
                                style={{ width: "200px", textAlign: "center" }}
                              >
                                {editDates(item.timestamp)}
                              </Td>
                              {/* length */}
                              <Td
                                style={{ width: "200px", textAlign: "center" }}
                              >
                                <div className="flex gap-4 justify-between ">
                                  <p> {item.length.actual}</p>
                                  <p> {item.length.standard}</p>
                                </div>
                              </Td>
                              {/* width */}
                              <Td
                                style={{ width: "200px", textAlign: "center" }}
                              >
                                <div className="flex gap-4 justify-between ">
                                  <p> {item.width.actual}</p>
                                  <p> {item.width.standard}</p>
                                </div>
                              </Td>
                              {/* height */}
                              <Td
                                style={{ width: "200px", textAlign: "center" }}
                              >
                                <div className="flex gap-4 justify-between ">
                                  <p> {item.height.actual}</p>
                                  <p> {item.height.standard}</p>
                                </div>
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
                                    <img
                                      src="/slabsizing/greentick.svg"
                                      alt=""
                                    />
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
                                    <img
                                      src="/slabsizing/greentick.svg"
                                      alt=""
                                    />
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
                                    <img
                                      src="/slabsizing/greentick.svg"
                                      alt=""
                                    />
                                  )}{" "}
                                </div>
                              </Td>
                              <Td className=" gap-2  w-[100px]">
                                <div className="w-full text-center uppercase">
                                  {item.status}
                                </div>
                              </Td>
                              <Td className=" gap-2  w-[100px]">
                                <div className="flex w-full justify-center cursor-pointer gap-2">
                                  <Feedback
                                    slab={item.slab_id}
                                    idx={item.uId}
                                    comment={item.comment}
                                  />
                                </div>
                              </Td>

                              <Td className=" gap-2 justify-between w-[200px]">
                                <Viewdetails
                                  slab={item.slab_id}
                                  idx={item.id}
                                  item={item}
                                />
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
          </div>
        )
      ) : (
        <div className="w-full mt-[70px] ">No Data Found</div>
      )}
    </div>
  );
};

export default Report;
