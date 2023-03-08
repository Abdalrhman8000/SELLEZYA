import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { Logo } from ".././components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFirebase } from "../firebase/useFirebase";
import BarLoader from "react-spinners/BarLoader";

const inital__data = { userName: "", email: "", password: "", confirm: "" };
const regexEmailPattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

export const SigninForm = () => {
  const [formData, setFormData] = useState(inital__data);
  const { createNewUser } = useFirebase();
  const [loaderStatus,setLoaderStatus] = useState(false)

  const handelChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const errorMessage = (mess) => {
    toast.warn(mess, {
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

  const handelSubmit = async () => {
    if (
      formData.userName == "" ||
      formData.email == "" ||
      formData.confirm == "" ||
      formData.password == ""
    ) {
      errorMessage("Please enter your data");
    } else if (!regexEmailPattern.test(formData.email)) {
      errorMessage("Please enter valid email @");
    } else if (formData.userName.length < 5) {
      errorMessage("Please enter valid name not less than 5");
    } else if (formData.password.length < 10) {
      errorMessage("Please enter valid password not less than 10");
    } else if (formData.confirm != formData.password) {
      errorMessage("Check your confirmation !");
    } else {
      setLoaderStatus(true);
      const resultAuth = await createNewUser(formData.email, formData.password,formData.userName);
      if(resultAuth){
        setFormData(inital__data);
        setLoaderStatus(false);
      }
    }
  };

  return (
    <Flex
      direction={"column"}
      height={"100vh"}
      width={"100vw"}
      alignItems="center"
      justifyContent={"center"}
    >
      <Logo />
      <BarLoader
        color="#4EBBF2"
        loading = {loaderStatus}
        width={100}
        cssOverride={{ marginTop: "20px" }}
      />

      <Box boxShadow={{base:"",md:"lg"}}>
        <Stack
          justifyContent={{ base: "center", md: "flex-start" }}
          gap={"20px"}
          width={{ base: "100vw", md: "500px" }}
          height={{ base: "100%", md: "auto" }}
          direction={"column"}
          borderRadius={"10px"}
          padding="30px"
        >
          <InputGroup>
            <InputRightElement
              pointerEvents="none"
              children={<AiOutlineUser color="gray.300" />}
            />
            <Input
              value={formData.userName}
              onChange={handelChange}
              name="userName"
              size="lg"
              variant="filled"
              placeholder="Name"
            />
          </InputGroup>
          <InputGroup>
            <InputRightElement
              pointerEvents="none"
              children={<HiOutlineMail color="gray.300" />}
            />
            <Input
              value={formData.email}
              onChange={handelChange}
              name="email"
              size="lg"
              variant="filled"
              placeholder="Email @"
            />
          </InputGroup>
          <InputGroup>
            <InputRightElement
              pointerEvents="none"
              children={<RiLockPasswordLine color="gray.300" />}
            />
            <Input
              value={formData.password}
              onChange={handelChange}
              name="password"
              size="lg"
              type="password"
              variant="filled"
              placeholder="Password"
            />
          </InputGroup>
          <InputGroup>
            <InputRightElement
              pointerEvents="none"
              children={<RiLockPasswordLine color="gray.300" />}
            />
            <Input
              value={formData.confirm}
              onChange={handelChange}
              name="confirm"
              size="lg"
              type="password"
              variant="filled"
              placeholder="Confirm Password"
            />
          </InputGroup>
          <Button
            onClick={handelSubmit}
            size="lg"
            direction={"row"}
            rightIcon={<BiLogIn />}
            colorScheme="telegram"
            variant="solid"
          >
            Sign in
          </Button>
          <Flex
            justifyContent={"flex-start"}
            gap="10px"
            borderTop="1px solid #0088CC"
            width="full"
            padding={"15px 0"}
          >
            <span>You have an account ?</span>
            <Link to="/">
              <Flex color={"telegram.700"} textDecoration={"underline"}>
                Let's Login one
              </Flex>
            </Link>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};
