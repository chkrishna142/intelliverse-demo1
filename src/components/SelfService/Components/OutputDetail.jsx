import { useEffect, useState } from "react";
import TextButton from "../../../util/Buttons/TextButton";

const dummy = [
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://source.unsplash.com/random/1",
  },
  {
    img: "https://source.unsplash.com/random/2",
  },
  {
    img: "https://source.unsplash.com/random/3",
  },
  {
    img: "https://source.unsplash.com/random/4",
  },
  {
    img: "https://source.unsplash.com/random/5",
  },
  {
    img: "https://source.unsplash.com/random/6",
  },
  {
    img: "https://source.unsplash.com/random/7",
  },
  {
    img: "https://source.unsplash.com/random/8",
  },
  {
    img: "https://source.unsplash.com/random/9",
  },
  {
    img: "https://source.unsplash.com/random/10",
  },
  {
    img: "https://source.unsplash.com/random/11",
  },
  {
    img: "https://source.unsplash.com/random/12",
  },
  {
    img: "https://source.unsplash.com/random/13",
  },
  {
    img: "https://source.unsplash.com/random/14",
  },
  {
    img: "https://source.unsplash.com/random/15",
  },
  {
    img: "https://source.unsplash.com/random/16",
  },
  {
    img: "https://source.unsplash.com/random/17",
  },
  {
    img: "https://source.unsplash.com/random/18",
  },
  {
    img: "https://source.unsplash.com/random/19",
  },
  {
    img: "https://source.unsplash.com/random/20",
  },
  {
    img: "https://source.unsplash.com/random/21",
  },
  {
    img: "https://source.unsplash.com/random/22",
  },
  {
    img: "https://source.unsplash.com/random/23",
  },
  {
    img: "https://source.unsplash.com/random/24",
  },
  {
    img: "https://source.unsplash.com/random/25",
  },
];

const DetailOutputCard = ({ data }) => {
  const [imgdata, setImgdata] = useState(data);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    setImgdata(data.slice(0, 5));
  }, [data]);

  useEffect(() => {
    setImgdata(data.slice(idx, idx + 5));
  }, [idx]);

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 pb-3 bg-[#F5F5F5] border border-[#EBEBEB] relative rounded-lg">
      <p className="text-[#3E3C42] text-base font-medium flex gap-[7px] items-center">
        Hot flame <span className="text-[#605D64]">40</span>
      </p>
      <div className="flex flex-col gap-2 items-end">
        <div className="grid grid-cols-5 gap-3 items-center">
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
        {imgdata.length == 5 && (
          <TextButton
            text={"View all"}
            width={"fit-content"}
            onClick={() => setImgdata(data)}
          />
        )}
        {imgdata.length > 5 && (
          <TextButton
            text={"Hide"}
            width={"fit-content"}
            onClick={() => {
              if (idx == 0) {
                setImgdata(data.slice(0, 5));
              } else setIdx(0);
            }}
          />
        )}
      </div>
      {idx + 5 <= dummy.length - 1 && imgdata.length <= 5 && (
        <img
          src="/selfServiceIcons/rightArrow.svg"
          alt="next"
          className="cursor-pointer absolute right-0 top-[50%]"
          onClick={() => setIdx((prev) => prev + 5)}
        />
      )}
      {idx != 0 && imgdata.length <= 5 && (
        <img
          src="/selfServiceIcons/rightArrow.svg"
          alt="next"
          className="cursor-pointer absolute left-0 top-[50%] rotate-180"
          onClick={() => setIdx((prev) => prev - 5)}
        />
      )}
    </div>
  );
};

const OutputDetail = ({ userState }) => {
  const bg = ["#FFC107", "#6CA6FC", "#CAC5CD"];
  const [data, setData] = useState([]);

  useEffect(() => {
    setData((prev) => {
      let newData = [];
      newData.push({
        val:
          Object.entries(userState?.uploadedFiles || {}).length -
          (userState?.annotatedData?.length || 0),
        title: "Model assigned",
      });
      newData.push({
        val: userState?.annotatedData?.length || 0,
        title: "You assigned",
      });
      newData.push({
        val: Object.entries(userState?.uploadedFiles || {}).length,
        title: "Total assigned",
      });
      return newData;
    });
  }, [userState]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-[80px] items-center">
        {data.length >= bg.length &&
          bg.map((x, idx) => {
            return (
              <div className="flex gap-2 items-center">
                <div
                  className="w-1 h-[74px] rounded-r"
                  style={{ backgroundColor: x }}
                />
                <div className="flex flex-col gap-[2px]">
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
        {[...Array(5)].map((x) => {
          return <DetailOutputCard data={dummy} />;
        })}
      </div>
    </div>
  );
};

export default OutputDetail;
