import { Img, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { MdAddLink } from "react-icons/md";
import styled from "styled-components";

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 200px);
  gap: 20px;
  padding: 10px;
`;

const Dashed = styled.div`
  height: 200px;
  border: 1px dashed #000;
  border-color: ${(prop) => prop.bColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  position: relative;
  & img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  &:hover {
    background-color: #add8e675;
    cursor: pointer;
  }
`;


export const ImgBoxSelectord = ({ id, setImages, images ,state}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const inp = useRef()


  useEffect(() => {
    if(state){
      setPreview('');
      setFile('')
      inp.current.value = "";
    }
  },[state])

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
      setImages({ ...images, [id]: "" });
      return;
    }

    setFile(target.files[0]);
    setImages({ ...images, [id]: target.files[0]});
  }
  return (
    <Box>
      <input ref={inp} type="file" id={id} hidden onChange={(e) => selectFile(e)} />
      <label htmlFor={id}>
        <Dashed
          style={{ borderColor: preview && "transparent" }}
          bColor={colorMode == "light" ? "#000" : "#fff"}
        >
          {!preview && <MdAddLink />}
          {preview && <Img src={preview} />}
        </Dashed>
      </label>
    </Box>
  );
};
