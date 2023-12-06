import ProjectCard from "./Components/ProjectCard";
import { badges } from "./Badges";

const Dashboard = () => {
  const intro = [
    {
      title: "Upload data set",
      desc: "Upload image, video, text",
      icon: "/selfServiceIcons/uploadData.svg",
    },
    {
      title: "Train and Test",
      desc: "Train and Test model on the data set",
      icon: "/selfServiceIcons/trainModel.svg",
    },
    {
      title: "Insights",
      desc: "View model insights",
      icon: "/selfServiceIcons/testModel.svg",
    },
  ];
  return (
    <div className="flex flex-col gap-6 my-6 font-roboto bg-[#fafafa]">
      <div
        className="flex flex-col gap-4 px-6 pt-6 pb-8 rounded-lg bg-[#084298] relative"
        style={{
          boxShadow:
            "-4px -4px 24px 0px rgba(0, 0, 0, 0.07), 4px 4px 24px 0px rgba(0, 0, 0, 0.07)",
        }}
      >
        <p className="text-[#FAFAFA] font-bold text-2xl flex flex-col md:flex-row gap-2">
          Welcome to <p className="text-[#C0FFFF]">AI Project Sandbox !</p>
        </p>
        <div className="flex flex-col gap-4 whitespace-nowrap">
          <p className="text-[#FAFAFA] text-base whitespace-normal w-[80%]">
            Here you can do create your own AI projects, bring your own data,
            explore Ripik's proprietary AI models as well as test standard AI
            models on your data, to generate quick insights
          </p>
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-[54px] items-start lg:items-center">
            {intro.map((item) => {
              return (
                <div className="flex gap-3 items-center">
                  <img src={item.icon} alt={item.title} />
                  <div className="flex flex-col gap-0">
                    <p className="text-[#C0FFFF] text-base font-bold">
                      {item.title}
                    </p>
                    <p className="text-sm text-[#FAFACCCC]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute top-1 sm:top-5 right-1 sm:right-5 flex flex-col gap-2">
          <p className="px-3 py-[2px] rounded bg-[#FFFFD8] flex gap-4 items-center text-[#605D64] text-sm">
            Current Balance{" "}
            <span className="flex gap-1 items-center text-[#3E3C42] text-base font-medium">
              2000 <img src="/token.svg" alt="token" />
            </span>
          </p>
          <p className="self-end flex gap-4 px-3 items-center text-[#EBEBEB] text-sm">
            Total Spent{" "}
            <span className="flex gap-1 items-center text-[#FAFAFA] text-base font-medium">
              1000 <img src="/token.svg" alt="token" />
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row px-5 gap-5 sm:gap-[48px] h-[80vh] sm:h-screen">
        <div className="flex flex-col gap-6 w-full">
          <p className="text-[#605D64] text-lg font-medium">
            Your list of projects
          </p>
          <div className="bg-[#fafafa] overflow-y-auto h-[50vh] sm:h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 min-[1440px]:grid-cols-4 min-[1750px]:grid-cols-5 min-[2150px]:grid-cols-6 gap-6 text-base font-medium text-[#3E3C42]">
            <div
              className="rounded p-3 w-full h-[210px] flex flex-col justify-center gap-3 items-center bg-white"
              style={{
                boxShadow:
                  "-4px -4px 24px 0px rgba(0, 0, 0, 0.07), 4px 4px 24px 0px rgba(0, 0, 0, 0.07)",
              }}
            >
              <div className="p-[10px] bg-[#DEF] text-center rounded cursor-pointer">
                <img src="/selfServiceIcons/add.svg" alt="add" />
              </div>
              Create new project
            </div>
            {[...Array(3)].map((x) => {
              return <ProjectCard />;
            })}
          </div>
        </div>
        <div
          className="pr-[6px] pl-4 pt-5 pb-[90px] sm:pb-5 rounded flex flex-col gap-6 bg-white border-4 border-[#F5F5F5] md:mt-[-50px] xl:mt-[-100px] h-full"
          style={{
            boxShadow:
              "-4px -4px 24px 0px rgba(0, 0, 0, 0.02), 4px 4px 24px 0px rgba(0, 0, 0, 0.02)",
            zIndex: 10,
          }}
        >
          <div className="flex flex-col gap-0">
            <p className="text-base text-[#605D64] font-bold">Your badges</p>
            <p className="text-[#79767D] text-sm">
              Congratulations!! you have earned a new badge
            </p>
          </div>
          <div className="overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {badges.map((item) => {
              return (
                <div className="flex flex-col gap-1 items-center">
                  <img src={item.icon} alt={item.title} />
                  <p
                    className="text-sm font-medium text-center"
                    style={{ color: item.color }}
                  >
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
