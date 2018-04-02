import React from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const GenericModal = props =>
  <Modal
    className="modal"
    overlayClassName="overlay"
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    contentLabel="Modal"
  >
    {props.children}
  </Modal>;

export default GenericModal;
