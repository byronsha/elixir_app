import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Route, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Box, Link } from '@chakra-ui/core';
import styled from '@emotion/styled'

import AppHeader from './AppHeader'
import Users from '../users'
import Notes from '../notes';
import Hands from '../hands';

const VIEWER_QUERY = gql`
  {
    viewer {
      name
      email
    }
  }
`;

const Home = props => (
  <Query query={VIEWER_QUERY}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      if (!data.viewer) return null;

      const path = props.location.pathname;

      return (
        <>
          <AppHeader viewer={data.viewer} />

          <NavContainer>
            <Nav maxW="18rem">
              <NavInner>
                <StyledLink as={NavLink} to="/" active={path === '/'}>
                  Home
                </StyledLink>
                <StyledLink as={NavLink} to="/users" active={path === '/users'}>
                  Users
                </StyledLink>
                <StyledLink as={NavLink} to="/notes" active={path === '/notes'}>
                  Notes
                </StyledLink>
                <StyledLink as={NavLink} to="/hands" active={path === '/hands'}>
                  Hands
                </StyledLink>
              </NavInner>
            </Nav>
          </NavContainer>

          <Box pl="18rem" mt={16}>
            <main>
              <Route path="/hands" component={Hands} />

              <MainContainer>
                <Route path="/users" component={Users} />
                <Route path="/notes" component={Notes} />
                <Route path="/" exact>
                  <div>blah blah blah</div>
                </Route>
              </MainContainer>
            </main>
          </Box>
        </>
      )
    }}
  </Query>
)

export default withRouter(Home);

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
  font-size: 0.875rem;
`

const NavInner = styled('nav')`
  height: calc(100vh - 4rem);
  padding: 1.5rem;
`

const MainContainer = styled(Box)`
  margin-left: auto;
  margin-right: auto;
  max-width: 46rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`

const StyledLink = styled(Link)`${props => `
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  font-weight: 500;
  outline: none;
  color: #2D3748;
  border-radius: 0.125rem;
  
  :not(:first-of-type) {
    margin-top: 0.25rem;
  }
  :hover {
    text-decoration: none;
  }

  ${props.active ? `
    color: rgb(35, 78, 82);
    background-color: rgb(230, 255, 250);
  ` : ''}
`}`