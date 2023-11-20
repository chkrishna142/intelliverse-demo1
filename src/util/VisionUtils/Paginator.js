import { Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useWindowSize } from "@uidotdev/usehooks";

const Paginator = ({ data, limit, setDisplayData }) => {
  const selected = useRef();
  const size = useWindowSize();
  const [openTable, setOpenTable] = useState(false);
  let page = 1,
    maxPage;
  let idx = 1;
  const perPageData = {};
  let dummy = [];
  data.forEach((item) => {
    if (dummy.length == limit) {
      perPageData[page] = dummy;
      page++;
      dummy = [];
    }
    item["idx"] = idx;
    dummy.push(item);
    idx++;
  });
  perPageData[page] = dummy;
  maxPage = page;

  useEffect(() => {
    setDisplayData(perPageData[1]);
    selected.current = 1;
  }, [data]);

  // console.log(selected.current, "page selected");
  return (
    perPageData.hasOwnProperty(selected.current) && (
      // <div className="self-center flex gap-1 overflow-x-auto min-w-[100px] max-w-[35vw]">
      //   {Object.keys(perPageData).map((i) => {
      //     return (
      //       <Button
      //         colorScheme="blue"
      //         variant="link"
      //         isDisabled={selected == i}
      //         onClick={() => {
      //           setDisplayData(perPageData[i]);
      //           setSelected(i);
      //         }}
      //       >
      //         {i}
      //       </Button>
      //     );
      //   })}
      // </div>
      <div
        className={`relative flex    gap-[2px] text-sm text-gray-400 items-center whitespace-nowrap p-2`}
      >
        <p
          onClick={() => {
            if (Object.keys(perPageData).length > 1) setOpenTable(true);
          }}
          className="cursor-pointer"
        >
          {data.length > 0
            ? (selected.current - 1) * limit +
              1 +
              "-" +
              ((selected.current - 1) * limit +
                perPageData[selected.current].length) +
              " of " +
              data.length
            : "0-0 of 0"}
        </p>
        <div>
          <Button
            variant="link"
            isDisabled={selected.current == 1}
            onClick={() => {
              selected.current = selected.current - 1;
              setDisplayData(perPageData[selected.current]);
            }}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="link"
            isDisabled={selected.current == maxPage}
            onClick={() => {
              selected.current = selected.current + 1;
              setDisplayData(perPageData[selected.current]);
            }}
          >
            <ChevronRightIcon />
          </Button>
        </div>
        {openTable && (
          <div className="absolute left-0 right-0 top-[90%] flex flex-col h-[20vh] overflow-y-auto text-sm text-gray-400 items-start bg-white z-50">
            {Object.keys(perPageData).map((i) => {
              return (
                <p
                  onClick={() => {
                    selected.current = parseInt(i);
                    setDisplayData(perPageData[i]);
                    setOpenTable(false);
                  }}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {(i - 1) * limit +
                    1 +
                    "-" +
                    ((i - 1) * limit + perPageData[i].length)}
                </p>
              );
            })}
          </div>
        )}
      </div>
    )
  );
};

export default Paginator;
