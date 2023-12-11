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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";

const ViewClient = () => {
  const { auth } = useContext(NavContext);
  const { clientId } = useParams();
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

  const toast = useToast();
  const [relationDate, setRelationDate] = useState("");

  const [productDate, setProductDate] = useState("");
  const fetchClientDetails = async () => {
    // Check if any required field is empty

    try {
      const response = await axios.get(
        baseURL + `iam/fetchClientById?clientId=${clientId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      //   toast({
      //     title: "Client",
      //     description: "Please fill in all required details.",
      //     status: "error",
      //     duration: 4000,
      //     isClosable: true,
      //     position: 'top',
      //   });
      const data = response.data.clientData;
      setCompanyType(data.companyType);
      setIndustryValue(data.companyType);
      setSubIndustryValue(data.industry);
      setCompanySize(data.companySize);
      setNumberOfUsers(data.numberOfUsers);
      setParentCompany(data.parentCompany);
      setClientName(data.clientName);
      setClientHqLocation(data.clientHqLocation);
      setHqLocationAddress(data.hqLocationAddress);
      setAllLocations(data.enterAllLocation);
      setTotalClientLocations(data.totalClientLocation);
      setClientEmail(data.clientPrimEmail);
      setClientPrimaryContactName(data.clientPrimContactName);
      setClientSecContactName(data.clientSecContactName);
      setClientPhoneNumber(data.clientContactNumber);
      setRipikPhoneNumber(data.ripikContactNumber);
      setRipikEmail(data.ripikContactEmail);
      setRipikSecContactName(data.ripikContactSecName);
      setRipikPrimaryContactName(data.ripikContactPrimName);
      setDealValue(data.dealValue);
      setPurchaseOrderCode(data.purchaseOrderCode);
      setRemarks(data.remarks);
      setProductDate(data.ripikProductUseDate);
      setRelationDate(data.clientRelStartDate);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchClientDetails();
  }, []);
  // console.log("cmp type", allLocations, totalClientLocations);
  const handleBackButton = () => {
    navigate("/superadmin/addclient");
  };
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
          Client Details
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
                <Input type="text" value={clientName} readOnly />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Parent company{" "}
                <span className="text-[#AEA9B1]">(if applicable)</span>
              </p>
              <div style={{ width: "fit-content" }}>
                <Input type="text" value={parentCompany} readOnly />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[#3E3C42] text-lg font-medium">Company Type</p>

            <div style={{ width: "fit-content" }}>
              <Input type="text" value={companyType} readOnly />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-5">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Industry
              </p>
              <div style={{ width: "fit-content" }}>
                <Input type="text" value={industryValue} readOnly />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Sub-Industry <span className="text-[#AEA9B1]">(optional)</span>
              </p>
              <div style={{ width: "fit-content" }}>
                <Input type="text" value={subIndustryValue} readOnly />
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
            <div style={{ width: "fit-content" }}>
              <Input type="text" value={companySize} readOnly />
            </div>
          </div>

          <div>
            <p className="text-[#79767D] text-sm font-medium mb-3">
              Number of users
            </p>
            <div style={{ width: "fit-content" }}>
              <Input type="text" value={numberOfUsers} readOnly />
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
                <Input type="text" value={clientHqLocation} readOnly />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                HQ location address
                <span className="text-[#AEA9B1]">(if applicable)</span>
              </p>
              <div style={{ width: "fit-content" }}>
                <Input type="text" value={hqLocationAddress} readOnly />
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
                <Input type="text" value={totalClientLocations} readOnly />
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
                <Input type="text" value={allLocations} readOnly />
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
                <Input type="text" value={clientPrimaryContactName} readOnly />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">E-mail</p>
              <div style={{ width: "fit-content" }}>
                <Input type="email" value={clientEmail} readOnly />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Phone number
              </p>
              <div style={{ width: "fit-content" }}>
                <Input type="email" value={clientPhoneNumber} readOnly />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Secondary contact name{" "}
              </p>
              <div style={{ width: "fit-content" }}>
                <Input type="text" value={clientSecContactName} readOnly />
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
                <Input type="text" value={ripikPrimaryContactName} readOnly />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">E-mail</p>
              <div style={{ width: "fit-content" }}>
                <Input type="text" value={ripikEmail} readOnly />
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
              <div style={{ width: "fit-content" }}>
                <Input type="text" value={ripikPhoneNumber} readOnly />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                Secondary contact name
              </p>
              <div style={{ width: "fit-content" }}>
                <Input type="text" value={ripikSecContactName} readOnly />
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
                <Input
                  type="text"
                  placeholder="₹"
                  value={relationDate}
                  readOnly
                />
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                First Ripik product use date
              </p>
              <div>
                <Input
                  type="text"
                  placeholder="₹"
                  value={productDate}
                  readOnly
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
                <Input type="text" placeholder="₹" value={dealValue} readOnly />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">
                First purchase order code
              </p>
              <div style={{ width: "fit-content" }}>
                <Input type="text" value={purchaseOrderCode} readOnly />
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
                <Textarea style={{ width: "60vw" }} value={remarks} readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
