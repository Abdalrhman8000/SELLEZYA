//igonor-Prettier
import {
  Box,
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
  Select,
  Spinner,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { ImgBoxSelectord } from "./ImgBoxSelectord";
import { toast } from "react-toastify";
import { useFirebase } from "../firebase/useFirebase";
import { getState } from "../context/Context";

const intialImages = { img_1: "", img_2: "", img_3: "", img_4: "" };
const intialProductDetails = {
  productName: "",
  productPrice: "",
  productType: "",
  productCurrency: "",
  productCountaty: "",
  phoneNumber: "",
  productDescription: "",
};
const regularExPhone =
  /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const CreateProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState(intialImages);
  const [productDetails, setProductDetails] = useState(intialProductDetails);
  const {upadteStatus} = getState();
  const { createDoc } = useFirebase();
  const [uploadStatus,setUploadStatus] = useState(false);

  const message = (mess) => {
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

  const handelChange = ({ target }) => {
    setProductDetails({ ...productDetails, [target.name]: target.value });
  };

 async function uploadData() {
    setUploadStatus(false);
    if (!productDetails.productName || productDetails.productName.length < 2) {
      message("Please enter valid product name not less then 2 character");
    } else if (!productDetails.productType) {
      message("Please select the type");
    } else if (!productDetails.productPrice) {
      message("Please enter  price");
    } else if (!productDetails.productCurrency) {
      message("Please select currency ");
    } else if (!productDetails.productCountaty) {
      message("Please enter countaty ");
    } else if (!productDetails.phoneNumber) {
      message("Please enter your phone number ");
    } else if (
      productDetails.phoneNumber.length != 12 ||
      regularExPhone.test(productDetails.phoneNumber)
    ) {
      message(
        "Please enter valid phone number with 12 number  with your phone code +xx"
      );
    } else if (
      !productDetails.productDescription ||
      productDetails.productDescription.length < 200
    ) {
      message("Please enter valid description not less than 200 character");
    } else if (Object.keys(images).filter((e) => images[e]).length < 4) {
      message("Please Select 4 images for the product");
    } else {
      const state =  await createDoc(productDetails, Object.values(images));
      if(state == true){
         setProductDetails(intialProductDetails);
         setImages(intialImages);
         setUploadStatus(true);
      }
    }
  }

  return (
    <>
      <Flex
        cursor={"pointer"}
        fontSize="2rem"
        position={"fixed"}
        zIndex="100"
        bottom="20px"
        right="20px"
        onClick={onOpen}
      >
        <MdAddCircle />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxWidth={{ sm: "100%", md: "85%" ,lg:"50%"}}
          borderRadius={{ sm: "0", md: "5px" }}
          overflow={"auto"}
          height={{ base: "100%", md: "auto" }}
          margin={"auto"}
          top={{ sm: "0%" }}
        >
          <ModalHeader>Create a Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              gap={"10px"}
              padding={"20px"}
              justifyContent={"space-between"}
            >
              <Input
                value={productDetails.productName}
                variant="filled"
                placeholder="Product Name"
                name="productName"
                onChange={handelChange}
              />
              <Select
                placeholder="Product type"
                variant="filled"
                name="productType"
                onChange={handelChange}
                value={
                  productDetails.productType && productDetails.productType
                }
              >
                <option value="Clothes & Shoes">Clothes & Shoes</option>
                <option value="jewelry & Accessories">
                  jewelry & Accessories
                </option>
                <option value="Food & Vegetables">Food & Vegetables</option>
                <option value="Machinery & Tools">Machinery & Tools</option>
                <option value="other">Other</option>
              </Select>
            </Flex>
            <Flex
              gap={"10px"}
              padding={"20px"}
              justifyContent={"space-between"}
            >
              <Input
                type={"number"}
                value={productDetails.productPrice}
                variant="filled"
                name="productPrice"
                placeholder="Product Price"
                onChange={handelChange}
              />
              <Select
                placeholder="Currency"
                variant="filled"
                name="productCurrency"
                onChange={handelChange}
                value={
                  productDetails.productCurrency &&
                  productDetails.productCurrency
                }
              >
                <option value="$">$</option>
                <option value="€">€</option>
                <option value="¥">¥</option>
                <option value="﷼">﷼</option>
              </Select>
            </Flex>
            <Flex
              gap={"10px"}
              padding={"20px"}
              justifyContent={"space-between"}
            >
              <Input
                type={"number"}
                name="productCountaty"
                variant="filled"
                placeholder="Product countaty"
                onChange={handelChange}
                value={productDetails.productCountaty}
              />
              <Input
                type={"number"}
                variant="filled"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handelChange}
                value={productDetails.phoneNumber}
              />
            </Flex>
            <Flex
              gap={"30px"}
              padding={"20px"}
              justifyContent={"space-between"}
            >
              <Textarea
                value={productDetails.productDescription}
                placeholder="Product description"
                height={"200px"}
                name="productDescription"
                onChange={handelChange}
              />
            </Flex>
            <Flex overflow={"auto"}>
              {["img_1", "img_2", "img_3", "img_4"].map((e) => (
                <ImgBoxSelectord
                  images={images}
                  setImages={setImages}
                  id={e}
                  key={e}
                  state={uploadStatus}
                />
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={"space-between"}>
            <Box>
              {upadteStatus && (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
            </Box>
            <Flex>
              <Button hidden={!upadteStatus ? false : true} variant="ghost" onClick={onClose}>
                Cancle
              </Button>
              <Button hidden={!upadteStatus ? false : true} disabled={uploadStatus} onClick={uploadData} colorScheme="blue" mr={3}>
                Upload
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
