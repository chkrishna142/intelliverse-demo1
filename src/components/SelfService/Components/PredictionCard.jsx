import { useState } from "react";
import ReactCardFlip from "react-card-flip";

const PredictionCard = () => {
  const [flip, setFlip] = useState(false);
  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <div
        className="w-full h-auto flex justify-center items-center bg-black rounded relative cursor-pointer"
        onClick={() => setFlip((prev) => !prev)}
      >
        <img
          src="https://assets-global.website-files.com/5d7b77b063a9066d83e1209c/627d124572023b6948b6cdff_60ed9a4e09e2c648f1b8a013_object-detection-cover.png"
          alt="model ouput"
          className="rounded w-full h-auto"
        />
      </div>
      <div
        className="w-full h-auto flex justify-center items-center bg-black rounded relative cursor-pointer"
        onClick={() => setFlip((prev) => !prev)}
      >
        <img
          src="https://cdn3.vectorstock.com/i/1000x1000/17/92/group-cute-cats-with-dog-vector-29601792.jpg"
          alt="inputImage"
          className="w-full h-auto rounded"
        />
      </div>
    </ReactCardFlip>
  );
};

export default PredictionCard;
