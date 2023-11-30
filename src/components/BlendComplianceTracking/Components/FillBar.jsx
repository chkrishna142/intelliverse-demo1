const FillBar = ({ current, total, isActive = false }) => {
  var fill = (current / total) * 100;
  return (
    <div className="flex flex-col gap-[6px] w-[14px] h-full items-center">
      <div className="h-full w-full flex flex-col gap-0">
        <div
          style={{
            height: `${fill}%`,
            backgroundColor: isActive ? "#447ED4" : "#DDEEFF",
          }}
          className="rounded-t"
        />
        <div
          style={{
            height: `${100 - fill}%`,
            backgroundColor: "#F5F5F5",
          }}
          className="rounded-b"
        />
      </div>
      <p
        className={`${isActive ? "font-medium" : "font-normal"} text-sm ${
          isActive ? "text-[#447ED4]" : "text-[#AEA9B1]"
        }`}
      >
        {total}
      </p>
    </div>
  );
};

export default FillBar;
