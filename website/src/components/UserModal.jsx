import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UserModal = ({ isModalOpen, closeModal, isLoggedIn = false }) => {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [modalStyle, setModalStyle] = useState({
    content: {
        inset: '50px calc((100% - 900px)/2) auto auto',
        width: '200px',
    },
  });

  useEffect(() => {
    const handleResize = () => {
      
      const newStyle = window.innerWidth < 900
        ? { content: { 
            inset: '40px 0 auto auto',
            width: '200px',
         } }
        : { content: { 
            inset: '50px calc((100% - 900px)/2) auto auto',
            width: '200px',
         } };

      setModalStyle(newStyle);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openEditUserModal = () => {
    setIsEditUserModalOpen(!isEditUserModalOpen);
  };

  const closeEditUserModal = () => {
    setIsEditUserModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel='User Modal'
      style={modalStyle}
    >
      UserModal
    </Modal>
  );
};

export default UserModal;
