import TextButton from "../../../util/Buttons/TextButton";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import SecondaryButton from "../../../util/Buttons/SecondaryButton";
import TonalButton from "../../../util/Buttons/TonalButton";
import { useRef, useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import AddLabel from "./AddLabel";
import ImageSelector from "./ImageSelector";

const AnnotateData = ({ userData, setUSerData, setActiveStep }) => {
  const [labels, setLabels] = useState(["Cat", "Dog", "Goat"]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [assign, setAssign] = useState([]);
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

  return (
    <div className="p-6 flex flex-col gap-6 bg-white">
      <p className="text-[#3E3C42] text-2xl font-medium">Assign labels</p>
      <div className="flex gap-[47px]">
        {/* Label selection and additon */}
        <div className="flex flex-col gap-3">
          <div className="self-end">
            <TextButton
              text={"Add labels"}
              width={"fit-content"}
              disable={add}
              onClick={() => setAdd(true)}
            />
          </div>
          <CheckboxGroup onChange={setAssign} value={assign}>
            <div className="flex flex-col gap-3">
              {labels.map((x) => {
                return (
                  <AddLabel
                    x={x}
                    assign={assign}
                    setLabels={setLabels}
                    setAssign={setAssign}
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
          </CheckboxGroup>
          <SecondaryButton text={"Assign label"} width={"fit-content"} disable={assign.length == 0}/>
        </div>
        {/* Image selection area */}
        <ImageSelector
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
      </div>
    </div>
  );
};

export default AnnotateData;
