import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const MuiTheme = createTheme();

const SessionLogsTable = ({ rowData }) => {
  const columns = [
    {
      field: "userid",
      headerName: "USER ID",
    },
    {
      field: "loginTime",
      headerName: "DATE TIME",
      valueGetter: (params) =>
        params.row.loginTime
          ? new Date(params.row.loginTime).toLocaleDateString("en-US", {
              year: "2-digit",
              month: "short",
              day: "numeric",
            }) +
            " " +
            new Date(params.row.loginTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          : "",
    },
    {
      field: "email",
      headerName: "EMAIL",
    },
    {
      field: "sessionDuration",
      headerName: "SESSION DURATION",
      valueGetter: (params) => {
        const sessionDurationInMillis = params.row.sessionDuration;
        const hours = Math.floor(sessionDurationInMillis / (1000 * 60 * 60));
        const minutes = Math.floor(
          (sessionDurationInMillis % (1000 * 60 * 60)) / (1000 * 60)
        );

        return `${hours} hrs ${minutes} min`;
      },
    },
    {
      field: "ipAddress",
      headerName: "IP ADDRESS",
    },
    {
      field: "device",
      headerName: "DEVICE",
      renderCell: (params) => {
        
        return <p className="py-2">{params?.row?.device}</p>;
      },
    },
    {
      field: "location",
      headerName: "LOCATION",
    },
  ];
  const headerClass =
    "text-sm font-normal text-[#79767D] bg-[#DDEEFF] uppercase";
  const cellClass = "text-sm font-normal text-[#3E3C42] whitespace-normal";
  const flexMap = [ 0,1.5, 2, 1.5, 2, 3, 1];
  columns.map((val, idx) => {
    val["headerClassName"] = headerClass;
    val["cellClassName"] = cellClass;
    val["flex"] = flexMap[idx];
  });

  return (
    <div
      className="mt-2 overflow-auto"
    >
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
        // scro
          rows={rowData}
          columns={columns}
          getRowId={(row) => row.userid}
          getRowHeight={() => {
            return "auto";
          }}
          columnVisibilityModel={{
            userid: false,
          }}
          hideFooter={true}
          sx={{ minWidth: "1000px", margin: 0, padding: 0 }}
        />
      </ThemeProvider>
    </div>
  );
};

export default SessionLogsTable;
