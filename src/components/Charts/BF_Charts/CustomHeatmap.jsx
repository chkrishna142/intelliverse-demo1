import { Tooltip } from "@chakra-ui/react";

const colorFinder = (val, upper, lower) => {
  const colors = ["#D9EF8B", "#A6D96A", "#FEE08B", "#F46D43", "#F11308"];
  //             light green,green,     orange,   red,     dark red

  if (val >= 1.2 * upper) return colors[4];
  else if (val >= 1.1 * upper) return colors[3];
  else if (val >= 1.01 * upper) return colors[2];
  else if (val <= upper && val >= lower) return colors[1];
  else return colors[0];
};

const CustomHeatmap = ({ data }) => {
  // data.thermal_heat_map;

  let newdata = [...data.thermal_heat_map];
  newdata = newdata.reverse();
  // console.log("new---> ",newdata);

  return (
    <div className="grid grid-cols-4 w-full gap-[1px] text-center">
      {newdata.map((item, idx) => {
        // console.log(item)
        return item.data.map((i) => {
          return (
            <Tooltip hasArrow placement="top" label={item.name + ": " + i}>

            <div

              className={`text-center w-full rounded hover:opacity-80 text-[10px] flex justify-center items-center font-semibold`}

              style={{
                backgroundColor: colorFinder(i,item.optimal_range[1],item.optimal_range[0]),
                height: `${((375/newdata.length)/1.2).toFixed(0)}px`
              }}
            >
              {i}
            </div>

            </Tooltip>
          );
        });
      })}
      <p>Q1</p>
      <p>Q2</p>
      <p>Q3</p>
      <p>Q4</p>
    </div>
  );
};

export default CustomHeatmap;
