import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

let wordLimit = 500;

const ReadMore = ({ setHomebadge }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [badges, setBadges] = useState([
    {
      index: 0,
      badgeLogo: "/advisor/newBadge.svg",
      tag: "Newbie Explorer",
      rewardFor: "Awarded for asking first question",
      recieved: true,
      seclectedForProfile: false,
      colors: "#FFC107",
    },
    {
      index: 1,
      badgeLogo: "/advisor/batchok.svg",
      tag: "Proficient Inquirer",
      rewardFor: "Awarded for asking 5 questions",
      recieved: true,
      seclectedForProfile: true,
      colors: "#02CEFE",
    },
    {
      index: 2,
      badgeLogo: "/advisor/curiousDoodle.svg",
      tag: "Curious Doodle",
      rewardFor: "Awarded for asking 5 follow-up questions",
      recieved: false,
      seclectedForProfile: false,
    },
    {
      index: 3,
      badgeLogo: "/advisor/promptenthu.svg",
      tag: "Prompt Enthusiast",
      rewardFor: "Awarded for asking 100 questions",
      recieved: false,
      seclectedForProfile: false,
    },
    {
      index: 4,
      badgeLogo: "/advisor/promptengi.svg",
      tag: "Prompt Engineer",
      rewardFor: "Awarded for asking 500 questions",
      recieved: false,
      seclectedForProfile: false,
    },
    {
      index: 5,
      badgeLogo: "/advisor/undisputed.svg",
      tag: "Undisputed Champion",
      rewardFor: "Earned for using AI advisor 5 days a week in last month",
      recieved: false,
      seclectedForProfile: false,
    },
    {
      index: 6,
      badgeLogo: "/advisor/weekly.svg",
      tag: "Weekly Conversationalist",
      rewardFor: "Earned for using AI advisor atleast once a week",
      recieved: false,
      seclectedForProfile: false,
    },
    {
      index: 7,
      badgeLogo: "/advisor/helpful.svg",
      tag: "Helpful Sharer",
      rewardFor: "Awarded for sharing an answer for the first-time",
      recieved: false,
      seclectedForProfile: false,
    },
    {
      index: 8,
      badgeLogo: "/advisor/activecontri.svg",
      tag: "Active Contributor",
      rewardFor: "Earned for sharing at least five answers with others",
      recieved: false,
      seclectedForProfile: false,
    },
  ]);

  console.log(badges);

  return (
    <>
      <p
        className=" text-[#1C56AC] text-[14px] self-end cursor-pointer"
        onClick={onOpen}
      >
        Read more
      </p>

      <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
        <ModalOverlay />
        <ModalContent style={{ borderRadius: "12px" }} maxW="700px">
          <ModalBody pos="relative" p="24px" rounded="12px">
            <div className="grid grid-cols-3 gap-2">
              {badges.map((item) => {
                return (
                  <div className="flex flex-col justify-between gap-4 ">
                    <div>
                      <div className="flex p-2 justify-center">
                        <img src={item.badgeLogo} alt="" />
                      </div>
                      <div className="w-full gap-1">
                        <p
                          className={`text-[16px] font-semibold text-center ${
                            item.recieved == true
                              ? "text-[#02CEFE]"
                              : "text-[#79767D]"
                          } `}
                        >
                          {item.tag}
                        </p>
                        <p className="text-[#938F96] text-[14px] text-center">
                          {item.rewardFor}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <input
                        type="checkbox"
                        name="freq"
                        disabled={item.recieved ? false : true}
                        checked={item.seclectedForProfile}
                        onClick={() =>
                          setBadges((prevBadges) =>
                            prevBadges.map((badge) => ({
                              ...badge,
                              seclectedForProfile:
                                badge.seclectedForProfile == true
                                  ? false
                                  : item.index == badge.index
                                  ? true
                                  : false,
                            }))
                          )
                        }
                        className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
                      />
                      <p className="text-[#AEA9B1] text-[12px]">
                        Show on my profile picture
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReadMore;
