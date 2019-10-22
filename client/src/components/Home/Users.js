import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
import produce from "immer";
import { Box, Flex, Text, Icon } from '@chakra-ui/core';
import styled from '@emotion/styled'

import Subscriber from "../../Subscriber";
import NewUser from "./NewUser";
import UserList from "./UserList";

const LIST_USERS = gql`
  {
    listUsers {
      name
      email
    }
  }
`;

const USERS_SUBSCRIPTION = gql`
  subscription onUserCreated {
    userCreated {
      id
      name
      email
    }
  }
`;

function Users({ subscribeToNew, newItemPosition }) {
  return (
    <Query query={LIST_USERS}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <>
            <Nav>
              <NavInner px={6} align="center">
                <Icon name="settings" size="24px" color="red.500" mr={2} />
                <Text fontSize="2xl" color="red.500">tinkering about</Text>
              </NavInner>
            </Nav>

            <Container p={4}>
              <NewUser />
              <Subscriber subscribeToNew={() =>
                subscribeToMore({
                  document: USERS_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;

                    const newUser = subscriptionData.data.userCreated;
                    if (prev.listUsers.find((user) => user.id === newUser.id)) {
                      return prev;
                    }

                    return produce(prev, (next) => {
                      next.listUsers.unshift(newUser);
                    });
                  },
                })
              }>
                <UserList users={data.listUsers} />
              </Subscriber>
            </Container>
          </>
        );
      }}
    </Query>
  );
}

export default Users;

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

const Container = styled(Box)`
  margin-top: 4rem;
`;