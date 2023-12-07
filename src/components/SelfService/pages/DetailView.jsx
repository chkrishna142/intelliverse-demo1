import PieChart from "../Components/PieChart";
import { Link } from "react-router-dom";

const DetailView = () => {
  const graphs = {
    Accuracy: {
      labels: ["Passed", "Failed"],
      hide: false,
      series: [93, 7],
    },
    Confidence: {
      labels: ["1", "2"],
      hide: true,
      series: [87, 13],
    },
  };
  return (
    <div className="flex gap-[48px] items-center h-[80vh] justify-center relative">
      <div className="cursor-pointer absolute top-8 left-0">
        <Link
          to={`/Sandbox`}
          style={{
            textDecoration: "none",
          }}
        >
          <img src="/backtick.svg" />
        </Link>
      </div>
      {Object.keys(graphs).map((item) => {
        return (
          <div className="p-6 flex flex-col gap-2 bg-white shadow-lg rounded-xl">
            <p className="">{item}</p>
            <PieChart
              series={graphs[item].series}
              labels={graphs[item].labels}
              hide={graphs[item].hide}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DetailView;
