import { Box, Button, Flex, useColorMode } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BoxSlider } from "../components/BoxSlider";
import { getState } from "../context/Context";
import { useFirebase } from "../firebase/useFirebase";

export const FavoritePage = () => {
  const { userData } = getState();
  const [userFavData, setUserFavData] = useState([]);
  const { user } = getState();
  const { colorMode, toggleColorMode } = useColorMode();
  const {UpdateDoc} = useFirebase();

  useEffect(() => {
    setUserFavData(userData.filter((e) => e.userId == user.uid));
  }, [userData]);

  function DeleteFav(images,colId){
    UpdateDoc(user.uid,"favoriteProduct",{images:images,colId:colId},[]).then(()=> {
      toast.success("Deleted successfuly", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })
  }

  return (
    <Flex gap="30px" overflow="hidden" padding={"50px"} flexWrap="wrap" justifyContent={{sm:"center",md:"flex-start"}} alignItems={{sm:"center",md:"flex-start"}}>
      {userFavData &&
        userFavData.map(({ favoriteProduct }) =>
          favoriteProduct.map(({ images, colId }) => (
            <Flex direction={"column"} gap="20px" key={colId}>
              <Box
                borderRadius={"5px"}
                overflow="hidden"
                height={"200px"}
                width="300px"
                bg={colorMode == "light" ? "#28292b" : "#f5f5f5"}
              >
                <BoxSlider images={images} colId={colId} />
              </Box>
              <Flex gap={"10px"}>
                <Button padding={2} fontSize="1.5rem" onClick={() => {DeleteFav(images,colId)}}>
                  <MdDelete color="#fc5234" />
                </Button>
                <Link to={`/productDetails/${colId}`}>
                  <Button padding={2} fontSize="1.5rem">
                    <AiFillEye/>
                  </Button>
                </Link>
              </Flex>
            </Flex>
          ))
        )}
    </Flex>
  );
};
