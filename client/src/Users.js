import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
import produce from "immer";
import Subscriber from "./Subscriber";
import NewUser from "./NewUser";

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
    <div>
      <h1>Users!</h1>
      <Query query={LIST_USERS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <>
              {/* // This NewUser component is the form to create a new user, we'll build that next. */}
              <NewUser params={createParams} />
              <Subscriber subscribeToNew={() =>
                subscribeToMore({
                  document: USERS_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    // if nothing is coming through the socket, just use the current data
                    if (!subscriptionData.data) return prev;

                    // something new is coming in! 
                    const newUser = subscriptionData.data.userCreated;

                    // Check that we don't already have the user stored.
                    if (prev.listUsers.find((user) => user.id === newUser.id)) {
                      return prev;
                    }

                    return produce(prev, (next) => {
                      // Add that new user!
                      next.listUsers.unshift(newUser);
                    });
                  },
                })
              }>
                <ul>
                  {data.listUsers.map(user => (
                    <li key={user.id}>
                      {user.name}: {user.email}
                    </li>
                  ))}
                </ul>
              </Subscriber>
            </>
          );
        }}
      </Query>
    </div>
  );
}
export default Users;