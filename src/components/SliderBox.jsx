import { Box, Button, Flex, Img, Skeleton, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { UserOprtions } from './UserOprtions'

export const SliderBox = ({data,loader}) => {
  const [mainImg,setMainImg] = useState()

  useEffect(() => {
    setMainImg(data && data?.photosURLs[0]);
  },[data])
  return (
    <Flex alignItems="center"  width={{sm:"100%",md:"60%",lg:"50%"}} gap={"50px"} position="relative">  
          <Stack top={{base:"-10%",md:"10px"}} right={{base:"-10%",md:"10%"}} position="absolute">
           <Skeleton isLoaded={loader}>
              <UserOprtions hide={true} data={data} />
            </Skeleton>
          </Stack>   
        <Flex direction={"column"} gap="20px" borderRadius={"3px"} overflow="hidden">
            {data?.photosURLs.map((e) => <Skeleton isLoaded={loader}><Button width={"100%"} height="100%" padding={"5px"} onClick={() => setMainImg(e)}><Img cursor={"pointer"} src={e} width="100px"/></Button></Skeleton>)}
        </Flex>
        <Skeleton isLoaded={loader}>
          <Box borderRadius="5px"  width={"100%"} height={"300px"} overflow={"hidden"}><Img src={mainImg}  height="100%" width="100%" objectFit={"contain"}/></Box> 
        </Skeleton>
    </Flex>
  )
}
