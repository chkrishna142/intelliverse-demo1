import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Paginator = ({ data, limit, setDisplayData }) => {
  const [selected, setSelected] = useState(1);
  let page = 1;
  let idx = 0;
  const perPageData = {};
  let dummy = [];
  data.forEach((item) => {
    if (dummy.length == limit) {
      perPageData[page] = dummy;
      page++;
      dummy = [];
    }
    item['idx'] = idx; 
    dummy.push(item);
    idx++;
  });
  perPageData[page] = dummy;

  useEffect(()=>{
    setDisplayData(perPageData[1]);
    setSelected(1);
  },[data]);

  return (
    <div className="self-center flex gap-1 overflow-x-auto max-w-[35vw]">
      {Object.keys(perPageData).map((i) => {
        return (
          <Button
            colorScheme="blue"
            variant="link"
            isDisabled={selected == i}
            onClick={() => {
              setDisplayData(perPageData[i]);
              setSelected(i);
            }}
          >
            {i}
          </Button>
        );
      })}
    </div>
  );
};

export default Paginator;
