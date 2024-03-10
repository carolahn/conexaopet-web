import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import closeIcon from '../assets/images/close.png';
import copyIcon from '../assets/images/copy.png';

const DonationModal = ({ isModalOpen, closeModal, pix }) => {
  const [isCopied, setIsCopied] = useState(false);
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pix);
    setIsCopied(true);

    // Resetar o estado de 'copiado' após 3 segundos
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel='Donation Modal'
      style={modalStyle}
    >
      <div className="modal-header" style={{ display: 'flex', justifyContent: 'end'}}>
        <div className='close-icon-container' onClick={closeModal}>
          <img src={closeIcon} alt='Fechar' className='close-icon' style={{ height: '15px', cursor: 'pointer' }} />
        </div>
      </div>
      <h2 style={{ marginBottom: '15px'}}>Para doar:</h2>
      <label style={{ fontSize: '1.3rem' }}>Chave PIX:</label>
      <div style={{ marginTop: '5px', display: 'flex' }}>
        <input type="text" value={pix} readOnly style={{ height: '1.2rem'}} />
        <div className='copy-icon-container' onClick={copyToClipboard} style={{ marginLeft: '7px'}}>
          <img src={copyIcon} alt='Copiar chave pix' className='copy-icon' style={{ height: '24px', cursor: 'pointer' }} />
          <span>{isCopied && ' Copiado '}</span>
        </div>
      </div>
    </Modal>
  );
};

export default DonationModal;
