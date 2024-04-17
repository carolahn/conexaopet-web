import React, { useState, useEffect } from 'react';
import arrowUpIcon from '../assets/images/arrow-up.png';

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className={`floating-button ${isVisible ? 'show' : ''}`} onClick={scrollToTop}>
        <img src={arrowUpIcon} style={{width: '100%'}}/>
      </div>

      <style>{`
        .floating-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          // background-color: #007bff;
          // color: white;
          // border: none;
          // border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 24px;
          cursor: pointer;
          display: none; /* Inicialmente oculto */
        }
        
        .floating-button.show {
          display: block; /* Mostra quando é visível */
        }
      `}</style>
    </>
  );
};

export default FloatingButton;