import { AvatarGroup, Button, Flex, Text } from "@chakra-ui/react";
import { Bbg, bg } from "../global/GlobalData";
import { Comment } from "./Comment";
import { VscComment } from "react-icons/vsc";
import { LikeDisLike } from "./LikeDisLike";


export const ProductRate = ({rateData,commentState}) => {
  return (  
    <Flex padding={"10px"}>
      <AvatarGroup size="md" max={3} gap="30px">
        <LikeDisLike rateData={rateData}/>
        <Flex alignItems={"center"}>
          <Button padding={0} _hover={{ bg: Bbg }} background="transparent">
            { !commentState ?  <Comment data={rateData}/> : <VscComment/>}
          </Button>
          <Text>{rateData?.comment.length || 0}</Text>
        </Flex>
      </AvatarGroup>
    </Flex>
  );
};
