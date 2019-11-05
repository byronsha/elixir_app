import React from 'react';
import { List, ListItem } from '@chakra-ui/core';

const FriendRequestList = ({ friendRequests }) => (
  <List styleType="disc">
    {friendRequests.map(friendRequest => (
      <ListItem key={friendRequest.sender.name}>
        {friendRequest.sender.name} (Sent - {friendRequest.createdAt})
      </ListItem>
    ))}
  </List>
)

export default FriendRequestList