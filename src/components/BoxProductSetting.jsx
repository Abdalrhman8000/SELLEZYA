import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { SlOptions } from "react-icons/sl";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { bg } from "../global/GlobalData";

export const BoxProductSetting = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="filled"
        colorScheme="gray"
        aria-label="See menu"
        icon={<BsThreeDotsVertical />}
      ></MenuButton>
      <MenuList color={colorMode == "light" ? bg : "#fff"}>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem>Payments </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
