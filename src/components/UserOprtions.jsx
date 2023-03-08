import { Button, Flex } from "@chakra-ui/react";
import { updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsEyeFill, BsHeart } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { getState } from "../context/Context";
import { useFirebase } from "../firebase/useFirebase";
import { Bbg } from "../global/GlobalData";

export const UserOprtions = ({ data, hide }) => {
  const { UpdateDoc } = useFirebase();
  const { user, userData } = getState();
  const [favStatus, setFavStatus] = useState(false);

  function appendFav() {
    UpdateDoc(
      user.uid,
      "favoriteProduct",
      { images: data?.photosURLs, colId: data?.colId },
      []
    );
    setFavStatus(!favStatus);
  }

  function favWatcher() {
    if (userData) {
      userData.map(({ favoriteProduct, userId }) =>
        favoriteProduct.map(({ images, colId }) => {
          if (data?.colId == colId && user.uid == userId) {
            setFavStatus(true);
          }
        })
      );
    }
  }

  useEffect(() => {
    favWatcher();
  }, [userData,data]);

  return (
    <Flex>
      <Button
        onClick={appendFav}
        padding={0}
        color="#FF6347"
        _hover={{ bg: Bbg }}
        background="transparent"
      >
        {favStatus ? <MdFavorite fontSize={hide && "2.1rem"}/> : <BsHeart fontSize={hide && "2.1rem"}/>}
      </Button>

      {!hide && (
        <Link to={`/productDetails/${data?.colId}`}>
          <Button padding={0} _hover={{ bg: Bbg }} background="transparent">
            <BsEyeFill />
          </Button>
        </Link>
      )}
    </Flex>
  );
};
