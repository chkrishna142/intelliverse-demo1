import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import NavContext from ".././NavContext";
import { baseURL } from "../../index";
import StarIcon from "@mui/icons-material/Star";
const MuiTheme = createTheme();

const AskAnExpertHistoryTable = ({ rowData, fetchQueries, role }) => {
  const { auth } = useContext(NavContext);

  const navigate = useNavigate();
  const [isStarredMap, setIsStarredMap] = useState({});

  // useEffect(() => {
  //   const initialStarredMap = {};
  //   rowData.forEach((row) => {
  //     initialStarredMap[row.queryId] = row.starred;
  //   });
  //   setIsStarredMap(initialStarredMap);
  // }, [rowData]);

  const handleStarClick = async (queryId, event) => {
    // Prevent the click from triggering when clicking on a button inside the row
    if (event.target.tagName.toLowerCase() === "button") {
      return;
    }

    try {
      const response = await axios.patch(
        baseURL + `questions/starred/${queryId}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );

      if (response.status == 200) {
        // setIsStarredMap((prevMap) => ({
        //   ...prevMap,
        //   [queryId]: !prevMap[queryId],
        // }));
        fetchQueries();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const columns = [
    {
      field: "questionId",
      headerName: "ID",
    },
    {
      field: "star",
      headerName: "",
      renderCell: ({ row }) => (
        <IconButton onClick={(e) => handleStarClick(row.questionId, e)}>
          {row.starred ? (
            <StarIcon style={{ color: "#FFC107" }} />
          ) : (
            <StarOutlineIcon />
          )}
        </IconButton>
      ),
    },
    {
      field: "question",
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
      field: role === "EXPERT" ? "enquirer" : "expert",
      headerName: role === "EXPERT" ? "ENQUIRER" : "EXPERT",
    },
    {
      field: "dateTime",
      headerName: "TIME OF ENQUIRY",
      renderCell: (params) => <div>{formatTime(params.row.dateTime)}</div>,
    },
    {
      field: "deadline",
      headerName: "DEADLINE IN",
      renderCell: (params) => <div>{formatDeadline(params.row.deadLine)}</div>,
    },
    {
      field: "status",
      headerName: "STATUS",
      renderCell: ({ value }) => (
        <div className={`w-full flex gap-1 ${getStatusStyles(value)}`}>
          {value === "In Progress" ? "In Progress" : value}
        </div>
      ),
    },

    {
      field: "viewAnswer",
      headerName: "View",
      renderCell: ({ row }) => (
        <IconButton
          onClick={(e) => handleViewAnswerClick(row.questionId, e)}
          style={{ color: "#2196F3" }}
        >
          {/* <InfoOutlineIcon /> */}
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "text-[#FFC107] text-[14px] font-[700]";
      case "In Progress":
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
  const cellClass = "text-sm text-[#3E3C42] whitespace-nowrap";
  const flexMap =
    role === "EXPERT"
      ? [0, 0.5, 3, 1, 1, 1, 1, 1, 1]
      : [0, 0.5, 3, 0, 1, 1, 1, 1, 1];
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

  const handleViewAnswerClick = async (questionId, event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      return;
    }
    try {
      const response = await axios.patch(
        `https://backend-ripik.com/api/questions/status/${questionId}?status=0`,

        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );

      console.log("API Response:", response.data);

      // Navigate to the desired route (if needed)
      navigate(`/community/expert/${questionId}`);
    } catch (error) {
      console.error(error);
    }
    // navigate(`/community/expert/${queryId}`);
  };

  const isTodayOrYesterday = (timestamp) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    return (
      date.getDate() === today.getDate() ||
      date.getDate() === yesterday.getDate()
    );
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);

    if (isTodayOrYesterday(date.getTime() / 1000)) {
      if (date.getDate() === new Date().getDate()) {
        // If today, display "Today"
        return (
          "Today " +
          date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
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
          getRowId={(row) => row.questionId}
          getRowClassName={getRowClassName}
          columnVisibilityModel={{
            questionId: false,
            organisation: role === "EXPERT" ? true : false,
          }}
          onRowClick={handleRowClick}
          // hideFooter={true}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
            // sorting: {
            //   sortModel: [{ field: 'status', sort: 'asc' }],
            // },
          }}
          sx={{ minWidth: "1000px" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default AskAnExpertHistoryTable;
