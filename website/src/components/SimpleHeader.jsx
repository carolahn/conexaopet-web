import React from 'react';
import { Link } from 'react-router-dom';
import returnIcon from '../assets/images/return.png';
import closeIcon from '../assets/images/close.png';

const SimpleHeader = ({ title, action = 'return', onClose = null }) => {
  return (
    <div className='simple-header'>
      <div className='simple-header-body'>
        <div className='simple-header-title'>
            {action === 'return' && (
              <div className='return-icon-container' aria-label="Abrir Busca" tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === 'Enter') window.history.back();}}>
                <img src={returnIcon} alt='Voltar' className='return-icon' onClick={() => window.history.back()}/>
              </div>
            )}

            {action === 'close' && (
              <div className='return-icon-container' aria-label="Abrir Busca" tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === 'Enter') onClose();}}>
                <div onClick={onClose}>
                  <img src={closeIcon} alt='Fechar' className='return-icon' />
                </div>
                </div>
            )}

          <h2>{title}</h2>  
        </div>

      </div>

      <style>
        {`
          .simple-header {
            height: 49px;
            border-bottom: 1px solid var(--color-detail);
            display: flex;
            justify-content: space-between;
          }

          .simple-header-body {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            padding: 3px 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .simple-header-title {
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
          
          }

          .return-icon-container {
            height: 100%;
            padding-right: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          
          .return-icon {
            height: 15px;
          }
        `}
      </style>
    </div>
  );
};

export default SimpleHeader;