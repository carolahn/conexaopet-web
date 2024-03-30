import React from 'react';
import PetCard from './PetCard';

const PetCardList = ({ petList, isOwner = false }) => {
  return (
    <div className="pet-card-list">
      {petList.map((pet, index) => (
        <PetCard key={index} pet={pet} id={`pet-${pet.id}`} />
      ))}

      <style>
        {`
          .pet-card-list {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px auto;
        }
        `}
      </style>
    </div>
  );
};

export default PetCardList;