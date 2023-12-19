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
  useToast,
} from "@chakra-ui/react";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import TonalButton from "../../../util/Buttons/TonalButton";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../..";
import NavContext from "../../NavContext";
import { useContext } from "react";
import axios from "axios";

const ProjectCard = ({ data, fetchData }) => {
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
      type: "Share access",
      icon: "/selfServiceIcons/share.svg",
    },
    {
      type: "Delete",
      icon: "/delete.svg",
    },
  ];
  const { auth } = useContext(NavContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Sandbox/View/${data?.projectId}`);
  };

  const deleteApi = async () => {
    try {
      const param = {
        projectId: data?.projectId,
      };
      const response = await axios.post(
        baseURL + "selfserve/v1/project/v1/delete/",
        null,
        {
          params: param,
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      if (response.status == 200) {
        toast({
          title: "Successfully deleted",
          description: `Project ${data?.name} deleted`,
          status: "success",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `Delete api error`,
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleMenuClick = (val) => {
    switch (val) {
      case "Delete":
        deleteApi();
        break;
      default:
        console.log("error");
    }
  };

  return (
    <div
      className="h-[210px] px-4 py-5 rounded flex flex-col gap-10 relative bg-white"
      style={{
        boxShadow:
          "-4px -4px 24px 0px rgba(0, 0, 0, 0.07), 4px 4px 24px 0px rgba(0, 0, 0, 0.07)",
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0">
          <p className="text-[#3E3C42] text-base font-medium">{data?.name}</p>
          <p className="text-[#79767D] text-xs font-medium">
            {new Date(data?.createdAt)?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-9 items-center">
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
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <PrimaryButton text={"View"} onClick={() => handleClick()} />
        <TonalButton text={"Duplicate"} />
      </div>
      <Menu>
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
                icon={
                  <img
                    src={item.icon}
                    alt={item.type}
                    height={"15px"}
                    width={"15px"}
                  />
                }
                textColor={"#605D64"}
                fontSize={"14px"}
                fontWeight={500}
                p={"2px"}
                _hover={{ bg: "#DDEEFF80", borderRadius: "4px" }}
                _focus={{ bg: "#DDEEFF80", borderRadius: "4px" }}
                onClick={() => handleMenuClick(item.type)}
              >
                {item.type}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
};

export default ProjectCard;
