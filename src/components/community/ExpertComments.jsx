import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const ExpertComments = ({ retrievedComments }) => {
  return (
    <div className="bg-[#fffdff] border rounded-lg mb-5 py-5 px-1">
      {retrievedComments.map((comment, index) => (
        <div key={comment.commentId} className="flex ml-2 mb-2">
      
          <AccountCircleIcon />
          <p className='ml-2'>{comment.comment}</p>
          
        </div>
      ))}
    </div>
  );
};

export default ExpertComments;
