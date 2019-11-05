import React from 'react';
import { List, ListItem } from '@chakra-ui/core';

const UserList = ({ users }) => (
  <List styleType="disc">
    {users.map(user => (
      <ListItem key={user.email}>
        {user.name} ({user.email})
      </ListItem>
    ))}
  </List>
);

export default UserList
