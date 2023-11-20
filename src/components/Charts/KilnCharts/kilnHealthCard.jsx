import { Tooltip } from "@chakra-ui/react";

const colors = {
  dusty: "#fffcf2",
  healthy: "#DDF7EA",
  hot: "#ffecec",
  hot_Dusty: "#FFEDCC",
  negative: "#F4F4F4",
};

const tagColor = {
  dusty: "#fee179",
  healthy: "#59d79a",
  hot: "#ff6460",
  hot_Dusty: "#ef6f12",
  negative: "#000000",
};

const tagName = {
  dusty: "Dusty",
  healthy: "Healthy",
  hot: "Hot",
  hot_Dusty: "Hot & Dusty",
  negative: "Negative",
};

const KilnHealthCard = ({ dusty, hot, health }) => {
  const indexes = ["Dusty Index", "Hot Index"];
  return (
    <div className="flex flex-col min-w-[220px] gap-4 w-full sm:w-[15vw] h-[250px] sm:h-full">
      <div
        className="w-full px-5 py-4 flex flex-col gap-2 rounded-lg"
        style={{ backgroundColor: colors[health] }}
      >
        <p className="text-sm text-[#605D64]">Kiln is</p>
        <div className="flex gap-2">
          <div
            className="h-[20px] w-[5px]"
            style={{ backgroundColor: tagColor[health] }}
          ></div>
          <p className="text-[#3E3C42] text-base">{tagName[health]}</p>
        </div>
      </div>
      {indexes.map((i, index) => {
        //index 0 is dusty and 1 is hot
        return (
          <div className="flex-1 flex flex-col gap-[10px]">
            <div className="flex gap-2">
              <p className="text-sm text-[#605D64]">{i}</p>
              <img src="/KilnIcons/info.svg" />
            </div>
            <div className="flex-1 flex gap-1 items-end">
              {[...Array(5)].map((i, idx) => {
                return (
                  <Tooltip
                    label={idx+1 + ".00"}
                    isDisabled={index == 0 ? idx + 1 != dusty : idx + 1 != hot}
                    placement="top"
                    isOpen={index == 0 ? idx + 1 == dusty : idx + 1 == hot}
                    hasArrow
                    bg={"white"}
                    px={'8px'}
                    py={'4px'}
                    color={index == 0 ? "#FFC107" : "#DC362E"}
                    fontWeight={600}
                    fontSize={14}
                    rounded={'6px'}
                    style={{boxShadow: '4px 4px 4px 0px rgba(226, 240, 220, 0.51), -4px -4px 18px 0px rgba(226, 240, 220, 0.38)',zIndex: 0}}
                  >
                    <div
                      className="h-[10px] rounded-[2px] w-full"
                      style={{
                        backgroundColor:
                          index == 0
                            ? idx + 1 == dusty
                              ? "#FFC107"
                              : "#FFFFC4"
                            : idx + 1 == hot
                            ? "#DC362E"
                            : "#F9DEDC",
                      }}
                    ></div>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KilnHealthCard;
