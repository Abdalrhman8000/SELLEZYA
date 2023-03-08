import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Skeleton,
  SkeletonCircle,
  Spinner,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { View } from "../components/MainProductSlide";
import { ProductBox } from "../components/ProductBox";
import { ProductSekelton } from "../components/ProductSekelton";
import { UpdataPhoto } from "../components/UpdataPhoto";
import { getState } from "../context/Context";
import { useFirebase } from "../firebase/useFirebase";

export const UserProfilePage = () => {


  const { colorMode, toggleColorMode } = useColorMode();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [saveBtnStatus,setBtnStatus] = useState(false);
  const [saveBtnStatusLoad,setBtnStatusLoad] = useState(false);
  const {UpdateUserBg} = useFirebase();
  const {userData,user,postesData,isLoad} = getState();
  const [userDefBg,setUserDefBg] = useState(); 
  const [userPosts,setUserPosts] = useState([]);
  const fileInput  = useRef()



  useEffect(() => {
    if (!file) {
      setPreview("");
      setBtnStatus(true)
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if(userData.filter((e) => e.userId == user.uid).map((e) => e.userBg).length == 0){
      return;
    }
    setUserDefBg(userData.filter((e) => e.userId == user.uid).map((e) => e.userBg));
  },[userData])


  useEffect(() => {
    setUserPosts(postesData.filter((e) => e.userId == user.uid));
  },[postesData])

  function selectFile({ target }) {
    if (!target.files || target.files.length == 0) {
      setFile("");
      setBtnStatus(true)
      return;
    }

    setFile(target.files[0]);
    setBtnStatus(false)
  }

  


  return (
    <Flex flexDir={"column"} overflowX="hidden">
     <Skeleton isLoaded={isLoad}>
      <Box
        height="609px"
        backgroundImage={`url(${preview ? preview : userDefBg })`}
        backgroundRepeat="no-repeat"
        width={"100vw"}
        backgroundSize="cover"
        position={"relative"}
        backgroundPosition="center center"
        display={"flex"}
        justifyContent="flex-start"
        alignItems={{base:"flex-start",md:"flex-end"}}
        backgroundColor={colorMode == "light" ? "#3f4858" : "#28292b"}
      >
        <input
          type="file"
          id="bgSelector"
          hidden
          onChange={selectFile}
          ref={fileInput}
          accept="image/jpeg, image/png, image/jpg"
        />
        <FormLabel
          margin={"20px 10px"}
          htmlFor="bgSelector"
          fontSize={"2.5rem"}
          cursor="pointer"
          borderRadius="10px"
          shadow={"lg"}
          color= "#fff"
        >
          <Button
            display="flex"
            alignItems={"center"}
            pointerEvents="none"
            backgroundColor={colorMode == "light" ? "#28292b" : "#3f4858"}
            gap="10px"
          >
            Edit background  <TbCameraPlus />
          </Button>
        </FormLabel>
        <Button
            margin={"20px 10px"}
            display="flex"
            alignItems={"center"}
            hidden={saveBtnStatus}
            color="#fff"
            _hover={{bg: "#ccc",color:colorMode == "light" ? "#3f4858" : "#28292b"}}
            backgroundColor={colorMode == "light" ? "#28292b" : "#3f4858"}
            gap="10px"
            onClick={() => {
              setBtnStatusLoad(true);
              UpdateUserBg(file).then(() => {
                 setTimeout(() => {
                  setBtnStatus(true)
                  setBtnStatusLoad(false);
                 },2000)
              })
            }}
          >
            Save 
            {saveBtnStatusLoad && <Spinner color='red.500' /> }
          </Button>
                  <Button
            margin={"20px 10px"}
            display="flex"
            alignItems={"center"}
            hidden={saveBtnStatus}
            color="#fff"
            _hover={{bg: "#ccc",color:colorMode == "light" ? "#3f4858" : "#28292b"}}
            backgroundColor={colorMode == "light" ? "#28292b" : "#cc5959"}
            gap="10px"
            onClick={() => {
              setBtnStatus(true)
              setFile("")
              setPreview("")
              fileInput.current.value = ""
            }}
          >
            Cancle 
          </Button>
        <Stack
          fontSize={"1rem"}
          name="Abdalrhman Eslam"
          position={"absolute"}
          bottom={{base:"-60px",md:"-110px"}}
          right={{base:"20px",md:"40px"}}
        >
          <UpdataPhoto sz="xl" />
        </Stack>
      </Box>
     </Skeleton>
      <Stack marginTop={"200px"}>
        {!isLoad && 
        <View>
          <ProductSekelton  isLoading={!isLoad} count={2}/>
        </View>
        }
        <View>
          {userPosts && userPosts.map((e) => <ProductBox key={e.colId} data={e}/>)}
        </View>
      </Stack>
    </Flex>
  );
};
