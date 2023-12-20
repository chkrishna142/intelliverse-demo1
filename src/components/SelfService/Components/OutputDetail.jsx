import { useEffect, useState } from "react";
import TextButton from "../../../util/Buttons/TextButton";
import { useWindowSize } from "@uidotdev/usehooks";

const DetailOutputCard = ({ data, label }) => {
  const [imgdata, setImgdata] = useState(data.img);
  const [imageNum, setImageNum] = useState(1);
  const size = useWindowSize();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setImgdata(data.img.slice(0, imageNum));
  }, [data, imageNum]);

  useEffect(() => {
    setImgdata(data.img.slice(idx, idx + imageNum));
  }, [idx, imageNum]);

  useEffect(() => {
    let w = size.width;
    if (w > 2000) setImageNum(7);
    else if (w > 1700) setImageNum(6);
    else if (w > 1300) setImageNum(5);
    else if (w > 1024) setImageNum(4);
    else if (w > 768) setImageNum(3);
    else if (w > 500) setImageNum(2);
    else if(w > 300) setImageNum(1);
  }, [size.width]);

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 pb-3 bg-[#F5F5F5] border border-[#EBEBEB] relative rounded-lg">
      <div className="text-[#3E3C42] text-base font-medium flex gap-[7px] justify-between w-full items-center capitalize">
        <p>
          {label} <span className="text-[#605D64]">{data.img?.length}</span>
        </p>
        <p>
          Precision:{" "}
          <span className="text-green-400">
            {Math.round(data.precision * 100)}%
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <div
          className="grid gap-3 items-center"
          style={{ gridTemplateColumns: `repeat(${imageNum},1fr)` }}
        >
          {imgdata.map((x) => {
            return (
              <img
                src={x.img}
                alt="model image"
                className="h-full w-full rounded"
              />
            );
          })}
        </div>
        {imgdata.length == imageNum && (
          <TextButton
            text={"View all"}
            width={"fit-content"}
            onClick={() => setImgdata(data.img)}
          />
        )}
        {imgdata.length > imageNum && (
          <TextButton
            text={"Hide"}
            width={"fit-content"}
            onClick={() => {
              if (idx == 0) {
                setImgdata(data.img.slice(0, imageNum));
              } else setIdx(0);
            }}
          />
        )}
      </div>
      {data.img.length > imageNum && imgdata.length <= imageNum && (
        <>
          {idx + imageNum <= data.img.length - 1 && (
            <img
              src="/selfServiceIcons/rightArrow.svg"
              alt="next"
              className="cursor-pointer absolute right-0 top-[50%]"
              onClick={() => setIdx((prev) => prev + imageNum)}
            />
          )}
          {idx !== 0 && (
            <img
              src="/selfServiceIcons/rightArrow.svg"
              alt="next"
              className="cursor-pointer absolute left-0 top-[50%] rotate-180"
              onClick={() => setIdx((prev) => prev - imageNum)}
            />
          )}
        </>
      )}
    </div>
  );
};

const OutputDetail = ({ userState, predictionData }) => {
  const bg = ["#FFC107", "#6CA6FC", "#CAC5CD"];
  const [data, setData] = useState([]);

  useEffect(() => {
    setData((prev) => {
      let newData = [];
      newData.push({
        val: Object.values(predictionData).reduce((acc, obj) => {
          return acc + obj.img.length;
        }, 0),
        title: "Model predicted",
      });
      newData.push({
        val: userState?.annotatedData?.length || 0,
        title: "You annotated",
      });
      newData.push({
        val: Object.entries(userState?.uploadedFiles || {}).length,
        title: "Total images",
      });
      return newData;
    });
  }, [userState, predictionData]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col min-[430px]:flex-row gap-5 sm:gap-[80px] min-[430px]:items-center">
        {data.length >= bg.length &&
          bg.map((x, idx) => {
            return (
              <div className="flex gap-2 items-center">
                <div
                  className="w-1 h-[74px] rounded-r"
                  style={{ backgroundColor: x }}
                />
                <div className="flex flex-col gap-[2px] whitespace-nowrap">
                  <p className="text-[#3E3C42] text-[32px] font-medium">
                    {data[idx].val}
                  </p>
                  <p className="text-[#605D64] text-base">{data[idx].title}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex flex-col gap-4">
        {predictionData &&
          Object.keys(predictionData).map((label) => {
            return (
              <DetailOutputCard data={predictionData[label]} label={label} />
            );
          })}
      </div>
    </div>
  );
};

export default OutputDetail;
