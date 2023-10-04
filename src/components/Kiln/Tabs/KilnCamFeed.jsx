import LineChart from "../../Charts/KilnCharts/LineChart";
import WaterfallChart from "../../Charts/KilnCharts/WaterfallChart";
import IndexChart from "../../Charts/KilnCharts/IndexChart";
import { useEffect, useState } from "react";

const dummy = {
  _id: {
    timestamp: 1695907709,
    date: "2023-09-28T13:28:29.000+00:00",
  },
  photoName: "5photo_2023-09-28_18-58-26_reddypalyam",
  date: "2023-09-28",
  time: "18-58-26",
  dateTime: "2023-09-28T18:58:26.000+00:00",
  image:
    "https://may20.blob.core.windows.net/reddypalyam-container/5photo_2023-09-28_18-58-26_reddypalyam.png",
  images: [
    "https://may20.blob.core.windows.net/reddypalyam-container/5photo_2023-09-28_18-58-26_reddypalyam.png",
    "https://may20.blob.core.windows.net/reddypalyam-container/4photo_2023-09-28_18-58-17_reddypalyam.png",
    "https://may20.blob.core.windows.net/reddypalyam-container/3photo_2023-09-28_18-58-07_reddypalyam.png",
    "https://may20.blob.core.windows.net/reddypalyam-container/2photo_2023-09-28_18-57-58_reddypalyam.png",
    "https://may20.blob.core.windows.net/reddypalyam-container/1photo_2023-09-28_18-57-48_reddypalyam.png",
  ],
  dusty: 2,
  hot: 1,
  tag: "Healthy",
  cameraId: "reddypalyam1",
  plantName: "reddypalyam",
  id: "68f03dc4-ced9-4610-be57-38a9a8d4a862",
  project: "29bacce1-9aa0-4bf7-a595-d066c3a382c5",
  iteration: "da0fcb3e-bedc-40ae-9961-7cc155dc06ee",
  created: "2023-09-28T13:28:29.545Z",
  predictions: [
    {
      probability: 0.979388142,
      tagId: "05788992-0a81-45f9-ae41-275e56c9f9fd",
      tagName: "Negative",
    },
    {
      probability: 0.020609335062000002,
      tagId: "816f0a58-cf25-4e6e-92e3-ee7e37024f4c",
      tagName: "Dusty",
    },
    {
      probability: 2.55781324596e-6,
      tagId: "04969672-f99e-4282-b25d-af104d8583c8",
      tagName: "Healthy",
    },
    {
      probability: 4.5264940405999996e-11,
      tagId: "041753c1-9b19-4557-8dac-5549362ca62c",
      tagName: "Hot",
    },
  ],
  image_url:
    "https://may20.blob.core.windows.net/reddypalyam-container/5photo_2023-09-28_18-58-26_reddypalyam.png",
};

const colors = {
  dusty: "#fffcf2",
  healthy: "#DDF7EA",
  hot: "#ffecec",
  hot_Dusty: "#FFEDCC",
  negative: "#F4F4F4",
};

const tagColor = {
  dusty: "#fee179",
  healthy: "#59d79a",
  hot: "#ff6460",
  hot_Dusty: "#ef6f12",
  negative: "#000000",
};

const tagName = {
  dusty: "Dusty",
  healthy: "Healthy",
  hot: "Hot",
  hot_Dusty: "Hot & Dusty",
  negative: "Negative",
};

