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
  Text,
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
  const [submitClicked, setSubmitClicked] = useState(false);
  const [error, setError] = useState("");

  const [selectedCountryCodeClient, setSelectedCountryCodeClient] =
    useState("+91");
  const [selectedCountryCodeRipik, setSelectedCountryCodeRipik] =
    useState("+91");

  const toast = useToast();
  const [relationDate, setRelationDate] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
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
  const isValidEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidName = (name) => {
    // Regular expression for a simple name validation
    const nameRegex = /^[a-zA-Z]{2,30}(?: [a-zA-Z]{2,30})*$/;
    return nameRegex.test(name);
  };

  const isValidClientPhoneNumber = (phoneNumber) => {
    // Regular expression for validating phone number (assuming digits only)
    const phoneNumberRegex = /^\d+$/;

    return (
      phoneNumber &&
      phoneNumberRegex.test(phoneNumber) &&
      phoneNumber.length >= 8 &&
      phoneNumber.length <= 15
    );
  };

  const handleSubmit = async () => {
    // Set submitClicked to true
    setSubmitClicked(true);
    if (!clientName || !isValidName(clientName)) {
      setError("Please enter a valid client name.");
      return;
    }
    if (!clientEmail || !isValidEmail(clientEmail)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!clientPhoneNumber || !isValidClientPhoneNumber(clientPhoneNumber)) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!ripikPhoneNumber || !isValidClientPhoneNumber(ripikPhoneNumber)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!ripikEmail || !isValidEmail(ripikEmail)) {
      setError("Please enter a valid email.");
      return;
    }

    // Clear any previous error
    setError("");

    // // Set submitClicked to true
    // setSubmitClicked(true);
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
        position: "top",
      });
      setTimeout(() => {
        navigate("/superadmin/addclient");
      }, 1500);
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
                  borderColor={
                    submitClicked && !isValidName(clientName) ? "red.500" : "gray.300"
                  }
                  borderWidth={"2px"}
                  onChange={(e) => setClientName(e.target.value)}
                />
                {/* {submitClicked && !clientName && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter the client name.
                  </Text>
                )} */}
                {/* Display error message if there is any */}
                {submitClicked && !isValidName(clientName) && (
                  <div className="text-red-500 text-sm mt-1">Please enter a valid name.</div>
                )}
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
                        // border
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
                        borderColor={
                          submitClicked && !companyType ? "red.500" : "gray.300"
                        }
                        isDisabled={""}
                      >
                        {x}
                      </Radio>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
            {submitClicked && !companyType && (
              <Text color="red.500" fontSize="sm" mt="1">
                Please select the company type.
              </Text>
            )}
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
                  borderColor={
                    submitClicked && !industryValue ? "red.500" : "gray.300"
                  }
                  borderWidth={"2px"}
                  onChange={(e) => setIndustryValue(e.target.value)}
                />
                {submitClicked && !clientName && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter the industry.
                  </Text>
                )}
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
                        borderColor={
                          submitClicked && !companySize ? "red.500" : "gray.300"
                        }
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
            {submitClicked && !companySize && (
              <Text color="red.500" fontSize="sm" mt="1">
                Please select the company size.
              </Text>
            )}
          </div>

          <div>
            <p className="text-[#79767D] text-sm font-medium mb-3">
              Number of users
            </p>
            <div style={{ width: "fit-content" }}>
              <Input
                type="text"
                value={numberOfUsers}
                borderColor={
                  submitClicked && !numberOfUsers ? "red.500" : "gray.300"
                }
                borderWidth={"2px"}
                onChange={(e) => setNumberOfUsers(e.target.value)}
              />
              {submitClicked && !numberOfUsers && (
                <Text color="red.500" fontSize="sm" mt="1">
                  Please enter Number of users.
                </Text>
              )}
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
                  borderColor={
                    submitClicked && !clientHqLocation ? "red.500" : "gray.300"
                  }
                  borderWidth={"2px"}
                />
                {submitClicked && !clientHqLocation && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter Client HQ location.
                  </Text>
                )}
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
                  borderColor={
                    submitClicked && !totalClientLocations
                      ? "red.500"
                      : "gray.300"
                  }
                  borderWidth={"2px"}
                />
                {submitClicked && !totalClientLocations && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter Total client locations.
                  </Text>
                )}
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
                  borderColor={
                    submitClicked && !allLocations ? "red.500" : "gray.300"
                  }
                  borderWidth={"2px"}
                />
                {submitClicked && !allLocations && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter all locations.
                  </Text>
                )}
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
                  borderColor={
                    submitClicked && !clientPrimaryContactName
                      ? "red.500"
                      : "gray.300"
                  }
                  borderWidth={"2px"}
                />
                {submitClicked && !clientPrimaryContactName && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter Primary contact name.
                  </Text>
                )}
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">E-mail</p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  borderColor={
                    submitClicked && !isValidEmail(clientEmail) ? "red.500" : "gray.300"
                  }
                  borderWidth={"2px"}
                />
                {/* {submitClicked && !clientEmail && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter the E-mail.
                  </Text>
                )} */}
                {/* Display error message if there is any */}
                {submitClicked && !isValidEmail(clientEmail) && (
                  <div className="text-red-500 text-sm mt-1">
                    Please enter a valid email."
                  </div>
                )}
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
                    w={submitClicked ? "125px" : "100px"}
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
                    borderColor={
                      submitClicked && !isValidClientPhoneNumber(clientPhoneNumber)
                        ? "red.500"
                        : "gray.300"
                    }
                    borderWidth={"2px"}
                  />
                </div>
                {/* {submitClicked && !clientPhoneNumber && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter the Phone number.
                  </Text>
                )} */}
                {submitClicked && !isValidClientPhoneNumber(clientPhoneNumber) && (
                  <div className="text-red-500 text-sm mt-1">
                    Please enter a valid phone number.
                  </div>
                )}
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
                  borderColor={
                    submitClicked && !clientSecContactName
                      ? "red.500"
                      : "gray.300"
                  }
                  borderWidth={"2px"}
                />
                {submitClicked && !clientSecContactName && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter Secondary contact name.
                  </Text>
                )}
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
                  borderColor={
                    submitClicked && !ripikPrimaryContactName
                      ? "red.500"
                      : "gray.300"
                  }
                  borderWidth={"2px"}
                />
                {submitClicked && !ripikPrimaryContactName && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter Primary contact name.
                  </Text>
                )}
              </div>
            </div>
            <div>
              <p className="text-[#79767D] text-sm font-medium mb-3">E-mail</p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  value={ripikEmail}
                  onChange={(e) => setRipikEmail(e.target.value)}
                  borderColor={
                    submitClicked && !isValidEmail(ripikEmail) ? "red.500" : "gray.300"
                  }
                  borderWidth={"2px"}
                />
                {/* {submitClicked && !ripikEmail && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter the E-mail.
                  </Text>
                )} */}
                {/* Display error message if there is any */}
                {submitClicked && !isValidEmail(ripikEmail) && (
                  <div className="text-red-500 text-sm mt-1">
                    Please enter a valid email.
                  </div>
                )}
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
                  w={submitClicked ? "125px" : "100px"}
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
                  borderColor={
                    submitClicked && !isValidClientPhoneNumber(ripikPhoneNumber)
                      ? "red.500"
                      : "gray.300"
                  }
                  borderWidth={"2px"}
                />
              </div>
              {/* {submitClicked && !ripikPhoneNumber && (
                <Text color="red.500" fontSize="sm" mt="1">
                  Please enter the Phone number.
                </Text>
              )} */}
              {submitClicked && !isValidClientPhoneNumber(ripikPhoneNumber) && (
                <div className="text-red-500 text-sm mt-1">
                  Please enter a valid phone number.
                </div>
              )}
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
                  borderColor={
                    submitClicked && !ripikSecContactName
                      ? "red.500"
                      : "gray.300"
                  }
                  borderWidth={"2px"}
                />
                {submitClicked && !ripikSecContactName && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter secondary contact name.
                  </Text>
                )}
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
                  borderColor={
                    submitClicked && !purchaseOrderCode ? "red.500" : "gray.300"
                  }
                  borderWidth={"2px"}
                />
                {submitClicked && !purchaseOrderCode && (
                  <Text color="red.500" fontSize="sm" mt="1">
                    Please enter First purchase order code.
                  </Text>
                )}
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
