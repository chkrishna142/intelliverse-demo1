import React from "react";
import * as XLSX from "xlsx";
import { Button } from "@chakra-ui/react";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
class DownloadExcel extends React.Component {
  handleDownload = () => {
    const { data } = this.props;

    const editDates = (TimeStamp) => {
      const timestamp = TimeStamp * 1000; // Multiply by 1000 to convert from seconds to milliseconds
      const date = new Date(timestamp);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      return formattedDate;
    };

    const modifiedData = data.map((item) => {
      const { id, idx, ...newItem } = item;
      console.log(newItem);

      const sequenceItem = {
        Date: editDates(newItem.timestamp),
        Slab: newItem.slab_id,
        Shift: newItem.shift,
        Actual_Length: newItem.length.actual,
        Standard_Length: newItem.length.standard,
        Variance_In_Length: newItem.variance.l,
        Actual_Width: newItem.width.actual,
        Standard_Width: newItem.width.standard,
        Variance_In_Width: newItem.variance.b,
        Actual_Height: newItem.height.actual,
        Standard_Height: newItem.height.standard,
        Variance_In_Height: newItem.variance.h,
        Status: newItem.status,
      };
      return sequenceItem;
    });

    // console.log("downlaoddata",modifiedData);

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(modifiedData);

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

  render() {
    return (
      <PrimaryButton
        text={"Download"}
        width={"fit-content"}
        onClick={this.handleDownload}
      />
    );
  }
}
export default DownloadExcel;
