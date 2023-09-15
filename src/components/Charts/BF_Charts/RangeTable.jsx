import * as React from "react";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
//   useColorModeValue,
// } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RangeSlider from "./RangeSlider";
import { useWindowSize } from "@uidotdev/usehooks";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#F4F8FF",
//     color: theme.palette.common.black,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     // backgroundColor:  theme.palette.action.hover,
//     backgroundColor: "#F4F8FF",
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const rows = [
//   {
//     name: "Permeability (Darcy)",
//     overallRange: [2.2, 3.2],
//     optimalRange: [2.59, 2.7],
//     currentValue: 2.5,
//     impactOnProduction: 6,
//   },
//   {
//     name: "Top differential pressure (bar)",
//     overallRange: [0.18, 0.38],
//     optimalRange: [0.24, 0.28],
//     currentValue: 0.26,
//     impactOnProduction: 0,
//   },
//   {
//     name: "Middle differential pressure (bar)",
//     overallRange: [2.2, 3.2],
//     optimalRange: [2.59, 2.7],
//     currentValue: 2.55,
//     impactOnProduction: 2,
//   },
//   {
//     name: "Bottom differential pressure (bar)",

//     overallRange: [0.8, 1.4],
//     optimalRange: [1.2, 1.3],
//     currentValue: 1.33,
//     impactOnProduction: 4,
//   },
// ];

export default function RangeTable({fetcheddata}) {

  const size= useWindowSize();


  return (
    <div className="w-full">
      <table>
        <tr>
          <th
            style={{
              fontSize: "13px",
            }}
          >
            Parameters
          </th>
          <th
            style={{
              fontSize: "13px",
            }}
          >
            Range
          </th>
          <th
            style={{
              fontSize: "13px",
            }}
          >
            Impact on production
          </th>
        </tr>
        <tr>
          <td
            colSpan={3}
            sx={{
              backgroundColor: "#FFFFF",
            }}
          >
            <div
              className={`flex items-start gap-[2%] w-[100%] ${
                size.width < 577 ? "flex-col" : ""
              }  `}
            >
              <div className="flex gap-[2px] items-center justify-center">
                <div className="flex gap-[2px] ">
                  <img src="/darkbluedot.svg" alt="" />
                </div>
                <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
                  {" "}
                  Overall Range
                </div>
              </div>
              <div className="flex gap-[2px] ">
                <div>
                  <img src="/lightgreendot.svg" alt="" />
                </div>
                <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                  Optimal Range
                </div>
              </div>
            </div>
          </td>
        </tr>
     
        { 
        // fetcheddata.length>0?(
        fetcheddata.map((row) => (
          <tr key={row.name} style={{ height: "90px" }}>
            <td
              style={{
                width: "150px",

                fontSize: "13px",
              }}
            >
              {row.name}
            </td>
            <td width="400px">
              {/* slider 1 */}
              {/* <RangeSlider overallRange={row.overallRange} optimalRange={row.optimalRange}  currentValue={row.currentValue}/> */}
              <RangeSlider
                overallRange={row.overallRange}
                optimalRange={row.optimalRange}
                currentValue={row.currentValue}
              />
            </td>
            <td style={{
                width: "100px",
                textAlign:"center",
                fontSize: "13px",
              }}>
              {row.impactOnProduction}
            </td>
          </tr>
        ))
        // ):(
        //   <tr>
        //     <td colSpan="3">No data available</td>
        //   </tr>
        // )
        }
      
      </table>
    </div>
  );

            }
