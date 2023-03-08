import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  Input,
  DrawerHeader,
  DrawerFooter,
  useDisclosure,
  WrapItem,
  Avatar,
  AvatarBadge,
  Text,
  Flex,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
  SkeletonCircle,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { getState } from "../context/Context";
import { UpdateUserAuth } from "./UpdateUserAuth";
import { UpdateUserData } from "./UpdateUserData";
import { AiOutlineSetting } from "react-icons/ai";
import { UpdateUserPass } from "./UpdateUserPass";
import { HiOutlineLogout } from "react-icons/hi";
import { useFirebase } from "../firebase/useFirebase";
import { UpdataPhoto } from "./UpdataPhoto";
import {BsFillMoonStarsFill, BsFillSunFill} from "react-icons/bs";
import {VscListSelection} from "react-icons/vsc";
import { Bbg, bg } from "../global/GlobalData";

const initBtnStatus = { userName: true, email: true, userPassword: true };
const initNewData = { userName: "", email: "", userPassword: "" };


export const DrawerBar = ({navController}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const btnRef = useRef();
  const { user, userAuthProvider } = getState();
  const [gStatus, setGStatus] = useState(initBtnStatus);
  const [newData, setNewData] = useState(initNewData);
  const { LogoutUser } = useFirebase();
  const [scrollStatus,setScrollStatus] = useState(false);
  const drawerPostion = scrollStatus ? {position:"fixed",width:"100%",zIndex:"1000",top:"0px"}:"";



  useEffect(() => {
    addEventListener("scroll",(e) => {
        window.scrollY > 20 ? setScrollStatus(true) : setScrollStatus(false); 
    })
  },[])

  function handelChange({ target }) {
    setGStatus({
      ...gStatus,
      [target.getAttribute("name")]: !gStatus[target.getAttribute("name")],
    });
  }

  function handelChangeData({ target }) {
    setNewData({
      ...initNewData,
      [target.getAttribute("name")]: target.value,
    });
  }

  function handelLogout() {
    LogoutUser();
  }

 

  return (
    <>
      <WrapItem
        ref={btnRef}
        colorscheme="teal"
        bg={bg}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding="10px 20px"
        {...drawerPostion}
      >
        <Flex gap={"30px"} alignItems="center">
          <VscListSelection color="#fff" cursor={"pointer"} size={"1.8rem"} onClick={() => navController((NavPos) => !NavPos)} />
          <Avatar cursor="pointer" onClick={onOpen} bg="tomato" name={user?.displayName} src={user?.photoURL} />
        </Flex>
        <Button bg={Bbg} _hover={{}} color={"#fff"} onClick={toggleColorMode} variant={"solid"} leftIcon={colorMode == "light" ? <BsFillMoonStarsFill /> : <BsFillSunFill/>}></Button>
      </WrapItem>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader color={"#fff"} bg={bg}>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody bg={bg}>
            <UpdataPhoto />
            <Flex marginTop={"100px"} direction={"column"} gap="20px">
              <InputGroup size="md">
                <Input
                  variant="filled"
                  placeholder="Update"
                  disabled={gStatus.userName}
                  defaultValue={user?.displayName}
                  onInput={handelChangeData}
                  name="userName"
                />
                {userAuthProvider !== "google" && (
                  <InputRightElement width="4.5rem">
                    <UpdateUserData
                      name={"userName"}
                      eventStatus={handelChange}
                      dataStatus={gStatus}
                      userUpdatedData={newData}
                    ></UpdateUserData>
                  </InputRightElement>
                )}
              </InputGroup>
              <InputGroup size="md">
                <Input
                  variant="filled"
                  placeholder="Update"
                  disabled={gStatus.email}
                  defaultValue={user?.email}
                  onInput={handelChangeData}
                  name="email"
                />
                {userAuthProvider !== "google" && (
                  <InputRightElement width="4.5rem">
                    <UpdateUserData
                      name={"email"}
                      eventStatus={handelChange}
                      dataStatus={gStatus}
                      userUpdatedData={newData}
                    ></UpdateUserData>
                  </InputRightElement>
                )}
              </InputGroup>
              <InputGroup size="md">
                <Input
                  type={"password"}
                  variant="filled"
                  placeholder="************"
                  disabled={gStatus.userPassword}
                  onInput={handelChangeData}
                  name="userPassword"
                />
                {userAuthProvider !== "google" && (
                  <InputRightElement width="4.5rem">
                    <UpdateUserData
                      name={"userPassword"}
                      eventStatus={handelChange}
                      dataStatus={gStatus}
                      userUpdatedData={newData}
                    ></UpdateUserData>
                  </InputRightElement>
                )}
              </InputGroup>
            </Flex>
          </DrawerBody>

          <DrawerFooter bg={bg}>
            <Button
              onClick={handelLogout}
              variant={"solid"}
              bg={Bbg}
              color={"#fff"}
              _hover={{ bg: "#fff",color:Bbg }}
              margin={"0 20px"}
            >
              <HiOutlineLogout />
            </Button>
            {userAuthProvider !== "google" && (
              <Menu>
                <MenuButton   _hover={{ bg: "#fff",color:Bbg }} color={"#fff"}  bg={Bbg} variant="solid" as={Button}>
                  <AiOutlineSetting />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <UpdateUserAuth />
                  </MenuItem>
                  <MenuItem>
                    <UpdateUserPass />
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
