import React from 'react';
import { Box, Flex, List, ListItem, Text } from '@chakra-ui/core';

import AcceptFriendRequest from './AcceptFriendRequest'

const FriendRequestList = ({ friendRequests }) => (
  <List styleType="none">
    {friendRequests.map(friendRequest => (
      <ListItem key={friendRequest.sender.name} my={1}>
        <Flex align="center" justify="space-between" p={2} border="1px" borderRadius="4px">
          <Box mr={4}>
            <Text>{friendRequest.message}</Text>
            <Text fontSize="sm">{friendRequest.sender.name} - {friendRequest.createdAt}</Text>
          </Box>
          <AcceptFriendRequest entityId={friendRequest.entityId} />
        </Flex>
      </ListItem>
    ))}
  </List>
)

export default FriendRequestList