import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
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
import { Logo } from "./Logo";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFirebase } from "../firebase/useFirebase";
import { BarLoader } from "react-spinners";

const regexEmailPattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

export const LoginForm = () => {
  const email = useRef();
  const password = useRef();
  const { signExistUser, GLogin } = useFirebase();
  const [loaderStatus, setLoader] = useState(false);

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

  const handelLogin = async (e) => {
    e.preventDefault();
    if (!regexEmailPattern.test(email.current.value)) {
      errorMessage("Please enter valid email @");
    } else if (password.current.value.length < 10) {
      errorMessage("Please enter valid password");
    } else if (password.current.value == "" || email.current.value == "") {
      errorMessage("Please enter your data");
    } else {
      setLoader(true);
      const resultAuth = await signExistUser(
        email.current.value,
        password.current.value
      );
      if (resultAuth) {
        email.current.value = "";
        password.current.value = "";
        setLoader(false);
      }
    }
  };

  const handelGLogin = () => {
    GLogin();
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
        loading={loaderStatus}
        width={100}
        cssOverride={{ marginTop: "20px" }}
      />

      <Box boxShadow={{ base: "", md: "lg" }}>
        <Stack
          justifyContent={{ base: "center", md: "flex-start" }}
          gap={"20px"}
          width={{ base: "100vw", md: "500px" }}
          height={{ base: "100%", md: "auto" }}
          direction={"column"}
          borderRadius={"10px"}
          padding="30px"
        >
          <FormControl display={"flex"} flexDir="column" gap={"30px"} as={"form"} onSubmit={handelLogin}>
            <InputGroup>
              <InputRightElement
                pointerEvents="none"
                children={<HiOutlineMail color="gray.300" />}
              />
              <Input
                ref={email}
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
                ref={password}
                size="lg"
                type="password"
                variant="filled"
                placeholder="Password"
              />
            </InputGroup>

            <Button
              size="lg"
              direction={"row"}
              rightIcon={<FcGoogle />}
              colorScheme="gray"
              variant="solid"
              onClick={handelGLogin}
            >
              Google
            </Button>
            <Button
              type="submit"
              size="lg"
              direction={"row"}
              rightIcon={<BiLogIn />}
              colorScheme="telegram"
              variant="solid"
            >
              Login
            </Button>
          </FormControl>
          <Flex
            justifyContent={"flex-start"}
            gap="10px"
            borderTop="1px solid #0088CC"
            width="full"
            padding={"15px 0"}
          >
            <span>You don't have an account ?</span>
            <Link to="/create">
              <Flex color={"telegram.700"} textDecoration={"underline"}>
                Let's Create one
              </Flex>
            </Link>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};
