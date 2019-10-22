import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import produce from 'immer';
import { Box } from '@chakra-ui/core';
import styled from '@emotion/styled'

import Subscriber from '../../Subscriber';
import AppHeader from './AppHeader';
import NewUser from './NewUser';
import UserList from './UserList';

const LIST_USERS = gql`
  {
    viewer {
      name
      email
    }
    listUsers {
      name
      email
    }
  }
`;

const USERS_SUBSCRIPTION = gql`
  subscription onUserCreated {
    userCreated {
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

        if (!data.viewer) return null;

        return (
          <>
            <AppHeader viewer={data.viewer} />

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

const Container = styled(Box)`
  margin-top: 4rem;
`;