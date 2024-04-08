import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import NewPublicationHeader from './NewPublicationHeader';
import NewPetForm from './NewPetForm';
import NewEventForm from './NewEventForm';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const NewPublicationModal = ({ user, isModalOpen, closeModal, setToastType, setToastMessage, handleOpenToast, initialValues = null, editType = null }) => {
  const [selectedTab, setSelectedTab] = useState('pet');
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

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel='New Publication Modal'
      style={modalStyle}
      appElement={document.getElementById('root')}
    >
      {((selectedTab === 'pet' && editType !== 'event') || editType === 'pet') && (
        <>
          <NewPublicationHeader title={initialValues ? 'Editar publicação' : 'Nova publicação'} closeModal={closeModal} setSelectedTab={setSelectedTab} selectedTab={selectedTab} showButtons={editType ? false : true} />
          <NewPetForm user={user} initialValues={initialValues || null} setToastType={setToastType} setToastMessage={setToastMessage} handleOpenToast={handleOpenToast} handleCloseModal={closeModal} />
        </>
      )}

      {(selectedTab === 'event' || editType === 'event') && (
        <>
          <NewPublicationHeader title={initialValues ? 'Editar evento' : 'Novo evento'} closeModal={closeModal} setSelectedTab={setSelectedTab} selectedTab={selectedTab} showButtons={editType ? false : true} />
          <NewEventForm user={user} initialValues={initialValues || null} setToastType={setToastType} setToastMessage={setToastMessage} handleOpenToast={handleOpenToast} handleCloseModal={closeModal} />
        </>
      )}

    </Modal>
  );
};

export default NewPublicationModal;