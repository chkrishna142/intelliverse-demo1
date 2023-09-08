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

const rows = [
  {
    name: "Permeability (Darcy)",
    overallRange: [2.2, 3.2],
    optimalRange: [2.59, 2.7],
    currentValue: 2.55,
    impactOnProduction: 6,
  },
  {
    name: "Top differential pressure (bar)",
    overallRange: [0.18, 0.38],
    optimalRange: [0.24, 0.28],
    currentValue: 0.26,
    impactOnProduction: 0,
  },
  {
    name: "Middle differential pressure (bar)",
    overallRange: [2.2, 3.2],
    optimalRange: [2.59, 2.7],
    currentValue: 2.55,
    impactOnProduction: 2,
  },
  {
    name: "Bottom differential pressure (bar)",

    overallRange: [0.8, 1.4],
    optimalRange: [1.2, 1.3],
    currentValue: 1.33,
    impactOnProduction: 4,
  },
];

export default function RangeTable() {
  // const tableBackgroundColor = useColorModeValue("white", "#F4F8FF"); // Light mode and dark mode background colors

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const flexDirection = windowWidth < 1200 ? "flex-col" : "flex-row";

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
                windowWidth < 577 ? "flex-col" : ""
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

        {rows.map((row) => (
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
        ))}
      </table>
    </div>
  );

  //   return (
  //     <TableContainer  >
  //       <Table
  //        __css={{ 'table-layout': 'fixed',
  //                   width: "100%",
  //                   padding: 0,
  //                 //   textAlign: 'center',
  //                 //  fontSize: 'small',
  //              }}
  //       variant='striped' bgColor={tableBackgroundColor}
  //        border={"2px solid green"}
  //         // size="medium"
  //       >
  //         <Thead >
  //           <Tr >
  //             <Th width="100px" sx={{ wordWrap: 'normal', whiteSpace:"normal" , textAlign:"center"}} align="center" fontSize="10px">Parameters</Th>
  //             <Th wordWrap="break-word" fontSize="10px">
  //               Range
  //             </Th>
  //             <Th width="100px" border="3px solid #000" sx={{ wordWrap: 'normal', whiteSpace:"normal" , textAlign:"center"}} wordWrap="break-word" fontSize="10px">
  //               Impact on production
  //             </Th>
  //           </Tr>
  //         </Thead>

  //         <Tbody>
  //           <Tr>
  //             <Td
  //               colSpan={3}
  //               sx={{
  //                 backgroundColor: "#FFFFF",
  //               }}
  //             >
  //               <div
  //                 className={`flex items-start gap-[2%] w-[100%] ${
  //                   windowWidth < 577 ? "flex-col" : ""
  //                 }  `}
  //               >
  //                 <div className="flex gap-[2px] items-center justify-center">
  //                   <div className="flex gap-[2px] ">
  //                     <img src="/darkbluedot.svg" alt="" />
  //                   </div>
  //                   <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
  //                     {" "}
  //                     Overall Range
  //                   </div>
  //                 </div>
  //                 <div className="flex gap-[2px] ">
  //                   <div>
  //                     <img src="/lightgreendot.svg" alt="" />
  //                   </div>
  //                   <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
  //                     Optimal Range
  //                   </div>
  //                 </div>
  //               </div>
  //             </Td>
  //           </Tr>
  //           {rows.map((row) => (
  //             <Tr key={row.name} >
  //               <Td
  //                width="150px"
  //                height="50px"
  //                border="3px solid #000"
  //                sx={{ wordWrap: 'normal', whiteSpace:"normal" }}
  //             //    wordWrap="break-word"
  //                fontSize="12px"

  //               >
  //                 {row.name}
  //               </Td>
  //               <Td width="400px" >
  //                 {/* slider 1 */}
  //                 {/* <RangeSlider overallRange={row.overallRange} optimalRange={row.optimalRange}  currentValue={row.currentValue}/> */}
  //                 <RangeSlider
  //                   overallRange={row.overallRange}
  //                   optimalRange={row.optimalRange}
  //                   currentValue={row.currentValue}
  //                 />
  //               </Td>
  //               <Td width="100px" whiteSpace="normal"fontSize="12px">
  //                 {row.impactOnProduction}
  //               </Td>
  //             </Tr>
  //           ))}
  //         </Tbody>
  //       </Table>
  //     </TableContainer>
  //   );
}
