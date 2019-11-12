import React from 'react';
// import styled from '@emotion/styled'
import { Box, Grid } from '@chakra-ui/core'

const Hands = () => {
  return (
    <Grid templateColumns="1fr 3fr" height="calc(100vh - 64px)">
      <Box w="100%" bg="blue.500" />
      <Box w="100%" bg="red.500" />
    </Grid>
  )
}

export default Hands