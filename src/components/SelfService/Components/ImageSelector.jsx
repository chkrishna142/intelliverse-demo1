import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";

const ImageSelector = ({ selectedImages, setSelectedImages }) => {
  const [page, setPage] = useState("Unannotated");
  const [annotatedImages, setAnnotatedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const handleChange = (x) => {
    setSelectedImages((prev) => {
      let newData = [...prev];
      let idx = newData.findIndex((item) => item.id == x.id);
      if (idx == -1) {
        newData.push(x);
      } else {
        newData.splice(idx, 1);
      }
      return newData;
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-[#3E3C42] text-sm font-medium">
          Select min 10, Selected: {annotatedImages.length}
        </p>
        <div className="flex gap-2 items-center">
          {["Unannotated", "Annotated"].map((x) => {
            return (
              <div
                className={
                  page === x
                    ? "text-[#605D64] text-xs sm:text-sm bg-[#6CABFC] bg-opacity-20 rounded-full px-4 py-1 border border-[#6CA6FC]"
                    : "text-xs sm:text-sm text-[#605D64] border border-[#EBEBEB] rounded-full px-4 py-1 cursor-pointer"
                }
                onClick={() => setPage(x)}
              >
                {x}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-fit max-h-screen overflow-y-auto grid grid-cols-4 gap-5">
        {[...Array(81)].map((item, idx) => {
          return (
            <div className="w-full h-auto bg-black relative rounded">
              <img
                src="https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg"
                alt="image"
                className="w-full rounded"
              />
              <Checkbox
                p={0}
                _hover={{
                  borderColor: "#FFC107",
                }}
                _checked={{
                  "& .chakra-checkbox__control": {
                    background: "#FFC107",
                    borderColor: "#FFC107",
                  },
                }}
                onChange={() =>
                  handleChange({
                    id: idx,
                    img: "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
                  })
                }
                position={"absolute"}
                top={"8px"}
                left={"8px"}
                shadow={"dark-lg"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSelector;
