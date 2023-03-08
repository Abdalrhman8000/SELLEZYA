import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Bbg } from "../global/GlobalData";

export const CommentData = ({data}) => {
  return (
    <Flex color={"#fff"} fontSize=".9rem" gap={"10px"}>
      <Avatar
        size={"sm"}
        cursor="pointer"
        bg="tomato"
        name={data?.name}
        src={data?.userImage}
      />
      <Flex
        borderRadius="20px"
        borderTopLeftRadius={"0px"}
        direction={"column"}
        bg={Bbg}
        padding="10px 30px"
        gap={"10px"}
        marginTop="30px"
      >
        <Text fontWeight={"bold"} color="twitter.400">{data.name}</Text>
        <Text lineHeight={"23px"}>
           {data.commentValue}
        </Text>
      </Flex>
    </Flex>
  );
};
