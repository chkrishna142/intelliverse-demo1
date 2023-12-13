import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Checkbox,
  Stack,
  ListItem,
  UnorderedList,
  Select,
  ModalHeader,
  useToast,
  Text,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import PrimaryButton from "../../util/Buttons/PrimaryButton";
import TonalButton from "../../util/Buttons/TonalButton";
import ConfirmationModal from "./ConfirmationModal";
import { baseURL } from "../.././index";
import axios from "axios";
import NavContext from ".././NavContext";
import { useNavigate } from "react-router-dom";

const RequestUseCaseModal = ({ isOpen, onOpen, onClose, size }) => {
  const { auth } = useContext(NavContext);

  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [briefDescription, setBriefDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [otherCategory, setOtherCategory] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("₹");
  const [selectedNonFinancialBenefits, setSelectedNonFinancialBenefits] =
    useState("");
  const [financialValue, setFinancialValue] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setSubmitted(false);
  }, [onClose]);

  const handleDiscard = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDiscard = () => {
    // Handle discard logic
    setIsModalOpen(false);
    onClose();
    navigate("/");
  };

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (category === "Others") {
        // If "Others" is checked, clear other selected categories and set "Others" value
        return prevCategories.includes("Others") ? [] : ["Others"];
      } else {
        // If any other category is checked, remove "Others" from selectedCategories
        return prevCategories.includes("Others")
          ? [category]
          : prevCategories.includes(category)
          ? prevCategories.filter((cat) => cat !== category)
          : [...prevCategories, category];
      }
    });
  };

  const handleOtherInputChange = (e) => {
    setOtherCategory(e.target.value);
  };

  const handleSubmit = async () => {
    // Set submitClicked to true
    setSubmitClicked(true);
    setIsLoading(true);

    if (
      !briefDescription ||
      !selectedCategories.length ||
      (selectedCategories.includes("Others") && !otherCategory) ||
      !detailedDescription
    ) {
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
      description: briefDescription,
      category: `${
        selectedCategories.includes("Others")
          ? otherCategory
          : selectedCategories.join(", ")
      }`,
      detailDescription: detailedDescription,
      financialValue: `${selectedCurrency} ${financialValue}`,
      nonFinancialValue: selectedNonFinancialBenefits,
    };
    try {
      const response = await axios.post(baseURL + "iam/addUseCase", data, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      });
      setIsLoading(false);
      setSubmitted(true);

      console.log("submit", response);
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
    // console.log(data);

    setBriefDescription("");
    setFinancialValue("");
    setSelectedCategories([]);
    setOtherCategory("");
    setSelectedNonFinancialBenefits("");
    setDetailedDescription("");
  };
  console.log("cat", otherCategory);
  console.log("se", selectedCategories);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
        <ModalOverlay />
        <ModalContent>
          <div className="text-white w-full h-16 flex bg-[#034D86] font-semibold justify-center items-center rounded-t-md">
            Request Use Case
          </div>
          <ModalCloseButton className="mt-2" color={"white"} />
          <ModalBody maxHeight={'80vh'} overflowY={'auto'}>
            {submitted === false ? (
              <div className="overflow-y-auto">
                <div className="mt-2">
                  <p className="font-semibold ">Brief description </p>
                  <Input
                    placeholder="Brief about use case"
                    mt={2}
                    value={briefDescription}
                    borderColor={
                      submitClicked && !briefDescription
                        ? "red.500"
                        : "gray.300"
                    }
                    borderWidth={"2px"}
                    onChange={(e) => setBriefDescription(e.target.value)}
                    // className="h-18 w-full border rounded-md mt-3 px-2 py-2 md:text-sm text-[10px]"
                  />
                  {submitClicked && !briefDescription && (
                    <Text color="red.500" fontSize="sm" mt="1">
                      Please provide a brief description.
                    </Text>
                  )}
                </div>
                <div className="mt-3">
                  <p className="font-semibold ">
                    Select category{" "}
                    <span className="text-[#AEA9B1]">(optional)</span>
                  </p>
                  <div className="flex gap-10 mt-5">
                    <Stack spacing={5}>
                      <Checkbox
                        isDisabled={selectedCategories.includes("Others")}
                        onChange={() =>
                          handleCheckboxChange("Raw material sizing")
                        }
                      >
                        Raw material sizing
                      </Checkbox>
                      <Checkbox
                        isDisabled={selectedCategories.includes("Others")}
                        onChange={() =>
                          handleCheckboxChange("Flare/Flame monitoring")
                        }
                      >
                        Flare/Flame monitoring
                      </Checkbox>
                    </Stack>
                    <Stack spacing={5}>
                      <Checkbox
                        isDisabled={selectedCategories.includes("Others")}
                        onChange={() =>
                          handleCheckboxChange("Quality tracking/monitoring")
                        }
                      >
                        Quality tracking/monitoring
                      </Checkbox>
                      <Checkbox
                        isDisabled={selectedCategories.includes("Others")}
                        onChange={() =>
                          handleCheckboxChange("Workforce monitoring")
                        }
                      >
                        Workforce monitoring
                      </Checkbox>
                    </Stack>
                    <Stack>
                      <Checkbox onChange={() => handleCheckboxChange("Others")}>
                        Others
                      </Checkbox>
                      {selectedCategories.includes("Others") && (
                        <Input
                          placeholder="Specify other category"
                          value={otherCategory}
                          onChange={handleOtherInputChange}
                        />
                      )}
                    </Stack>
                  </div>
                </div>
                <div className="mt-2">
                  <p className=" font-semibold mt-5">Detailed description</p>
                  <p className="text-[14px] text-[#AEA9B1] mt-2">
                    Please Include
                  </p>
                  <UnorderedList
                    color={"#AEA9B1"}
                    ml={7}
                    fontSize={"14px"}
                    lineHeight={7}
                  >
                    <ListItem>A clear description of the new use case</ListItem>
                    <ListItem>
                      Intended objectives, benefits, and usage
                    </ListItem>
                    <ListItem>
                      Any specific requirements or unique aspects of the use
                      case that you believe are important for us to consider
                    </ListItem>
                  </UnorderedList>
                  <textarea
                    className={`h-[150px] w-full border-solid border-2 rounded-md mt-3 px-2 py-2 md:text-sm text-[10px] ${
                      submitClicked && !detailedDescription
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={detailedDescription}
                    onChange={(e) => setDetailedDescription(e.target.value)}
                  />
                  {submitClicked && !detailedDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      Please provide a detailed description.
                    </p>
                  )}
                </div>
                <div className="flex w-[75%] gap-3">
                  <div>
                    <InfoOutlineIcon color={"#AEA9B1"} />
                  </div>
                  <p className="text-[#AEA9B1] text-[14px]">
                    The more information you provide, the better we can assess
                    the feasibility and potential impact of adding this use case
                    to our plattorm.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mt-5 mb-3">
                    Financial value (appoximate)
                    <span className="text-[#AEA9B1]">(optional)</span>
                  </p>

                  <div className="flex ">
                    <Select
                      w="80px"
                      value={selectedCurrency}
                      color={"black"}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                    >
                      <option value="₹">₹</option>
                      <option value="$">$</option>
                      <option value="€">€</option>
                    </Select>

                    <Input
                      w="300px"
                      value={financialValue}
                      onChange={(e) => setFinancialValue(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <p className="font-semibold ">
                      Non-financial benefits
                      <span className="text-[#AEA9B1]">(optional)</span>
                    </p>
                    <Input
                      mt={3}
                      value={selectedNonFinancialBenefits}
                      onChange={(e) =>
                        setSelectedNonFinancialBenefits(e.target.value)
                      }
                    />
                  </div>

                  <div className="flex mt-5 gap-3">
                    <div className="mt-1">
                      <InfoOutlineIcon color={"#AEA9B1"} />
                    </div>
                    <p className="text-[#AEA9B1] mt-1">Disclaimer</p>
                  </div>
                  <p className="text-[#AEA9B1] mt-3 text-[14px]">
                    While we appreciate your suggestions, inclusion is not
                    guaranteed. We evaluate each for technical feasibility,
                    financial viability, and demand. We reserve the right to
                    assess the impact of each proposal in enhancing the Ripik
                    platfrom. Your input is valuable, and we thank you for
                    contributing.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mt-5 w-full flex justify-center">
                  <img src="addusecase_submitted.svg" alt="submitted" />
                </div>
                <div className="mt-5 w-full flex justify-center font-bold text-[#034D86] text-lg">
                  Request Submitted
                </div>
                <div className="text-[#141619] font-light text-sm flex justify-center w-full px-2  mt-4">
                  Thank you for submitting your request to add a new use case to
                  our platform. Your input is valuable to us as we continue to
                  enhance our services. We appreciate the effort you've taken to
                  provide the details.
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter justifyContent={"flex-start"}>
            {submitted === false ? (
              <div className="flex gap-[10px] items-center mt-2">
                <PrimaryButton
                  text={isLoading ? "Submitting..." : "Submit"}
                  width={"fit-content"}
                  onClick={handleSubmit}
                />
                <TonalButton
                  text={"Discard"}
                  width={"fit-content"}
                  onClick={handleDiscard}
                />
                <Modal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  isCentered
                  size="sm"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader
                      textAlign="center"
                      fontSize="lg"
                      fontWeight="bold"
                    >
                      Discard Information?
                    </ModalHeader>
                    <ModalBody textAlign="center" fontSize="sm">
                      Are you sure you want to discard the entered information
                      and go to homescreen?
                    </ModalBody>

                    <ModalFooter justifyContent="center">
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handleCloseModal}
                      >
                        No
                      </Button>
                      <Button onClick={handleConfirmDiscard}>Yes</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            ) : (
              <button
                onClick={onClose}
                className="bg-[#084298] text-white px-7 py-2 rounded-md mb-5 ml-[45%]"
                mr={3}
              >
                Close
              </button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RequestUseCaseModal;
