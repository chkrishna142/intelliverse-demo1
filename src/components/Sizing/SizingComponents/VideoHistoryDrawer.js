import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

const VideoHistoryDrawer = ({ isOpen, onClose }) => {
  const history = [1, 2, 3, 4];
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        style={{
          position: "absolute",
          right: 65,
          top: 230,
          borderRadius: "12px 0 0 12px",
          height: "540px",
        }}
      >
        <DrawerHeader>
          <div className="flex justify-between pb-4">
            <p className="text-[#525056] font-medium text-sm">History</p>
            <img
              src="/SizingIcons/Hamburger.svg"
              alt="no Support"
              onClick={() => onClose()}
              className="cursor-pointer"
            />
          </div>
        </DrawerHeader>
        <DrawerBody>
          <div className="flex flex-col gap-4 overflow-y-auto">
            {history.map((id) => {
              return (
                <div key={id} className="flex gap-2">
                  <div className="relative">
                    <img
                      className="rounded-lg h-[10vh]"
                      src="https://media.istockphoto.com/id/1166589188/photo/mine-supervisor-walking-beside-raw-coal-ore-being-moved-and-transported-on-a-conveyor-belt.jpg?s=612x612&w=0&k=20&c=3XcI1vG0M3C8p018r0jrlCDCdLJiT3iYUmrcjZIqW9o="
                    />
                    <div className="bg-black rounded-md p-[2px] absolute bottom-2 right-2">
                      <p className="text-white text-xs font-semibold rounded-lg">
                        2:00
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <p className="text-[#605D64] text-sm font-medium">
                        Dhar Plant
                      </p>
                      <p className="text-[#938F96] text-xs font-medium">
                        Camera 2
                      </p>
                    </div>
                    <div className="flex flex-col text-[#AEA9B1] text-xs">
                      <p>12 may 2023</p>
                      <p>12:46 pm to 1:46 pm</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default VideoHistoryDrawer;
