import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";

const MuiTheme = createTheme();
const rows = [
  {
    id: 1,
    skill: "Programming",
    skillCount: 15,
    resource: "Online tutorials",
    skillResourceMapping: 0.8,
  },
  {
    id: 2,
    skill: "Data Analysis",
    skillCount: 12,
    resource: "Data Science books",
    skillResourceMapping: 0.6,
  },
  {
    id: 3,
    skill: "Graphic Design",
    skillCount: 8,
    resource: "Adobe Creative Suite",
    skillResourceMapping: 0.7,
  },
  {
    id: 4,
    skill: "Public Speaking",
    skillCount: 10,
    resource: "Toastmasters club",
    skillResourceMapping: 0.9,
  },
  {
    id: 5,
    skill: "Language Learning",
    skillCount: 20,
    resource: "Language learning app",
    skillResourceMapping: 0.75,
  },
  {
    id: 6,
    skill: "Cooking",
    skillCount: 25,
    resource: "Cooking classes",
    skillResourceMapping: 0.85,
  },
  {
    id: 7,
    skill: "Project Management",
    skillCount: 18,
    resource: "Project management software",
    skillResourceMapping: 0.8,
  },
  {
    id: 8,
    skill: "Yoga",
    skillCount: 30,
    resource: "Yoga videos",
    skillResourceMapping: 0.9,
  },
  {
    id: 9,
    skill: "Photography",
    skillCount: 13,
    resource: "Photography workshops",
    skillResourceMapping: 0.7,
  },
  {
    id: 10,
    skill: "Writing",
    skillCount: 22,
    resource: "Writing workshops",
    skillResourceMapping: 0.85,
  },
];

const columns = [
  {
    field: "id",
    headerName: "SR No.",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
  {
    field: "skill",
    headerName: "Skills",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
  {
    field: "skillCount",
    headerName: "Count of person having skill",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
  {
    field: "resource",
    headerName: "Resources",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
  {
    field: "skillResourceMapping",
    headerName: "Skill/Resource Ratio",
    headerClassName: "bg-[#ddeeff]",
    flex: 1,
  },
];

const ResourceMapping = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <DataGrid rows={rows} columns={columns} />
    </ThemeProvider>
  );
};

export default ResourceMapping;
