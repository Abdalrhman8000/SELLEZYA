import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Comment } from "./Comment";
import { LikeDisLike } from "./LikeDisLike";

export const ProductInfo = ({ data ,loader}) => {
  return (
    <Flex justifyContent={"center"} flexDir={"column"} gap="50px">
      <Heading>
        <Flex alignItems={"center"} justifyContent="space-between">
          <SkeletonCircle isLoaded={loader} size="80px">
            <Flex gap={"20px"} alignItems="center">
              <Avatar src={data?.userPhoto} name={data?.userName} />
              <Text fontSize={{ base: "1.3rem", md: "2.5rem" }}>
                {data?.productName}
              </Text>
            </Flex>
          </SkeletonCircle>
          <Box color={"#626ebe"} fontWeight="500">
            <Skeleton isLoaded={loader}>
              <Text fontSize={{ base: "1.5rem", md: "2.5rem" }}>
                {data?.productPrice}
                {data?.productCurrency}
              </Text>
            </Skeleton>
          </Box>
        </Flex>
      </Heading>
      <Flex gap={"20px"}>
        <Skeleton isLoaded={loader}>
          <Box color={"#626ebe"}>{data?.productType}</Box>
        </Skeleton>
        <span>|</span>
        <Skeleton isLoaded={loader}>
          <Box color={"#626ebe"} fontWeight="500">
            +{data?.phoneNumber}
          </Box>
        </Skeleton>
        <span>|</span>
        <Skeleton isLoaded={loader}>
          <Box color={"#626ebe"} fontWeight="500">
            {data?.productCountaty}
          </Box>
        </Skeleton>
      </Flex>
      <Skeleton isLoaded={loader}>
        <Text
          maxWidth={{ base: "300px", md: "800px" }}
          lineHeight="27px"
          fontSize={".9rem"}
        >
          {data?.productDescription}
        </Text>
      </Skeleton>
      <Flex justifyContent={"space-between"} gap="30px" width={"100%"}>
        <Skeleton isLoaded={loader}>
          <LikeDisLike rateData={data} />
        </Skeleton>
        {data && (
          <Comment hiddeProduct={true} data={data}>
            <SkeletonCircle isLoaded={loader} width="100%">
              <AvatarGroup
                size="md"
                max={2}
                cursor="pointer"
                width="100%"
                justifyContent={"flex-start"}
              >
                {data?.comment.map((e) => (
                  <Avatar key={e.userImage + e.name + Math.random() * 1923} name={e.name} src={e.userImage} />
                ))}
              </AvatarGroup>
            </SkeletonCircle>
          </Comment>
        )}
      </Flex>
    </Flex>
  );
};
