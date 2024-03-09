import React, { useEffect, useState } from 'react';
import closeIcon from '../assets/images/close.png';
import pawIcon from '../assets/images/paw.png';
import pawFilledIcon from '../assets/images/paw-filled.png';
import calendarIcon from '../assets/images/calendar.png';
import calendarFilledIcon from '../assets/images/calendar-filled.png';

const NewPublicationHeader = ({ title, closeModal, setSelectedTab, selectedTab, showButtons = true }) => {
  const [pawIconSrc, setPawIconSrc] = useState(pawIcon);
  const [calendarIconSrc, setCalendarIconSrc] = useState(calendarIcon);

  useEffect(() => {
    if (selectedTab === 'pet') {
      handleSelectPet();
    } else {
      handleSelectEvent();
    }
  });

  const handleSelectPet = () => {
    setPawIconSrc(pawFilledIcon);
    setCalendarIconSrc(calendarIcon);
    setSelectedTab('pet');
  };

  const handleSelectEvent = () => {
    setCalendarIconSrc(calendarFilledIcon);
    setPawIconSrc(pawIcon);
    setSelectedTab('event');
  };

  return (
    <div className='new-publication-header'>
      <div className='header-title'>
        <div className='close-icon-container' onClick={closeModal}>
          <img src={closeIcon} alt='Fechar' className='close-icon' />
        </div>
        <h2>{title}</h2>
      </div>

      {showButtons && (
        <div className='menu-options-container'>
          <div className='paw-icon-container' onClick={handleSelectPet}>
            <img src={pawIconSrc} alt='Novo animal' className='paw-icon' />
          </div>
          <div className='calendar-icon-container' onClick={handleSelectEvent}>
            <img src={calendarIconSrc} alt='Novo evento' className='calendar-icon' />
          </div>
        </div>
      )}

      <style>
        {`
          .new-publication-header {
            height: 49px;
            border-bottom: 1px solid var(--color-detail);
            display: flex;
            justify-content: space-between;
          }
          
          .header-title {
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
          
          }
          
          .menu-options-container {
            display: flex;
            align-items: center;
          }
          
          .close-icon-container {
            height: 100%;
            padding-right: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          
          .close-icon {
            height: 15px;
          }
          
          .calendar-icon {
            height: 24px;
            cursor: pointer;
          }
          
          .paw-icon {
            height: 24px;
            cursor: pointer;
            margin-right: 5px;
          }
            
          @media (max-width: 900px) {
            .new-publication-header {
              height: 39px;
              margin: 0;
            }
          
            .header-body {
              font-size: 1rem;
            }
          
            .logo {
              height: 35px;
            }
          }
        `}
      </style>

    </div>
  );
};

export default NewPublicationHeader;