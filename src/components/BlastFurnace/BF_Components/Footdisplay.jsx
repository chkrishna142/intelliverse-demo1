import { useEffect, useState } from "react";

const Footdisplay = ({client}) => {


  const [fetcheddata, setFetcheddata] = useState();
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://15.206.88.112.nip.io:443/api/get_footer_details/?client_id=${client}`
        );
        const json = await response.json();
        console.log("fetched data ===>>>", json);
        setFetcheddata(json);
      } catch (error) {
        setFetcheddata();
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData(); // Initial data fetch when the component mounts
  
    const interval = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 10000);
  
    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [client]);
  
//   0
// : 
// {name: 'Current Fule Rate', value: 540}
// 1
// : 
// {name: 'Coke Rate', value: 385}
// 2
// : 
// {name: 'PCI', value: 155}
// 3
// : 
// {name: 'EtaCO', value: 0.45}
// 4
// : 
// {name: 'RAFT', value: 1200}
// 5
// : 
// {name: 'Actual Si HM', value: 0.45}
// 6
// : 
// {name: 'Hot Metal', value: 1300}


  return (
   <div className="w-full  flex justify-evenly items-center ">
   {
  fetcheddata?.map(({ name, value }) => {
    let unit = "";

    if (name === "Current Fule Rate" || name === "Coke Rate" || name === "PCI") {
      unit = "kg/tHM";
    } else if (name === "RAFT" || name === "Hot Metal") {
      unit = "°C";
    } else if (name === "Actual Si HM") {
      unit = "%";
    }

    return (
      <div className="flex gap-4 justify-center items-center" key={name}>
        <p className="text-[#79767D] text-[12px] font-semibold">{name}</p>
        <p className="text-[#084298] text-[16px] font-bold">
          {value} {unit}
        </p>
      </div>
    );
  })
}

     
    {/* <div className="flex  gap-4 justify-center items-center">
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
    </div> */}
   </div>
  );
};

export default Footdisplay;
