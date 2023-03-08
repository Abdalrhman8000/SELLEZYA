import {
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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineSave } from "react-icons/ai";

import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getState } from "../context/Context";
import { useFirebase } from "../firebase/useFirebase";

export const UpdateUserData = ({
  eventStatus,
  name,
  dataStatus,
  userUpdatedData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, upadteStatus } = getState();
  const { reAuth } = useFirebase();
  const currentPass = useRef();
  const regexEmailPattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

  const message = (mess, type) => {
    toast[type](mess, {
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
    if (currentPass.current.value == "" || currentPass.current.value < 10) {
      message("Please Enter Valid Password", "error");
    } else {
      if (
        userUpdatedData?.userName !== user.displayName &&
        userUpdatedData?.email !== user.email
      ) {
        if(userUpdatedData?.email || userUpdatedData?.userName || userUpdatedData?.userPassword){
           if(!regexEmailPattern.test(userUpdatedData?.email) && userUpdatedData?.email){
            message("Please enter valid email and try agin","warn");
            onClose();
            return;
           }else if(userUpdatedData?.userName.length < 5 && userUpdatedData?.userName){
            message("Please enter valid name not less than 5","warn");
            onClose();
            return;
           }else if(userUpdatedData?.userPassword && userUpdatedData?.userPassword.length < 10){
            message("Please enter valid password not less than 10","warn");
            onClose();
           }else{
            reAuth(currentPass.current.value, userUpdatedData);
            if(!upadteStatus){
              onClose();
            }
          }
        }else{
          message("Please add modifications first","warn");
          onClose();
        }
      } else {
        message("Please Enter Valid Data", "warn");
        onClose();
      }
    }
  }

  return (
    <>
      <Button
        size={"sm"}
        name={name}
        onClick={(e) => {
          eventStatus(e);
          if (!dataStatus[name]) {
            onOpen();
          }
        }}
      >
        {dataStatus[name] ? (
          <BiEdit pointerEvents={"none"} />
        ) : (
          <AiOutlineSave pointerEvents={"none"} />
        )}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <BarLoader
                color="#4EBBF2"
                loading={upadteStatus}
                width={100}
                cssOverride={{ marginTop: "20px" }}
              />
              <Input
                type={"password"}
                variant="filled"
                placeholder="Enter You Current Password"
                ref={currentPass}
                marginTop="8"
              />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancle
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
