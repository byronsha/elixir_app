import React from 'react';
import { List, ListItem } from '@chakra-ui/core';

const UserList = ({ users }) => (
  <List mx={4} styleType="disc">
    {users.map(user => (
      <ListItem key={user.id}>
        {user.name} ({user.email})
      </ListItem>
    ))}
  </List>
);

export default UserList
