import React from 'react';
import { useHistory } from 'react-router-dom';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import { Button } from '@chakra-ui/core';

const LOGOUT_MUTATION = gql`
  mutation Logout($email: String!) {
    logout(email: $email) {
      email
    }
  }
`;

const LogoutButton = ({ viewer }) => {
  let history = useHistory();

  return (
    <Mutation
      mutation={LOGOUT_MUTATION}
      onCompleted={() => history.push('/login')}
    >
      {(submit, { data, loading, error }) => {
        const handleClick = e => {
          submit({ variables: { email: viewer.email } })
        }
        return (
          <Button
            onClick={handleClick}
            variantColor="red"
            variant="ghost"
          >
            Logout
          </Button>
        )
      }}
    </Mutation>
  );
}

export default LogoutButton;