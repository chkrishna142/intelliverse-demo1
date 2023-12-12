import {
  Radio,
  Input,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const AddLabel = ({
  x,
  assign,
  setLabels,
  setAssign,
  setAnnotatedImages,
  setAllImages,
  userData,
  confirm
}) => {
  const [editing, setEditing] = useState(false);
  const labelRef = useRef();

  const handleSave = (e, x) => {
    if (e.code == "Enter") {
      setLabels((prev) => {
        let newData = [...prev];
        let idx = newData.findIndex((item) => item == x);
        newData[idx] = labelRef.current.value;
        return newData;
      });
      setAnnotatedImages((prev) => {
        let newData = [...prev];
        newData.forEach((item) => {
          if (item.label == x) {
            item.label = labelRef.current.value;
          }
        });
        return newData;
      });
      if (assign == x) {
        setAssign((prev) => {
          return labelRef.current.value;
        });
      }
      setEditing(false);
    }
  };

  const handleDelete = (x) => {
    setLabels((prev) => {
      let newData = [...prev];
      let idx = newData.findIndex((item) => item == x);
      newData.splice(idx, 1);
      return newData;
    });
    setAssign("");
    let remove = [];
    setAnnotatedImages((prev) => {
      let newData = [...prev];
      newData.forEach((item, idx) => {
        if (item.label == x) {
          let val = item;
          delete val.label;
          remove.push(val);
        }
      });
      remove.forEach((item) => {
        newData.splice(
          newData.findIndex((val) => val.id == item.id),
          1
        );
      });
      return newData;
    });
    console.log(remove, "add in org array");
    setAllImages((prev) => {
      let newData = [...prev];
      newData = newData.concat([...remove]);
      return newData;
    });
  };

  return (
    <div
      style={{
        backgroundColor: assign == x ? "#DDEEFF80" : "#FFF",
        borderRadius: "2px",
      }}
      className="flex gap-2 items-center relative pl-[6px] border border-[#EBEBEB]"
    >
      {!editing && userData.annotationType == "Classify" && (
        <Radio
          value={x}
          p={0}
          fontSize={"14px"}
          fontWeight={500}
          color={"#3E3C42"}
          _checked={{
            bg: "#6CA6FC",
            borderColor: "#6CA6FC",
          }}
          _hover={{
            borderColor: "#6CA6FC",
          }}
        />
      )}
      {editing ? (
        <InputGroup>
          <Input
            p={0}
            defaultValue={x}
            ref={labelRef}
            border={0}
            width={"fit-content"}
            onKeyDown={(e) => handleSave(e, x)}
          />
          <InputRightElement>
            <img src="/selfServiceIcons/enter.svg" alt="enter" />
          </InputRightElement>
        </InputGroup>
      ) : (
        <p className="w-[190px] h-[40px] flex items-center">{x}</p>
      )}
      {!confirm && !editing && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<img src="/selfServiceIcons/menu.svg" alt="menu" />}
            variant="simple"
            position={"absolute"}
            top={"0px"}
            right={"4px"}
          />
          <MenuList
            px={"12px"}
            py={"16px"}
            rounded={"8px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"16px"}
            minWidth={"fit-content"}
            w={"100px"}
            position={"absolute"}
            right={"-45px"}
            top={"-15px"}
          >
            <MenuItem
              textColor={"#605D64"}
              fontSize={"14px"}
              fontWeight={500}
              p={"8px"}
              _hover={{ bg: "#DDEEFF80", borderRadius: "4px" }}
              _focus={{ bg: "#DDEEFF80", borderRadius: "4px" }}
              onClick={() => setEditing(true)}
            >
              Edit
            </MenuItem>
            <MenuItem
              textColor={"#605D64"}
              fontSize={"14px"}
              fontWeight={500}
              p={"8px"}
              _hover={{ bg: "#DDEEFF80", borderRadius: "4px" }}
              _focus={{ bg: "#DDEEFF80", borderRadius: "4px" }}
              onClick={() => handleDelete(x)}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </div>
  );
};

export default AddLabel;
