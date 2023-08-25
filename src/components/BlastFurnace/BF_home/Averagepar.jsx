import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


const Averagepar = () => {

    const current = new Date();

  // Format the date
  const day = current.getDate();
  const month = current
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const year = current.getFullYear().toString().slice(-2); // Get last two digits of the year
  const formattedDate = `${day} ${month} ${year}`;

  // Format the time
  const hours = current.getHours();
  const minutes = current.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;





    return (
     
      <div
        style={{
          // width: "331px",
          
          paddingBottom: "0px",
          marginTop:"10px"
        }}
        className="flex w-auto
       
         text-left pb-0 flex-col items-end "
      >
        <div className="w-[100%] h-auto  "
        style={{
          // width: "331px",
          borderRadius: "12px",
          background: "#FFF",
          boxShadow: "4px 4px 12px 0px rgba(8, 66, 152, 0.10)",
         
        }}> 
        {/* top part of box */}
        <div
          style={{
            borderRadius: "12px 12px 0px 0px",
            background: "var(--primary-p-10, #084298)",
            width: "100%",
            height: "81px",
            display: "flex",
            padding: "10px 16px",
            justifyContent: "space-between",
            alignItem: "center",
          }}
          className="flex p-10 px-16 justify-between items-center self-stretch"
        >
          <div
            style={{ width: "146px" }}
            className="flex  flex-col items-start gap-4"
          >
            <p
              style={{ fontSize: "20px" }}
              className="text-white text-neutral-n-99 font-poppins text-20 font-normal leading-normal "
            >
              Avg. Particle Size
            </p>
  
            {/* <p
              style={{
                color: "var(--primary-p-99, #6CA6FC)",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
                marginTop: "-10px",
              }}
            >
              540 kg/tHM
            </p> */}
          </div>
  
          <div
            style={{
              width: "133px",
              height: "44px",
              borderRadius: "8px",
              background: "#69B04B",
              alignItem: "center",
              justifyContent: "center",
            }}
            className=" flex p-6 px-8 items-center gap-12  "
          >
            <CheckCircleOutlineIcon
              style={{ width: "38px", height: "38px", color: "#FFF" }}
            />
            <p
              style={{
                color: "#FFF",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                marginLeft: "8px",
  
                width: "120%",
                marginLeft: "-35px",
              }}
            >
              Optimal
            </p>
          </div>
        </div>
  
        {/* mid part of box */}
        <div
          style={{
            display: "flex",
            padding: "0px 16px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "19px",
            alignSelf: "stretch",
            marginTop:"10px"
          }}
        >
          {/* coke rate */}
          {/* <div
            style={{}}
            className="flex w-full text-left justify-between items-center"
          >
            <div style={{ width: "205px" }} className="flex   items-center gap-8">
              <p
                style={{
                  color: "var(--neutral-n-60, #938F96)",
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  width: "100px",
                  lineHeight: "normal",
                }}
                // className="text-neutral-n-60 font-roboto  text-base font-normal"
              >
                Coke rate
              </p>
  
              <p
                style={{
                  color: "#3E3C42",
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  width: "150px",
                  lineHeight: "normal",
  
                  marginLeft: "-10px",
                }}
              >
                385 kg/tHM
              </p>
            </div>
  
            <div>
              {" "}
              <p
                style={{
                  color: "var(--neutral-n-70, #AEA9B1)",
                  textAlign: "right",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                29-09-23{" "}
              </p>
              <p
                style={{
                  color: "var(--neutral-n-70, #AEA9B1)",
                  textAlign: "right",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                {" "}
                12:55 pm{" "}
              </p>
            </div>
          </div> */}
          {/* pci */}
          <div style={{}} className="flex w-full justify-between items-center">
            <div
              style={{ width: "205px" }}
              className="flex  text-left items-center gap-8"
            >
              <p
                style={{
                  color: "var(--neutral-n-60, #938F96)",
                 
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  width: "100px",
                  lineHeight: "normal",
                  justifyContent: "left",
                }}
                // className="text-neutral-n-60 font-roboto  text-base font-normal"
              >
                Avg. Sinter size
              </p>
  
              <p
                style={{
                  color: "#3E3C42",
                
                 textAlign:"center",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  width: "150px",
                  lineHeight: "normal",
  
                  marginLeft: "-10px",
                }}
              >
                16 mm
              </p>
            </div>
  
            <div className="flex  w-full justify-evenly">
              {" "}
              <p
                style={{
                  color: "var(--neutral-n-70, #AEA9B1)",
                  textAlign: "right",
                  
                  fontSize: "11px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                {formattedDate}
              </p>
              <p
                style={{
                  color: "var(--neutral-n-70, #AEA9B1)",
                  textAlign: "right",
                
                  fontSize: "11px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
               {formattedTime}
              </p>
            </div>
          </div>
  
          {/* lowewr part move forward icon */}
          <div
            style={{
              display: "flex",
              width: "100%",
              paddingBottom: "0px",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "16px",
              borderRadius: "12px",
              background: "#FFF",
              marginTop: "0",
              marginBottom:"10px"
            }}
            // className="flex flex-col items-end gap-16 w-331 pb-0"
          >
             
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
            >
              <g filter="url(#filter0_d_260_2062)">
                <rect
                  x="38"
                  y="38"
                  width="32"
                  height="32"
                  rx="16"
                  transform="rotate(180 38 38)"
                  fill="white"
                />
                <path
                  d="M17.0604 28.12L18.9404 30L26.9404 22L18.9404 14L17.0604 15.88L23.1671 22L17.0604 28.12Z"
                  fill="#3E3C42"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_260_2062"
                  x="0"
                  y="0"
                  width="44"
                  height="44"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="3" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.00784314 0 0 0 0 0.301961 0 0 0 0 0.529412 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_260_2062"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_260_2062"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          
          </div>
        </div>
        </div>
      </div>
     
    );
  };
  
  export default Averagepar;