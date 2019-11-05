import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Text, Heading } from '@chakra-ui/core';

const FRIENDS_QUERY = gql`
  query ViewerFriends {
    viewer {
      friends {
        entityId
        name
      }
    }
  }
`

function Friends() {
  return (
    <Query query={FRIENDS_QUERY}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const friends = data.viewer.friends;

        return (
          <>
            <Heading size="md">Friends</Heading>
            {friends.map(f => <Text key={f.entityId}>{f.name}</Text>)}
          </>
        )
      }}
    </Query>
  )
}

export default Friends