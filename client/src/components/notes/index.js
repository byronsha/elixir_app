import React from 'react';
import { Value } from 'slate'
import styled from '@emotion/styled'
import { Box, Input } from '@chakra-ui/core'

import { RichTextEditor } from 'components/ui'

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'A line of text in a paragraph.',
          },
        ],
      },
    ],
  },
})

const Notes = () => {
  const [value, setValue] = React.useState(initialValue);
  
  return (
    <Box pt={8}>
      <Box bg="gray.50" borderRadius="4px">
        <StyledInput p={2} pb={0} variant="unstyled" placeholder="Title" />
        <RichTextEditor value={value} onChange={({ value }) => setValue(value)} />
      </Box>
    </Box>
  )
}

export default Notes;

const StyledInput = styled(Input)`
  font-size: 24px;
`