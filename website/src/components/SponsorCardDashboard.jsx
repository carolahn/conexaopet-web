import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import plusIcon from '../assets/images/plus.png';
import refreshIcon from '../assets/images/refresh.png';
import cupomFilledIcon from '../assets/images/cupom-filled.png';
import NewCupomModal from './NewCupomModal';
import { updateExpiredCupons } from '../redux/actions';
import { imageCache } from './CupomCard';



const SponsorCardDashboard = ({ sponsor, setSelectedTab, setToastType, setToastMessage, handleOpenToast }) => {
  const [cupomIconSrc, setCupomIconSrc] = useState(cupomFilledIcon);
  const [isNewCupomModalOpen, setIsNewCupomModalOpen] = useState(false);
  const [ownerImage, setOwnerImage] = useState(null);
  const dispatch = useDispatch();
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
        const pathAfterMedia = imageURL.substring(imageURL.indexOf('profile_images/'));
        const url = apiUrl + 'media/' + pathAfterMedia;

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

    fetchImage(sponsor?.image, setOwnerImage);

  }, [sponsor?.image]);

  const handleSelectCupom = () => {
    setCupomIconSrc(cupomFilledIcon);
    setSelectedTab('cupom');
  };

  const openNewCupomModal = () => {
    setIsNewCupomModalOpen(!isNewCupomModalOpen);
  };

  const closeNewCupomModal = () => {
    setIsNewCupomModalOpen(false);
  };

  const handleRefreshCupons = async () => {
    try {
      const response = await dispatch(updateExpiredCupons(sponsor.id));
      console.log("response handleRefresh: ", response)
      setToastMessage(`Cupons atualizados. Removidos: ${response.results.deleted_count}`);
      setToastType('success');
      handleOpenToast();
    } catch (error) {
      console.error('Error refreshing cupons:', error);
      setToastMessage(`Erro: ${error.message}`);
      setToastType('failure');
      handleOpenToast();
    }
  };


  return (
    <>
      <div id={sponsor?.id} className='sponsor-card' tabIndex={0}>
        <div className='sponsor-card-header'>
          <div className='sponsor-avatar'>
            <img src={ownerImage} alt={`Avatar de ${sponsor?.username}`} />
          </div>
          <div className='sponsor-name-button'>
            <h2>{sponsor?.username}</h2>
          </div>
        </div>

        <div className='sponsor-card-description'>
          {sponsor?.description}
        </div>

        <div className='sponsor-card-tabs'>
          <div className='cupom-icon-container' onClick={handleSelectCupom} tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === 'Enter') handleSelectCupom();}}>
            <img src={cupomIconSrc} alt='Cupons ativos' className={`cupom-icon ${user?.id === sponsor?.id ? '' : 'no-margin-right'}`} />
          </div>
          { user?.id === sponsor?.id && (
            <>
              <div className='refresh-icon-container' onClick={handleRefreshCupons} tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === 'Enter') handleRefreshCupons();}}>
                <img src={refreshIcon} alt='Atualizar cupons expirados' className='refresh-icon' />
              </div>
              <div className='plus-icon-container' onClick={openNewCupomModal} tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === 'Enter') openNewCupomModal();}}>
                <img src={plusIcon} alt='Novo cupom' className='plus-icon' />
              </div>
            </>
          )}
        </div>
      </div>

      <NewCupomModal user={user} isModalOpen={isNewCupomModalOpen} closeModal={closeNewCupomModal} setToastType={setToastType} setToastMessage={setToastMessage} handleOpenToast={handleOpenToast} style={{ zIndex: '3'}}/>

      <style>
        {`
          .sponsor-card {
            width: 500px;
            display: flex;
            flex-direction: column;
            /* border-bottom: 1px solid #ddd; */
            /* margin-bottom: 20px; */
            padding: 15px 15px 0 15px;
            margin: 0 auto;
          }
          
          .sponsor-card-header {
            display: flex;
            align-items: center;
            padding: 0 0 7px 3px;
          }
            
          .sponsor-avatar {
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 15px;
          }
            
          .sponsor-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .sponsor-card-description {
            white-space: pre-line;
            margin-top: 3px;
          }
          
          .cupom-icon {
            cursor: pointer;
            height: 24px;
          }

          .plus-icon {
            cursor: pointer;
            height: 20px;
          }

          .refresh-icon {
            cursor: pointer;
            height: 20px;
          }
          
          .sponsor-card-tabs {
            display: flex;
            justify-content: center;
            padding-top: 30px;
          }
          
          .sponsor-card-tabs .cupom-icon, .refresh-icon {
            margin-right: 50px;
          }
          
          .cupom-icon.no-margin-right {
            margin-right: 0;
          }

          @media (max-width: 900px) {
            .sponsor-card {
              width: calc(100% - 30px);
            }
          }
        `}
      </style>
    </>
  );
};

export default SponsorCardDashboard;