import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import produce from 'immer';
import { Button } from '@chakra-ui/core';

import Subscriber from 'components/Subscriber';
import FriendRequestModal from 'components/ui/FriendRequestModal';
import UserList from './UserList';
import FriendRequests from './FriendRequests';

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

function Users({ subscribeToNew, newItemPosition }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
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
            <UserList users={data.listUsers} />

            <Button onClick={() => setIsOpen(true)}>
              Add a friend
            </Button>
            <FriendRequestModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />

            <FriendRequests />
          </Subscriber>
        );
      }}
    </Query>
  );
}

export default Users;
