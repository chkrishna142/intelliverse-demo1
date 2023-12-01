import { CSVLink } from "react-csv";
import { utils, writeFile } from "xlsx";
import { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  MenuItem,
  Button,
} from "@chakra-ui/react";

const ExlCsvDownload = ({ order, data, enable = false, orderDetail = [] }) => {
  const [exportData, setExportData] = useState(order);
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectType, setSelectType] = useState(1);
  const [fileColumns, setFileColumns] = useState(order);

  useEffect(() => {
    setExportData([fileColumns]); //always ensure exportData initially contains the fileColumns only
    if (data.length != 0) {
      //variable for checking if tableData is available
      data?.forEach((item) => {
        setExportData((prev) => [
          ...prev,
          fileColumns?.map((i) => {
            return i.toLowerCase().includes("time")
              ? new Date(item[i])
                  .toISOString()
                  .split("T")
                  .join(" ")
                  .slice(0, 19)
              : item[i];
          }),
        ]);
      });
    }
  }, [data, fileColumns]);

  useEffect(() => {
    setFileColumns((prev) => {
      return selectType == 1 ? order : orderDetail;
    });
  }, [selectType, order, orderDetail]);

  const exportAsExcel = () => {
    let wb = utils.book_new();
    let ws = utils.aoa_to_sheet(exportData);
    utils.book_append_sheet(wb, ws, `report_data`);
    writeFile(wb, `report_data.xlsx`);
  };

  return (
    <div className="flex items-baseline text-xs md:text-base text-white font-medium p-[10px] pl-4 pr-4 bg-[#6CA6FC] rounded-[51px]">
      {/* {selectedOption == 0 ? (
        <p className="cursor-pointer" onClick={exportAsExcel}>
          Download
        </p>
      ) : (
        <CSVLink
          data={exportData}
          filename={`report_data.csv`}
          className="cursor-pointer"
          target="_blank"
        >
          Download
        </CSVLink>
      )}
      {enable && (
        <select
          name="typeSheet"
          id="typeSheet"
          className="focus:outline-none bg-[#6CA6FC]"
          value={selectType}
          onChange={(e) => setSelectType(e.target.value)}
        >
          <option value={0}>detail</option>
          <option value={1}>summary</option>
        </select>
      )}
      <select
        name="typeSheet"
        id="typeSheet"
        className="focus:outline-none bg-[#6CA6FC]"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value={0}>.xlsx</option>
        <option value={1}>.csv</option>
      </select> */}
      <Menu closeOnSelect={false} isLazy>
        <MenuButton
          as={Button}
          bgColor={"#6CA6FC"}
          _hover={{ bgColor: "#6CA6FC" }}
          _focus={{ bgColor: "#6CA6FC" }}
          _expanded={{ bgColor: "#6CA6FC" }}
          color={"white"}
          size={"xs"}
        >
          Download
        </MenuButton>
        <MenuList bgColor={"#6CA6FC"}>
          {enable && (
            <>
              <MenuOptionGroup title="Type" type="radio" value={selectType}>
                <MenuItemOption
                  value={0}
                  bgColor={"#6CA6FC"}
                  onClick={() => setSelectType(0)}
                >
                  Detail
                </MenuItemOption>
                <MenuItemOption
                  value={1}
                  bgColor={"#6CA6FC"}
                  onClick={() => setSelectType(1)}
                >
                  Summary
                </MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
            </>
          )}
          <MenuOptionGroup title="Format" bgColor={"#6CA6FC"}>
            <MenuItem onClick={exportAsExcel} bgColor={"#6CA6FC"} closeOnSelect>
              .xlsx
            </MenuItem>
            <MenuItem bgColor={"#6CA6FC"} closeOnSelect>
              <CSVLink
                data={exportData}
                filename={`report_data.csv`}
                className="cursor-pointer"
                target="_blank"
              >
                .csv
              </CSVLink>
            </MenuItem>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </div>
  );
};

export default ExlCsvDownload;
