import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Badge,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

import PrimaryButton from "../../../../util/Buttons/PrimaryButton";
import TonalButton from "../../../../util/Buttons/TonalButton";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../../index";
import NavContext from "../../../NavContext";
import axios from "axios";

const ProjectCard = ({ data, fetchClientsFun }) => {
  const { auth } = useContext(NavContext);
  const toast = useToast();
  const navigate = useNavigate();
  const [isSwitchOn, setIsSwitchOn] = useState(data.isdeleted);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSwitchChange = async () => {
    setIsSwitchOn(!isSwitchOn);
    await deleteClient();
    fetchClientsFun();
    

    setTimeout(() => {
      setIsMenuOpen(false);
    }, 1000);
  };

  const deleteClient = async () => {
    const clientId = data.clientId;

    try {
      const response = await axios.delete(baseURL + "iam/deleteClient", {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
        data: {
          clientId: clientId,
        },
      });

      // toast({
      //   title: "Client disabled",
      //   status: "Success",
      //   duration: 4000,
      //   isClosable: true,
      //   position: "top",
      // });
      console.log("clients", response);
    } catch (error) {
      // toast({
      //   title: "Something went wrong",
      //   status: "error",
      //   duration: 4000,
      //   isClosable: true,
      //   position: "top",
      // });
      console.log(error);
    }
  };

  const switchLabelText = isSwitchOn ? "Disable" : "Enable";
  const info = [
    {
      type: "Model",
      icon: "/selfServiceIcons/azure.svg",
      name: "Azure",
    },
    {
      type: "Data set",
      icon: "/selfServiceIcons/img.svg",
      name: "Image",
    },
  ];
  const options = [
    {
      type: "Download",
      icon: "/selfServiceIcons/download.svg",
    },
    {
      type: "Share",
      icon: "/selfServiceIcons/share.svg",
    },
  ];

  const handleClick = () => {
    navigate(`/superadmin/viewClient/${data.clientId}`);
  };

  const handleUpdate = () => {
    navigate(`/superadmin/update/${data.clientId}`);
  };
  const locationString = data.totalClientLocation;
  const locations = locationString.split(",");
  const maxLocationsToShow = 3;

  const formatDate = (timestamp) => {
    // Create a new Date object using the provided timestamp (in milliseconds)
    const date = new Date(timestamp);
  
    // Define the date formatting options
    const options = {
      month: 'long',    // Display the full month name
      year: 'numeric',  // Display the full year
    };
  
    // Format the date using the specified options
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
    // Get the day of the month and determine the appropriate suffix (st, nd, rd, or th)
    const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date);
    const suffix = getDaySuffix(day);
  
    // Combine the day, suffix, and formatted date to create the final date string
    return `${day}${suffix} ${formattedDate}`;
  };
  
  const getDaySuffix = (day) => {
    // Determine the day suffix based on common English rules
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  
  return (
    <div
      className="px-4 py-5 rounded flex flex-col gap-10 relative bg-white"
      style={{
        boxShadow:
          "-4px -4px 24px 0px rgba(0, 0, 0, 0.07), 4px 4px 24px 0px rgba(0, 0, 0, 0.07)",
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-0">
          <div>
            <img src="/asianpaints.png" alt="" />
          </div>
          <div className="ml-2">
            <p className="text-[#3E3C42] text-[16px] font-medium">
              {data.clientName}
            </p>
            <p className=" text-sm font-medium">
              <span className="text-[#79767D]">Since</span>{" "}
              {formatDate(data.creationAt)}
            </p>
          </div>
          <div className="mb-5">
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<img src="/selfServiceIcons/menu.svg" alt="menu" />}
                variant="simple"
                position={"absolute"}
                top={"20px"}
                right={"8px"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <MenuList
                px={"12px"}
                py={"16px"}
                rounded={"8px"}
                display={"flex"}
                flexDirection={"column"}
                gap={"16px"}
                minWidth={"fit-content"}
                w={"180px"}
                position={"absolute"}
                right={"-50px"}
                top={"-15px"}
              >
                <MenuItem
                  icon={<DownloadIcon />}
                  textColor={"#605D64"}
                  fontSize={"14px"}
                  fontWeight={500}
                  p={"8px"}
                  _hover={{ bg: "#DDEEFF80", borderRadius: "4px" }}
                  _focus={{ bg: "#DDEEFF80", borderRadius: "4px" }}
                >
                  {"Download"}
                </MenuItem>
                <div className="flex items-center justify-center">
                  <p className="mr-2">{`${switchLabelText}`}</p>
                  <Switch
                    size="md"
                    colorScheme="green" // Choose your preferred color scheme
                    isChecked={isSwitchOn}
                    onChange={handleSwitchChange}
                  />
                </div>
              </MenuList>
            </Menu>
          </div>
          <div></div>
        </div>
        <div className="flex  items-center justify-between">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#938F96] text-sm">Vision</p>
              <div className="flex items-center justify-center">
                <div className="">
                  <img src="/eye.svg" alt="" />
                </div>
                <div className="ml-2">
                  <p>{4}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#938F96] text-sm">Optimus</p>
              <div className="flex items-center justify-center">
                <div className="">
                  <img src="/optimussquare.svg" alt="" />
                </div>
                <div className="ml-2">
                  <p>{"5"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#938F96] text-sm">Users</p>
              <div className="flex items-center justify-center">
                <div className="">
                  <img src="/superusers.svg" alt="" />
                </div>
                <div className="ml-2">
                  <p>{6}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[#938F96]">Locations</p>
          <div className="flex gap-[2px]">
            {locations.slice(0, maxLocationsToShow).map((location, index) => (
              <div key={index} className="flex items-center">
                <div>
                  <img src="/location.png" alt="" />
                </div>
                <p className="text-[#938F96] ">{location}</p>
              </div>
            ))}
            {locations.length > maxLocationsToShow && (
              <Badge>+{locations.length - maxLocationsToShow}</Badge>
            )}
          </div>
          {/* );
            })} */}
        </div>
        {/* <div className="flex gap-9 items-center">
            {info.map((item) => {
              return (
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[#938F96] text-xs">{item.type}</p>
                  <p className="text-[#525056] text-sm flex gap-1 items-center">
                    <img src={item.icon} alt={item.name} />
                    <p>{item.name}</p>
                  </p>
                </div>
              );
            })}
          </div> */}
      </div>
      <div className="flex gap-2 items-center">
        <PrimaryButton
          text={"View"}
          onClick={() => handleClick()}
          disable={data.isdeleted}
        />
        <TonalButton
          text={"Update"}
          onClick={() => handleUpdate()}
          disable={data.isdeleted}
        />
      </div>
      {/* <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<img src="/selfServiceIcons/menu.svg" alt="menu" />}
            variant="simple"
            position={"absolute"}
            top={"20px"}
            right={"8px"}
          />
          <MenuList
            px={"12px"}
            py={"16px"}
            rounded={"8px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"16px"}
            minWidth={"fit-content"}
            w={"180px"}
            position={"absolute"}
            right={"-50px"}
            top={"-15px"}
          >
            {options.map((item) => {
              return (
                <MenuItem
                  icon={<img src={item.icon} alt={item.type} />}
                  textColor={"#605D64"}
                  fontSize={"14px"}
                  fontWeight={500}
                  p={"8px"}
                  _hover={{ bg: "#DDEEFF80", borderRadius: "4px" }}
                  _focus={{ bg: "#DDEEFF80", borderRadius: "4px" }}
                >
                  {item.type}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu> */}
    </div>
  );
};

export default ProjectCard;
