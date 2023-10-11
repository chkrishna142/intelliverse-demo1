import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import ReportModal from "../Components/ReportModal";

const MuiTheme = createTheme();

const DetailClick = (param) => {
  const [openModal, setOpenModal] = useState(false);
  let { colDef, row } = param;
  let { field } = colDef;
  return (
    <>
      <p
        className="text-[#084298] font-medium text-sm cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        View detail
      </p>
      {openModal && (
        <ReportModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          row={row}
        />
      )}
    </>
  );
};

const formatTime = (rawTime) => {
  const date = new Date(rawTime);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12

  const formattedTime = `${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;
  return formattedTime;
};

const rows = [
  {
    id: 1,
    truckNumber: "MH04KU6382",
    inTime: "10:30:05",
    outTime: "10:50:10",
    date: "24/09/2023",
    tat: "0:20:05",
    violation: "All Checks Passed",
  },
  {
    id: 2,
    truckNumber: "MH02KU51xx",
    inTime: "11:20:30",
    outTime: "11:45:56",
    date: "24/09/2023",
    tat: "0:25:26",
    violation: "Two Violations Detected",
  },
  {
    id: 3,
    truckNumber: "MH03KU42xx",
    inTime: "13:05:09",
    outTime: "13:30:30",
    date: "24/09/2023",
    tat: "0:25:21",
    violation: "All Checks Passed",
  },
  {
    id: 4,
    truckNumber: "MH03KU42xx",
    inTime: "13:05:09",
    outTime: "13:30:30",
    date: "24/09/2023",
    tat: "0:25:21",
    violation: "Dip Check Failed",
  },
  {
    id: 5,
    truckNumber: "MH03KU42xx",
    inTime: "13:05:09",
    outTime: "13:30:30",
    date: "24/09/2023",
    tat: "0:25:21",
    violation: "All Checks Passed",
  },
  {
    id: 6,
    truckNumber: "MH03KU42xx",
    inTime: "13:05:09",
    outTime: "13:30:30",
    date: "24/09/2023",
    tat: "0:25:21",
    violation: "All Checks Passed",
  },
  {
    id: 7,
    truckNumber: "MH03KU42xx",
    inTime: "13:05:09",
    outTime: "13:30:30",
    date: "24/09/2023",
    tat: "0:25:21",
    violation: "All Checks Passed",
  },
  {
    id: 8,
    truckNumber: "MH03KU42xx",
    inTime: "13:05:09",
    outTime: "13:30:30",
    date: "24/09/2023",
    tat: "0:25:21",
    violation: "All Checks Passed",
  },
];

const columns = [
  {
    field: "id",
    headerName: "SR No.",
    flex: 1,
  },
  {
    field: "truckNumber",
    headerName: "Truck Id",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
  },
  {
    field: "inTime",
    headerName: "In Time",
    type: "time",
    flex: 1,
    valueGetter: ({ value }) => {
      return value;
    },
  },
  {
    field: "outTime",
    headerName: "Out Time",
    type: "time",
    flex: 1,
    valueGetter: ({ value }) => {
      return value;
    },
  },
  {
    field: "tat",
    headerName: "Tat",
    flex: 1,
  },
  {
    field: "violation",
    headerName: "Violation",
    flex: 1,
  },
  {
    field: "report",
    headerName: "Reports",
    flex: 1,
    renderCell: DetailClick,
  },
];

const ReportTable = () => {
  const headerClass =
    "text-xs font-medium text-[#525056] bg-[#ddeeff] uppercase";
  const cellClass = "text-sm font-medium text-[#3E3C42]";
  columns.map((val) => {
    val["headerClassName"] = headerClass;
    val["cellClassName"] = cellClass;
  });
  return (
    <div className="overflow-x-auto">
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          rows={rows}
          columns={columns}
          columnVisibilityModel={{
            id: false,
          }}
          sx={{minWidth: '1000px'}}
        />
      </ThemeProvider>
    </div>
  );
};

export default ReportTable;
