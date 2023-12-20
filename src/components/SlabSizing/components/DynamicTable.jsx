import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import {
  Select,
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
  Flex,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";

function DynamicTable() {
  const size = useWindowSize();
  const toast = useToast();
  const [tableData, setTableData] = useState([
    {
      id: 0,
      order: 1,
      slab_Id: 123,
      planned_l: 1000,
      planned_w: 2000,
      planned_t: 3000,
      actual_l: 4000,
      actual_l: 4000,
      selected: false,
      actual_w: 5000,

      actual_t: 6000,
    },
    {
      id: 1,
      order: 2,
      slab_Id: 456,
      planned_l: 1000,
      planned_w: 2000,
      planned_t: 3000,
      actual_l: 4000,
      actual_l: 4000,
      selected: false,
      actual_w: 5000,

      actual_t: 6000,
    },
    {
      id: 2,
      order: 3,
      slab_Id: 789,
      planned_l: 1000,
      planned_w: 2000,
      planned_t: 3000,
      actual_l: 4000,
      actual_l: 4000,
      selected: false,
      actual_w: 5000,

      actual_t: 6000,
    },
    {
      id: 3,
      order: 4,
      slab_Id: 101112,
      planned_l: 1000,
      planned_w: 2000,
      planned_t: 3000,
      actual_l: 4000,
      actual_l: 4000,
      selected: false,
      actual_w: 5000,

      actual_t: 6000,
    },
  ]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (modifyTableData) {
      setSelectAll(!selectAll);
    }
  };

  const handleRowSelect = (id) => {
    if (modifyTableData) {
      const updatedTableData = tableData.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      );
      setTableData(updatedTableData);
    } else {
      toast({
        title: "Enable Editing",
        description: "",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, []);
  const [modifyTableData, setModifyTableData] = useState(false);

  const moveRow = (currentIndex, direction) => {
    if (modifyTableData) {
      const newIndex = currentIndex + direction;
      if (newIndex >= 0 && newIndex < tableData.length) {
        const updatedTableData = [...tableData];
        const movedRow = updatedTableData.splice(currentIndex, 1)[0];
        updatedTableData.splice(newIndex, 0, movedRow);

        setTableData(updatedTableData);
      }
    } else {
      toast({
        title: "Enable Editing",
        description: "",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem("tableData", JSON.stringify(data));
  };

  const handleSubmit = () => {
    console.log("krishna", tableData);
    saveToLocalStorage(tableData);
  };

  const enableEditing = (sts) => {
    setModifyTableData(sts);

    if (sts == false) {
      handleSubmit();
    }
  };

  const deleteRow = (id) => {
    if (modifyTableData) {
      const updatedTableData = tableData.filter((item) => item.id !== id);
      setTableData(updatedTableData);
    } else {
      toast({
        title: "Enable Editing",
        description: "",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex justify-start">
        {modifyTableData ? (
          <PrimaryButton
            text={"Save"}
            width={"fit-content"}
            onClick={() => enableEditing(false)}
          />
        ) : (
          // <button
          //   className="text-center p-[10px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#024D87] hover:bg-[#356ec3] rounded-md"
          //   onClick={() => enableEditing(true)}
          // >
          //   Enable Editing
          // </button>
          <PrimaryButton
            text={"Enable Editing"}
            width={"fit-content"}
            onClick={() => enableEditing(true)}
          />
        )}
      </div>

      {tableData.length != 0 && (
        <TableContainer className="!max-h-[50vh] !overflow-y-auto !w-full !mb-5">
          <Table variant="simple">
            <Thead className={`  bg-[#c5d8e6] !text-xs !sticky !top-0`}>
              <Tr>
                <Th color="#302F32" fontWeight={400}>
                  SEQUENCE. NO.
                </Th>
                <Th color="#302F32" fontWeight={400}>
                  SLAB ID.
                </Th>
                <Th color="#302F32" fontWeight={400}>
                  PLANNED LENGTH
                </Th>
                <Th color="#302F32" fontWeight={400}>
                  PLANNED WIDTH
                </Th>
                <Th color="#302F32" fontWeight={400}>
                  PLANNED THICKNESS
                </Th>
                <Th color="#302F32" fontWeight={400}>
                  ACTUAL LENGTH
                </Th>
                <Th color="#302F32" fontWeight={400}>
                  ACTUAL WIDTH
                </Th>
                <Th color="#302F32" fontWeight={400}>
                  ACTUAL THICKNESS
                </Th>
                <Th color="#302F32" fontWeight={400}>
                  SORT
                </Th>
                <Th color="#302F32" fontWeight={400}>
                  <div className="flex gap-3">
                    <p>Select All</p>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      disabled={!modifyTableData}
                      className="w-4 h-4"
                    />
                  </div>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((item, index) => {
                return (
                  <Tr
                    key={index}
                    className="!text-sm !text-[#3E3C42] text-center !font-medium even:bg-[#FAFAFA] odd:bg-white  border-[2px]"
                  >
                    <Td className="!text-center">
                      {" "}
                      <div className="flex gap-2 justify-center items-center">
                        <CloseIcon
                          onClick={() => deleteRow(item.id)}
                          className={` !font-bold text-[15px] ${
                            modifyTableData
                              ? "cursor-pointer  hover:scale-125 transition-transform hover:shadow-lg !text-[red] "
                              : "cursor-not-allowed !text-[grey]"
                          } `}
                        />
                        <p>{index + 1}</p>
                      </div>
                    </Td>
                    <Td className="!text-center">{item.slab_Id}</Td>
                    <Td className="!text-center">{item.planned_l}</Td>
                    <Td className="!text-center">{item.planned_w}</Td>
                    <Td className="!text-center"> {item.planned_t}</Td>
                    <Td className="!text-center">{item.actual_l}</Td>
                    <Td className="!text-center">{item.actual_w}</Td>
                    <Td className="!text-center">{item.actual_t}</Td>
                    <Td className="!text-center">
                      <div className=" flex flex-col justify-center items-center gap-2 ">
                        <ArrowUpIcon
                          onClick={() => moveRow(index, -1)}
                          className={`text-[18px] cursor-${
                            modifyTableData
                              ? "pointer  hover:scale-125 transition-transform hover:shadow-lg font-bold hover:text-[#024D87]"
                              : "not-allowed  font-normal"
                          } `}
                        />
                        <ArrowDownIcon
                          onClick={() => moveRow(index, 1)}
                          className={`text-[18px] cursor-${
                            modifyTableData
                              ? "pointer hover:scale-125 transition-transform hover:shadow-lg hover:text-[#024D87]"
                              : "not-allowed "
                          } `}
                        />
                      </div>
                    </Td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectAll || item.selected}
                        onChange={() => handleRowSelect(item.id)}
                        disabled={!modifyTableData}
                        className="w-4 h-4"
                      />
                    </td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default DynamicTable;
