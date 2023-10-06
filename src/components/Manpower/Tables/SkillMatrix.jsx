import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";

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
  const [selected, setSelected] = useState("A");
  const blocks = ["A", "B", "C", "D"];
  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className="flex justify-between items-center px-[25px] cursor-pointer">
        <div className="flex gap-4 items-center text-[#605D64] text-base">
          {blocks.map((i) => {
            return (
              <div
                className="rounded-[32px] px-4 py-2"
                onClick={() => setSelected(i)}
                style={{
                  border:
                    selected == i ? "1px solid #6CA6FC" : "1px solid #EBEBEB",
                  backgroundColor: selected == i ? "#ddeeff" : "white",
                }}
              >
                Block {i}
              </div>
            );
          })}
        </div>
        <p className="text-[#6CA6FC] font-medium text-sm">Download Table</p>
      </div>
      <ThemeProvider theme={MuiTheme}>
        <DataGrid rows={rows} columns={columns} />
      </ThemeProvider>
    </div>
  );
};

export default SkillMatrix;
