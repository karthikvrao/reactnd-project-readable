import React from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const GenericModal = ({ isOpen, onRequestClose, children }) =>
  <Modal
    className="modal"
    overlayClassName="overlay"
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Modal"
  >
    {children}
  </Modal>;

export default GenericModal;
