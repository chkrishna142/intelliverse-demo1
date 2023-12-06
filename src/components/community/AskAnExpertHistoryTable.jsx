import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";

const MuiTheme = createTheme();

const AskAnExpertHistoryTable = ({ rowData }) => {

  const navigate = useNavigate()
  const columns = [
    {
      field: "queryId",
      headerName: "ID",
    },
    {
      field: "query",
      headerName: "QUESTIONS",
    },
    {
      field: "organisation",
      headerName: "Organisation",
      renderCell: (params) => (
        <div className="flex items-center w-[28px]">
          {/* <img
            src="/asianpaints.png"
            alt="Company Logo"
            className="mr-2 w-full" // Adjust margin as needed
          /> */}
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "enquirer",
      headerName: "ENQUIRER",
    },
    {
      field: "dateTime",
      headerName: "TIME OF ENQUIRY",
      renderCell: (params) => (
        <div>{formatTime(params.row.dateTime)}</div>
      ),
    },
    {
      field: "deadLine",
      headerName: "DEADLINE IN",
      renderCell: (params) => (
        <div>{formatDeadline(params.row.deadLine)}</div>
      ),
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
    
    {
      field: "viewAnswer",
      headerName: "View Answer",
      renderCell: ({row}) => (
        <IconButton
          onClick={(e)=>handleViewAnswerClick(row.queryId,e)}
          style={{ color: "#2196F3",marginLeft:"30px"}}  
        >
          <InfoOutlineIcon />
        </IconButton>
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
  const flexMap = [0, 3, 1, 1, 1, 1, 1,1];
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
    // navigate(`/community/expert/af933136-6f05-4f83-8e5b-f9c0d5384ced`);
  };

  const handleViewAnswerClick = ( queryId,event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      return;
    }
        navigate(`/community/expert/${queryId}`);

  };

  const isTodayOrYesterday = (timestamp) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    return (
      date.getDate() === today.getDate() || date.getDate() === yesterday.getDate()
    );
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
  
    if (isTodayOrYesterday(date.getTime() / 1000)) {
      if (date.getDate() === new Date().getDate()) {
        // If today, display "Today"
        return "Today " + date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      } else {
        // If yesterday, display "Yesterday" and month and time
        return date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      }
    } else {
      // For other days, display month and time
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }
  };
  
  const formatDeadline = (deadline) => {
    if (deadline >= 0) {
      return `${deadline} Hours`;
    } else {
      return "Time Over";
    }
  };
  
  

  return (
    <div className="overflow-x-auto mt-2">
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          rows={rowData}
          columns={columns}
          getRowId={(row)=>row.queryId}
          getRowClassName={getRowClassName}
          columnVisibilityModel={{
            queryId: false,
          }}
          onRowClick={handleRowClick}
          hideFooter={true}
          sx={{ minWidth: "1000px" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default AskAnExpertHistoryTable;
