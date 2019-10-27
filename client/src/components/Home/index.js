import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Box } from '@chakra-ui/core';
import styled from '@emotion/styled'
import AppHeader from './AppHeader'

const VIEWER_QUERY = gql`{
  viewer {
    name
    email
  }
}`;

const Home = () => (
  <Query query={VIEWER_QUERY}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      if (!data.viewer) return null;

      return (
        <>
          <AppHeader viewer={data.viewer} />

          <NavContainer>
            <Nav maxW="18rem">
              <NavInner>
                HELLO WORLD
              </NavInner>
            </Nav>
          </NavContainer>
          <Box pl="18rem" mt={16}>
            <MainContainer>
              hey
            </MainContainer>
          </Box>
        </>
      )
    }}
  </Query>
)

export default Home;

const NavContainer = styled(Box)`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
`

const Nav = styled(Box)`
  top: 4rem;
  position: relative;
  overflow-y: auto;
  border-right-width: 1px;
`

const NavInner = styled('nav')`
  height: calc(100vh - 4rem);
  padding: 1.5rem;
`

const MainContainer = styled('main')`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  max-width: 46rem;
  padding-top: 2rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`