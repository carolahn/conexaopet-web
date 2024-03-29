import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import plusIcon from '../assets/images/plus.png';
import refreshIcon from '../assets/images/refresh.png';
import cupomFilledIcon from '../assets/images/cupom-filled.png';
import NewCupomModal from './NewCupomModal';
import { updateExpiredCupons } from '../redux/actions';


const SponsorCardDashboard = ({ user, setSelectedTab, setToastType, setToastMessage, handleOpenToast }) => {
  const [cupomIconSrc, setCupomIconSrc] = useState(cupomFilledIcon);
  const [isNewCupomModalOpen, setIsNewCupomModalOpen] = useState(false);
  const dispatch = useDispatch();
  
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
      const response = await dispatch(updateExpiredCupons());
      setToastMessage('Cupons expirados atualizados.');
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
    <div className='sponsor-card-tabs'>
      <div className='cupom-icon-container' onClick={handleSelectCupom}>
        <img src={cupomIconSrc} alt='Cupons ativos' className='cupom-icon' />
      </div>
      <div className='refresh-icon-container' onClick={handleRefreshCupons}>
        <img src={refreshIcon} alt='Atualizar cupons expirados' className='refresh-icon' />
      </div>
      <div className='plus-icon-container' onClick={openNewCupomModal}>
        <img src={plusIcon} alt='Novo cupom' className='plus-icon' />
      </div>

      <NewCupomModal user={user} isModalOpen={isNewCupomModalOpen} closeModal={closeNewCupomModal} setToastType={setToastType} setToastMessage={setToastMessage} handleOpenToast={handleOpenToast} style={{ zIndex: '3'}}/>

      <style>
        {`
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
          }
          
          .sponsor-card-tabs .cupom-icon, .refresh-icon {
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

export default SponsorCardDashboard;