import {
  Avatar,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import { FaCommentAlt } from "react-icons/Fa";
import { VscComment } from "react-icons/vsc";

import { getState } from "../context/Context";
import { useFirebase } from "../firebase/useFirebase";
import { Bbg, bg } from "../global/GlobalData";
import { CommentData } from "./CommentData";
import { ProductBox } from "./ProductBox";

export const Comment = ({ data, hiddeProduct, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, postesData } = getState();
  const { addComment } = useFirebase();
  const [comments, setComments] = useState([]);

  function appendComment(e) {
    e.preventDefault();
    const {target} = e;
    if (target[0].value && target[0].value.trim().length > 0) {
      const comments = addComment(data?.colId, "comment", {
        userId: data?.userId,
        colId: data?.colId,
        name: user.displayName,
        email: data?.userEmail,
        commentValue: target[0].value,
        userImage: user.photoURL,
      }).then((comments) => {
        setComments(comments);
      });
      target[0].value = "";
    }
  }

  useEffect(() => {
    setComments(postesData.filter((e) => e.colId == data.colId)[0]?.comment);
  }, [postesData]);

  return (
    <>
      <Flex
        onClick={onOpen}
        width={"100%"}
        height="100%"
        justifyContent={"center"}
        alignItems="center"
      >
        {!hiddeProduct ? <VscComment /> : children}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode == "light" ? "#2a2f33" : "#1d2430"}
          maxWidth={{ sm: "100%", md: "80%", lg: "40%" }}
          borderRadius={{ sm: "0", md: "5px" }}
          overflow={"auto"}
          margin={"auto"}
          top={{ sm: "0%" }}
          maxHeight={{ base: "100%", md: "85vh" }}
          sx={{
            "::-webkit-scrollbar": {
              width: "10px",
            },
            "::-webkit-scrollbar-track": {
              backgroundColor: Bbg,
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: bg,
            },
          }}
        >
          <ModalHeader color={"#fff"}>
            Comment ~ {data?.productName}
          </ModalHeader>
          <ModalCloseButton color={"#fff"} />
          <hr />
          <ModalBody pb={6}>
            {!hiddeProduct && (
              <ProductBox commentState={"active"} data={data} />
            )}
            <hr />
            <br />
            {comments &&
              comments.map((e) => (
                <CommentData
                  key={`${e.colId}${Math.random() * 32412348437}}`}
                  data={e}
                />
              ))}
          </ModalBody>
          <ModalFooter
            bg={"#1d2430"}
            gap={"20px"}
            position="sticky"
            width={"100%"}
            bottom="0"
            padding={"10px"}
          >
            <Avatar
              cursor="pointer"
              bg="tomato"
              name={user?.displayName}
              src={user?.photoURL}
            />
            <form onSubmit={appendComment} style={{width:"100%"}}>
              <Input
                bg={bg}
                border="0"
                placeholder="Write Comment..."
                borderRadius={"30px"}
                color="#fff"
                padding={"0 30px"}
              />
            </form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
