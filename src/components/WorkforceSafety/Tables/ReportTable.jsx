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
    truckNumber: "ABC123",
    inTime: "2023-10-10T08:00:00",
    outTime: "2023-10-10T16:00:00",
    date: "2023-10-10",
    tat: "8 hours",
    violation: "No",
  },
  {
    id: 2,
    truckNumber: "DEF456",
    inTime: "2023-10-10T09:30:00",
    outTime: "2023-10-10T18:00:00",
    date: "2023-10-10",
    tat: "8.5 hours",
    violation: "Yes",
  },
  {
    id: 3,
    truckNumber: "GHI789",
    inTime: "2023-10-11T07:45:00",
    outTime: "2023-10-11T16:30:00",
    date: "2023-10-11",
    tat: "8.75 hours",
    violation: "No",
  },
  {
    id: 4,
    truckNumber: "JKL012",
    inTime: "2023-10-11T08:15:00",
    outTime: "2023-10-11T17:00:00",
    date: "2023-10-11",
    tat: "8.75 hours",
    violation: "Yes",
  },
  {
    id: 5,
    truckNumber: "MNO345",
    inTime: "2023-10-12T08:30:00",
    outTime: "2023-10-12T17:30:00",
    date: "2023-10-12",
    tat: "9 hours",
    violation: "No",
  },
  {
    id: 6,
    truckNumber: "PQR678",
    inTime: "2023-10-12T09:00:00",
    outTime: "2023-10-12T18:00:00",
    date: "2023-10-12",
    tat: "9 hours",
    violation: "Yes",
  },
  {
    id: 7,
    truckNumber: "STU901",
    inTime: "2023-10-13T07:00:00",
    outTime: "2023-10-13T16:00:00",
    date: "2023-10-13",
    tat: "9 hours",
    violation: "No",
  },
  {
    id: 8,
    truckNumber: "VWX234",
    inTime: "2023-10-13T08:30:00",
    outTime: "2023-10-13T17:30:00",
    date: "2023-10-13",
    tat: "9 hours",
    violation: "Yes",
  },
  {
    id: 9,
    truckNumber: "YZA567",
    inTime: "2023-10-14T08:15:00",
    outTime: "2023-10-14T17:00:00",
    date: "2023-10-14",
    tat: "8.75 hours",
    violation: "No",
  },
  {
    id: 10,
    truckNumber: "BCD890",
    inTime: "2023-10-14T08:45:00",
    outTime: "2023-10-14T18:00:00",
    date: "2023-10-14",
    tat: "9.25 hours",
    violation: "Yes",
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
    headerName: "Trucknumer",
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
      return formatTime(value);
    },
  },
  {
    field: "outTime",
    headerName: "Out Time",
    type: "time",
    flex: 1,
    valueGetter: ({ value }) => {
      return formatTime(value);
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
    headerName: "Report",
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
