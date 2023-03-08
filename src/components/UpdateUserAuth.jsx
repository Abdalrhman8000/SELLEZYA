import {
  Avatar,
  AvatarBadge,
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
  Text,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { getState } from "../context/Context";
import { MdCameraAlt } from "react-icons/md";
import { toast } from "react-toastify";
import { useFirebase } from "../firebase/useFirebase";
import BarLoader from "react-spinners/BarLoader";

export const UpdateUserAuth = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, upadteStatus } = getState();
  const btnRef = useRef();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const userName = useRef();
  const email = useRef();
  const oldPass = useRef();
  const regexEmailPattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

  const { UpdateUserData } = useFirebase();

  const errorMessage = (mess) => {
    toast.error(mess, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  function handelUpdate() {
    if (userName.current.value == "" || userName.current.value.length < 5) {
      errorMessage("Please enter valid Name");
    } else if (
      email.current.value == "" ||
      !regexEmailPattern.test(email.current.value)
    ) {
      errorMessage("Please enter valid email @");
    } else if (
      oldPass.current.value == "" ||
      oldPass.current.value.length < 10
    ) {
      errorMessage("Please enter valid correct current password");
    } else {
      UpdateUserData(
        oldPass.current.value,
        userName.current.value,
        email.current.value
      );
    }
  }

  return (
    <>
      <Flex width={"100%"} onClick={onOpen}>
        Update Email
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hi {user?.displayName.toUpperCase()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap="20px">
              <Input
                variant="filled"
                placeholder="Enter New Name"
                ref={userName}
              />
              <Input
                variant="filled"
                placeholder="Enter New Email"
                ref={email}
              />
              <Input
                type={"password"}
                variant="filled"
                placeholder="Current Password"
                ref={oldPass}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handelUpdate}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
