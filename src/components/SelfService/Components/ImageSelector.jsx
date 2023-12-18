import { Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ImageSelector = ({
  selectedImages,
  setSelectedImages,
  annotatedImages,
  setAnnotatedImages,
  images,
  setImages,
  page,
  setPage,
}) => {
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

  const handleRemove = (x) => {
    setAnnotatedImages((prev) => {
      let newData = [...prev];
      let idx = newData.findIndex((item) => item.id == x.id);
      newData.splice(idx, 1);
      return newData;
    });
    setImages((prev) => {
      let newData = [...prev];
      delete x.label;
      newData.push(x);
      return newData;
    });
  };

  const handleClick = (x) => {
    if (!x.hasOwnProperty("label")) handleChange(x);
  };

  useEffect(() => {
    if (page == "Unannotated") setDisplayData(images);
    else setDisplayData(annotatedImages);
  }, [images, annotatedImages, page]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
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
      <div className="w-full h-fit max-h-screen overflow-y-auto grid-cols-1 grid min-[430px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-5">
        {displayData.map((item, idx) => {
          return (
            <div className="w-full h-auto bg-black relative rounded flex items-center justify-center">
              <img
                src={item.img}
                alt="image"
                className="w-full rounded hover:scale-105"
                style={{
                  pointerEvents: item.hasOwnProperty("label")
                    ? "none"
                    : "pointer",
                }}
                onClick={() => handleClick(item)}
              />
              {!item.hasOwnProperty("label") && (
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
                  isChecked={selectedImages.some(
                    (selectedItem) => selectedItem.id === item.id
                  )}
                  onChange={() => handleChange(item)}
                  position={"absolute"}
                  top={"8px"}
                  left={"8px"}
                  shadow={"dark-lg"}
                />
              )}
              {item.hasOwnProperty("label") && (
                <>
                  <p className="flex items-center gap-1 p-1 rounded-full bg-black absolute top-2 right-2 text-white font-medium text-sm bg-opacity-50">
                    {item.label}
                    <img
                      className="cursor-pointer w-5 h-5 hover:scale-110 text-white"
                      alt="delete"
                      src="/selfServiceIcons/cross.svg"
                      onClick={() => handleRemove(item)}
                    />
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSelector;
