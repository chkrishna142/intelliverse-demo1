function OverallDimensions() {
  return (
    <div className="w-full  h-[164px]  overflow-x-auto">
      <div className="w-full flex gap-3 p-3">
        {/* overall summary */}
        <div className="text-start min-w-[140px]  p-3 h-[140px] shadow-md">
          <p className="text-[#000] text-[20px]">Overall Dimensions</p>
          <p className="text-[#CAC5CD] text-[15px] mt-4">
            {" "}
            A summary of the dimensions
          </p>
        </div>
        {/* dimentions */}
        <div className="grid grid-cols-3 grid-rows-4 gap-1 shadow-md p-1 min-w-[450px] h-[140px]">
          {/* You can create cells here */}
          <div className="bg-[#FFFFED] p-1 h-[30px] text-[14px] text-[#4F4E4E] font-semibold flex justify-center items-center">
            Dimensions
          </div>
          <div className="bg-[#FFFFED] p-1 h-[30px] text-[14px] text-[#4F4E4E] font-semibold flex justify-center items-center">
            Actual
          </div>
          <div className="bg-[#FFFFED] p-1 h-[30px] text-[14px] text-[#4F4E4E] font-semibold flex justify-center items-center">
            Standard
          </div>

          <div className="text-[#929292] text-[14px] p-1 flex justify-center items-center">
            Length
          </div>
          <div className="p-1 text-[14px] text-[#E46962] font-semibold flex justify-center items-center">
            1200 mm (-0.5 mm)
          </div>
          <div className="text-[#929292] text-[14px] p-1 flex justify-center items-center">
            1000 mm
          </div>

          <div className="text-[#929292] text-[14px] p-1 flex justify-center items-center">
            Breadth
          </div>
          <div className="p-1 text-[14px] font-semibold flex justify-center items-center">
            1200
          </div>
          <div className="text-[#929292] text-[14px] p-1 flex justify-center items-center">
            1300 mm
          </div>

          <div className="text-[#929292] text-[14px] p-1 flex justify-center items-center">
            Depth
          </div>
          <div className="p-1 text-[14px] font-semibold flex justify-center items-center">
            200 mm
          </div>
          <div className=" text-[#929292] text-[14px] p-1 flex justify-center items-center">
            0.2 mm
          </div>
        </div>

        {/* diagonal dimentions */}
        <div className="shadow-md  h-[140px] min-w-[280px] ">
          <div className="bg-[#FFFFED]  p-1 h-[30px] text-[14px] text-[#4F4E4E] font-semibold ">
            Diagonal dimensions
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-1  p-1 mt-4">
            <div className="text-[#929292] text-[14px] p-1">
              Left side diagonal
            </div>
            <div className="p-1 text-[14px] font-semibold flex justify-center items-center">
              1000 mm
            </div>
            <div className="text-[#929292] text-[14px] p-1">
              Right side diagonal
            </div>

            <div className=" text-[14px] p-1 font-semibold flex justify-center items-center">
              1200 mm
            </div>
          </div>
        </div>

        {/* edge counter */}
        <div className="shadow-md  h-[140px]  min-w-[220px]">
          <div className="bg-[#FFFFED]  p-1 h-[30px] text-[14px] text-[#4F4E4E] font-semibold ">
            Edge contours
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-5 p-3 ">
            <div className=" text-[14px] font-semibold p-1  border-t-2 border-l-2 border-dashed  border-gray-300 rounded-tl-[25%] w-[80px]">
              1
            </div>
            <div className=" text-[14px] font-semibold p-1  border-t-2 border-r-2 border-dashed  border-gray-300 rounded-tr-[25%] w-[80px]">
              2
            </div>
            <div className=" text-[14px] font-semibold p-1  border-b-2 border-l-2 border-dashed  border-gray-300 rounded-bl-[25%] w-[80px]">
              3
            </div>
            <div className=" text-[14px] font-semibold p-1  border-b-2 border-r-2 border-dashed  border-gray-300 rounded-br-[25%] w-[80px]">
              4
            </div>
          </div>
        </div>

        {/* Surface area */}

        <div className="shadow-md h-[140px] min-w-[200px]">
          <div className="bg-[#FFFFED]  p-1 h-[30px] text-[14px] text-[#4F4E4E] font-semibold ">
            Surface area
          </div>

          <div className="grid grid-cols-2 grid-rows-1 gap-1 p-1 mt-5">
            <div className="text-[#929292] text-[14px] p-1 flex justify-center items-center">
              <img src="/slabsizing/surface.svg" alt="" />
            </div>
            <div className="flex p-1 text-[14px] font-semibold justify-center items-center">
              1000 mm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallDimensions;
