import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import closeIcon from '../assets/images/close.png';
import { Link } from 'react-router-dom';
import EditUserModal from './EditUserModal';
import { mockUserData } from './mockFormData';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

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
      <div className="modal-header" style={{ display: 'flex', justifyContent: 'end'}}>
        <div className='close-icon-container' onClick={closeModal}>
          <img src={closeIcon} alt='Fechar' className='close-icon' style={{ height: '15px', cursor: 'pointer' }} />
        </div>
      </div>

      {isLoggedIn === true ? (
        <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'column' }}>
          <Link to='/dashboard/member/2' style={{ marginBottom: '8px'}}>Minha conta</Link>
          <div className='edit-user-link' onClick={openEditUserModal}>Editar conta</div>
          <Link to='/'>Sair</Link>
        </div>
      ) : (
        <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'column' }}>
          <Link to='/login' style={{ marginBottom: '8px'}}>Entrar</Link>
          <Link to='/signup'>Cadastrar</Link>
        </div>

      )}

      <EditUserModal isModalOpen={isEditUserModalOpen} closeModal={closeEditUserModal} userData={mockUserData}/>
      
      <style>
        {`
          .edit-user-link {
            margin-bottom: 8px;
            color: -webkit-link;
            cursor: pointer;
            text-decoration: underline;
          }
        `}
      </style>
    </Modal>
  );
};

export default UserModal;
