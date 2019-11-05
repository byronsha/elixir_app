import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
} from '@chakra-ui/core';

import { AUTH_TOKEN } from 'constants/index';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

const LoginForm = () => {
  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCompleted = data => {
    if (!data.login) {
      return console.log('Login failed!')
    };
    setEmail('');
    setPassword('');
    localStorage.setItem(AUTH_TOKEN, data.login.accessToken)
    history.push('/')
  }

  return (
    <Mutation mutation={LOGIN_MUTATION} onCompleted={handleCompleted}>
      {(submit, { data, loading, error }) => {
        return (
          <Box py={6} px={4}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit({ variables: { email, password } });
              }}
            >
              <FormControl mb={4}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </FormControl>

              <Button
                type="submit"
                variantColor="teal"
                isLoading={loading}
              >
                Submit
              </Button>
            </form>
          </Box>
        );
      }}
    </Mutation>
  );  
}

export default LoginForm