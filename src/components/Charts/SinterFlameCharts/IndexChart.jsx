import { TriangleDownIcon } from "@chakra-ui/icons";

const IndexChart = ({ type, value }) => {
  const vals = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex gap-1 w-full">
        {vals.map((i) => {
          return (
            <div
              className="h-3 w-full rounded-xl relative"
              style={{
                backgroundColor: i <= value ? "#FFA500" : "#F2F2F2",
                // border: `2px solid ${color[type]}`,
              }}
            >
              {/* {i == value && (
                <div className="absolute flex flex-col top-[-30px] right-0 left-0 items-center">
                  <p className="bg-white rounded text-xs text-black font-medium">
                    {value}
                  </p>
                  <TriangleDownIcon />
                </div>
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndexChart;
