import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const ExpertComments = ({ retrievedComments }) => {
  return (
    <div className=" mb-5 px-1">
      {retrievedComments.map((comment, index) => (
        <div key={comment.commentId} className="flex items-center gap-2 mb-3">
          <div className="w-[32px] h-[32px] flex justify-center items-center">
            <img src={comment.imgurl} alt="" />
          </div>
          <div className=" flex-col items-center gap-1 justify-center">
            <div className="flex items-center gap-2">
              <p className="text-[#3E3C42] font-semibold text-[14px]">
                {comment.name}
              </p>
              <p className="text-[#AEA9B1] font-normal text-[14px]">2 hr ago</p>
            </div>
            <p className="text-[#605D64] font-normal text-[14px]">
              {comment.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpertComments;