const KilnCamFeed = () => {
  let a = 16,
    b = 18;
  const phase = 1;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col xl:flex-row gap-10 bg-white rounded-xl py-4 px-6">
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex justify-between items-center w-full">
            <p className="self-start text-[#3E3C42] text-xl font-medium">
              Kiln Index Graph
            </p>
            <p className="text-sm text-[#79767D]">
              {new Date(dummy._id.timestamp).toLocaleDateString()}
              &nbsp;&nbsp;&nbsp;
              {new Date(dummy._id.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full h-[80vh] sm:h-[60vh]">
            <div className="w-full h-[60%] bg-black flex justify-center items-center rounded-lg">
              <img
                className="rounded-xl w-auto h-[80%]"
                src={dummy.image_url}
              />
            </div>
            <div className="h-[40%] gap-4 flex flex-col sm:flex-row w-full items-start sm:items-center justify-between">
              <div
                className="py-5 px-5 flex flex-col gap-2 sm:gap-[30px] w-[70vw] sm:w-[45vw] xl:w-[28vw] h-full justify-center rounded"
                // style={{ backgroundColor: colors[dummy.tag.toLowerCase()] }}
              >
                <IndexChart type="Dusty" value={dummy.dusty} />
                <IndexChart type="Hot" value={dummy.hot} />
              </div>
              <div
                className="py-5 px-5 flex flex-row sm:flex-col gap-3 items-center sm:items-start rounded self-center"
                style={{ backgroundColor: colors[dummy.tag.toLowerCase()] }}
              >
                <p className="text-sm text-[#605D64] font-medium">Health:</p>
                <div className="flex gap-3 items-center">
                  <div
                    className="w-[5px] h-[20px]"
                    style={{
                      backgroundColor: tagColor[dummy.tag.toLowerCase()],
                    }}
                  ></div>
                  <p className="text-[#3E3C42] font-medium text-lg">
                    {tagName[dummy.tag.toLowerCase()]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <p className="self-start text-[#3E3C42] text-xl font-medium">
            Kiln Index Graph
          </p>
          <div className="h-[60vh]">
            <LineChart />
          </div>
        </div>
      </div>
      {phase == 2 && (
        <>
          <div className="flex flex-col lg:flex-row bg-white rounded-xl gap-6 py-4 px-6">
            <div className="flex flex-col gap-8 flex-1">
              <p className="self-start text-[#3E3C42] text-xl font-medium">
                Burning Zone Temperature
              </p>
              <div className="h-[40vh]">
                <LineChart />
              </div>
            </div>
            <div className="flex flex-col gap-8 flex-1">
              <p className="self-start text-[#3E3C42] text-xl font-medium">
                C3S Quality
              </p>
              <div className="h-[40vh]">
                <LineChart />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 bg-white rounded-xl py-4 px-6">
            <p className="self-start text-[#3E3C42] text-xl font-medium">
              RCA of Kiln Index
            </p>
            <div className="h-[50vh]">
              <WaterfallChart />
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-xl gap-5 py-4 px-6">
            <div className="flex flex-col gap-2">
              <p className="self-start text-[#3E3C42] text-xl font-medium">
                Recommendation
              </p>
              <div className="flex gap-8">
                <div className="flex gap-2">
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="7" cy="7.26758" r="7" fill="#6CA6FC" />
                  </svg>
                  <p className="text-xs text-[#79767D]">
                    {"Current value (C)"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="7" cy="7.26758" r="7" fill="#16FCD2" />
                  </svg>
                  <p className="text-xs text-[#79767D]">
                    {"Current value (C)"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-4 justify-end">
                <div className="flex flex-col gap-4 w-full h-[56px] text-[#79767D] text-xs">
                  <p>{"(C)"}</p>
                  <p>{"(R)"}</p>
                </div>
              </div>
              <div className="flex gap-8 overflow-x-auto flex-1">
                {arr.map((i) => {
                  return (
                    <div className="flex flex-1 flex-col gap-4 min-w-[95px]">
                      <p className="text-[#605D64] text-base font-medium">
                        SAT
                      </p>
                      <div className="flex flex-col gap-4 w-full text-sm h-[56px]">
                        <div
                          style={{
                            width:
                              a < b ? `${Math.ceil((a / b) * 100)}%` : "100%",
                          }}
                          className="bg-[#6CA6FC] text-white rounded-r-[5px] h-full"
                        >
                          {a}
                        </div>
                        <div
                          style={{
                            width:
                              b < a ? `${Math.ceil((b / a) * 100)}%` : "100%",
                          }}
                          className="bg-[#16FCD2] text-[#3E3E3E] rounded-r-[5px] h-full"
                        >
                          {b}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KilnCamFeed;
