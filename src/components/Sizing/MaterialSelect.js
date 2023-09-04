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
    <div className="h-full">
      <div className="bg-white rounded-xl shadow-md p-4 mt-5 border">
        <div className="flex flex-col gap-5">
          <div className="flex justify-start mt-2 ml-3 mr-3 mb-3">
            <img className="h-6" src="/vision.svg" />
          </div>
          <div className="flex flex-auto flex-col sm:flex-row gap-8 items-center ml-3 mb-5">
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
