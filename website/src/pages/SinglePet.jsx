import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import PetCard from '../components/PetCard';
import mockPetCardData from '../components/mockPetCardData';
import { useParams } from 'react-router-dom';


const SinglePet = () => {
  const [pet, setPet] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const selectedPet = mockPetCardData.find((pet) => pet.id === parseInt(id));

    if (selectedPet) {
      setPet(selectedPet);
    } else {
      setPet(null);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className='single-pet-page' data-testid="single-pet-page">
      <Header/>
      <div className='single-pet-body'>
        {pet && <PetCard {...pet} />}
				
			</div>

      <style>
        {`
          .single-pet-page {
            width: 100%;
            max-width: 490px;
            margin: 50px auto 0 auto;
          }

          .single-pet-body {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          @media (max-width: 900px) {
            .single-pet-page {
              display: block;
              width: 100%;
              margin-top: 40px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SinglePet;