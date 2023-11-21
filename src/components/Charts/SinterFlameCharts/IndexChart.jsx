import { TriangleDownIcon } from "@chakra-ui/icons";

const indexWordMap = {
  0: "No Flame",
  1: "Poor",
  2: "Average",
  3: "Good",
  4: "Better",
  5: "Excellent",
};

const IndexChart = ({ type, value }) => {
  const vals = [1, 2, 3, 4, 5];
  return (
    <div className="flex justify-center items-end sm:items-center h-full w-full">
      <div className="flex gap-1 w-full">
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
    </div>
  );
};

export default IndexChart;
