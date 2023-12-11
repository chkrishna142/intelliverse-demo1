import {
  Checkbox,
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

const AddLabel = ({ x, assign, setLabels, setAssign }) => {
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
      if (assign.includes(x)) {
        setAssign((prev) => {
          let newData = [...prev];
          let idx = newData.findIndex((item) => item == x);
          newData[idx] = labelRef.current.value;
          return newData;
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
    setAssign((prev) => {
      let newData = [...prev];
      let idx = newData.findIndex((item) => item == x);
      newData.splice(idx, 1);
      return newData;
    });
  };

  return (
    <div
      style={{
        backgroundColor: assign.includes(x) ? "#DDEEFF80" : "#FFF",
        borderRadius: "2px",
      }}
      className="flex gap-2 items-center relative pl-[6px] border border-[#EBEBEB]"
    >
      {!editing && (
        <Checkbox
          value={x}
          p={0}
          fontSize={"14px"}
          fontWeight={500}
          color={"#3E3C42"}
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
      {!editing && (
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
