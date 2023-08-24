import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const rows = [
  {
    name: "Solution Loss Carbon",
    current: 60,
    optimalRange: "50-80",
    impact: "-",
  },
  {
    name: "Reduction Indirect",
    current: 66,
    optimalRange: "65-70",
    impact: "-",
  },
  {
    name: "Flame Temperature ",
    current: 2290,
    optimalRange: "2280-2375",
    impact: "-",
  },
  {
    name: "etaCO",
    current: 0.47,
    optimalRange: "0.465-0.48",
    impact: "-",
  },
  {
    name: "Reduction Direct",
    current: 34,
    optimalRange: "30-35",
    impact: "-",
  },
];

export default function DashboardTable({
  rowArray,
  alerts,
  tabelname,
  setAlertstate,
}) {
  function isLessRange(currentValue, optimalRange) {
    const [min, max] = optimalRange
      .split("-")
      .map((value) => parseFloat(value));

    return currentValue < min;
  }

  function isHighRange(currentValue, optimalRange) {
    const [min, max] = optimalRange
      .split("-")
      .map((value) => parseFloat(value));

    return currentValue > max;
  }

  function isOutOfRange(currentValue, optimalRange) {
    const [min, max] = optimalRange
      .split("-")
      .map((value) => parseFloat(value));
    if (currentValue < min || currentValue > max) {
    }

    return currentValue < min || currentValue > max;
  }

  console.log(alerts);

  return (
    <div width="100%" className="w-full ">
      <table
        style={{
          borderBottom: "none",

          boxShadow: "none",
          borderBottom: "none",
          boxShadow: "none",
          borderCollapse: "separate",
          borderSpacing: "0 10px",

          width: "100%",
        }}
        size="sm"
      >
        <tr style={{ }}>
          <th className="w-[100px]"></th>
          <th style={{textAlign:"center",width:"80px",  }} className=" ">
            <p className="text-xs md:text-xs lg:text-xs xl:text-[10px]  ">
              Current
            </p>
          </th>
          <th style={{textAlign:"right", width:"100px" }} className=" ">
            <p className="text-[#084298] text-xs md:text-xs lg:text-xs xl:text-[10px]   ">
              Optimal Range
            </p>
          </th>
          <th style={{textAlign:"right", width:"80px" }} className=" ">
            <p className="text-[#084298] text-xs md:text-xs lg:text-xs xl:text-[10px] ">
              Impact &nbsp;{tabelname === "fuelrate" ? "(Kg)" : "(TPD)"}
            </p>
          </th>
        </tr>

        {rowArray.map((row, index) => (
          <>
            <tr
              key={row.name}
              // height={"100px"}
              
            
            >
              <td
               
                style={{
                  border: isOutOfRange(row.current, row.optimalRange)
                    ? "2px solid #E46962"
                    : "none",

                  borderRight: isOutOfRange(row.current, row.optimalRange)
                    ? "none"
                    : "none",
                  borderRight: isOutOfRange(row.current, row.optimalRange)
                    ? "none"
                    : "none",
                  borderRadius: isOutOfRange(row.current, row.optimalRange)
                    ? "10px 0 0 0 "
                    : "",
                  padding:"7px",
                  borderBottom: "none",
                  whiteSpace: "normal", // Allow the text to wrap
                  overflowWrap: "break-word", // Break words if needed
                }}
              >
                <p className="text-[#938F96] w-[82px] text-[13px] font-medium text-xs md:text-xs lg:text-xs xl:text-[10px]">
                  {" "}
                  {row.name}
                </p>
              </td>
              <td
               
                style={{
                  // backgroundColor: "#E46962",
                  // color: "#FAFAFA",
                  border: isOutOfRange(row.current, row.optimalRange)
                    ? "2px solid #E46962"
                    : "none",
                    textAlign:"right",
                  // borderRadius: ' 0 0 10px 10px',
                  borderRight: isOutOfRange(row.current, row.optimalRange)
                    ? "none"
                    : "none",
                  borderLeft: isOutOfRange(row.current, row.optimalRange)
                    ? "none"
                    : "none",
                  borderBottom: "none",
                 
                }}
              >
                <p
                  className={`font-semibold w-[40px] Current text-xs md:text-xs lg:text-xs xl:text-[12px]  ${
                    isOutOfRange(row.current, row.optimalRange)
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {row.current}
                </p>
              </td>
              <td
              
                style={{
                  // backgroundColor: "#E46962",
                  // color: "#FAFAFA",
                  border: isOutOfRange(row.current, row.optimalRange)
                    ? "2px solid #E46962"
                    : "none",
                    textAlign:"right",
                  // borderRadius: ' 0 0 10px 10px',
                  borderRight: isOutOfRange(row.current, row.optimalRange)
                    ? "none"
                    : "none",
                  borderLeft: isOutOfRange(row.current, row.optimalRange)
                    ? "none"
                    : "none",
                  borderBottom: "none",
                  width:"100px"
                }}
              >
                <p className=" text-[#69B04B]  w-[80px] text-xs md:text-xs lg:text-xs xl:text-[12px]">
                  {row.optimalRange}
                </p>{" "}
              </td>
              <td
               
                style={{
                  border: isOutOfRange(row.current, row.optimalRange)
                    ? "2px solid #E46962"
                    : "none",
                    textAlign:"right",

                  borderRight: isOutOfRange(row.current, row.optimalRange)
                    ? "2px solid #E46962"
                    : "none",
                  borderLeft: isOutOfRange(row.current, row.optimalRange)
                    ? "none"
                    : "none",
                  borderRadius: isOutOfRange(row.current, row.optimalRange)
                    ? " 0 10px 0 0 "
                    : "",
                  borderBottom: "none",
                  width:"80px",
                  padding:"7px",
                }}
              >
                 <p
                  className={`font-semibold w-[40px] Current text-xs md:text-xs lg:text-xs xl:text-[12px]  `}
                >
                  {row.impact}
                </p>
                
              </td>
            </tr>

            {isOutOfRange(row.current, row.optimalRange) && (
              <tr style={{ height: "80px", }}>
                <td
                  colSpan={4}
                  style={{
                    backgroundColor: "#E46962",
                    color: "#FAFAFA",
                    padding:"20px",
                    borderRadius: " 0 0 10px 10px",
                  }}
                >
                  Recommendation
                  {isLessRange(row.current, row.optimalRange) && (
                    <p className="text-sm">
                      Increase {row.name} to {row.optimalRange}
                    </p>
                  )}
                  {isHighRange(row.current, row.optimalRange) && (
                    <p>
                      {/* Decrease {row.name} to {row.optimalRange} */}
                      Decrease {row.name} to {row.optimalRange}
                    </p>
                  )}
                </td>
              </tr>
            )}
          </>
        ))}
      </table>
    </div>
  );
}
