import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import NewPublicationHeader from './NewPublicationHeader';
import SearchPetForm from './SearchPetForm';
import SearchEventForm from './SearchEventForm';

Modal.setAppElement('#root');

const SearchModal = ({ isModalOpen, closeModal }) => {
  const [selectedTab, setSelectedTab] = useState('pet');
  const [modalStyle, setModalStyle] = useState({
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
      contentLabel='User Modal'
      style={modalStyle}
    >
      {selectedTab === 'pet' && (
        <>
          <NewPublicationHeader title='Buscar pet' closeModal={closeModal} setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
          <SearchPetForm />
        </>
      )}

      {selectedTab === 'event' && (
        <>
          <NewPublicationHeader title='Buscar evento' closeModal={closeModal} setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
          <SearchEventForm />
        </>
      )}
    </Modal>
  );
};

export default SearchModal;
