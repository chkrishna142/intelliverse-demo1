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
        View Snippet
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
    field: "loaderID",
    headerName: "Loader Id",
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
    field: "violation",
    headerName: "Violation",
    flex: 1,
  },
  {
    field: "annotatedImage",
    headerName: "Snippet",
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
  const flexMap = [0, 1, 2, 2, 3, 1];
  columns.map((val, idx) => {
    val["headerClassName"] = headerClass;
    val["cellClassName"] = cellClass;
    val["flex"] = flexMap[idx];
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
