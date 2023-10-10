import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import AlertImagesModal from "../Components/AlertImagesModal";
import { useState } from "react";

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

const StatusCell = (param) => {
  const { row, colDef } = param;
  let { field } = colDef;
  let status = row[field];

  return (
    <p className={`${status == "Yes" ? "text-green-500" : "text-red-500"}`}>
      {status}
    </p>
  );
};

const rows = [
  { id: 1, check: "Check 1", compliance: "Yes" },
  { id: 2, check: "Check 2", compliance: "No" },
  { id: 3, check: "Check 3", compliance: "Yes" },
  { id: 4, check: "Check 4", compliance: "Yes" },
  { id: 5, check: "Check 5", compliance: "No" },
  { id: 6, check: "Check 6", compliance: "Yes" },
  { id: 7, check: "Check 7", compliance: "No" },
];

const columns = [
  {
    field: "id",
    headerName: "SR No.",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
  {
    field: "check",
    headerName: "Check",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
  {
    field: "compliance",
    headerName: "Compliance",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
    renderCell: StatusCell,
  },
  {
    field: "image",
    headerName: "Image",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
    renderCell: DetailClick,
  },
];

const ReportModalTable = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter={true}
        columnVisibilityModel={{
          id: false,
        }}
      />
    </ThemeProvider>
  );
};

export default ReportModalTable;
