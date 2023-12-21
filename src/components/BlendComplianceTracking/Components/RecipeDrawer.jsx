import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Select,
  DrawerCloseButton,
  Table,
  Th,
  Tr,
  Tbody,
  Thead,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import TonalButton from "../../../util/Buttons/TonalButton";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const mach = {
  1: {
    loader: [4],
    hopper: [2, 3],
  },
  3: {
    loader: [5],
    hopper: [1],
  },
};

const dummy = [
  {
    concentrate: "C1",
    "blend ratio%": "26",
    bay: "2",
    section: "1",
    "200 mt": "Xx",
  },
  {
    concentrate: "C1",
    "blend ratio%": "26",
    bay: "2",
    section: "1",
    "200 mt": "Xx",
  },
  {
    concentrate: "C1",
    "blend ratio%": "26",
    bay: "2",
    section: "1",
    "200 mt": "Xx",
  },
  {
    concentrate: "C1",
    "blend ratio%": "26",
    bay: "2",
    section: "1",
    "200 mt": "Xx",
  },
];

const FileUploader = ({ file, setFile }) => {
  //init, success
  // 0 no file 1 success
  const [idx, setIdx] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const bg = ["#FFFFED", "#CDEEBF33"];
  const color = ["#FFC107", "#69B04B"];
  const state = ["fileYellow", "fileSuccess"];
  const fileRef = useRef();

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    if (
      files.type !=
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
      setIsCorrect(false);
    else {
      setFile(files);
      setIsCorrect(true);
    }
  };

  useEffect(() => {
    if (file) setIdx(1);
    else setIdx(0);
  }, [file]);

  return (
    <div
      className="w-full py-3 pl-6 pr-[60x] border-[1.5px] border-dashed flex gap-4 items-center rounded"
      style={{ borderColor: color[idx], backgroundColor: bg[idx] }}
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        ref={fileRef}
        type="file"
        hidden
        accept=".xlsx"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <img src={`/BlendComplianceIcons/${state[idx]}.svg`} alt="file" />
      {idx == 0 ? (
        <div className="flex flex-col gap-2">
          <p className="text-[#3E3C42] text-sm">
            Drag and Drop file or{" "}
            <span
              className="text-[#447ED4] font-medium cursor-pointer"
              onClick={() => fileRef.current.click()}
            >
              Choose file{" "}
            </span>{" "}
            to upload
          </p>
          {isCorrect ? (
            <p className="text-[#79767D] text-sm">Supported formats: .xlsx.</p>
          ) : (
            <p className="text-[#DC362E] text-sm">
              Incorrect data format or column headers. Please upload correct
              file.
            </p>
          )}
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center text-sm text-[#3E3C42]">
            <img src={`/BlendComplianceIcons/filexlsx.svg`} alt="file" />
            <p className="font-medium">{file?.name}</p>
            <p>successfully uploaded</p>
          </div>
          <img
            src="/SinterflameIcons/cross.svg"
            className="hover:scale-105 cursor-pointer"
            onClick={() => {
              setFile(null);
            }}
            alt="cross"
          />
        </div>
      )}
    </div>
  );
};

const RecipeDrawer = ({ closeModal, openModal, existing = false }) => {
  const columns = ["concentrate", "blend ratio%", "bay", "section", "200 mt"];
  const [file, setFile] = useState(null);
  const [sm, setSm] = useState(1);
  return (
    <Drawer onClose={closeModal} isOpen={openModal} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader padding="0px" position={"relative"}>
          <img
            style={{ boxShadow: "0px 2px 35px 0px rgba(0, 0, 0, 0.06)" }}
            src="/SinterflameIcons/cross.svg"
            alt="Not supported"
            onClick={closeModal}
            className="absolute top-4 right-4 cursor-pointer hover:scale-105"
          />
        </DrawerHeader>
        <DrawerBody px={"24px"} pb={"24px"} pt={"40px"}>
          <div className="flex flex-col gap-6">
            <p className="text-[#3E3C42] text-lg font-medium">
              {existing ? "Use Existing Recipe" : "Upload Blend Recipe"}
            </p>
            <div className="flex flex-col gap-4 items-start">
              <p className="text-[#3E3C42] text-base font-medium">
                {existing ? "Use existing recipe for" : "Upload recipe for"}
              </p>
              <div className="flex gap-3 items-center">
                <Select
                  fontSize={"14px"}
                  fontWeight={500}
                  color={"#3E3C42"}
                  border={"1px solid #E0E0E0"}
                  bg={"#EBEBEB4D"}
                  padding={0}
                  width={"fit-content"}
                  size="sm"
                  rounded={"4px"}
                  icon={<ArrowDropDownIcon />}
                  onChange={(e) => setSm(e.target.value)}
                  value={sm}
                >
                  {["1", "3"].map((x) => {
                    return (
                      <option value={x} style={{ padding: "0px" }}>
                        SM {x}
                      </option>
                    );
                  })}
                </Select>
                <Select
                  fontSize={"14px"}
                  fontWeight={500}
                  color={"#3E3C42"}
                  border={"1px solid #E0E0E0"}
                  bg={"#EBEBEB4D"}
                  padding={0}
                  width={"fit-content"}
                  size="sm"
                  rounded={"4px"}
                  icon={<ArrowDropDownIcon />}
                >
                  {mach[sm]?.hopper?.map((x) => {
                    return (
                      <option value={x} style={{ padding: "0px" }}>
                        Hopper {x}
                      </option>
                    );
                  })}
                </Select>
                <Select
                  fontSize={"14px"}
                  fontWeight={500}
                  color={"#3E3C42"}
                  border={"1px solid #E0E0E0"}
                  bg={"#EBEBEB4D"}
                  padding={0}
                  width={"fit-content"}
                  size="sm"
                  rounded={"4px"}
                  icon={<ArrowDropDownIcon />}
                >
                  {mach[sm]?.loader?.map((x) => {
                    return (
                      <option value={x} style={{ padding: "0px" }}>
                        Loader {x}
                      </option>
                    );
                  })}
                </Select>
              </div>
            </div>
            {!existing && <FileUploader file={file} setFile={setFile} />}
            {(file || existing) && (
              <div className="flex flex-col gap-3">
                <p className="text-[#3E3C42] text-base font-medium">
                  {existing ? "Existing recipe" : "Your uploaded recipe"}
                </p>
                <TableContainer width={"full"} roundedTop={"8px"}>
                  <Table
                    variant="simple"
                    borderTopRadius={"8px"}
                    width={"full"}
                  >
                    <Thead bg={"#DEF"} position={"sticky"} top={"0px"}>
                      <Tr>
                        {columns.map((item) => {
                          return (
                            <Th
                              color="#79767D"
                              fontSize={"12px"}
                              fontWeight={400}
                              py={"12px"}
                              px={"12px"}
                              textAlign={"center"}
                            >
                              {item.toUpperCase()}
                            </Th>
                          );
                        })}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dummy.map((item) => {
                        return (
                          <Tr>
                            {columns.map((x) => {
                              return (
                                <Td
                                  color={"#3E3C42"}
                                  fontSize={"14px"}
                                  fontWeight={500}
                                  textAlign={"center"}
                                >
                                  {item[x]}
                                </Td>
                              );
                            })}
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            )}
            <div className="flex gap-6 items-center self-end">
              <TonalButton
                text={"Discard"}
                width={"fit-content"}
                onClick={closeModal}
              />
              <PrimaryButton
                text={"Save Recipe"}
                width={"fit-content"}
                disable={!existing && !file}
                onClick={closeModal}
              />
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default RecipeDrawer;
