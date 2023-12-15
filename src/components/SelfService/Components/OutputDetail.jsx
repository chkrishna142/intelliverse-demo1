import { useEffect, useState } from "react";
import TextButton from "../../../util/Buttons/TextButton";

const dummy = [
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
  },
  {
    img: "https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg",
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
                src="https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg"
                alt="model image"
                className="max-w-full max-h-full rounded"
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

const OutputDetail = () => {
  const bg = ["#FFC107", "#6CA6FC", "#CAC5CD"];
  const [data, setData] = useState(dummy);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-[80px] items-center">
        {bg.map((x) => {
          return (
            <div className="flex gap-2 items-center">
              <div
                className="w-1 h-[74px] rounded-r"
                style={{ backgroundColor: x }}
              />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[#3E3C42] text-[32px] font-medium">80</p>
                <p className="text-[#605D64] text-base">Model assigned</p>
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
