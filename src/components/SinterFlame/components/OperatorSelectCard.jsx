//6AM to 2PM Shift A
// 2PM to 10PM Shift B
// 10PM to 6AM Shift C
import { Select } from "@chakra-ui/react";

const OperatorSelect = () => {
  const shifts = [
    "Shift A (6AM to 2PM)",
    "Shift B (2PM to 10PM)",
    "Shift C (10PM to 6AM)",
  ];
  const a = ["Alice", "Bob", "Charlie", "David", "Eva"];
  const b = ["Smith", "Johnson", "Williams", "Jones", "Brown"];
  return (
    <div className="px-4 py-3 flex gap-[100px] justify-start items-center bg-[#FFFFED] rounded-t-lg border border-[#EBEBEB]">
      {shifts.map((shift) => {
        return (
          <div className="flex flex-col gap-2">
            <p className="text-[#79767D] text-sm">{shift}</p>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col gap-1">
                <p className="text-[#3E3C42] text-xs">Incharge</p>
                <Select
                  size={"sm"}
                  color={"#3E3C42"}
                  fontWeight={500}
                  fontSize={"14px"}
                >
                  {a.map((val) => {
                    return <option value={val}>{val}</option>;
                  })}
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#3E3C42] text-xs">Operator</p>
                <Select
                  size={"sm"}
                  color={"#3E3C42"}
                  fontWeight={500}
                  fontSize={"14px"}
                >
                  {b.map((val) => {
                    return <option value={val}>{val}</option>;
                  })}
                </Select>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OperatorSelect;
