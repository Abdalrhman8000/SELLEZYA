import { useColorModeValue } from "@chakra-ui/react"




export const  Bbg = () => {
    return useColorModeValue("gray.900","gray.700");
    
}
export const bg = () => {
    return  useColorModeValue("gray.700","gray.900");
}