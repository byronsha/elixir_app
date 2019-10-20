import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
import produce from "immer";
import Subscriber from "./Subscriber";
import NewUser from "./NewUser";
import UserList from "./UserList";

const LIST_USERS = gql`
  {
    listUsers {
      id
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

function Users({ subscribeToNew, newItemPosition, createParams }) {
  return (
    <Query query={LIST_USERS}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <>
            <NewUser params={createParams} />
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
          </>
        );
      }}
    </Query>
  );
}

export default Users;