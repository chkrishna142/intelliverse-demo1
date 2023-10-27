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

const ReportModalTable = ({ rowData }) => {
  for (let i = 0; i < rowData.length; i++) {
    rowData[i]["id"] = i + 1;
  }
  const modRows = [];
  let id = 1;
  let data = rowData.events;
  for (const category in data) {
    for (const check in data[category]) {
      data[category][check].map((item) => {
        const compliance = item.passed ? "Pass" : "Fail";
        const annotatedImage = item?.annotatedImage;
        const startTs = item?.startTs;
        const endTs = item?.endTs;
        const complianceObject = { id, check, compliance, annotatedImage, startTs, endTs };
        modRows.push(complianceObject);
        id++;
      });
    }
  }
  return (
    <div className="overflow-auto">
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          rows={modRows}
          columns={columns}
          hideFooter={false}
          columnVisibilityModel={{
            id: false,
          }}
          sx={{ maxHeight: "500px" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default ReportModalTable;
