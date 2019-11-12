import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  useToast,
} from '@chakra-ui/core';

const FRIEND_REQUEST_MUTATION = gql`
  mutation SendFriendRequest($email: String!, $message: String) {
    sendFriendRequest(email: $email, message: $message) {
      message
    }
  }
`

const FriendRequestForm = (props) => {
  const toast = useToast();

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [userNotFound, setUserNotFound] = React.useState(false);

  const handleCompleted = data => {
    if (!data.sendFriendRequest) {
      return setUserNotFound(true)
    }

    setEmail('')
    setMessage('')
    toast({
      title: 'Friend request sent',
      description: 'Blah blah blah blah',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    props.closeModal()
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
    setUserNotFound(false)
  }

  return (
    <Mutation
      mutation={FRIEND_REQUEST_MUTATION}
      refetchQueries={['ViewerSentFriendRequests']}
      onCompleted={handleCompleted}
    >
      {(submit, { data, loading, error }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit({ variables: { email, message } });
          }}
        >
          <FormControl mb={4}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              value={email}
              onChange={handleEmailChange}
              type="email"
              id="email"
              placeholder="Enter their email"
              isInvalid={userNotFound}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="password">Message</FormLabel>
            <Textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="What's your message?"
            />
          </FormControl>

          <Button
            variantColor="teal"
            type="submit"
            disabled={!email || userNotFound}
            isLoading={loading}
            mb={2}
          >
            Submit
          </Button>
        </form>
      )}
    </Mutation>
  );
}

export default FriendRequestForm