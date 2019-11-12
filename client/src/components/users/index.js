import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import produce from 'immer';
import { Box } from '@chakra-ui/core';

import Subscriber from 'components/Subscriber';
// import UserList from './UserList';
import Friends from './Friends';
import FriendRequests from './FriendRequests';
import SentFriendRequests from './SentFriendRequests';

const LIST_USERS = gql`{
  listUsers {
    name
    email
  }
}`

const USERS_SUBSCRIPTION = gql`
  subscription onUserCreated {
    userCreated {
      name
      email
    }
  }
`;

// notes
// bookmark management
// stickies

const Users = ({ subscribeToNew, newItemPosition }) => (
  <Query query={LIST_USERS}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
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
          <Box pt={8}>
            <Friends />
            <FriendRequests />
            <SentFriendRequests />
          </Box>

          {/* <UserList users={data.listUsers} /> */}
        </Subscriber>
      );
    }}
  </Query>
);

export default Users;
