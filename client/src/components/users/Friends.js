import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Flex, Text, Heading, Button } from '@chakra-ui/core';

import { Card } from 'components/ui'
import FriendRequestModal from 'components/ui/FriendRequestModal';
import FriendRequestAcceptedSubscriber from './FriendRequestAcceptedSubscriber';

const FRIENDS_QUERY = gql`
  query ViewerFriends {
    viewer {
      entityId
      friends {
        entityId
        name
      }
    }
  }
`

function Friends() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Query query={FRIENDS_QUERY}>
      {({ loading, error, data, subscribeToMore, refetch }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const friends = data.viewer.friends;

        return (
          <FriendRequestAcceptedSubscriber
            viewer={data.viewer}
            subscribeToMore={subscribeToMore}
            refetch={refetch}
            showToast
          >
            <Card p={4} mb={4}>
              <Flex justifyContent="space-between">
                <Heading size="md">
                  Friends                
                </Heading>
                <Button size="sm" onClick={() => setIsOpen(true)}>
                  Add a friend
                </Button>
              </Flex>
              
              {friends.map(f => <Text fontSize="lg" key={f.entityId}>{f.name}</Text>)}

              <FriendRequestModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
              />
            </Card>
          </FriendRequestAcceptedSubscriber>
        )
      }}
    </Query>
  )
}

export default Friends