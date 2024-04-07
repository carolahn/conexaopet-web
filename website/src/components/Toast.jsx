import React, { useState, useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return isVisible ? (
    <div className={`toast toast-body toast-${type}`} style={type === 'success' ? { backgroundColor: '#28a745'} : { backgroundColor: '#dc3545'} } role="alert" aria-live="assertive" aria-atomic="true">
      <button type="button" className="btn-close" onClick={() => setIsVisible(false)}>X</button>
      <strong className={`me-auto text`}>{type === 'success' ? 'Sucesso: ' : 'Erro: '}</strong>

      {message}

      <style>
        {`
          .toast {
            position: fixed;
            top: 0;
            left: 0;
            /* margin: 1rem; */
            width: 100vw;
            z-index: 1000;
            color: var(--color-text-clear);
            font-size: 1.2rem;
          }
          
          .toast-body {
            padding: 0.5rem;
            display: flex;
            align-items: center;
          }
          
          .text {
            margin-right: 8px;
          }
          
          .btn-close {
            padding: 0.25rem 0.5rem;
            margin: 0.25rem;
            background-color: transparent;
            border: none;
            color: #fff;
            float: left;
            font-size: 1.25rem;
            font-weight: bolder;
            line-height: 1;
            opacity: 0.8;
            cursor: pointer;
          }
          
        `}
      </style>
    </div>
  ) : null;
};

export default Toast;
