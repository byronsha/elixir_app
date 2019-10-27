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

import { AUTH_TOKEN } from '../../constants';

const LOGIN = gql`
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

  const setAccessToken = data => {
    if (!data.login) {
      console.log('Login failed!')
      return;
    };
    localStorage.setItem(AUTH_TOKEN, data.login.accessToken)
  }

  return (
    <Mutation mutation={LOGIN}
      onCompleted={data => {
        setEmail('');
        setPassword('');
        setAccessToken(data)
        history.push('/')
      }}
    >
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
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" placeholder="Enter your email" />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" placeholder="Enter your password" />
              </FormControl>

              <Button variantColor="teal" type="submit" isLoading={loading}>
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