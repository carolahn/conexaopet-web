import React, { useState } from 'react';
import plusIcon from '../assets/images/plus.png';
import cupomFilledIcon from '../assets/images/cupom-filled.png';
import NewCupomModal from './NewCupomModal';

const SponsorCardDashboard = ({ sponsor, setSelectedTab}) => {
  const [cupomIconSrc, setCupomIconSrc] = useState(cupomFilledIcon);
  const [isNewCupomModalOpen, setIsNewCupomModalOpen] = useState(false);

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

  return (
    <div className='sponsor-card-tabs'>
      <div className='cupom-icon-container' onClick={handleSelectCupom}>
        <img src={cupomIconSrc} alt='Cupons ativos' className='cupom-icon' />
      </div>
      <div className='plus-icon-container' onClick={openNewCupomModal}>
        <img src={plusIcon} alt='Novo cupom' className='plus-icon' />
      </div>

      <NewCupomModal isModalOpen={isNewCupomModalOpen} closeModal={closeNewCupomModal} style={{ zIndex: '3'}}/>

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
          
          .sponsor-card-tabs {
            display: flex;
            justify-content: center;
          }
          
          .sponsor-card-tabs .cupom-icon {
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