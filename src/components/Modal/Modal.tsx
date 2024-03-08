import React from 'react';
import ReactModal from 'react-modal';
import classes from './Modal.module.css';

ReactModal.setAppElement('#root');

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
  content: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
  content,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className={content == 'Add' ? classes.Modal : classes.ModalNoOverflow}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
