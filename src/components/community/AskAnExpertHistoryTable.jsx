import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MuiTheme = createTheme();

const AskAnExpertHistoryTable = ({ rowData }) => {

  const navigate = useNavigate()
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "queries",
      headerName: "QUERIES",
    },
    {
      field: "company",
      headerName: "COMPANY",
      renderCell: (params) => (
        <div className="flex items-center w-[28px]">
          <img
            src="/asianpaints.png"
            alt="Company Logo"
            className="mr-2 w-full" // Adjust margin as needed
          />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "enquirer",
      headerName: "ENQUIRER",
    },
    {
      field: "time",
      headerName: "TIME OF ENQUIRY",
    },
    {
      field: "deadline",
      headerName: "DEADLINE IN",
    },
    {
      field: "status",
      headerName: "STATUS",
      renderCell: ({ value }) => (
        <div className={`w-full flex gap-1 ${getStatusStyles(value)}`}>
          {value === "Inprogress" ? "In progress": value}
        </div>
      ),
    },
  ];
  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "text-[#FFC107] text-[14px] font-[700]";
      case "Inprogress":
        return "text-[#69B04B] text-[14px] font-[500]";
      case "Answered":
        return "text-[#6CA6FC] text-[14px] font-[500]";
      default:
        return "";
    }
  };
  const [selectedRowId, setSelectedRowId] = useState(null);

  const headerClass =
    "text-sm font-normal text-[#79767D] bg-[#DDEEFF] uppercase";
  const cellClass = "text-sm text-[#3E3C42] whitespace-nowrap hover:cursor-pointer";
  const flexMap = [0, 3, 1, 1, 1, 1, 1];
  columns.map((val, idx) => {
    val["headerClassName"] = headerClass;
    val["cellClassName"] = cellClass;
    val["flex"] = flexMap[idx];
  });

  const getRowClassName = (params) => {
    
    const isPendingRow = params?.row?.status === "Pending";
   
    return isPendingRow ? "font-bold" : "";
  };
  const handleRowClick = (params, event) => {
    // Prevent the row click from triggering when clicking on a button inside the row
    if (event.target.tagName.toLowerCase() === "button") {
      return;
    }

    // Navigate to a specific route when any row is clicked
    navigate(`/community/expert/af933136-6f05-4f83-8e5b-f9c0d5384ced`);
  };
  return (
    <div className="overflow-x-auto mt-2">
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          rows={rowData}
          columns={columns}
          getRowId={(row)=>row.id}
          getRowClassName={getRowClassName}
          columnVisibilityModel={{
            id: false,
          }}
          onRowClick={handleRowClick}
          // pagination
          // initialState={{
          //   pagination: {
          //     paginationModel: { pageSize: 25, page: 0 },
          //   },
          // }}
          hideFooter={true}
          sx={{ minWidth: "1000px" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default AskAnExpertHistoryTable;
