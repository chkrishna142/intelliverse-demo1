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

const columns = [
  {
    field: "id",
    headerName: "SR No.",
    flex: 1,
  },
  {
    field: "vehicleNo",
    headerName: "Truck Id",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    valueGetter: ({ row }) => {
      return new Date(row.createdAt * 1000).toLocaleDateString();
    },
  },
  {
    field: "createdAt",
    headerName: "In Time",
    type: "time",
    flex: 1,
    valueGetter: ({ value }) => {
      return new Date(value * 1000).toLocaleTimeString();
    },
  },
  {
    field: "lastUpdatedAt",
    headerName: "Out Time",
    type: "time",
    flex: 1,
    valueGetter: ({ value }) => {
      return new Date(value * 1000).toLocaleTimeString();
    },
  },
  {
    field: "tat",
    headerName: "Tat",
    flex: 1,
    valueGetter: ({ row }) => {
      const timeDifferenceInSeconds = Math.abs(
        row.createdAt - row.lastUpdatedAt
      );
      const timeDifferenceDate = new Date(timeDifferenceInSeconds * 1000);
      const hours = timeDifferenceDate.getUTCHours();
      const minutes = timeDifferenceDate.getUTCMinutes();
      const seconds = timeDifferenceDate.getUTCSeconds();

      const timeString = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      return timeString;
    },
  },
  {
    field: "hasAlert",
    headerName: "Violation",
    flex: 1,
    valueGetter: ({ value }) => {
      if(value)return 'Violations detected'
      return 'All checks passed'
    },
  },
  {
    field: "report",
    headerName: "Reports",
    flex: 1,
    renderCell: DetailClick,
  },
];

const ReportTable = ({ rowData }) => {
  const headerClass =
    "text-xs font-medium text-[#525056] bg-[#ddeeff] uppercase";
  const cellClass = "text-sm font-medium text-[#3E3C42]";
  columns.map((val) => {
    val["headerClassName"] = headerClass;
    val["cellClassName"] = cellClass;
  });
  for (let i = 0; i < rowData.length; i++) {
    rowData[i]["id"] = i + 1;
  }
  console.log(rowData, "data");
  return (
    <div className="overflow-x-auto">
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          rows={rowData}
          columns={columns}
          columnVisibilityModel={{
            id: false,
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          sx={{ minWidth: "1000px" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default ReportTable;
