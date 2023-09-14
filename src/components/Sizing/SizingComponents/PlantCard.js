import CamCard from "./CamCard";
import DetailModal from "./DetailModal";
import KilnModal from "./KilnModal";
import { useState } from "react";

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

const PlantCard = ({ PlantName, CamData }) => {
  const [openModal, setOpenModal] = useState(false);
  let totalAlerts = [];
  let totalData = [];
  Object.keys(CamData).map((cam) => {
    if (CamData[cam][0].noCoal !== 1){
      totalAlerts.push(CamData[cam][0]["alertMessages"].length);
      if(CamData[cam][0]["alertMessages"].length > 0)totalData.push(CamData[cam][0]);
    }
    else totalAlerts.push(0);
  });
  let sum = totalAlerts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  return (
    <div className="flex flex-col bg-white rounded-xl pt-4 gap-1">
      <div className="flex justify-between pl-6 pr-6">
        <p className="text-xl font-medium">{Capitalize(PlantName)}</p>
        {sum !== 0 && (
          <div className="flex gap-4 items-center">
            <p className="rounded-lg border-2 text-xs border-red-400 pl-2 pr-2 pt-1 pb-1 bg-[#F9DEDC]">
              {sum} alerts
            </p>
            <p
              className="text-[#DC362E] text-sm font-medium cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              See Detail
            </p>
            {openModal && (
              <DetailModal
                openModal={openModal}
                closeModal={() => setOpenModal(false)}
                data={totalData}
                index = {0}
              />
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1  xl:grid-cols-2">
        {Object.keys(CamData).map((cam, idx) => {
          return (
            <CamCard
              plantId={PlantName}
              cameraName={cam}
              data={CamData[cam][0]}
              alert={totalAlerts[idx]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlantCard;
