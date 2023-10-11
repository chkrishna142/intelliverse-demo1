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
    <p className={`${status == "Pass" ? "text-green-500" : "text-red-500"}`}>
      {status}
    </p>
  );
};

const rows = [
  { id: 1, check: "Wheel Choke", compliance: "Fail" },
  { id: 2, check: "Earthing Clamp", compliance: "Pass" },
  { id: 3, check: "Helmet", compliance: "Pass" },
  { id: 4, check: "Safety Belt", compliance: "Pass" },
  { id: 5, check: "Safety Rope", compliance: "Pass" },
  { id: 6, check: "APL Executive Present", compliance: "Pass" },
  { id: 7, check: "Security Present", compliance: "Pass" },
  { id: 8, check: "Rod Dipped in Ports", compliance: "Pass" },
  { id: 9, check: "Sampler Flushing", compliance: "Fail" },
  { id: 10, check: "Sample Collection from compartments", compliance: "Fail" },
  { id: 11, check: "Samples Checked visually", compliance: "Pass" },
  { id: 12, check: "Port Lids Closed", compliance: "Pass" },
  { id: 13, check: "Compartment Lids Closed", compliance: "Pass" },
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
    <div className="overflow-auto">
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter={true}
          columnVisibilityModel={{
            id: false,
          }}
          sx={{maxHeight: "500px"}}
        />
      </ThemeProvider>
    </div>
  );
};

export default ReportModalTable;
