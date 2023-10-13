import * as React from "react";
import BlockCubes from "../../BlastFurnace/BF_home/BlockCubes";
import { useEffect } from "react";
import { useState } from "react";
import {
  BASE_URL_FOR_BF,
  clientIdbf,
} from "../../BlastFurnace/BF_Components/urlforbf";



export default function BurdenDistributionChart({ m_i, m_r1, m_r2 ,fetcheddata,recommendation}) {
 

  const inc=parseInt(m_i.split("P")[1]);

  const red1=parseInt(m_r1.split("P")[1]);
 
  const red2=parseInt(m_r2.split("P")[1]);



  // const rows = [
  //   {
  //     name: "Existing Dist.",
  //     Coke_C: {
  //       Block_B: [5, 5, 10],
  //       Block_C: [10, 10, 10],
  //       Block_D: [10, 10, 5],
  //       Block_E: [5, 0, 0],
  //     },
  //     IBRN_C: {
  //       Block_B: [10, 5, 5],
  //       Block_C: [10, 10, 15],
  //       Block_D: [15, 15, 15],
  //       Block_E: [0, 0, 0],
  //     },
  //   },
  //   {
  //     name: "Rect 1.",
  //     Coke_C: {
  //       Block_B: [5, 5, 10],
  //       Block_C: [10, 10, 10],
  //       Block_D: [10, 10, 5],
  //       Block_E: [5, 0, 0],
  //     },
  //     IBRN_C: {
  //       Block_B: [10, 5, 5],
  //       Block_C: [15, 15, 10],
  //       Block_D: [15, 15, 10],
  //       Block_E: [0, 0, 0],
  //     },
  //   },
  //   {
  //     name: "Rect 2.",
  //     Coke_C: {
  //       Block_B: [10, 5, 5],
  //       Block_C: [10, 10, 10],
  //       Block_D: [10, 10, 5],
  //       Block_E: [5, 0, 0],
  //     },
  //     IBRN_C: {
  //       Block_B: [10, 5, 5],
  //       Block_C: [15, 15, 15],
  //       Block_D: [15, 10, 10],
  //       Block_E: [0, 0, 0],
  //     },
  //   },
  // ];

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL_FOR_BF}/pwi_recommendations/?client_id=${clientIdbf}`
  //     );
  //     const json = await response.json();
  //     // console.log("fetched data ===>>>", json.burden);
  //     setFetcheddata(json.burden);
  //   } catch (error) {
  //     setFetcheddata();
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();

  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 30000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [clientIdbf]);

  if (fetcheddata) {
    return (
      <div className="w-full border-none">
        <table
          style={{
            minWidth: "100%",
            height: "100%",
            border: "none",
          }}
        >
          <tr>
            <th style={{ width: "19%", height: "40px" }}></th>
            <th style={{ width: "19%", height: "40px" }}>
              <div className="flex gap-5 justify-center">
                <p>P4</p>
                <p>P5</p>
                <p>P6</p>
              </div>
            </th>
            <th style={{ width: "19%", height: "40px" }}>
              <div className="flex gap-5 justify-center">
                <p>P7</p>
                <p>P8</p>
                <p>P9</p>
              </div>
            </th>
            <th style={{ width: "19%", height: "40px" }}>
              <div className="flex gap-5 justify-center">
                <p>P10</p>
                <p>P11</p>
                <p>P12</p>
              </div>
            </th>
            <th style={{ width: "19%", height: "40px" }}>
              <div className="flex gap-5 justify-center">
                <p>P13</p>
                <p>P14</p>
                <p>P15</p>
              </div>
            </th>
          </tr>

          {fetcheddata.map((row, id) => (
            <tr key={row.name} style={{ height: "90px" }}>
              <td
                style={{ height: "100%", width: "100%" }}
                class="flex  items-center h-full w-[150px] gap-4 "
              >
                <div
                  class={` flex  h-[80%] w-[60%] items-center ${
                    id !== 0
                      ? "bg-[#DC362E] text-[#FFF]"
                      : "bg-[#EBEBEB] text-[#79767D]"
                  } justify-center text-[14px]  rounded-xl p-2`}
                >
                  {" "}
                  {row.name}
                </div>

                <div class="flex flex-col gap-3">
                  <div class="flex justify-center items-center bg-black text-white  w-[22px] h-[22px] rounded-sm">
                    C
                  </div>
                  <div class=" bg-yellow-500 flex justify-center items-center text-white w-[22px] h-[22px] rounded-sm">
                    M
                  </div>
                </div>
              </td>

              {row.name === "Existing Dist" && (
                <>
                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center ">
                      {row.Coke_C.Block_B.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_C.Block_B.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                  </td>

                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center">
                      {row.Coke_C.Block_C.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_C.Block_C.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                  </td>

                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center">
                      {row.Coke_C.Block_D.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_C.Block_D.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                  </td>

                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center">
                      {row.Coke_C.Block_E.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_C.Block_E.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                  </td>
                </>
              )}

              {row.name === "Rec 1" && (
                <>
                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center ">
                      {row.Coke_R1.Block_B.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_R1.Block_B.map((ele, id) => {
                        
                        const idx1=inc-4;
                        const idx2=red1-4;
                       
                        const val=idx1==idx2?3:(idx1==id?1:(idx2==id?2:3));
                        return <BlockCubes cube={ele} val={val}  recommendation={recommendation}/>;
                      })}
                    </div>
                  </td>

                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center">
                      {row.Coke_R1.Block_C.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_R1.Block_C.map((ele, id) => {
                         const idx1=inc-7;
                         const idx2=red1-7;
                         const val=idx1==idx2?3:(idx1==id?1:(idx2==id?2:3));
                         
                        return <BlockCubes cube={ele} val={val} recommendation={recommendation}/>;
                      })}
                    </div>
                  </td>

                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center">
                      {row.Coke_R1.Block_D.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_R1.Block_D.map((ele,id) => {
                         const idx1=inc-10;
                         const idx2=red1-10;
                         const val=idx1==idx2?3:(idx1==id?1:(idx2==id?2:3));

                        return <BlockCubes cube={ele} val={val} recommendation={recommendation}/>;
                      })}
                    </div>
                  </td>

                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center">
                      {row.Coke_R1.Block_E.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_R1.Block_E.map((ele,id) => {
                         const idx1=inc-13;
                         const idx2=red1-13;
                         const val=idx1==idx2?3:(idx1==id?1:(idx2==id?2:3));

                        return <BlockCubes cube={ele} val={val} recommendation={recommendation} />;
                      })}
                    </div>
                  </td>
                </>
              )}

              {row.name === "Rec 2" && (
                <>
                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center ">
                      {row.Coke_R2.Block_B.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_R2.Block_B.map((ele,id) => {
                        const idx1=inc-4;
                        const idx2=red2-4;
                        const val=idx1==idx2?3:(idx1==id?1:(idx2==id?2:3));

                        return <BlockCubes cube={ele} val={val} recommendation={recommendation}/>;
                      })}
                    </div>
                  </td>

                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center">
                      {row.Coke_R2.Block_C.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_R2.Block_C.map((ele,id) => {
                        const idx1=inc-7;
                        const idx2=red2-7;
                        const val=idx1==idx2?3:(idx1==id?1:(idx2==id?2:3));

                        return <BlockCubes cube={ele} val={val} recommendation={recommendation}/>;
                      })}
                    </div>
                  </td>

                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center">
                      {row.Coke_R2.Block_D.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_R2.Block_D.map((ele,id) => {
                        const idx1=inc-10;
                        const idx2=red2-10;
                        const val=idx1==idx2?3:(idx1==id?1:(idx2==id?2:3));

                        
                        return <BlockCubes cube={ele} val={val} recommendation={recommendation}/>;
                      })}
                    </div>
                  </td>

                  <td align="center" class=" ">
                    <div class="flex gap-2 justify-center">
                      {row.Coke_R2.Block_E.map((ele) => {
                        return <BlockCubes cube={ele} />;
                      })}
                    </div>
                    <div class="flex gap-2 justify-center mt-[10px]">
                      {row.IBRN_R2.Block_E.map((ele,id) => {
                        const idx1=inc-13;
                        const idx2=red2-13;
                        const val=idx1==idx2?3:(idx1==id?1:(idx2==id?2:3));

                        return <BlockCubes cube={ele} val={val} recommendation={recommendation}/>;
                      })}
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </table>
      </div>
    );
  } else {
  }
}

// row.C.Block_B.map((ele)=>{return <BlockCubes cube={ele}/>})}
