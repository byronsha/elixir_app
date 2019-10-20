import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { createClient } from './util/apollo';
import Users from './Users';
import { theme, ThemeProvider, CSSReset } from '@chakra-ui/core';

function App() {
  const client = createClient();

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CSSReset />
        <Users />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;