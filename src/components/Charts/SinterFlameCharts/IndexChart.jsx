import { TriangleDownIcon } from "@chakra-ui/icons";
import { indexWordMap } from "../../SinterFlame/Sinterflame";

const IndexChart = ({ accuracy, value }) => {
  const vals = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col justify-center items-end sm:items-center h-full w-full">
      <div className="flex gap-1 w-full h-[40px] items-end">
        {vals.map((i) => {
          return (
            <div
              className="h-3 w-full rounded-xl relative flex items-center justify-center"
              style={{
                backgroundColor: i <= value ? "#FFA500" : "#F2F2F2",
                // border: `2px solid ${color[type]}`,
              }}
            >
              {i == value && (
                <div className="flex flex-col gap-0 absolute top-[-40px] items-center">
                  <p
                    className="px-2 py-1 text-[#FFA500] font-bold text-sm rounded-md z-0 whitespace-nowrap bg-white"
                    style={{
                      boxShadow:
                        "4px 4px 4px 0px rgba(226, 240, 220, 0.51), -4px -4px 18px 0px rgba(226, 240, 220, 0.38)",
                    }}
                  >
                    {indexWordMap[value]}
                  </p>
                  <TriangleDownIcon
                    style={{
                      color: "#CCCCCC",
                      marginTop: "-5px",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row sm:flex-col md:flex-row items-center gap-1 self-end mt-2">
        <p className="text-xs text-[#938F96]">Model accuracy</p>
        <p className="text-sm text-[#69B04B]">
          {accuracy + "%"}
        </p>
      </div>
    </div>
  );
};

export default IndexChart;
