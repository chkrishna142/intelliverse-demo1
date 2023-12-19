import { useState } from "react";
import ReactCardFlip from "react-card-flip";

const PredictionCard = ({ data }) => {
  const [flip, setFlip] = useState(false);
  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <div
        className="w-full h-full flex justify-center items-center bg-black rounded relative cursor-pointer"
        onClick={() => setFlip((prev) => !prev)}
      >
        <img
          src={data.img}
          alt="inputImage"
          className="w-full h-auto rounded"
        />
      </div>
      <div
        className="w-full h-full flex justify-center items-center bg-black rounded relative cursor-pointer"
        onClick={() => setFlip((prev) => !prev)}
      >
        {data.hasOwnProperty("resultImage") ? (
          <img
            src="https://assets-global.website-files.com/5d7b77b063a9066d83e1209c/627d124572023b6948b6cdff_60ed9a4e09e2c648f1b8a013_object-detection-cover.png"
            alt="model ouput"
            className="rounded w-full h-auto"
          />
        ) : (
          <div className="flex flex-col gap-2 text-base">
            <p className="text-white">
              Prediction: <span className="font-bold">{data.tag_name}</span>
            </p>
            <p className="text-white">
              Confidence:{" "}
              <span className="text-green-400">
                {Math.round(data.precision * 100)}%
              </span>
            </p>
          </div>
        )}
      </div>
    </ReactCardFlip>
  );
};

export default PredictionCard;
