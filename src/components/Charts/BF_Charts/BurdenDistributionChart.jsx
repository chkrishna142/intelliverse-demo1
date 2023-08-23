import * as React from "react";
// import {
//     table,
//     Thead,
//     Tbody,
//     Tfoot,
//     Tr,
//     Th,
//     Td,
//     tableCaption,
//     tableContainer,
//   } from "@chakra-ui/react";
import BlockCubes from "../../BlastFurnace/BF_home/BlockCubes";


const rows = [
  {
    name: "Existing Dist.",
    C: {
      Block_B: [5, 5, 10],
      Block_C: [10, 10, 10],
      Block_D: [10, 10, 5],
      Block_E: [0, 0, 0, 0, 0],
    },
    M: {
      Block_B: [5, 5, 10],
      Block_C: [10, 10, 10],
      Block_D: [10, 10, 5],
      Block_E: [0, 0, 0, 0, 0],
    },
  },
  {
    name: "Rect 1.",
    C: {
      Block_B: [5, 5, 10],
      Block_C: [10, 10, 10],
      Block_D: [10, 10, 5],
      Block_E: [0, 0, 0, 0, 0],
    },
    M: {
      Block_B: [5, 5, 10],
      Block_C: [10, 10, 10],
      Block_D: [10, 10, 5],
      Block_E: [0, 0, 0, 0, 0],
    },
  },
  {
    name: "Rect 2.",
    C: {
      Block_B: [5, 5, 10],
      Block_C: [10, 10, 10],
      Block_D: [10, 10, 5],
      Block_E: [0, 0, 0, 0, 0],
    },
    M: {
      Block_B: [5, 5, 10],
      Block_C: [10, 10, 10],
      Block_D: [10, 10, 5],
      Block_E: [0, 0, 0, 0, 0,],
    },
  },
];

export default function BurdenDistributionChart() {
  return (
    <div  className="w-full border-none" >
      <table
      style={{
        minWidth: "100%", height: "100%", border:"none" 
      }}
     
        
      >
        
          <tr>
            <th style={{width:"19%", height:"40px", }}></th>
            <th  style={{width:"19%", height:"40px", }} >
              Block B
            </th>
            <th style={{width:"19%", height:"40px", }} >
              Block c
            </th>
            <th style={{width:"19%", height:"40px", }}>
              Block D
            </th>
            <th style={{width:"19%", height:"40px", }}>
              Block E
            </th>
          </tr>
      
        
          {rows.map((row,id) => (
            <tr
              key={row.name}
              style={{height:"90px",}}
            >
              <td
               style={{ height:"100%", width:"100%",}}
                class="flex  items-center h-full w-[150px] gap-4 "
              >
                <div class={` flex  h-[80%] w-[60%] items-center ${id!==0? "bg-[#DC362E] text-[#FFF]" : "bg-[#EBEBEB] text-[#79767D]"} justify-center text-[14px]  rounded-xl p-2`}>
                  {" "}
                  {row.name}
                </div>

                <div class="flex flex-col gap-3">
                  <div class="flex justify-center items-center bg-black text-white  w-[22px] h-[22px] rounded-sm">
                    C
                  </div>
                  <div class= " bg-yellow-500 flex justify-center items-center text-white w-[22px] h-[22px] rounded-sm">
                    M
                  </div>
                </div>
              </td>
              {/* block b */}
              <td align="center" class=" ">
               
                <div class="flex gap-2 justify-center ">
                  {row.C.Block_B.map((ele)=>{return <BlockCubes cube={ele}/>})}
              
                </div>
                <div class="flex gap-2 justify-center mt-[10px]">
                {row.M.Block_B.map((ele)=>{return <BlockCubes cube={ele}/>})}
                </div>
              </td>
              {/* lock c */}
              <td align="center" class=" ">
               
                <div class="flex gap-2 justify-center">
                  {row.C.Block_C.map((ele)=>{return <BlockCubes cube={ele}/>})}
              
                </div>
                <div class="flex gap-2 justify-center mt-[10px]">
                {row.M.Block_C.map((ele)=>{return <BlockCubes cube={ele}/>})}
                </div>
              </td>
              {/* lock d */}
              <td align="center" class=" ">
               
                <div class="flex gap-2 justify-center">
                  {row.C.Block_D.map((ele)=>{return <BlockCubes cube={ele}/>})}
              
                </div>
                <div class="flex gap-2 justify-center mt-[10px]">
                {row.M.Block_D.map((ele)=>{return <BlockCubes cube={ele}/>})}
                </div>
              </td>
              {/* lock e */}
              <td align="center" class=" ">
               
                <div class="flex gap-2 justify-center">
                  {row.C.Block_E.map((ele)=>{return <BlockCubes cube={ele}/>})}
              
                </div>
                <div class="flex gap-2 justify-center mt-[10px]">
                {row.M.Block_E.map((ele)=>{return <BlockCubes cube={ele}/>})}
                </div>
              </td>
            </tr>
          ))}
        
      </table>
    </div>
  );
}

// row.C.Block_B.map((ele)=>{return <BlockCubes cube={ele}/>})}
