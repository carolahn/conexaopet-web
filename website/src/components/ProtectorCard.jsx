import React, { useState } from 'react';
import DonationModal from './DonationModal';
import whatsappIcon from '../assets/images/whatsapp.png';
import donationIcon from '../assets/images/donation.png';
import pawIcon from '../assets/images/paw.png';
import pawFilledIcon from '../assets/images/paw-filled.png';
import calendarIcon from '../assets/images/calendar.png';
import calendarFilledIcon from '../assets/images/calendar-filled.png';

const ProtectorCard = ({ protector, setSelectedTab }) => {
  const [pawIconSrc, setPawIconSrc] = useState(pawFilledIcon);
  const [calendarIconSrc, setCalendarIconSrc] = useState(calendarIcon);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open(`https://web.whatsapp.com/send?phone=${protector.celular}`, '_blank');
  };

  const handleSelectPet = () => {
    setPawIconSrc(pawFilledIcon);
    setCalendarIconSrc(calendarIcon);
    setSelectedTab('pet');
  };

  const handleSelectEvent = () => {
    setPawIconSrc(pawIcon);
    setCalendarIconSrc(calendarFilledIcon);
    setSelectedTab('event');
  };

  const openDonationModal = () => {
    setIsDonationModalOpen(!isDonationModalOpen);
  };

  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
  };


  return (
    <div className='protector-card'>

      <div className='protector-card-header'>
				<div className='protector-avatar'>
					<img src={protector.imagem} alt={`Avatar de ${protector.nickname}`} />
				</div>
        <div className='protector-name-button'>
				  <h2>{protector.nickname}</h2>
          <div className='protector-buttons'>
            <div className='whatsapp-icon-container' onClick={handleWhatsAppClick}>
              <img src={whatsappIcon} alt='Whatsapp' className='whatsapp-icon icon' />
            </div>
            <div className='donation-icon-container' onClick={openDonationModal}>
              <img src={donationIcon} alt='Para doar' className='donation-icon icon' />
            </div>
          </div>
        </div>
			</div>

      <div className='protector-card-description'>
        {protector.descricao}
      </div>

      <div className='protector-card-tabs'>
        <div className='paw-icon-container' onClick={handleSelectPet}>
          <img src={pawIconSrc} alt='Animais disponíveis' className='paw-icon' />
        </div>
        <div className='calendar-icon-container' onClick={handleSelectEvent}>
          <img src={calendarIconSrc} alt='Próximos eventos' className='calendar-icon' />
        </div>
      </div>

      <DonationModal isModalOpen={isDonationModalOpen} closeModal={closeDonationModal} pix={protector.pix} />

      <style>
        {`
          .protector-card {
            width: 500px;
            display: flex;
            flex-direction: column;
            /* border-bottom: 1px solid #ddd; */
            /* margin-bottom: 20px; */
            padding: 15px 15px 0 15px;
            margin: 0 auto;
          }
          
          .protector-card-header {
            display: flex;
            align-items: center;
            padding: 0 0 7px 3px;
          }
            
          .protector-avatar {
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 15px;
          }
            
          .protector-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .protector-card-images-container {
            position: relative;
            width: 100%;
            overflow: hidden;
          }
          
          .protector-card-images-container img {
            width: 500px;
          }
          
          .protector-card-bar {
            display: flex;
          }
          
          .protector-card-summary {
            width: 80%;
          }
          
          .protector-card-buttons {
            width: 20%;
            display: flex;
            justify-content: end;
          }
          
          .protector-buttons {
            display: flex;
          }
          
          .protector-buttons .icon {
            cursor: pointer;
            height: 20px;
            margin-top: 5px;
            margin-right: 5px;
          }
          
          .paw-icon, .calendar-icon, .star-icon, .more-icon {
            cursor: pointer;
            height: 24px;
          }
          
          .protector-card-tabs {
            display: flex;
            justify-content: center;
            padding-top: 30px;
          }
          
          .protector-card-tabs .paw-icon {
            margin-right: 50px;
          }
          
          .protector-card-description {
            white-space: pre-line;
            margin-top: 3px;
          }
          
          @media (max-width: 900px) {
            .protector-card {
              width: calc(100% - 30px);
            }
          
            .protector-card-images-container {
              margin-bottom: 5px;
            }
          }
            
        `}
      </style>
    </div>
  );
};

export default ProtectorCard;