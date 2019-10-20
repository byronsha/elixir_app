import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo"

const CREATE_USER = gql`
mutation CreateUser($name: String!, $email: String!, $password: String!) {
  createUser(name: $name, email: $email, password: $password) {
    id
  }
 }
`;

const NewUser = ({ params }) => {
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit({ variables: { name, email, password } });
            }}
          >
            <input
              name="name"
              type="text"
              placeholder="What's your name?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              name="email"
              type="text"
              placeholder="What's your email?"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Add" />
          </form>
        );
      }}
    </Mutation>
  );
};

export default NewUser