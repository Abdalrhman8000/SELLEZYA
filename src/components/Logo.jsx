import { Container, Flex, Img, useColorMode } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components'

const Sp = styled.span`
    color:${prop => prop.cl};
`

export const Logo = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex gap="10px" alignItems={"center"} justifyContent="center" direction={"column"}>
         <Img src='./assets/Logo.png' width={"50px"}/>
         <Container textAlign={"center"} fontWeight={"bold"}><Sp cl={colorMode == "light" ? "#025a86" : "#4ebbf1"}>S</Sp>E<Sp cl={colorMode == "light" ? "#025a86" : "#4ebbf1"}>L</Sp><Sp cl={colorMode == "light" ? "#025a86" : "#4ebbf1"}>L</Sp>EZY<Sp cl={colorMode == "light" ? "#025a86" : "#4ebbf1"}>A</Sp></Container>
    </Flex>
  )
}
