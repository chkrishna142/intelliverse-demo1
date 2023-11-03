import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import AlertImagesModal from "../Components/AlertImagesModal";

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
        View images
      </p>
      {openModal && (
        <AlertImagesModal
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
    field: "plantName",
    headerName: "Plant",
    flex: 1,
  },
  {
    field: "vehicleNo",
    headerName: "Trucknumer",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Date",
    type: "time",
    flex: 1,
    valueGetter: ({ row }) => {
      return new Date(row.startTs * 1000).toLocaleDateString();
    },
  },
  {
    field: "startTs",
    headerName: "Violation start time",
    type: "time",
    flex: 1,
    valueGetter: ({ value }) => {
      return new Date(value * 1000).toLocaleTimeString();
    },
  },
  {
    field: "endTs",
    headerName: "violation end time",
    type: "time",
    flex: 1,
    valueGetter: ({ value }) => {
      return new Date(value * 1000).toLocaleTimeString();
    },
  },
  {
    field: "duration",
    headerName: "Duration",
    valueGetter: ({ row }) => {
      const timeDifferenceInSeconds = Math.abs(row.startTs - row.endTs);
      const timeDifferenceDate = new Date(timeDifferenceInSeconds * 1000);
      const hours = timeDifferenceDate.getUTCHours();
      const minutes = timeDifferenceDate.getUTCMinutes();
      const seconds = timeDifferenceDate.getUTCSeconds();

      const timeString = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      return timeString;
    },
    flex: 1,
  },
  {
    field: "event",
    headerName: "Event",
    flex: 1,
    type: "singleSelect",
    valueOptions: [
      "chock",
      "clamp",
      "safety",
      "dipRod",
      "flushing",
      "sampling",
      "contamination",
      "lidInspection",
    ],
  },
  {
    field: "subEvent",
    headerName: "Violation",
    flex: 1,
  },
  {
    field: "annotatedImage",
    headerName: "images",
    flex: 1,
    renderCell: DetailClick,
  },
];

const AlertTable = ({ rowData, filterData, setFilterModel }) => {
  const [rows, setRows] = useState(
    rowData.map((item, idx) => {
      item["id"] = idx + 1;
      return item;
    })
  );
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
            event: false,
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          filterModel={filterData}
          onFilterModelChange={(newFilterModel) =>
            setFilterModel(newFilterModel)
          }
          pageSizeOptions={[5, 10, 25]}
          sx={{ minWidth: "1000px" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default AlertTable;
