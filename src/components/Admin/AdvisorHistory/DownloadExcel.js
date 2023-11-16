import React from "react";
import * as XLSX from "xlsx";
import { Button } from "@chakra-ui/react";
const DownloadExcel = ({ data }) => {
  const handleDownload = () => {
    // console.log("downlaoddata",modifiedData);

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate a file name
    const fileName = "data.xlsx";

    // Generate a file blob from the workbook
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Create a blob object and trigger the download
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    // Release the object URL
    URL.revokeObjectURL(url);
  };

  return (
    <div
      onClick={() => {
        handleDownload();
      }}
      className="flex justify-center items-center gap-2"
    >
      <img src="/advisor/downloadlogo.svg" alt="download" />
      <p className="text-[#1C56AC] text-[14px] font-medium">Download table</p>
    </div>
  );
};

export default DownloadExcel;
