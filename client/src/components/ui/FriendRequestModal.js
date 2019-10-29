import React from 'react';
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FriendRequestForm closeModal={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default FriendRequestModal