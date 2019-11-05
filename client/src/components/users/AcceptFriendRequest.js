import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button } from '@chakra-ui/core';

const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  mutation AcceptFriendRequest($entityId: String!) {
    acceptFriendRequest(entityId: $entityId) {
      message
    }
  }
`

function AcceptFriendRequest(props) {
  return (
    <Mutation
      mutation={ACCEPT_FRIEND_REQUEST_MUTATION}
      refetchQueries={['ViewerFriends', 'ViewerFriendRequests']}
    >
      {(submit, { data, loading, error }) => (
        <Button
          size="sm"
          variantColor="green"
          onClick={(e) => {
            e.preventDefault();
            submit({ variables: { entityId: props.entityId } });
          }}
        >
          Accept
        </Button>
      )}
    </Mutation>
  );
}

export default AcceptFriendRequest