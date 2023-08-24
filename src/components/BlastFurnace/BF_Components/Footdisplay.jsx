
const Footdisplay = () => {
  return (
   <div className="w-full  flex justify-evenly items-center ">
     <div className="flex  gap-4 justify-center items-center">
        <p className="text-[#79767D] text-[12px] font-semibold">Current Fuel Rate</p>
        <p className="text-[#084298] text-[16px] font-bold"> 540 kg/tHM</p>
    </div>
    <div className="flex  gap-4 justify-center items-center">
        <p className="text-[#79767D] text-[12px] font-semibold">Coke Rate</p>
        <p className="text-[#084298] text-[16px] font-bold"> 385 kg/tHM</p>
    </div>
    <div className="flex  gap-4 justify-center items-center">
        <p className="text-[#79767D] text-[12px] font-semibold">PCI</p>
        <p className="text-[#084298] text-[16px] font-bold"> 155 kg/tHM</p>
    </div>
     <div className="flex  gap-4 justify-center items-center">
        <p className="text-[#79767D] text-[12px] font-semibold">etaCo</p>
        <p className="text-[#084298] text-[16px] font-bold"> 0.45 </p>
    </div>
     <div className="flex  gap-4 justify-center items-center">
        <p className="text-[#79767D] text-[12px] font-semibold">RAFT</p>
        <p className="text-[#084298] text-[16px] font-bold">1200 &deg;C </p>
    </div>
     <div className="flex  gap-4 justify-center items-center">
        <p className="text-[#79767D] text-[12px] font-semibold">Actual Si HM</p>
        <p className="text-[#084298] text-[16px] font-bold"> 0.45%</p>
    </div>
     <div className="flex  gap-4 justify-center items-center">
        <p className="text-[#79767D] text-[12px] font-semibold">Hot Metal</p>
        <p className="text-[#084298] text-[16px] font-bold"> 1300 &deg;C</p>
    </div>
   </div>
  );
};

export default Footdisplay;
