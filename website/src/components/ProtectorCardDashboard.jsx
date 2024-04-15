import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NewPublicationModal from './NewPublicationModal';
import DonationModal from './DonationModal';
import whatsappIcon from '../assets/images/whatsapp.png';
import donationIcon from '../assets/images/donation.png';
import pawIcon from '../assets/images/paw.png';
import pawFilledIcon from '../assets/images/paw-filled.png';
import calendarIcon from '../assets/images/calendar.png';
import calendarFilledIcon from '../assets/images/calendar-filled.png';
import editIcon from '../assets/images/edit.png';
import plusIcon from '../assets/images/plus.png';
import EditUserModal from './EditUserModal';
import { imageCache } from './CupomCard';


const ProtectorCardDashboard = ({ protector, setSelectedTab, setToastType, setToastMessage, handleOpenToast }) => {
  const [pawIconSrc, setPawIconSrc] = useState(pawFilledIcon);
  const [calendarIconSrc, setCalendarIconSrc] = useState(calendarIcon);
  const [plusIconSrc, setplusIconSrc] = useState(plusIcon);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isNewPublicationModalOpen, setIsNewPublicationModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [ownerImage, setOwnerImage] = useState(null);
  const user = useSelector((state) => state.userReducer.user);
  
  useEffect(() => {
    const fetchImage = async (imageURL, setImage) => {
      try {
        // Verifica se a imagem já está em cache
        if (imageCache[imageURL]) {
          setImage(imageCache[imageURL]);
          return;
        }

        const apiUrl = process.env.REACT_APP_API_URL.replace('api', '');
        const pathAfterMedia = imageURL.substring(imageURL.indexOf('media/'));
        const url = apiUrl + pathAfterMedia;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image from ${url}`);
        }
        const blob = await response.blob();
        const file = new File([blob], imageURL.substring(imageURL.lastIndexOf('/') + 1));
        
        // Salva a imagem no cache
        imageCache[imageURL] = URL.createObjectURL(file);
        setOwnerImage(imageCache[imageURL]);
      } catch (error) {
        console.error(`Error fetching image from ${imageURL}:`, error);
      }
    };

    fetchImage(protector?.image, setOwnerImage);

  }, [protector?.image]);

  const handleWhatsAppClick = () => {
    window.open(`https://web.whatsapp.com/send?phone=${protector?.phone}`, '_blank');
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
  
  const openNewPublicationModal = () => {
    setIsNewPublicationModalOpen(!isNewPublicationModalOpen);
  };

  const closeNewPublicationModal = () => {
    setIsNewPublicationModalOpen(false);
  };

  const openEditUserModal = () => {
    setIsEditUserModalOpen(!isEditUserModalOpen);
  };

  const closeEditUserModal = () => {
    setIsEditUserModalOpen(false);
  };

  return (
    <div key={protector?.id} className='protector-card'>

      <div className='protector-card-header'>
				<div className='protector-avatar'>
					<img src={ownerImage} alt={`Avatar de ${protector?.username}`} />
				</div>
        <div className='protector-name-button'>
				  <h2>{protector?.username}</h2>
          <div className='protector-buttons'>
            <div className='whatsapp-icon-container' onClick={handleWhatsAppClick}>
              <img src={whatsappIcon} alt='Whatsapp' className='whatsapp-icon icon' />
            </div>
            <div className='donation-icon-container' onClick={openDonationModal}>
              <img src={donationIcon} alt='Para doar' className='donation-icon icon' />
            </div>
            {user?.id === protector?.id && (
              <div className='edit-icon-container' onClick={openEditUserModal}>
                <img src={editIcon} alt='Editar perfil' className='edit-icon icon' />
              </div>
            )}
          </div>
        </div>
			</div>

      <div className='protector-card-description'>
        {protector?.description}
      </div>

      <div className='protector-card-tabs'>
        <div className='paw-icon-container' onClick={handleSelectPet}>
          <img src={pawIconSrc} alt='Animais disponíveis' className='paw-icon' />
        </div>
        <div className='calendar-icon-container' onClick={handleSelectEvent}>
          <img src={calendarIconSrc} alt='Próximos eventos' className={`calendar-icon ${user?.id === protector?.id ? '' : 'no-margin-right'}`} />
        </div>
        {user?.id === protector?.id && (
          <div className='plus-icon-container' onClick={openNewPublicationModal}>
            <img src={plusIconSrc} alt='Nova publicação' className='plus-icon' />
          </div>
        )}
      </div>
    
      <DonationModal isModalOpen={isDonationModalOpen} closeModal={closeDonationModal} pix={protector?.pix} />
      {user?.id === protector?.id && (
        <>
          <NewPublicationModal user={protector} isModalOpen={isNewPublicationModalOpen} closeModal={closeNewPublicationModal} setToastType={setToastType} setToastMessage={setToastMessage} handleOpenToast={handleOpenToast} style={{ zIndex: '3'}}/>
          <EditUserModal isModalOpen={isEditUserModalOpen} closeModal={closeEditUserModal} user={protector}/>
        </>
      )}

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
          
          .paw-icon, .calendar-icon, .plus-icon, .star-icon, .more-icon {
            cursor: pointer;
            height: 24px;
          }
          
          .protector-card-tabs {
            display: flex;
            justify-content: center;
            padding-top: 30px;
          }
          
          .protector-card-tabs .paw-icon, .protector-card-tabs .calendar-icon  {
            margin-right: 50px;
          }

          .calendar-icon.no-margin-right {
            margin-right: 0;
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

export default ProtectorCardDashboard;