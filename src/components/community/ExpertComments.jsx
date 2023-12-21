import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const ExpertComments = ({ retrievedComments }) => {
  function formatTimestamp(timestamp) {
    const now = new Date();
    const createdAt = new Date(timestamp);

    // Calculate the time difference in milliseconds
    const timeDiff = now - createdAt;

    // Calculate hours ago
    const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));

    // Check if it's today
    if (
      createdAt.getDate() === now.getDate() &&
      createdAt.getMonth() === now.getMonth() &&
      createdAt.getFullYear() === now.getFullYear()
    ) {
      if (hoursAgo > 0) {
        return `${hoursAgo} hr ago`;
      } else {
        // If less than an hour, display minutes ago
        const minutesAgo = Math.floor(timeDiff / (1000 * 60));
        return `${minutesAgo} mins ago`;
      }
    } else {
      // Format as "19 Dec '23 10:37"
      const day = createdAt.getDate();
      const month = createdAt.toLocaleString("en-US", { month: "short" });
      const year = createdAt.getFullYear().toString().slice(-2);
      const hours = ("0" + createdAt.getHours()).slice(-2);
      const minutes = ("0" + createdAt.getMinutes()).slice(-2);

      return `${day} ${month} '${year} ${hours}:${minutes}`;
    }
  }
  return (
    <div className=" mb-5 px-1">
      {retrievedComments.map((comment, index) => (
        <div key={comment.commentId} className="flex items-center gap-2 mb-3">
          <div className="w-[32px] h-[32px] flex justify-center items-center">
            {comment.imgurl ? (
              <img src={comment.imgurl} alt="" />
            ) : (
              <div>
                <AccountCircleIcon />
              </div>
            )}
          </div>
          <div className=" flex-col items-center gap-1 justify-center">
            <div className="flex items-center gap-2">
              <p className="text-[#3E3C42] font-semibold text-[14px]">
                {comment.userName}
              </p>
              <p className="text-[#AEA9B1] font-normal text-[14px]">
                {formatTimestamp(comment.createdAt)}
              </p>
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
