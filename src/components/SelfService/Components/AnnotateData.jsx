import TextButton from "../../../util/Buttons/TextButton";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import SecondaryButton from "../../../util/Buttons/SecondaryButton";
import { useEffect, useRef, useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  RadioGroup,
} from "@chakra-ui/react";
import AddLabel from "./AddLabel";
import ImageSelector from "./ImageSelector";
import DetectSegment from "./DetectSegment";

const AnnotateData = ({ userData, setUSerData, setActiveStep, show }) => {
  const [labels, setLabels] = useState([]);
  const [page, setPage] = useState("Unannotated");
  const [selectedImages, setSelectedImages] = useState([]);
  const [annotatedImages, setAnnotatedImages] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [assign, setAssign] = useState("");
  const [add, setAdd] = useState(false);
  const addLabelRef = useRef();

  const handleAdd = (e) => {
    if (e.code == "Enter") {
      setLabels((prev) => {
        let newData = [...prev];
        newData.push(addLabelRef.current.value);
        return newData;
      });
      setAdd(false);
    }
  };

  const handleAssign = () => {
    setAnnotatedImages((prev) => {
      let newData = [...prev];
      selectedImages.forEach((item) => {
        newData.push({
          img: item.img,
          id: item.id,
          label: assign,
        });
      });
      return newData;
    });
    setAllImages((prev) => {
      let newData = [...prev];
      selectedImages.forEach((item) => {
        let idx = newData.findIndex((x) => x.id == item.id);
        newData.splice(idx, 1);
      });
      return newData;
    });
    setAssign("");
    setSelectedImages([]);
    setPage("Annotated");
  };

  const handleSubmit = () => {
    setUSerData((prev) => {
      let newData = { ...prev };
      newData.annotatedData = annotatedImages;
      return newData;
    });
  };

  useEffect(() => {
    if (userData.uploadedFiles != null) {
      setAllImages(
        userData.uploadedFiles.map((file, idx) => {
          return {
            img: file,
            id: idx,
          };
        })
      );
      setAnnotatedImages([]);
      setSelectedImages([]);
      setAssign("");
      setLabels([]);
    }
  }, [userData.uploadedFiles]);

  console.log(annotatedImages,'data')
  return (
    <div
      className={`p-6 flex flex-col gap-6 bg-white transition-all duration-700 ease-in ${
        show ? "opacity-100" : "opacity-0"
      }`}
      id="step3"
    >
      <p className="text-[#3E3C42] text-2xl font-medium">Assign labels</p>
      <div className="flex flex-col lg:flex-row gap-[47px] relative">
        {/* Label selection and additon */}
        <div className="flex flex-col gap-3 whitespace-nowrap">
          <div className="self-start lg:self-end">
            <TextButton
              text={"Add labels"}
              width={"fit-content"}
              disable={add || confirm}
              onClick={() => setAdd(true)}
            />
          </div>
          <RadioGroup onChange={setAssign} value={assign}>
            <div className="flex flex-col gap-3 max-w-[250px]">
              {labels.map((x) => {
                return (
                  <AddLabel
                    x={x}
                    assign={assign}
                    setLabels={setLabels}
                    setAssign={setAssign}
                    setAnnotatedImages={setAnnotatedImages}
                    setAllImages={setAllImages}
                    userData={userData}
                    confirm={confirm}
                  />
                );
              })}
            </div>
            {add && (
              <InputGroup>
                <Input
                  py={"4px"}
                  pl={"6px"}
                  ref={addLabelRef}
                  border={"1px"}
                  borderColor={"#EBEBEB"}
                  borderRadius={"2px"}
                  width={"fit-content"}
                  onKeyDown={handleAdd}
                />
                <InputRightElement>
                  <img src="/selfServiceIcons/enter.svg" alt="enter" />
                </InputRightElement>
              </InputGroup>
            )}
          </RadioGroup>
          {userData.annotationType == "Classify" ? (
            <SecondaryButton
              text={"Assign label"}
              width={"fit-content"}
              disable={assign == ""}
              onClick={handleAssign}
            />
          ) : (
            <SecondaryButton
              text={"Confirm"}
              width={"fit-content"}
              disable={labels.length == 0 || confirm}
              onClick={() => setConfirm(true)}
            />
          )}
        </div>
        {/* Image selection area */}
        {userData.annotationType == "Classify" ? (
          <ImageSelector
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            annotatedImages={annotatedImages}
            setAnnotatedImages={setAnnotatedImages}
            images={allImages}
            setImages={setAllImages}
            page={page}
            setPage={setPage}
          />
        ) : (
          <DetectSegment
            labels={labels}
            setAnnotatedImages={setAnnotatedImages}
            allImages={allImages}
            options={
              userData.annotationType == "Detect"
                ? ["select", "create-box"]
                : ["select", "create-polygon"]
            }
            confirm={confirm}
          />
        )}
      </div>
      <div className="flex gap-2 items-center">
        <PrimaryButton
          text={"Submit"}
          width={"fit-content"}
          disable={annotatedImages.length == 0}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AnnotateData;
