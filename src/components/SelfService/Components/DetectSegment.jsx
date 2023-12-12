import ReactImageAnnotate from "@starwit/react-image-annotate";
import { useEffect, useState } from "react";
import SecondaryButton from "../../../util/Buttons/SecondaryButton";
import { useToast } from "@chakra-ui/react";

const DetectSegment = ({
  labels,
  setAnnotatedImages,
  allImages,
  options,
  confirm,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [ImageSet, setImageSet] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (allImages && allImages.length > 0) {
      setImageSet((prev) => {
        let newData = allImages.map((item) => {
          return {
            src: URL.createObjectURL(item.img),
            img: item.img,
            id: item.id,
            name: "Image " + item.id,
            regions: [],
          };
        });
        return newData;
      });
    }
  }, [allImages]);

  const handleSave = (r) => {
    setAnnotatedImages((prev) => {
      let newData = [...prev];
      r.images.forEach((item) => {
        if (item.regions.length > 0) {
          let idx = newData.findIndex((x) => x.id == item.id);
          if (idx == -1) {
            newData.push(item);
          } else {
            newData[idx] = item;
          }
        }
      });
      return newData;
    });
  };

  return (
    ImageSet.length > 0 &&
    confirm && (
      <div className="flex w-full h-full relative">
        <div className="flex gap-2 items-center absolute w-full justify-end sm:justify-center -top-5 sm:top-3">
          <SecondaryButton
            text={"prev"}
            width={"fit-content"}
            disable={selectedIdx == 0}
            onClick={() => setSelectedIdx((prev) => prev - 1)}
          />
          <SecondaryButton
            text={"next"}
            width={"fit-content"}
            disable={selectedIdx == allImages.length - 1}
            onClick={() => setSelectedIdx((prev) => prev + 1)}
          />
        </div>
        <ReactImageAnnotate
          labelImages
          regionClsList={labels}
          images={ImageSet}
          selectedImage={ImageSet[selectedIdx].src}
          onExit={(r) => {
            handleSave(r);
          }}
          hideClone={true}
          enabledTools={options}
          hideNext={true}
          hidePrev={true}
          taskDescription="Please annotate the image by giving it a bounding box or polygon then assigning a label"
        />
      </div>
    )
  );
};

export default DetectSegment;
