import { BellIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";

const playsound = () => {
  const audioUrl = "https://drive.google.com/uc?id=1gPd2KnnMREazQaWODL8QxuaY8Qqp3phc&export=download"; // Replace with the direct URL to your audio file
  const bellSound = new Audio(audioUrl);
  bellSound.volume = 0.03;
  var playPromise = bellSound.play();
console.log("inside play fcun")
  if (playPromise !== undefined) {
    playPromise
      .then(function () {
        // console.log("Playing audio");
      })
      .catch(function (error) {
        console.log("Error in playing audio: " + error);
      });
  } else {
    console.log("Error in the promise");
  }
};



const AlertBell = ({ snooze, handleTabChange, pageshift }) => {

  useEffect(() => {
    let intervalId;

    if (!snooze) {
      // Start the bell sound at regular intervals (every 30 seconds)
      intervalId = setInterval(() => {
        playsound();
       
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
