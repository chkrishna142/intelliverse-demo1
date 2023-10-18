import { BellIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";

const playsound = () => {
  
  const bellSound = new Audio("/Bficons/cullingham.mp3");
  bellSound.volume = 0.03;
  var playPromise = bellSound.play();

  if (playPromise !== undefined) {
    playPromise
      .then(function () {
        // Audio is successfully playing
        // console.log("playing audio: ");
      })
      .catch(function (error) {
        console.log("Error in playing audio: " + error);
      });
  } else {
    console.log("Error in the promise");
  }
};


const AlertBell = ({ snooze, handleTabChange, pageshift }) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    let intervalId;

    if (!snooze) {
      // Start the bell sound at regular intervals (every 30 seconds)
      intervalId = setInterval(() => {
        playsound();
       
        setIsShaking((prevIsShaking) => !prevIsShaking);
      }, 60000); // 30,000 milliseconds = 30 seconds
    }

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, [snooze]);
  return (
    <div className="flex items-center ">
      {snooze ? (
        <BellIcon
          w={6}
          h={6}
          color={"#024D87"}
          onClick={() => {
            pageshift("Alert");
            handleTabChange(3);
          }}
          className="cursor-pointer"
        />
      ) : (
        <BellIcon
          w={8}
          h={8}
          color={"#E46962"}
          className={` cursor-pointer animate-bounce `}
          onClick={() => {
            pageshift("Alert");
            handleTabChange(7);
          }}
        />
      )}
    </div>
  );
};

export default AlertBell;
