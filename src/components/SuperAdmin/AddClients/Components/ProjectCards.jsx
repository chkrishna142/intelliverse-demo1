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
} from "@chakra-ui/react";
import { useContext } from "react";
import NavContext from "../../../NavContext";
import PrimaryButton from "../../../../util/Buttons/PrimaryButton";
import TonalButton from "../../../../util/Buttons/TonalButton";

const ProjectCard = ({ data }) => {
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
  const { auth } = useContext(NavContext);

  const handleClick = () => {};

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
          <div className="ml-3">
            <p className="text-[#3E3C42] text-base font-medium">
              {data.client}
            </p>
            <p className="text-[#79767D] text-sm font-medium">
              Since {data.founded}
            </p>
          </div>
        </div>
        <div className="flex  items-center justify-evenly">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#938F96]">Vision</p>
              <div className="flex items-center justify-center">
                <div className="">
                  <img src="/eye.svg" alt="" />
                </div>
                <div className="ml-2">
                  <p>{data.vision}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#938F96]">Optimus</p>
              <div className="flex items-center justify-center">
                <div className="">
                  <img src="/optimussquare.svg" alt="" />
                </div>
                <div className="ml-2">
                  <p>{data.optimus}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#938F96]">Users</p>
              <div className="flex items-center justify-center">
                <div className="">
                  <img src="/superusers.svg" alt="" />
                </div>
                <div className="ml-2">
                  <p>{data.users}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* {data.locations.map((item) => {
              return ( */}
          <p className="text-[#938F96]">Locations</p>
          <div className="flex justify-evenly gap-[2px]">
            <div className="flex items-center">
              <div>
                <img src="/location.png" alt="" />
              </div>
              <p className="text-[#938F96] ">{"Halol"}</p>
            </div>
            <div className="flex items-center">
              <div>
                <img src="/location.png" alt="" />
              </div>
              <p className="text-[#938F96] ">{"Basol"}</p>
            </div>
            <div className="flex items-center">
              <div>
                <img src="/location.png" alt="" />
              </div>
              <p className="text-[#938F96] ">{"Pathankot"}</p>
            </div>
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
        <PrimaryButton text={"View"} onClick={() => handleClick()} />
        <TonalButton text={"Update"} />
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
