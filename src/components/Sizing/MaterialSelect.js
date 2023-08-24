import MaterialCard from "./SizingComponents/MaterialCard";

const MaterialSelect = () => {
  const material = [
    "Coal Sizing",
    "Coke Sizing",
    "Sinter Sizing",
    "Cement Kiln",
  ];
  const alerts = [5, 2, 0, 1];
  const deployments = [5, 5, 5, 5];
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-xl p-[120px]">
        <div className="flex flex-col gap-[80px]">
          <div className="flex flex-col">
            <p className="text-[#3E3C42] text-4xl font-medium">
              Welcome to{" "}
              <span className="text-[#3A74CA] text-4xl font-medium">
                IntelliVision
              </span>
            </p>
            <p className="text-[#79767D] text-lg">
              Select the ... to get updates
            </p>
          </div>
          <div className="flex flex-auto gap-[56px] items-center">
            {alerts.map((x, idx) => {
              return (
                <MaterialCard
                  material={material[idx]}
                  alerts={alerts[idx]}
                  deployments={deployments[idx]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialSelect;
