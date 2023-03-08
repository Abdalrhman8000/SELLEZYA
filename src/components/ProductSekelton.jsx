import {
  Box,
  SkeletonCircle,
  SkeletonText,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Bbg, bg } from "../global/GlobalData";

export const ProductSekelton = ({ count ,isLoading}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  if (isLoading) {
    return Array(count)
      .fill(0)
      .map((e, i) => (
        <Box padding="7" key={i}  width={{base:"330px",md:"700px"}}>
          <SkeletonCircle size="10" />
          <SkeletonText
            startColor={!colorMode == "dark" && Bbg}
            endColor={!colorMode == "dark" && bg}
            mt="4"
            noOfLines={4}
            spacing="4"
            skeletonHeight="1"
          />
        </Box>
      ));
  }
};
