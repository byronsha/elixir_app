import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Box,
  Button,
} from '@chakra-ui/core';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Mutation mutation={CREATE_USER_MUTATION}
      onCompleted={() => {
        setName('');
        setEmail('');
        setPassword('');
      }}
    >
      {(submit, { data, loading, error }) => {
        return (
          <Box py={6} px={4}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit({ variables: { name, email, password } });
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
                  aria-describedby="email-helper-text"
                />
                <FormHelperText id="email-helper-text">
                  We'll never share your email
                </FormHelperText>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your username"
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
};

export default SignupForm