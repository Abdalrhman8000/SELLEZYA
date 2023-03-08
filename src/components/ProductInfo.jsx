import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Comment } from "./Comment";
import { LikeDisLike } from "./LikeDisLike";

export const ProductInfo = ({ data }) => {

  return (
    <Flex justifyContent={"center"} flexDir={"column"} gap="50px">
      <Heading>
        <Flex alignItems={"center"} justifyContent="space-between">
          <Flex gap={"20px"} alignItems="center">
            <Avatar  src={data?.userPhoto}  name={data?.userName}/>
            <Text fontSize={{base:"1.3rem",md:"2.5rem"}}>{data?.productName}</Text>
          </Flex>
          <Box color={"#626ebe"} fontWeight="500">
            <Text fontSize={{base:"1.5rem",md:"2.5rem"}}>            
              {data?.productPrice}
              {data?.productCurrency}
            </Text>
          </Box>
        </Flex>
      </Heading>
      <Flex gap={"20px"}>
        <Box color={"#626ebe"}>
          {data?.productType}
        </Box>
        <span>|</span>
        <Box color={"#626ebe"} fontWeight="500">
         +{data?.phoneNumber}
        </Box>
        <span>|</span>
        <Box color={"#626ebe"} fontWeight="500">
         {data?.productCountaty}
        </Box>
      </Flex>
      <Text
        maxWidth={{ base: "300px", md: "800px" }}
        lineHeight="27px"
        fontSize={".9rem"}
      >
        {data?.productDescription}
      </Text>
      <Flex justifyContent={"space-between"} gap="30px" width={"100%"}>
        <LikeDisLike rateData={data} />
        {data && (
          <Comment hiddeProduct={true} data={data}>
            <AvatarGroup
              size="md"
              max={2}
              cursor="pointer"
              width="100%"
              justifyContent={"flex-start"}
            >
              {data?.comment.map((e) => (
                <Avatar key={e.userImage} name={e.name} src={e.userImage} />
              ))}
            </AvatarGroup>
          </Comment>
        )}
      </Flex>
    </Flex>
  );
};
