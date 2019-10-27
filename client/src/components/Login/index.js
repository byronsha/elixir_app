import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Login = () => (
  <Box width="400px" my={8} mx="auto">
    <Tabs>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Sign up</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <LoginForm />
        </TabPanel>
        <TabPanel>
          <SignupForm />                
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);

export default Login