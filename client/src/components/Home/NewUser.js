import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo"
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Box,
  Button,
} from "@chakra-ui/core";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
    }
  }
`;

const NewUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = CREATE_USER;

  return (
    <Mutation mutation={mutation}
      onCompleted={() => {
        setName('');
        setEmail('');
        setPassword('');
      }}
    >
      {(submit, { data, loading, error }) => {
        return (
          <Box mb={4}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit({ variables: { name, email, password } });
              }}
            >
              <FormControl mb={4}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input value={name} onChange={e => setName(e.target.value)} type="text" id="name" placeholder="Enter your name" />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" placeholder="Enter your email" aria-describedby="email-helper-text" />
                <FormHelperText id="email-helper-text">
                  We'll never share your email
                </FormHelperText>
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
};

export default NewUser