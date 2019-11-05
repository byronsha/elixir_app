import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import produce from 'immer';
import { Heading } from '@chakra-ui/core';

import Subscriber from 'components/Subscriber';
import FriendRequestList from './FriendRequestList'

const FRIEND_REQUESTS_QUERY = gql`
  query ViewerFriendRequests {
    viewer {
      friendRequests {
        entityId
        message
        createdAt
        sender {
          name
        }
      }
    }
  }
`

const FRIEND_REQUESTS_SUBSCRIPTION = gql`
  subscription onFriendRequestSent {
    friendRequestSent {
      message
      createdAt
      sender {
        name
      }
    }
  }
`

function FriendRequests({ subscribeToNew, newItemPosition }) {
  return (
    <Query query={FRIEND_REQUESTS_QUERY}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <Subscriber subscribeToNew={() =>
            subscribeToMore({
              document: FRIEND_REQUESTS_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const newFriendRequest = subscriptionData.data.friendRequestSent;
                // if (prev.viewer.friendRequests.find((rq) => rq.entityId === newFriendRequest.entityId)) {
                //   return prev;
                // }

                return produce(prev, (next) => {
                  next.friendRequests.unshift(newFriendRequest);
                });
              },
            })
          }>
            <Heading size="md">Friend requests</Heading>
            <FriendRequestList friendRequests={data.viewer.friendRequests} />
          </Subscriber>
        )
      }}
    </Query>
  )
}

export default FriendRequests