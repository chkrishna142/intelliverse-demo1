import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const ExpertComments = ({ retrievedComments }) => {
  return (
    <div className="bg-[#fffdff] border rounded-lg mb-5 py-5 px-1">
      {retrievedComments.map((comment, index) => (
        <div key={comment.commentId} className="flex ml-2 mb-2">
          {/* Render the individual comment properties here */}
          <AccountCircleIcon />
          <p className='ml-2'>{comment.comment}</p>
          {/* Add more properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default ExpertComments;
