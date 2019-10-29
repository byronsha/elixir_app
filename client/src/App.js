import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { createClient } from 'util/apollo';
import Home from 'components/Home';
import Login from 'components/Login';
import { theme, ThemeProvider, CSSReset } from '@chakra-ui/core';

function App() {
  const client = createClient();

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CSSReset />

        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;