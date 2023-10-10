import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";

const MuiTheme = createTheme();
const rows = [
  { id: 1, name: "John Doe", sapId: "SAP123", primary: "A", secondary: "B" },
  { id: 2, name: "Jane Smith", sapId: "SAP456", primary: "C", secondary: "D" },
  {
    id: 3,
    name: "Alice Johnson",
    sapId: "SAP789",
    primary: "E",
    secondary: "F",
  },
  {
    id: 4,
    name: "Michael Davis",
    sapId: "SAP012",
    primary: "G",
    secondary: "H",
  },
  {
    id: 5,
    name: "Emily Wilson",
    sapId: "SAP345",
    primary: "I",
    secondary: "J",
  },
  { id: 6, name: "David Lee", sapId: "SAP678", primary: "K", secondary: "L" },
  { id: 7, name: "Sarah Brown", sapId: "SAP901", primary: "M", secondary: "N" },
  { id: 8, name: "Ryan Clark", sapId: "SAP234", primary: "O", secondary: "P" },
  {
    id: 9,
    name: "Laura Turner",
    sapId: "SAP567",
    primary: "Q",
    secondary: "R",
  },
  { id: 10, name: "Alex Reed", sapId: "SAP890", primary: "S", secondary: "T" },
];

const columns = [
  {
    field: "id",
    headerName: "SR No.",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
  {
    field: "sapId",
    headerName: "Sap Id",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
  {
    field: "primary",
    headerName: "Primary Skill",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
  {
    field: "secondary",
    headerName: "Secondary Skill",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
];

const SkillMatrix = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <DataGrid rows={rows} columns={columns} />
    </ThemeProvider>
  );
};

export default SkillMatrix;
