import React from "react";
import styled from '@emotion/styled'
import { Flex, Text, Icon } from '@chakra-ui/core';

import LogoutButton from './LogoutButton';

function AppHeader({ viewer }) {
  return (
    <Nav>
      <NavInner px={6} align="center" justifyContent="space-between">
        <Flex align="center">
          <Icon name="settings" size="24px" color="red.500" mr={2} />
          <Text fontSize="2xl" color="red.500">tinkering about</Text>
        </Flex>

        <LogoutButton viewer={viewer} />
      </NavInner>
    </Nav>
  )
}

export default AppHeader;

const Nav = styled('header')`
  position: fixed;
  top: 0;
  z-index: 4;
  background-color: #fff;
  left: 0;
  right: 0;
  border-bottom-width: 1px;
  width: 100%;
  height: 4rem;
`;

const NavInner = styled(Flex)`
  width: 100%;
  height: 100%;
`;
