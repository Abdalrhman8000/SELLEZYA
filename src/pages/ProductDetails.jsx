import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Img,
  Skeleton,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ProductInfo } from "../components/ProductInfo";
import { SliderBox } from "../components/SliderBox";
import { useFirebase } from "../firebase/useFirebase";
import { getState } from "../context/Context";
import { LinksForward } from "../components/LinksForward";

export default function ProductDetails() {
  const data = useParams();
  const { getData } = useFirebase();
  const [productDetails, setProductDetails] = useState();
  const { colorMode, toggleColorMode } = useColorMode();
  const { postesData, user } = getState();
  const [moreProduct, setMoreProdcut] = useState([]);
  const [skLoader,setSkLoader] = useState(false);

  const getProduct = async () => {
    const prd = await getData(data.id);
    setProductDetails(prd);
    setTimeout(() => {
      setSkLoader(true);
    },1000)
  };
  useEffect(() => {
    getProduct();
    setMoreProdcut(
      postesData.filter((e) => (e.colId != data.id) & (e.userId != user.uid))
    );
  }, [data]);

  const Sc = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Flex flexDir={"column"} gap="120px" overflow={"hidden"}>
      <Stack
        position={"fixed"}
        bottom={0}
        right={{ base: "2%", md: "15px" }}
        zIndex="100"
      >
        <Skeleton isLoaded={skLoader}>
          <LinksForward
            data={{
              Home: "/",
              ProductDetails: `/productDetails/${data.id}`,
              [productDetails?.productName]: "",
            }}
          />
        </Skeleton>
      </Stack>
      <Flex
        marginTop="30px"
        padding={"50px"}
        alignItems="center"
        gap="100px"
        flexWrap={"wrap"}
      >
        <SliderBox data={productDetails} loader={skLoader} />
        <ProductInfo data={productDetails} loader={skLoader} />
      </Flex>
      {moreProduct.length > 0 && (
        <Flex
          padding={" 0 100px"}
          flexWrap="wrap"
          flexDirection="column"
          gap={"70px"}
          marginBottom="100px"
        >
          <Heading
            fontSize={{ base: "1.4rem", md: "2.5rem" }}
            textAlign={"center"}
            textDecoration="underline"
          >
            <Skeleton isLoaded={skLoader}>
              <Text>More Products</Text>
            </Skeleton>
          </Heading>
          <Flex gap={"50px"} flexWrap="wrap">
            {moreProduct.map((e) => (
              <Skeleton isLoaded={skLoader} key={e.photosURLs}>
                <Link to={`/productDetails/${e.colId}`}>
                  <Box
                    position={"relative"}
                    borderRadius="10px"
                    padding={"10px"}
                    cursor="pointer"
                    _hover={{ transform: "scale(1.2)" }}
                    transition={"all ease .4s"}
                    bg={colorMode == "light" ? "#3f4858" : "#28292b"}
                    onClick={Sc}
                    width="200px"
                    height={"200px"}
                  >
                    <Stack>
                      <Avatar
                        src={e?.userPhoto}
                        size="sm"
                        position={"absolute"}
                        top="-10px"
                        right="-10px"
                      />
                    </Stack>
                    <Img
                      src={e?.photosURLs[0]}
                      objectFit="cover"
                      width="100%"
                      height={"100%"}
                    />
                  </Box>
                </Link>
              </Skeleton>
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
