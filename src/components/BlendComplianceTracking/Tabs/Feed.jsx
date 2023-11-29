import FlipCard from "../Components/FlipCard";

const Feed = () => {
  const num = [1, 2, 3, 4];
  const materialNum = [5,1,2,3];
  return (
    <div className="bg-white p-6 rounded-xl flex flex-col gap-12">
      {[...Array(2)].map((i, idx) => {
        return (
          <div className="grid grid-cols-4">
            {num.map((val,index) => {
              return (
                <FlipCard
                  title={"Bay " + val}
                  hasHopper={idx == 0 && index != 3 ? true : false}
                  materialNum={materialNum[index]}
                  isActiveHopper={index == 2}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
