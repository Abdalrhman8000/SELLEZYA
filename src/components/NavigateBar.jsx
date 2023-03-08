import { AiFillHome } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";

import React, { useState } from "react";
import { Button, Stack, StackItem, Tooltip } from "@chakra-ui/react";
import { Bbg, bg } from "../global/GlobalData";
import { Link } from "react-router-dom";
import { getState } from "../context/Context";
import { useEffect } from "react";

export const NavigateBar = ({ status }) => {
  const { userData, user } = getState();
  const [favIndex, setFavIndex] = useState([]);

  useEffect(() => {
    setFavIndex(
      userData
        .filter((e) => e.userId == user.uid)
        .map((e) => e.favoriteProduct.length)
    );
  }, [userData]);
  return (
    <>
      <Stack
        position={"fixed"}
        left={status ? "-100%" : "0"}
        transition={"all .4s ease"}
        top="50%"
        transform={{ translate: "-50%" }}
        zIndex="1000"
      >
        <Link to="/">
          <Tooltip label="Home" placement="right" hasArrow>
            <Button
              fontSize={"1.5rem"}
              borderTopLeftRadius="0"
              borderBottomLeftRadius="0"
              backgroundColor={Bbg}
              color={"#fff"}
              _hover={{ backgroundColor: bg }}
            >
              <AiFillHome />
            </Button>
          </Tooltip>
        </Link>
        <Link to="/userProfilePage">
          <Tooltip  label="My Profile" placement="right" hasArrow>
            <Button
              fontSize={"1.5rem"}
              borderTopLeftRadius="0"
              borderBottomLeftRadius="0"
              backgroundColor={Bbg}
              color={"#fff"}
              _hover={{ backgroundColor: bg }}
            >
              <FaUserTie />
            </Button>
          </Tooltip>
        </Link>
        <Link to="/favorite">
          <Tooltip
            position={"relative"}
            label="Favorite Products"
            placement="right"
            hasArrow
          >
            <Button
              fontSize={"1.5rem"}
              borderTopLeftRadius="0"
              borderBottomLeftRadius="0"
              backgroundColor={Bbg}
              color={"#fff"}
              _hover={{ backgroundColor: bg }}
            >
              {favIndex > 0 && (
                <StackItem
                  fontSize={"1rem"}
                  width="20px"
                  height={"20px"}
                  backgroundColor={"#fc5234"}
                  borderRadius="50%"
                  position={"absolute"}
                  top="2px"
                  right="2px"
                  fontWeight={"300"}
                  color={"#fff"}
                  display="flex"
                  justifyContent={"center"}
                  alignItems="center"
                >
                  {favIndex[0]}
                </StackItem>
              )}
              <MdFavorite />
            </Button>
          </Tooltip>
        </Link>
      </Stack>
    </>
  );
};
