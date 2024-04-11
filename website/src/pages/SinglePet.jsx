import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PetCard from '../components/PetCard';
import { fetchSinglePet } from '../redux/actions';


const SinglePet = ({ user = {}, token = "" }) => {
  const [pet, setPet] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchSinglePet(id));
        if (result) {
          setPet(result);
        }
      } catch (error) {
        console.error('Error getting pet data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='single-pet-page' data-testid="single-pet-page">
      <Header user={user} token={token} showLogo={false} title='Informações do pet'/>
      <div className='single-pet-body'>
        {pet && <PetCard pet={pet} />}
				
			</div>

      <style>
        {`
          .single-pet-page {
            width: 100%;
            max-width: 490px;
            margin: 70px auto 0 auto;
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
              margin-top: 50px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SinglePet;