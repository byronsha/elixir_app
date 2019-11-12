import React from 'react';
import { Box, Flex, List, ListItem, Text } from '@chakra-ui/core';

import AcceptFriendRequest from './AcceptFriendRequest'

const FriendRequest = ({ friendRequest: { entityId, sender, message, createdAt } }) => (
  <ListItem key={sender.name} mb={2}>
    <Flex align="center" justify="space-between">
      <Flex align="flex-end">
        <Text mr={4}>{sender.name}</Text>
        <Text mr={4} fontSize="0.75rem" d="inline" color="gray.400">{new Date(createdAt).toLocaleDateString()}</Text>
        <Box bg="red.300" px={1}>
          <Text fontSize="sm">{message}</Text>
        </Box>
      </Flex>
      <Box mx={4} flexGrow="1" height="1px" bg="blue.100" />
      <AcceptFriendRequest entityId={entityId} />
    </Flex>
  </ListItem>
)

const FriendRequestList = ({ friendRequests }) => (
  <List styleType="none">
    {friendRequests.map(fr =>
      <FriendRequest key={fr.entityId} friendRequest={fr} />
    )}
  </List>
)

export default FriendRequestList