import { Button, Img, Spinner, Stack } from "@chakra-ui/react";
import React, { useEffect, useState, useTransition } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styled from "styled-components";
import { Bbg, bg } from "../global/GlobalData";

const ImgSlide = styled.div`
  width: 100%;
  height: 100%;
  /* padding: 10px 0; */
  display: flex;
  position: relative;
`;

const Slide = styled.div`
  height: 100%;
  width: 100%;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const BoxSlider = ({ images }) => {
  const [counter, setCounter] = useState(0);
  const [pennding, startTransition] = useTransition();



  const handeSlide = ({ target }) => {
    if (target.name == "left") {
      if (counter < images.length - 1) {
        setCounter((count) => count + 1);
      } else {
        setCounter(0);
      }
    } else {
      if (counter > 0) {
        setCounter((count) => count - 1);
      } else {
        setCounter(images.length - 1);
      }
    }
  };

  return (
    <ImgSlide>
      <Slide>
        {images && (
          <Img src={images[counter]} height={{base:"330",md:"100%"}}/>
        )}
      </Slide>
      {pennding && (
        <Stack pos={"absolute"} right="10px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="sm"
          />
        </Stack>
      )}
      <Button
        position={"absolute"}
        color={"#fff"}
        padding={0}
        left="10px"
        top={"50%"}
        bg={bg}
        _hover={{ bg: Bbg }}
        name="left"
        onClick={(e) => {
          startTransition(() => {
            handeSlide(e);
          });
        }}
      >
        <AiOutlineArrowLeft pointerEvents={"none"} />
      </Button>
      <Button
        color={"#fff"}
        position={"absolute"}
        right="10px"
        padding={0}
        top={"50%"}
        bg={bg}
        _hover={{ bg: Bbg }}
        name="right"
        onClick={(e) => {
          startTransition(() => {
            handeSlide(e);
          });
        }}
      >
        <AiOutlineArrowRight pointerEvents={"none"} />
      </Button>
    </ImgSlide>
  );
};
