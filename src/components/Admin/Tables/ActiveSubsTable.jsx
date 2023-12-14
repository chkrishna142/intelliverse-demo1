import React from "react";
import { useToast } from "@chakra-ui/react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

const MuiTheme = createTheme();

const ActiveSubsTable = ({ activeSubs }) => {
  const extendedRowData = activeSubs.map((row) => ({ ...row, plantName: "ripik" }));
  const {clientId,mode} = useParams()
  const toast = useToast();

  const columns = [
    {
      field: "serv",
      headerName: "PRODUCT",
      valueGetter: (params) => {
        return params.row.serv.servName;
      },
    },
    {
      field: "category",
      headerName: "PRODUCT CATEGORY",
      valueGetter: (params) => {
        return params.row.serv.servCategory;
      },
    },
    { field: "plantName", headerName: "PLANT" },
    { field: "instance", headerName: "INSTANCE" },
    {
      field: "isActive",
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
      field: "validityEnd",
      headerName: "EXPIRES ON",

      valueGetter: (params) =>
        params.row.validityEnd
          ? new Date(params.row.validityEnd).toDateString().split(" ")[2] +
            " " +
            new Date(params.row.validityEnd).toDateString().split(" ")[1] +
            " '" +
            new Date(params.row.validityEnd)
              .toDateString()
              .split(" ")[3]
              .slice(2, 4)
          : "",
    },
    {
      field: "validityStart",
      headerName: "EXPIRES IN",

      valueGetter: (params) =>
        params.row.validityEnd && params.row.validityStart
          ? `${
              (new Date(params.row.validityEnd).getTime() -
                new Date(params.row.validityStart).getTime()) /
              (24 * 60 * 60 * 1000)
            } days`
          : "",
    },
    {
      field: "renew",
      headerName: "RENEW NOW",

      renderCell: () => (
        <Link
          onClick={() => {
            toast({
              title: "Mail sent",
              description:
                "We've received a request for your subscription renewal.",
              status: "success",
              duration: 4000,
              position: "top-right",
              isClosable: true,
            });
          }}
          className="text-[#3474CA] no-underline font-semibold"
        >
          Renew
        </Link>
      ),
    },
  ];

  const headerClass =
    "text-sm font-normal text-[#79767D] bg-[#DDEEFF] uppercase";
  const cellClass = "text-sm font-normal text-[#3E3C42] whitespace-nowrap";
  const flexMap = [2, 2, 1, 1, 1, 1, 1, 1];
  columns.map((val, idx) => {
    val["headerClassName"] = headerClass;
    val["cellClassName"] = cellClass;
    val["flex"] = flexMap[idx];
  });
  console.log("active subs table",activeSubs)
  return (
    <div className="overflow-x-auto mt-2">
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          rows={extendedRowData}
          columns={columns}
          getRowId={(row) => row.subscriptionServiceId}
            columnVisibilityModel={{
              renew:mode==="view" ? false : true
            }}
          hideFooter={true}
          sx={{ minWidth: "1000px" }}
        />
      </ThemeProvider>
    </div>
  );
};

export default ActiveSubsTable;
