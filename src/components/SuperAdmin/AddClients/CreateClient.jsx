import {
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  useToast,
  Select,
  Stack,
  Textarea,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { useState, useRef, useEffect, useContext } from "react";
import SecondaryButton from "../../../util/Buttons/SecondaryButton";
import TextButton from "../../../util/Buttons/TextButton";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import TonalButton from "../../../util/Buttons/TonalButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";

const CreateClient = () => {
  const { auth } = useContext(NavContext);
  const navigate = useNavigate();
  const [companyType, setCompanyType] = useState();
  const [industryValue, setIndustryValue] = useState("");
  const [subIndustryValue, setSubIndustryValue] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [numberOfUsers, setNumberOfUsers] = useState("");
  const [parentCompany, setParentCompany] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientHqLocation, setClientHqLocation] = useState("");
  const [hqLocationAddress, setHqLocationAddress] = useState("");
  const [allLocations, setAllLocations] = useState("");
  const [totalClientLocations, setTotalClientLocations] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPrimaryContactName, setClientPrimaryContactName] = useState("");
  const [clientSecContactName, setClientSecContactName] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [ripikPhoneNumber, setRipikPhoneNumber] = useState("");
  const [ripikEmail, setRipikEmail] = useState("");
  const [ripikSecContactName, setRipikSecContactName] = useState("");
  const [ripikPrimaryContactName, setRipikPrimaryContactName] = useState("");
  const [dealValue, setDealValue] = useState("");
  const [purchaseOrderCode, setPurchaseOrderCode] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitDisable, setSubmitDisable] = useState(true);

  const [selectedCountryCodeClient, setSelectedCountryCodeClient] =
    useState("+91");
  const [selectedCountryCodeRipik, setSelectedCountryCodeRipik] =
    useState("+91");

  const toast = useToast();
  const [relationDate, setRelationDate] = useState(
    new Date(
      new Date().getTime() - 30 * 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10)
  );

  const [productDate, setProductDate] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );
  const countryCodes = ["+91", "+1", "+44", "+81"];

  const handleIndustryChange = (event) => {
    setIndustryValue(event.target.value);
  };

  const handleSubIndustryChange = (event) => {
    setSubIndustryValue(event.target.value);
  };

  const handleCompanySizeChange = (value) => {
    setCompanySize(value);
  };

  const dataOptions = {
    companyType: {
      type: ["Public", "Private", "Others"],
    },
  };

  const handleDiscard = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDiscard = () => {
    // Handle discard logic
    setIsModalOpen(false);
    navigate("/superadmin/addclient");
  };
  const handleSubmit = async () => {
    // Check if any required field is empty

    if (
      !clientName ||
      !companyType ||
      !industryValue ||
      !companySize ||
      !numberOfUsers ||
      !clientHqLocation ||
      !totalClientLocations ||
      !allLocations ||
      !clientPrimaryContactName ||
      !clientEmail ||
      !clientPhoneNumber ||
      !clientSecContactName ||
      !clientSecContactName ||
      !ripikPrimaryContactName ||
      !ripikEmail ||
      !ripikPhoneNumber ||
      !ripikSecContactName ||
      !relationDate ||
      !purchaseOrderCode 
      // Add more conditions for other required fields
    ) {
      // Show a toast if any required field is empty
      toast({
        title: "Incomplete Details",
        description: "Please fill in all required details.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const data = {
      clientName: clientName,
      parentCompany: parentCompany,
      companyType: companyType,
      industry: industryValue,
      subIndustry: subIndustryValue,
      companySize: companySize,
      numberOfUsers: numberOfUsers,
      clientHqLocation: clientHqLocation,
      hqLocationAddress: hqLocationAddress,
      totalClientLocation: totalClientLocations,
      enterAllLocation: allLocations,
      clientPrimContactName: clientPrimaryContactName,
      clientPrimEmail: clientEmail,
      clientContactNumber: selectedCountryCodeClient + `${clientPhoneNumber}`,
      clientSecContactName: clientSecContactName,
      ripikContactPrimName: ripikPrimaryContactName,
      ripikContactEmail: ripikEmail,
      ripikContactNumber: selectedCountryCodeRipik + `${ripikPhoneNumber}`,
      ripikContactSecName: ripikSecContactName,
      creationAt: new Date().getTime(),
      lastUpdatedDate: new Date().getTime(),
      clientRelStartDate: relationDate,
      ripikProductUseDate: productDate,
      dealValue: dealValue,
      remarks: remarks,
      purchaseOrderCode: purchaseOrderCode,
    };
    try {
      const response = await axios.post(baseURL + "iam/addClient", data, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      });
        toast({
          title: "Client Added successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      console.log("submit", response.data);
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
    console.log("data", data);
  };
  useEffect(() => {}, []);
  const handleBackButton = () => {
    navigate("/superadmin/addclient");
  };
  console.log("ripik phone numb", selectedCountryCodeRipik + `${ripikPhoneNumber}`);
  return (
    <div className="font-roboto flex flex-col gap-2 mt-6">
      <div className="flex items-center">
        <div className="cursor-pointer w-8" onClick={handleBackButton}>
          <img
            src="/transactionhistory/backarrow.svg"
            className="w-full h-full"
            alt="backarrow_img"
          />
        </div>
        <p className="text-[#084298] font-medium text-xl ml-2">
          Add new client
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="p-6 rounded-lg flex flex-col gap-3 bg-white">
          <p className="text-[#3E3C42] text-lg font-medium ">
            Company information
          </p>

          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Client name
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={clientName}
                  required
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Parent company{" "}
                <span className="text-[#AEA9B1]">(if applicable)</span>
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={parentCompany}
                  onChange={(e) => setParentCompany(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[#3E3C42] text-lg font-medium">Company Type</p>

            <RadioGroup onChange={setCompanyType} value={companyType}>
              <div
                className="grid grid-cols-4 gap-2"
                style={{ width: "fit-content" }}
              >
                {dataOptions.companyType.type.map((x) => {
                  return (
                    <div
                      style={{
                        backgroundColor:
                          companyType == x ? "#DDEEFF80" : "#FFF",
                        borderRadius: "8px",
                        mb: "12px",
                      }}
                    >
                      <Radio
                        value={x}
                        py={"8px"}
                        pl={"8px"}
                        pr={"12px"}
                        fontSize={"14px"}
                        fontWeight={500}
                        color={"#3E3C42"}
                        _checked={{
                          bg: "#6CA6FC",
                          borderColor: "#6CA6FC",
                        }}
                        _hover={{
                          borderColor: "#6CA6FC",
                        }}
                        isDisabled={""}
                      >
                        {x}
                      </Radio>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-4 mt-5">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Industry
              </p>
              <div style={{ width: "fit-content", width: "225px" }}>
              <Input
                  type="text"
                  value={industryValue}
                  required
                  onChange={(e) => setIndustryValue(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Sub-Industry <span className="text-[#AEA9B1]">(optional)</span>
              </p>
              <div style={{ width: "fit-content", width: "225px" }}>
              <Input
                  type="text"
                  value={subIndustryValue}
                  required
                  onChange={(e) => setSubIndustryValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg flex flex-col gap-3 bg-white">
          <p className="text-[#3E3C42] text-lg font-medium ">Company size</p>

          <div className="flex flex-col gap-3">
            <p className="text-[#79767D] text-sm font-medium mb-1">
              Company Size
            </p>
            <RadioGroup onChange={setCompanySize} value={companySize}>
              <div
                className="grid grid-cols-4 gap-2"
                style={{ width: "fit-content" }}
              >
                {["Large", "Medium", "Small"].map((x) => (
                  <div key={x} className="flex items-center">
                    <div
                      style={{
                        backgroundColor:
                          companySize === x ? "#DDEEFF80" : "#FFF",
                        borderRadius: "8px",
                        mb: "12px",
                      }}
                    >
                      <Radio
                        value={x}
                        py={"8px"}
                        pl={"8px"}
                        pr={"12px"}
                        fontSize={"14px"}
                        fontWeight={500}
                        color={"#3E3C42"}
                        _checked={{
                          bg: "#6CA6FC",
                          borderColor: "#6CA6FC",
                        }}
                        _hover={{
                          borderColor: "#6CA6FC",
                        }}
                        isDisabled={""}
                      >
                        {x}
                      </Radio>
                    </div>
                    <span className="text-[#79767D] text-sm font-medium ml-2">
                      {x === "Large"
                        ? "(500+ employees)"
                        : x === "Medium"
                        ? "(50-100 employees)"
                        : "(<50 employees)"}
                    </span>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <p className="text-[#79767D] text-sm font-medium mb-3">
              Number of users
            </p>
            <div style={{ width: "fit-content" }}>
              <Input
                type="text"
                value={numberOfUsers}
                onChange={(e) => setNumberOfUsers(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg flex flex-col gap-3 bg-white">
          <p className="text-[#3E3C42] text-lg font-medium ">
            Company’s location
          </p>

          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Client HQ location
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={clientHqLocation}
                  onChange={(e) => setClientHqLocation(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                HQ location address
                <span className="text-[#AEA9B1]">(if applicable)</span>
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={hqLocationAddress}
                  onChange={(e) => setHqLocationAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Total client locations{" "}
                <span className="text-[#AEA9B1]">(count) </span>{" "}
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={totalClientLocations}
                  onChange={(e) => setTotalClientLocations(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Enter all locations
                <span className="text-[#AEA9B1]">
                  (use comma ‘ , ‘ to enter multiple locations)
                </span>
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={allLocations}
                  onChange={(e) => setAllLocations(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg flex flex-col gap-3 bg-white">
          <p className="text-[#3E3C42] text-lg font-medium ">
            Client’s contact details
          </p>

          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Primary contact name
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={clientPrimaryContactName}
                  onChange={(e) => setClientPrimaryContactName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">E-mail</p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Phone number
              </p>
              <div className="">
                <div className="flex ">
                  <Select
                    // border={"none"}
                    w={"100px"}
                    value={selectedCountryCodeClient}
                    onChange={(e) =>
                      setSelectedCountryCodeClient(e.target.value)
                    }
                  >
                    {countryCodes.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </Select>

                  <Input
                    type="tel"
                    value={clientPhoneNumber}
                    onChange={(e) => setClientPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Secondary contact name{" "}
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={clientSecContactName}
                  onChange={(e) => setClientSecContactName(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg flex flex-col gap-3 bg-white">
          <p className="text-[#3E3C42] text-lg font-medium ">
            Ripik's contact details
          </p>

          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Primary contact name
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={ripikPrimaryContactName}
                  onChange={(e) => setRipikPrimaryContactName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">E-mail</p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={ripikEmail}
                  onChange={(e) => setRipikEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Phone number
              </p>
              {/* <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={ripikPhoneNumber}
                  onChange={(e) => setRipikPhoneNumber(e.target.value)}
                />
              </div> */}
              <div className="flex ">
                <Select
                  // border={"none"}
                  w={"100px"}
                  value={selectedCountryCodeRipik}
                  onChange={(e) => setSelectedCountryCodeRipik(e.target.value)}
                >
                  {countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </Select>

                <Input
                  type="tel"
                  value={ripikPhoneNumber}
                  onChange={(e) => setRipikPhoneNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Secondary contact name
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={ripikSecContactName}
                  onChange={(e) => setRipikSecContactName(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg flex flex-col gap-3 bg-white">
          <p className="text-[#3E3C42] text-lg font-medium ">
            Client relation details
          </p>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Relation start date
              </p>
              <div>
                <FloatingInput
                  text=""
                  type="date"
                  setDateTime={setRelationDate}
                  value={relationDate}
                />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                First Ripik product use date
              </p>
              <div>
                <FloatingInput
                  text=""
                  type="date"
                  setDateTime={setProductDate}
                  value={productDate}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Deal value
                <span className="text-[#AEA9B1]">(optional)</span>
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  placeholder="₹"
                  value={dealValue}
                  onChange={(e) => setDealValue(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                First purchase order code
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={purchaseOrderCode}
                  onChange={(e) => setPurchaseOrderCode(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Remarks/additional information
                <span className="text-[#AEA9B1]">(optional)</span>
              </p>
              <div style={{ width: "" }}>
                <Textarea
                  style={{ width: "60vw" }}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[10px] items-center mt-2">
        <PrimaryButton
          text={"Submit"}
          width={"fit-content"}
          disable={""}
          onClick={handleSubmit}
        />
        <TonalButton
          text={"Discard"}
          width={"fit-content"}
          onClick={handleDiscard}
        />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader m={"auto"}>
              Are you sure you want to discard?
            </ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody m={"auto"} fontSize={"15px"}>
              Your changes will not be saved
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
                No
              </Button>
              <Button onClick={handleConfirmDiscard}>Yes, Discard</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default CreateClient;
