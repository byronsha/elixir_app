import React from 'react';
import styled from '@emotion/styled'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/core';

import FriendRequestForm from './FriendRequestForm'

function FriendRequestModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <StyledModalContent>
        <ModalHeader>Add a friend</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FriendRequestForm closeModal={onClose} />
        </ModalBody>
      </StyledModalContent>
    </Modal>
  )
}

export default FriendRequestModal

const StyledModalContent = styled(ModalContent)`
  border-radius: 0.25rem;
`