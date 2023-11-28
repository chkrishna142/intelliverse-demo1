//6AM to 2PM Shift A
// 2PM to 10PM Shift B
// 10PM to 6AM Shift C
import { Select, Td } from "@chakra-ui/react";

const OperatorSelect = () => {
  const a = ["Alice", "Bob", "Charlie", "David", "Eva"];
  const b = ["Smith", "Johnson", "Williams", "Jones", "Brown"];
  return (
    <Td padding={0} px={2} borderRight={'1px solid #D3D3D3'}>
      <div className="w-full flex gap-2 items-center justify-between">
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
      </div>
    </Td>
  );
};

export default OperatorSelect;
