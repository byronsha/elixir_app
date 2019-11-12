import React from 'react';
import { Box } from '@chakra-ui/core';

const Card = ({ children, ...rest }) => (
  <Box shadow="md" borderWidth="1px" borderRadius="4px" {...rest}>
    {children}
  </Box>
)

export default Card