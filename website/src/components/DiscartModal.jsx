import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import closeIcon from '../assets/images/close.png';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const DiscartModal = ({ isModalOpen, closeModal, handleConfirm }) => {
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
      <div className="modal-header" style={{ display: 'flex', justifyContent: 'end'}}>
        <div className='close-icon-container' onClick={closeModal}>
          <img src={closeIcon} alt='Fechar' className='close-icon' style={{ height: '15px', cursor: 'pointer' }} />
        </div>
      </div>
      <div style={{ marginTop: '5px'}}>
        <h2 style={{ marginBottom: '15px'}}>Remover publicação?</h2>
      </div>
      <div style={{ marginTop: '5px', display: 'flex' }}>
        <button className='btn-discart btn-discatrt-confirm' onClick={handleConfirm} style={{ marginRight: '5px' }}>Sim</button>
        <button className='btn-discart' onClick={closeModal}>Cancelar</button>
      </div>

      <style>
        {`
          .btn-discart {
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            cursor: pointer;
            color: #fff;
            background-color: var(--color-secondary);
            border: 1px solid var(--color-secondary);
            text-align: center;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s ease;
            width: 100%;
          }

          .btn-discatrt-confirm {
            background-color: var(--color-contrast) !important;
            border: 1px solid var(--color-contrast-2) !important;
            transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
            color: var(--color-primary);
          }
        `}
      </style>
    </Modal>
  );
};

export default DiscartModal;
