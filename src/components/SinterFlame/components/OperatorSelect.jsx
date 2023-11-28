//6AM to 2PM Shift A
// 2PM to 10PM Shift B
// 10PM to 6AM Shift C
import { Select, Td, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

const OperatorSelect = () => {
  const a = ["Alice", "Bob", "Charlie", "David", "Eva"];
  const b = ["Smith", "Johnson", "Williams", "Jones", "Brown"];
  const [editing, setEditing] = useState(false);
  return (
    <>
      <Td padding={0} px={2} borderRight={"1px solid #D3D3D3"}>
        <div className="flex items-center justify-around gap-1">
          {!editing ? (
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="white"
              icon={<EditIcon />}
              color={'#818181'}
              onClick={() => setEditing(true)}
              size={"xs"}
            />
          ) : (
            <>
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="gray"
                icon={<CloseIcon />}
                color={'#818181'}
                onClick={() => setEditing(false)}
                size={"xs"}
              />
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="gray"
                icon={<SaveIcon />}
                color={'#818181'}
                onClick={() => setEditing(false)}
                size={"xs"}
              />
            </>
          )}
        </div>
      </Td>
      {[...Array(3)].map((i) => {
        return (
          <Td padding={0} px={2} borderRight={"1px solid #D3D3D3"}>
            <div className="w-full flex gap-2 items-center justify-between">
              {editing ? (
                <Select
                  size={"sm"}
                  color={"#3E3C42"}
                  fontWeight={500}
                  fontSize={"14px"}
                  border={0}
                >
                  {a.map((val) => {
                    return <option value={val}>{val}</option>;
                  })}
                </Select>
              ) : (
                <p className="w-full self-start">Alice</p>
              )}
              {editing ? (
                <Select
                  size={"sm"}
                  color={"#3E3C42"}
                  fontWeight={500}
                  fontSize={"14px"}
                  border={0}
                >
                  {b.map((val) => {
                    return <option value={val}>{val}</option>;
                  })}
                </Select>
              ) : (
                <p className="w-full self-start">Smith</p>
              )}
            </div>
          </Td>
        );
      })}
    </>
  );
};

export default OperatorSelect;
