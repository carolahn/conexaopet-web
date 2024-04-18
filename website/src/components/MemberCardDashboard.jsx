import React, { useState } from 'react';
import pawIcon from '../assets/images/paw.png';
import pawFilledIcon from '../assets/images/paw-filled.png';
import calendarIcon from '../assets/images/calendar.png';
import calendarFilledIcon from '../assets/images/calendar-filled.png';
import cupomIcon from '../assets/images/cupom.png';
import cupomFilledIcon from '../assets/images/cupom-filled.png';

const MemberCardDashboard = ({ member, setSelectedTab}) => {
  const [pawIconSrc, setPawIconSrc] = useState(pawFilledIcon);
  const [calendarIconSrc, setCalendarIconSrc] = useState(calendarIcon);
  const [cupomIconSrc, setCupomIconSrc] = useState(cupomIcon);

  const handleSelectPet = () => {
    setPawIconSrc(pawFilledIcon);
    setCalendarIconSrc(calendarIcon);
    setCupomIconSrc(cupomIcon);
    setSelectedTab('pet');
  };
  
  const handleSelectEvent = () => {
    setPawIconSrc(pawIcon);
    setCalendarIconSrc(calendarFilledIcon);
    setCupomIconSrc(cupomIcon);
    setSelectedTab('event');
  };

  const handleSelectCupom = () => {
    setPawIconSrc(pawIcon);
    setCalendarIconSrc(calendarIcon);
    setCupomIconSrc(cupomFilledIcon);
    setSelectedTab('cupom');
  };

  return (
    <div className='member-card-tabs'>
      <div className='paw-icon-container' onClick={handleSelectPet} tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === 'Enter') handleSelectPet();}}>
        <img src={pawIconSrc} alt='Animais favoritos' className='paw-icon' />
      </div>
      <div className='calendar-icon-container' onClick={handleSelectEvent} tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === 'Enter') handleSelectEvent();}}>
        <img src={calendarIconSrc} alt='Eventos favoritos' className='calendar-icon' />
      </div>
      <div className='cupom-icon-container' onClick={handleSelectCupom} tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === 'Enter') handleSelectCupom();}}>
        <img src={cupomIconSrc} alt='Cupons ativos' className='cupom-icon' />
      </div>

      <style>
        {`
          .paw-icon, .calendar-icon, .cupom-icon, .plus-icon, .star-icon, .more-icon {
            cursor: pointer;
            height: 24px;
          }
          
          .member-card-tabs {
            display: flex;
            justify-content: center;
          }
          
          .member-card-tabs .paw-icon, .member-card-tabs .calendar-icon{
            margin-right: 50px;
          }
          
          @media (max-width: 900px) {
            .protector-card {
              width: calc(100% - 30px);
            }
          
            /* .protector-avatar {
              width: 32px;
              height: 32px;
            } */
          
            .protector-card-images-container {
              margin-bottom: 5px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MemberCardDashboard;