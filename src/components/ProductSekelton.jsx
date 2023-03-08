import {
  Box,
  SkeletonCircle,
  SkeletonText,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { getState } from "../context/Context";
import { Bbg, bg } from "../global/GlobalData";

export const ProductSekelton = ({ count }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoading } = getState();

  if (isLoading) {
    return Array(count)
      .fill(0)
      .map((e, i) => (
        <Box padding="7" key={i}>
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
