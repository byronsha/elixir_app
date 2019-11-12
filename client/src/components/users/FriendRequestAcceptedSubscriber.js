import React from 'react';
import gql from 'graphql-tag';
import { useToast } from '@chakra-ui/core';

import Subscriber from 'components/Subscriber';

const FRIEND_REQUEST_ACCEPTED_SUBSCRIPTION = gql`
  subscription onFriendRequestAccepted($entityId: String!) {
    friendRequestAccepted(entityId: $entityId) {
      message
      createdAt
      sender {
        name
      }
      recipient {
        name
      }
    }
  }
`

const FriendRequestAcceptedSubscriber = props => {
  const toast = useToast();
  const { viewer, subscribeToMore, children, refetch, showToast } = props;

  return (
    <Subscriber subscribeToNew={() =>
      subscribeToMore({
        document: FRIEND_REQUEST_ACCEPTED_SUBSCRIPTION,
        variables: { entityId: viewer.entityId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const { friendRequestAccepted } = subscriptionData.data

          if (friendRequestAccepted) {
            const { recipient } = friendRequestAccepted;

            refetch();
            if (showToast) {
              toast({
                title: 'Friend request accepted',
                description: `${recipient.name} accepted your friend request`,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            }
          };

          return prev;
        },
      })
    }>
      {children}
    </Subscriber>
  )
}

export default FriendRequestAcceptedSubscriber