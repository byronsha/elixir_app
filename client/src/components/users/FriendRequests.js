import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import produce from 'immer';
import { Heading } from '@chakra-ui/core';

import { Card } from 'components/ui'
import Subscriber from 'components/Subscriber';
import FriendRequestList from './FriendRequestList'

const FRIEND_REQUESTS_QUERY = gql`
  query ViewerFriendRequests {
    viewer {
      email
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
  subscription onFriendRequestSent($email: String!) {
    friendRequestSent(email: $email) {
      entityId
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

        if (!data.viewer) return null;

        return (
          <Subscriber subscribeToNew={() =>
            subscribeToMore({
              document: FRIEND_REQUESTS_SUBSCRIPTION,
              variables: { email: data.viewer.email },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const newFriendRequest = subscriptionData.data.friendRequestSent;

                if (prev.viewer.friendRequests.find((rq) => rq.entityId === newFriendRequest.entityId)) {
                  return prev;
                }

                return produce(prev, (next) => {
                  next.viewer.friendRequests.unshift(newFriendRequest);
                });
              },
            })
          }>
            <Card p={4} mb={4}>
              <Heading size="md" mb={4}>Friend requests (received)</Heading>
              <FriendRequestList friendRequests={data.viewer.friendRequests} />
            </Card>
          </Subscriber>
        )
      }}
    </Query>
  )
}

export default FriendRequests