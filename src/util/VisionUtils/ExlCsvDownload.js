import { CSVLink } from "react-csv";
import { utils, writeFile } from "xlsx";
import { useState, useEffect } from "react";

const ExlCsvDownload = ({ order, data }) => {
  const [exportData, setExportData] = useState(order);
  const [selectedOption, setSelectedOption] = useState(0);
  const fileColumns = order;

  useEffect(() => {
    setExportData([fileColumns]); //always ensure exportData initially contains the fileColumns only
    if (data.length != 0) {
      //variable for checking if tableData is available
      data?.forEach((item) => {
        setExportData((prev) => [
          ...prev,
          order.map((i) => {
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
  }, [data]);

  const exportAsExcel = () => {
    let wb = utils.book_new();
    let ws = utils.aoa_to_sheet(exportData);
    utils.book_append_sheet(wb, ws, `report_data`);
    writeFile(wb, `report_data.xlsx`);
  };

  return (
    <div className="flex items-baseline text-xs md:text-base text-white font-medium p-[10px] pl-4 pr-4 bg-[#6CA6FC] rounded-[51px]">
      {selectedOption == 0 ? (
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
      <select
        name="typeSheet"
        id="typeSheet"
        className="focus:outline-none bg-[#6CA6FC]"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value={0}>.xlsx</option>
        <option value={1}>.csv</option>
      </select>
    </div>
  );
};

export default ExlCsvDownload;
