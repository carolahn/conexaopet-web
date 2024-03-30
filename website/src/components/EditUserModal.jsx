import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import SimpleHeader from './SimpleHeader';
import RegisterForm from './RegisterForm';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const EditUserModal = ({ isModalOpen, closeModal, user }) => {
  const [modalStyle, setModalStyle] = useState({
    overlay: {
      zIndex: 3,
    },
    content: {
      inset: '0 calc((100% - 532px)/2)',
      maxWidth: '532px',
      height: '100vh',
    },
  });

  useEffect(() => {
    const handleResize = () => {
      
      const newStyle = window.innerWidth < 900? 
      {
        overlay: {
          zIndex: 3,
        },
        content: { 
          inset: '0 0',
          width: 'calc(100% - 40px)',
      }} : {        
        overlay: {
          zIndex: 3,
        },
        content: { 
          inset: '0 calc((100% - 532px)/2)',
          maxWidth: '532px',
          paddingTop: '7px',
      }};

      setModalStyle(newStyle);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel='Edit User Modal'
      style={modalStyle}
      appElement={document.getElementById('root')}
    >
      <SimpleHeader title='Editar perfil' action='close' onClose={handleCloseModal}/>
      <div className='edit-user'>
        <RegisterForm initialValues={user} handleCloseModal={handleCloseModal} />
      </div>

      <style>
        {`
          .simple-header {
            position: relative;
            height: 49px;
            border-bottom: 1px solid var(--color-detail);
            display: flex;
            justify-content: space-between;
          }
          
          .edit-user {
            margin-top: 15px;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            width: 100%;
            margin: 15px auto;
          }

          @media (max-width: 900px) {
            .edit-user {
              width: 100%;
            }
          }
        `}
      </style>
    </Modal>
  );
};

export default EditUserModal;
