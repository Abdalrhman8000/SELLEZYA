//pretttier-ignore
import {
  Avatar,
  AvatarBadge,
  Text,
  useColorMode,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import { getState } from "../context/Context";
import { useFirebase } from "../firebase/useFirebase";
import { MdCameraAlt } from "react-icons/md";

export const UpdataPhoto = ({ sz }) => {
  const { UpdateUserPhoto } = useFirebase();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const { user, upadteStatus } = getState();
  const { colorMode, toggleColorMode } = useColorMode();
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  function selectFile({ target }) {
    if (!target.files || target.files.length == 0) {
      setFile("");
      return;
    }

    setFile(target.files[0]);
    UpdateUserPhoto(target.files[0]);
  }

  return (
    <WrapItem
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems="center"
      gap={"10px"}
      cursor="pointer"
      margin="20px"
      ref={btnRef}
      colorscheme="teal"
      onClick={onOpen}
    >
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        hidden
        id="userPhotoBtn"
        onChange={(e) => selectFile(e)}
      />
      <label htmlFor="userPhotoBtn">
        <Avatar
          _hover={{ bg: "#FA806A" }}
          size={{base:"lg",md:sz ? sz : "lg"}}
          bg="tomato"
          name={user?.displayName}
          src={preview ? preview : user?.photoURL}
        >
          <AvatarBadge
            bg={"blackAlpha.800"}
            padding="6px"
            boxSize={sz ? ".9em" : "1.2em"}
            color={"ButtonFace"}
            border={"none"}
            children={<MdCameraAlt />}
          />
        </Avatar>
      </label>
      <Text
        color={sz ? (colorMode == "light" ? "#242a35" : "#fff") : "#fff"}
        fontSize={{base:"auto",md:sz ? "1.5rem" : "auto"}}
        fontWeight={"600"}
      >
        {`${user?.displayName
          .slice(0, 1)
          .toUpperCase()}${user?.displayName.slice(1)}`}
      </Text>
      <BarLoader
        color="#4EBBF2"
        loading={upadteStatus}
        width={100}
        cssOverride={{ marginTop: "20px" }}
      />
    </WrapItem>
  );
};
