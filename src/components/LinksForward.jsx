import React, { Fragment } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export const LinksForward = ({data}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Breadcrumb
      spacing="8px"
      bg={colorMode == "light" ? "#fff" : "#1a202c"}
      padding="10px"
      separator={<BsArrowRightShort color="gray.500" />}
    >
    {Object.keys(data).map((e,i) => 
        <BreadcrumbItem key={e}>
            <Link  to={data[e]}>
                <BreadcrumbLink  color={i == Object.keys(data).length - 1 ? "#626ebe" : "" }>{e}</BreadcrumbLink>
            </Link>
        </BreadcrumbItem>
    )}
    </Breadcrumb>
  );
};
