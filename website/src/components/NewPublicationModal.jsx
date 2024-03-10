import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import NewPublicationHeader from './NewPublicationHeader';
import NewPetForm from './NewPetForm';
import NewEventForm from './NewEventForm';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const NewPublicationModal = ({ isModalOpen, closeModal, initialValues = null, isNewPublication = true }) => {
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
      {selectedTab === 'pet' && (
        <>
          <NewPublicationHeader title={isNewPublication ? 'Nova publicação' : 'Editar publicação'} closeModal={closeModal} setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
          <NewPetForm initialValues={isNewPublication ? null : initialValues} />
        </>
      )}

      {selectedTab === 'event' && (
        <>
          <NewPublicationHeader title='Novo evento' closeModal={closeModal} setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
          <NewEventForm />
        </>
      )}

    </Modal>
  );
};

export default NewPublicationModal;