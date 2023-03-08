import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  SkeletonCircle,
  SkeletonText,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getState } from "../context/Context";
import { Bbg, bg } from "../global/GlobalData";
import { BoxProductSetting } from "./BoxProductSetting";
import { BoxSlider } from "./BoxSlider";
import { ProductRate } from "./ProductRate";
import { UserOprtions } from "./UserOprtions";

export const ProductBox = ({ data, commentState }) => {
  const { user,isLoading } = getState();
  const { colorMode, toggleColorMode } = useColorMode();


  {
    return (
      <Flex
        direction={"column"}
        margin={"20px 0"}
        height={{ base: "500px", md: "100%" }}
        borderRadius={{ sm: "0", md: "5px" }}
        overflow={"hidden"}
        width={{base:"340px",md:"600px"}}
        bg={bg}
        color="#fff"
      >
        <Flex spacing="4" padding={"20px"}>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name={data?.userName}
              src={user.uid == data?.userId ? user.photoURL : data?.userPhoto}
            />
            <Box>
              <Heading size="sm">
                {data?.userName.slice(0, 1).toUpperCase()}
                {data?.userName.slice(1)}
              </Heading>
              <Text>{data?.productType}</Text>
            </Box>
          </Flex>
          {user.uid == data?.userId ? (
            <BoxProductSetting />
          ) : (
            <UserOprtions data={data} />
          )}
        </Flex>
        <hr />

        <Box
          justifyContent={"center"}
          alignItems="center"
          height="500px"
          width={{base:"100%",md:"600px"}}
          display="flex"
          bg={colorMode == "light" ? "#3f4858" : "#28292b"}
        >
          <BoxSlider images={data?.photosURLs} />
        </Box>
        <hr />
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <ProductRate rateData={data} commentState={commentState} />
        </Box>
      </Flex>
    ) 
  }
};
