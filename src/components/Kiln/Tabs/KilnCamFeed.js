import LineChart from "../../Charts/KilnCharts/LineChart";
import WaterfallChart from "../../Charts/KilnCharts/WaterfallChart";
import IndexChart from "../../Charts/KilnCharts/IndexChart";
import { useEffect, useState } from "react";

const KilnCamFeed = () => {
  let a = 16,
    b = 18;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [value, setValue] = useState(2);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue(Math.ceil(Math.random() * 5));
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col xl:flex-row gap-10 bg-white rounded-xl py-4 px-6">
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex justify-between items-center w-full">
            <p className="self-start text-[#3E3C42] text-xl font-medium">
              Kiln Index Graph
            </p>
            <p className="text-sm text-[#79767D]">
              {new Date().toTimeString()}
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full h-[40vh] min-[1350px]:h-full">
            <div className="w-full h-[60%] bg-black flex justify-center items-center rounded-lg">
              <img
                className="rounded-xl w-auto h-[80%]"
                src="https://media.istockphoto.com/id/1442909982/photo/closeup-of-a-rotary-kiln-for-clinker-production-in-a-cement-plant.jpg?s=612x612&w=0&k=20&c=nLwOPUSNyuYTBHKK5Rqq6-rLWrK0XBo9p7JjRF9kQdk="
              />
            </div>
            <div className="h-[40%] pt-5 pl-4 pr-6 pb-6 gap-4 flex flex-col sm:flex-row rounded bg-[#fffcf2] w-full items-start sm:items-center justify-between">
              <div className="flex flex-col gap-[30px] w-[70vw] sm:w-[45vw] xl:w-[28vw] h-full justify-center">
                <IndexChart type="Dusty" value={value} />
                <IndexChart type="Hot" value={value} />
              </div>
                <div className="flex flex-row sm:flex-col gap-3 items-center sm:items-start">
                  <p className="text-sm text-[#605D64] font-medium">Health:</p>
                  <div className="flex gap-3 items-center">
                    <img src="/KilnIcons/dusty.svg" />
                    <p className="text-[#3E3C42] font-medium text-lg">Dusty</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <p className="self-start text-[#3E3C42] text-xl font-medium">
            Kiln Index Graph
          </p>
          <div className="h-[40vh]">
            <LineChart />
          </div>
        </div>
      </div>
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
              <p className="text-xs text-[#79767D]">{"Current value (C)"}</p>
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
              <p className="text-xs text-[#79767D]">{"Current value (C)"}</p>
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
                  <p className="text-[#605D64] text-base font-medium">SAT</p>
                  <div className="flex flex-col gap-4 w-full text-sm h-[56px]">
                    <div
                      style={{
                        width: a < b ? `${Math.ceil((a / b) * 100)}%` : "100%",
                      }}
                      className="bg-[#6CA6FC] text-white rounded-r-[5px] h-full"
                    >
                      {a}
                    </div>
                    <div
                      style={{
                        width: b < a ? `${Math.ceil((b / a) * 100)}%` : "100%",
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
    </div>
  );
};

export default KilnCamFeed;
