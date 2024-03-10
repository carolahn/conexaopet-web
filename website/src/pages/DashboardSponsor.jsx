import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { mockCupomData, mockSponsorData } from '../components/mockFormData';
import InfiniteScroll from '../components/InfiniteScroll';
import CupomCardList from '../components/CupomCardList';
import SponsorCardDashboard from '../components/SponsorCardDashboard';


const DashboardSponsor = () => {
  const [selectedTab, setSelectedTab] = useState('cupom');
  const { id } = useParams();
  const isOwner = true;

  return (
    <div className='profile-container'>
      <Header />
      <div className='profile-body'>
        <SponsorCardDashboard sponsor={mockSponsorData} setSelectedTab={setSelectedTab} />

        {selectedTab === 'cupom' && (
          <InfiniteScroll itemList={mockCupomData}>
            {({ itemList, isLoading }) => (
              <CupomCardList cupomList={itemList}/>
            )}
          </InfiniteScroll>
        )}
      </div>

      <style>
        {`
          .profile-container {
            width: 100%;
            margin-top: 70px;
            
          }
          
          .profile-body {
            max-width: 900px;
            margin: 0 auto;
            height: 100vh;
          }
          
          @media (max-width: 900px) {
            .profile-container {
              margin-top: 50px;
            }
          }
        `}
      </style>
      
    </div>
  );
};

export default DashboardSponsor;