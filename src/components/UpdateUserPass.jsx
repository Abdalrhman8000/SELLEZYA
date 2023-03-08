import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useRef } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getState } from "../context/Context";
import { useFirebase } from "../firebase/useFirebase";

export const UpdateUserPass = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {user,upadteStatus} = getState();
  const {UpdateUserPassword} = useFirebase();
  const password = useRef();
  const confirm = useRef();
  const oldPass = useRef();

 
  const message = (mess,type) => {
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
  }

  function handelUpdate(){
    if(oldPass.current.value.length < 10){
        message("Please enter correct current password","error")
    }else if(confirm.current.value != password.current.value){
        message("Please enter valid confirm","error")
    }else if(password.current.value.length < 10){
        message("Please enter valid password","error")
    }else{
        UpdateUserPassword(oldPass.current.value,password.current.value);
    }
  }


  return (
    <>
      <Flex width={"100%"} onClick={onOpen}>Change Password</Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hi {user.displayName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex direction={"column"} alignItems="center" justifyContent="center" gap="20px">
          <BarLoader
                color="#4EBBF2"
                loading = {upadteStatus}
                width={100}
                cssOverride={{ marginTop: "20px" }}
            />
            <Input
                type={"password"}
                variant="filled"
                placeholder="Current Password"
                ref={oldPass}
              />
              <Input type={"password"} variant="filled" placeholder="Enter New Password"  ref={password} />
              <Input type={"password"} variant="filled" placeholder="Confirm New Password" ref={confirm}   />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancle
            </Button>
            <Button colorScheme="blue" onClick={handelUpdate}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
