import { useEffect, useState } from "react";

const Footdisplay = ({ client }) => {
  const [fetcheddata, setFetcheddata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://15.206.88.112.nip.io:443/api/get_footer_details/?client_id=${client}`
          // `http://10.36.0.105:8000/api/get_footer_details/?client_id=${client}`
        );
        const json = await response.json();
        // console.log("fetched data ===>>>", json);
        setFetcheddata(json);
      } catch (error) {
        setFetcheddata();
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 

    const interval = setInterval(() => {
      fetchData(); 
    }, 30000);

    return () => {
      clearInterval(interval); 
    };
  }, [client]);



  if (fetcheddata) {
    return (
      <div className="w-full  flex justify-evenly items-center ">
        {
          // comment this when using client server
          fetcheddata?.map(({ name, value, unit }) => {
            // let unit = "";

            // if (name === "Current Fule Rate" || name === "Coke Rate" || name === "PCI") {
            //   unit = "kg/tHM";
            // } else if (name === "RAFT" || name === "Hot Metal") {
            //   unit = "°C";
            // } else if (name === "Actual Si HM") {
            //   unit = "%";
            // }

            return (
              <div className="flex gap-4 justify-center items-center" key={name}>
                <p className="text-[#79767D] text-[12px] font-semibold">{name}</p>
                <p className="text-[#084298] text-[16px] font-bold">
                  {value} {unit}
                </p>
              </div>
            );
          })
        //  comment this when using dummy server
          // Object.keys(fetcheddata).map((ele) => {
          //   const keysofobj = fetcheddata[ele];
          //   const { name, value } = keysofobj;
          //   // console.log("name-->",value)

          //   let unit = "";

          //   if (
          //     name === "Current Fule Rate" ||
          //     name === "Coke Rate" ||
          //     name === "PCI"
          //   ) {
          //     unit = "kg/tHM";
          //   } else if (name === "RAFT" || name === "Hot Metal") {
          //     unit = "°C";
          //   } else if (name === "Actual Si HM") {
          //     unit = "%";
          //   }

          //   return (
          //     <div
          //       className="flex gap-4 justify-center items-center"
          //       key={name}
          //     >
          //       <p className="text-[#79767D] text-[12px] font-semibold">
          //         {name}
          //       </p>
          //       <p className="text-[#084298] text-[16px] font-bold">
          //         {value} {unit}
          //       </p>
          //     </div>
          //   );
          // })
        }

      </div>
    );
  } else {
    return <></>;
  }
};

export default Footdisplay;
