import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const MuiTheme = createTheme();

const UserMngmtTable = ({
  rowData,
  setIsOpenE,
  setIsOpenD,
  setSelectedUser,
  setFullName,
  setUserEmail,
  setDesignation,
  setBaseLocation,
  setUserRole,
  setContact,
  clientOrg,
  clientUpdate,
  mode
}) => {
  const columns = [
    {
      field: "userid",
      headerName: "SR No.",
    },
    {
      field: "username",
      headerName: "USER NAME",
    },
    {
      field: "fullname",
      headerName: "FULL NAME",
    },
    {
      field: "email",
      headerName: "EMAIL",
    },
    {
      field: "designation",
      headerName: "DESIGNATION",
    },
    {
      field: "role",
      headerName: "ROLE",
    },
    {
      field: "createdat",
      headerName: "LOGIN TIME",
    //   valueGetter: (params) =>
    //     params.row.createdat
    //       ? new Date(params.row.createdat).toLocaleDateString("en-US", {
    //           year: "2-digit",
    //           month: "short",
    //           day: "numeric",
    //         }) +
    //         " " +
    //         new Date(params.row.createdat).toLocaleTimeString([], {
    //           hour: '2-digit',
    //           minute: '2-digit'
    //         })
    //       : "",
    // },
    valueGetter: (params) =>
    params.row.createdat
      ? new Date(params.row.createdat).toDateString().split(" ")[2] +
        " " +
        new Date(params.row.createdat).toDateString().split(" ")[1] +
        " '" +
        new Date(params.row.createdat)
          .toDateString()
          .split(" ")[3]
          .slice(2, 4) +
        " " +
        new Date(params.row.createdat).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12:false
        })
      : "",
},
{
  field: "baseLocation",
  headerName: "BASE LOCATION",
},
    {
      field: "isactive",
      headerName: "STATUS",
      renderCell: ({ row }) => {
        return row.isactive === "false" || !row.isactive ? (
          <span className="text-[#E46962] text-sm font-semibold">Inactive</span>
        ) : (
          <span className="text-[#7AC958] text-sm font-semibold">Active</span>
        );
      },
    },
    {
      field: "action",
      headerName: "ACTION",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <div className="flex gap-1 items-center">
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => {
                setIsOpenD(true);
                setSelectedUser(row);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() => {
                setIsOpenE(true);
                setSelectedUser(row);
                setFullName(row?.fullname);
                setUserEmail(row?.email);
                setUserRole(row?.role);
                setContact(row?.phoneNumber);
                setDesignation(row?.designation)
                setBaseLocation(row?.baseLocation)
              }}
            >
              <EditNoteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
  const headerClass =
    "text-sm font-normal text-[#79767D] bg-[#DDEEFF] uppercase";
  const cellClass = "text-sm font-normal text-[#3E3C42] whitespace-nowrap";
  const flexMap = [0, 2, 2, 3,1, 1, 1.5,1, 1, 1];
  columns.map((val, idx) => {
    val["headerClassName"] = headerClass;
    val["cellClassName"] = cellClass;
    val["flex"] = flexMap[idx];
  });
 
  return (
    <div className="overflow-x-auto mt-2">
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          rows={rowData}
          columns={columns}
          getRowId={(row) => row.userid}
          columnVisibilityModel={{
            userid: false,
            username: false,
            action : clientOrg && mode !=="update" ? false : true
          }}
          hideFooter={true}
          sx={{ minWidth: "1000px" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default UserMngmtTable;
