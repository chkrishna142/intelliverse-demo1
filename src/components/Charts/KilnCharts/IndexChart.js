import { TriangleDownIcon } from "@chakra-ui/icons";

const color = {
  Hot: "#FF0000",
  Dusty: "#FFFF00",
};

const IndexChart = ({ type, value }) => {
  const vals = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-4 items-center justify-center">
      <p className="text-sm text-[#605D64] font-medium w-[30%]">{type} index: </p>
      <div className="flex gap-2 w-[80%]">
        {vals.map((i) => {
          return (
            <div
              className="h-4 w-full rounded relative"
              style={{
                backgroundColor: i<= value ? color[type]: '',
                border: `2px solid ${color[type]}`
              }}
            >
              {i == value && (
                <div className="absolute flex flex-col top-[-30px] right-0 left-0 items-center">
                  <p className="bg-white rounded text-xs text-black font-medium">
                    {value}
                  </p>
                  <TriangleDownIcon />
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
