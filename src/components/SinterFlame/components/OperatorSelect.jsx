//6AM to 2PM Shift A
// 2PM to 10PM Shift B
// 10PM to 6AM Shift C
import { Select, Td, IconButton, useToast } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { baseURL } from "../../..";
import NavContext from "../../NavContext";

const OperatorSelect = ({ data, clientId }) => {
  const a = ["Skipper", "Private", "King", "Mermen", "Classified"]; //incharge
  const b = ["Rico", "Kowloski", "Alex"]; //operator
  const shifts = ["C", "A", "B"];
  const [editing, setEditing] = useState(false);
  const [rowData, setRowData] = useState(data);
  const { auth } = useContext(NavContext);
  const toast = useToast();

  useEffect(() => {
    setRowData(data);
  }, [data]);

  const handleChange = (shift, e) => {
    setRowData((prev) => {
      const modData = { ...prev };
      modData["workers"][shift][e.target.name] = e.target.value;
      return modData;
    });
  };

  const apiCall = async () => {
    const startDate = new Date(rowData.startTs * 1000);
    const endDate = new Date(rowData.startTs * 1000);
    endDate.setHours(endDate.getHours() + 23);
    endDate.setMinutes(endDate.getMinutes() + 59);
    const requestBody = JSON.stringify({
      clientId: clientId,
      useCase: "SINTERFLAME",
      plantName: "chanderia",
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      workers: rowData?.workers,
    });
    try {
      const response = await axios.post(
        baseURL + "vision/v2/processMonitoring/workerInfo/shift/update/",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      if (response.status == 200) {
        toast({
          title: "Saved",
          description: "Changes are saved",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Changes are not saved",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  const handleSave = () => {
    setEditing(false);
    apiCall();
  };

  return (
    <>
      <Td padding={0} px={2} borderRight={"1px solid #D3D3D3"}>
        <div className="flex items-center justify-around gap-1">
          {!editing ? (
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="white"
              icon={<EditIcon />}
              color={"#818181"}
              onClick={() => setEditing(true)}
              size={"xs"}
            />
          ) : (
            <>
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="gray"
                icon={<CloseIcon />}
                color={"#818181"}
                onClick={() => setEditing(false)}
                size={"xs"}
              />
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="gray"
                icon={<SaveIcon />}
                color={"#818181"}
                onClick={() => handleSave()}
                size={"xs"}
              />
            </>
          )}
        </div>
      </Td>
      {shifts.map((i) => {
        return (
          <Td padding={0} px={2} borderRight={"1px solid #D3D3D3"}>
            <div className="w-full flex gap-2 items-center justify-between">
              {editing ? (
                <Select
                  size={"sm"}
                  color={"#3E3C42"}
                  fontWeight={500}
                  fontSize={"14px"}
                  border={0}
                  name="shiftIncharge"
                  value={rowData?.workers[i]?.shiftIncharge}
                  onChange={(e) => handleChange(i, e)}
                >
                  {a.map((val, index) => {
                    return (
                      <option key={index} value={val}>
                        {val}
                      </option>
                    );
                  })}
                </Select>
              ) : (
                <p className="w-full self-start">
                  {rowData?.workers[i]?.shiftIncharge}
                </p>
              )}
              {editing ? (
                <Select
                  size={"sm"}
                  color={"#3E3C42"}
                  fontWeight={500}
                  fontSize={"14px"}
                  border={0}
                  name="fieldOperator"
                  value={rowData?.workers[i]?.fieldOperator}
                  onChange={(e) => handleChange(i, e)}
                >
                  {b.map((val, index) => {
                    return (
                      <option key={index} value={val}>
                        {val}
                      </option>
                    );
                  })}
                </Select>
              ) : (
                <p className="w-full self-start">
                  {rowData?.workers[i]?.fieldOperator}
                </p>
              )}
            </div>
          </Td>
        );
      })}
    </>
  );
};

export default OperatorSelect;
