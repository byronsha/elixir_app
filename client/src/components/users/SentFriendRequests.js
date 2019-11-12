import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Heading } from '@chakra-ui/core';

import { Card } from 'components/ui'
import FriendRequestAcceptedSubscriber from './FriendRequestAcceptedSubscriber';

const SENT_FRIEND_REQUESTS_QUERY = gql`
  query ViewerSentFriendRequests {
    viewer {
      entityId
      sentFriendRequests {
        entityId
        recipient {
          name
          email
        }
      }
    }
  }
`

const SentRequest = ({ recipient }) => <p>{recipient.name} ({recipient.email})</p>

const SentFriendRequests = () => (
  <Query query={SENT_FRIEND_REQUESTS_QUERY}>
    {({ loading, error, data, subscribeToMore, refetch }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      if (!data.viewer) return null;

      const { sentFriendRequests } = data.viewer;

      return (
        <FriendRequestAcceptedSubscriber
          viewer={data.viewer}
          subscribeToMore={subscribeToMore}
          refetch={refetch}
        >
          <Card p={4} mb={4}>
            <Heading size="md">
              Pending friend requests (sent)
            </Heading>

            {sentFriendRequests.map(({ recipient }) =>
              <SentRequest key={recipient.email} recipient={recipient} />
            )}
          </Card>
        </FriendRequestAcceptedSubscriber>
      )
    }}
  </Query>
);

export default SentFriendRequests
