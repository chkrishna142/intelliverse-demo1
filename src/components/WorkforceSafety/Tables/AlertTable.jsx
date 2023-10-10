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
    plant: "Plant A",
    truckNumber: "ABC123",
    date: "2023-10-10",
    violationStartTime: 1665426600000, // Epoch time for "2023-10-10T08:30:00"
    violationEndTime: 1665428400000, // Epoch time for "2023-10-10T09:00:00"
    duration: "30 mins",
    violation: "Yes",
    images: ["image1.jpg", "image2.jpg"],
  },
  {
    id: 2,
    plant: "Plant B",
    truckNumber: "DEF456",
    date: "2023-10-11",
    violationStartTime: 1665513000000, // Epoch time for "2023-10-11T10:00:00"
    violationEndTime: 1665516600000, // Epoch time for "2023-10-11T11:30:00"
    duration: "1 hour 30 mins",
    violation: "No",
    images: ["image3.jpg", "image4.jpg"],
  },
  {
    id: 3,
    plant: "Plant C",
    truckNumber: "GHI789",
    date: "2023-10-12",
    violationStartTime: 1665599700000, // Epoch time for "2023-10-12T12:15:00"
    violationEndTime: 1665603600000, // Epoch time for "2023-10-12T13:00:00"
    duration: "45 mins",
    violation: "Yes",
    images: ["image5.jpg", "image6.jpg"],
  },
  {
    id: 4,
    plant: "Plant D",
    truckNumber: "JKL012",
    date: "2023-10-13",
    violationStartTime: 1665686400000, // Epoch time for "2023-10-13T14:00:00"
    violationEndTime: 1665690000000, // Epoch time for "2023-10-13T15:30:00"
    duration: "1 hour 30 mins",
    violation: "No",
    images: ["image7.jpg", "image8.jpg"],
  },
  {
    id: 5,
    plant: "Plant E",
    truckNumber: "MNO345",
    date: "2023-10-14",
    violationStartTime: 1665772800000, // Epoch time for "2023-10-14T16:00:00"
    violationEndTime: 1665776400000, // Epoch time for "2023-10-14T17:00:00"
    duration: "1 hour",
    violation: "Yes",
    images: ["image9.jpg", "image10.jpg"],
  },
  {
    id: 6,
    plant: "Plant F",
    truckNumber: "PQR678",
    date: "2023-10-15",
    violationStartTime: 1665859200000, // Epoch time for "2023-10-15T08:00:00"
    violationEndTime: 1665862800000, // Epoch time for "2023-10-15T08:30:00"
    duration: "30 mins",
    violation: "Yes",
    images: ["image11.jpg", "image12.jpg"],
  },
  {
    id: 7,
    plant: "Plant G",
    truckNumber: "STU901",
    date: "2023-10-16",
    violationStartTime: 1665945600000, // Epoch time for "2023-10-16T09:30:00"
    violationEndTime: 1665949200000, // Epoch time for "2023-10-16T10:30:00"
    duration: "1 hour",
    violation: "No",
    images: ["image13.jpg", "image14.jpg"],
  },
  {
    id: 8,
    plant: "Plant H",
    truckNumber: "VWX234",
    date: "2023-10-17",
    violationStartTime: 1666032000000, // Epoch time for "2023-10-17T11:00:00"
    violationEndTime: 1666035600000, // Epoch time for "2023-10-17T12:00:00"
    duration: "1 hour",
    violation: "Yes",
    images: ["image15.jpg", "image16.jpg"],
  },
  {
    id: 9,
    plant: "Plant I",
    truckNumber: "YZA567",
    date: "2023-10-18",
    violationStartTime: 1666118400000, // Epoch time for "2023-10-18T13:00:00"
    violationEndTime: 1666123800000, // Epoch time for "2023-10-18T14:30:00"
    duration: "1 hour 30 mins",
    violation: "No",
    images: ["image17.jpg", "image18.jpg"],
  },
  {
    id: 10,
    plant: "Plant J",
    truckNumber: "BCD890",
    date: "2023-10-19",
    violationStartTime: 1666204800000, // Epoch time for "2023-10-19T15:00:00"
    violationEndTime: 1666208400000, // Epoch time for "2023-10-19T16:00:00"
    duration: "1 hour",
    violation: "Yes",
    images: ["image19.jpg", "image20.jpg"],
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
      return formatTime(value);
    },
  },
  {
    field: "violationEndTime",
    headerName: "violation end time",
    type: "time",
    flex: 1,
    valueGetter: ({ value }) => {
      return formatTime(value);
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
