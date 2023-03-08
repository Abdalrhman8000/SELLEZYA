import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import { AiFillLike, AiTwotoneDislike } from "react-icons/ai";
import { getState } from "../context/Context";
import { useFirebase } from "../firebase/useFirebase";
import { Bbg } from "../global/GlobalData";

export const LikeDisLike = ({ rateData }) => {
  const { UpdateLikeDisLike } = useFirebase();
  const [likeColorMode, setLikeColorMode] = useState(false);
  const [disLikeColorMode, setDisLikeColorMode] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = getState();


  useEffect(() => {
    setLikeColorMode(rateData?.like.find((e) => e == user.uid));
    setDisLikeColorMode(rateData?.dislike.find((e) => e == user.uid));
  }, [rateData]);

  function handelRate({ target }) {
    if (target.name == "like") {
      UpdateLikeDisLike(rateData?.colId, "like");
    } else {
      UpdateLikeDisLike(rateData?.colId, "dislike");
    }
  }

  return (
    <Fragment>
      <Flex gap={"30px"}>
        <Flex alignItems={"center"}>
          <Button
            padding={0}
            _disabled={{ color: "red" }}
            color={likeColorMode ? "#0E9BE2" : (colorMode == "light" ?  "#a1a1a1" : "#fff")}
            background="transparent"
            name="like"
            onClick={handelRate}
          >
            <AiFillLike pointerEvents={"none"} />
          </Button>
          <Text>{rateData?.like.length}</Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Button
            padding={0}
            color={disLikeColorMode ? "#0E9BE2" : (colorMode == "light" ?   "#a1a1a1" : "#fff")}
            background="transparent"
            name="dislike"
            onClick={handelRate}
          >
            <AiTwotoneDislike pointerEvents={"none"} />
          </Button>
          <Text>{rateData?.dislike.length}</Text>
        </Flex>
      </Flex>
    </Fragment>
  );
};
