import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ProtectorCard from '../components/ProtectorCard';
import PetCardList from '../components/PetCardList';
import EventCardList from '../components/EventCardList';
import mockPetCardData from '../components/mockPetCardData';
import mockEventCardData from '../components/mockEventCardData';
import { mockProtectorData } from '../components/mockProtectorData';
import InfiniteScroll from '../components/InfiniteScroll';


const ProfileProtector = () => {
  const [selectedTab, setSelectedTab] = useState('pet');
  const { id } = useParams();

  return (
    <div className='profile-container'>
      <div className='profile-body'>
        <Header />
        <ProtectorCard protector={mockProtectorData} setSelectedTab={setSelectedTab} />

        {selectedTab === 'pet' && (
          <InfiniteScroll itemList={mockPetCardData}>
            {({ itemList, isLoading }) => (
              <PetCardList petList={itemList}/>
            )}
          </InfiniteScroll>
        )}

        {selectedTab === 'event' && (
          <InfiniteScroll itemList={mockEventCardData}>
            {({ itemList, isLoading }) => (
              <EventCardList eventList={itemList}/>
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

export default ProfileProtector;