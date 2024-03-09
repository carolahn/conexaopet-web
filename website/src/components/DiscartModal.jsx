import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import closeIcon from '../assets/images/close.png';
import copyIcon from '../assets/images/copy.png';

const DiscartModal = ({ isModalOpen, closeModal, publicationId }) => {
  const [modalStyle, setModalStyle] = useState({
    content: {
      inset: 'calc(50% - 150px) calc(50% - 125px)',
      width: '250px',
      height: '200px',
    },
  });

  useEffect(() => {
    const handleResize = () => {
      
      const newStyle = window.innerWidth < 900
        ? { content: { 
          inset: 'calc(50% - 195px) calc(50% - 145px)',
          width: '250px',
          height: '200px',
        }} : { content: { 
          inset: 'calc(50% - 150px) calc(50% - 125px)',
          width: '250px',
          height: '200px',
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
      contentLabel='Discart Modal'
      style={modalStyle}
    >
      Discart modal
    </Modal>
  );
};

export default DiscartModal;
