import { Td, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import StatusTooltip from "../Components/StatusTooltip";
import { useState } from "react";

const TableCell = ({ data, val, item, index, percentage }) => {
  const [hover, setHover] = useState(false);
  return /^R\d+$/.test(val) && index != data.length - 1 ? (
    <Td
      p={"8px"}
      textAlign={"center"}
      position={"relative"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CircularProgress value={percentage} color="#6CA6FC">
        <CircularProgressLabel color="gray">
          {percentage < 100 ? (
            <div className="flex justify-center items-center">
              <img src="/BlendComplianceIcons/info.svg" alt="no support" />
            </div>
          ) : (
            "+ " + (parseFloat(item[val]) - 100).toFixed(2)
          )}
        </CircularProgressLabel>
      </CircularProgress>
      {percentage < 100 && hover && <StatusTooltip />}
    </Td>
  ) : (
    <Td p={"8px"} textAlign={"center"}>
      {item[val]}
    </Td>
  );
};

export default TableCell;
