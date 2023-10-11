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
    plant: "Khandala",
    truckNumber: "MH04KU6382",
    date: "24/09/2023",
    violationStartTime: '11:11:33', // Epoch time for "2023-10-10T08:30:00"
    violationEndTime: '11:19:32', // Epoch time for "2023-10-10T09:00:00"
    duration: "00:80:01",
    violation: "Helmet Missing",
    images: ["image1.jpg", "image2.jpg"],
  },
  {
    id: 2,
    plant: "Khandala",
    truckNumber: "MH04KU6382",
    date: "24/09/2023",
    violationStartTime: '11:11:33', // Epoch time for "2023-10-11T10:00:00"
    violationEndTime: '11:19:32', // Epoch time for "2023-10-11T11:30:00"
    duration: "00:08:01",
    violation: "Safety Rope Missing",
    images: ["image3.jpg", "image4.jpg"],
  },
  {
    id: 3,
    plant: "Khandala",
    truckNumber: "MH02KU51xx",
    date: "24/09/2023",
    violationStartTime: '11:55:33', // Epoch time for "2023-10-12T12:15:00"
    violationEndTime: '11:56:32', // Epoch time for "2023-10-12T13:00:00"
    duration: "00:01:01",
    violation: "Clamp Missing",
    images: ["image5.jpg", "image6.jpg"],
  },
  {
    id: 4,
    plant: "Khandala",
    truckNumber: "MH03KU51xx",
    date: "24/09/2023",
    violationStartTime: '11:50:33', // Epoch time for "2023-10-13T14:00:00"
    violationEndTime: '12:12:33', // Epoch time for "2023-10-13T15:30:00"
    duration: "00:22:00",
    violation: "Dip Check Failed",
    images: ["image7.jpg", "image8.jpg"],
  },
  {
    id: 5,
    plant: "Khandala",
    truckNumber: "MH03KU42xx",
    date: "24/09/2023",
    violationStartTime: '12:40:33', // Epoch time for "2023-10-14T16:00:00"
    violationEndTime: '12:52:33', // Epoch time for "2023-10-14T17:00:00"
    duration: "00:22:00",
    violation: "Safety Rope Missing",
    images: ["image9.jpg", "image10.jpg"],
  },
  {
    id: 6,
    plant: "Khandala",
    truckNumber: "MH03KU42xx",
    date: "24/09/2023",
    violationStartTime: '13:55:33', // Epoch time for "2023-10-15T08:00:00"
    violationEndTime: '14:22:33', // Epoch time for "2023-10-15T08:30:00"
    duration: "00:27:00",
    violation: "Dip Check Failed",
    images: ["image11.jpg", "image12.jpg"],
  },
  {
    id: 7,
    plant: "Khandala",
    truckNumber: "MH03KU42xx",
    date: "24/09/2023",
    violationStartTime: '15:03:02', // Epoch time for "2023-10-16T09:30:00"
    violationEndTime: '15:14:03', // Epoch time for "2023-10-16T10:30:00"
    duration: "00:11:01",
    violation: "Helmet Missing",
    images: ["image13.jpg", "image14.jpg"],
  },
];

const columns = [
  {
    field: "id",
    headerName: "SR No.",
    flex: 1,
  },
  {
    field: "plant",
    headerName: "Plant",
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
    field: "violationStartTime",
    headerName: "Violation start time",
    type: "time",
    flex: 1,
    valueGetter: ({ value }) => {
      return value;
    },
  },
  {
    field: "violationEndTime",
    headerName: "violation end time",
    type: "time",
    flex: 1,
    valueGetter: ({ value }) => {
      return value;
    },
  },
  {
    field: "duration",
    headerName: "Duration",
    flex: 1,
  },
  {
    field: "violation",
    headerName: "Violation",
    flex: 1,
  },
  {
    field: "images",
    headerName: "images",
    flex: 1,
    renderCell: DetailClick,
  },
];

const AlertTable = () => {
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
          sx={{ minWidth: "1000px" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default AlertTable;
