import { ListItem, UnorderedList } from "@chakra-ui/react";

const QuestionInstructions = () => {
  return (
    <div className="mt-2">
      <p className="text-[14px] text-[#AEA9B1] mt-2">
        Tip: To get best answer , please include
      </p>
      <UnorderedList color={"#AEA9B1"} ml={7} fontSize={"14px"} lineHeight={7}>
        <ListItem>Any relevant information </ListItem>
        <ListItem>
          Any steps you have taken to identify or solve the problem
        </ListItem>
        <ListItem>Any important documents or images etc</ListItem>
      </UnorderedList>
    </div>
  );
};

export default QuestionInstructions;
