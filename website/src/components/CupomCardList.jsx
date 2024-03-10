import React from 'react';
import CupomCard from './CupomCard';

const CupomCardList = ({ cupomList }) => {
  return (
    <div className='cupom-card-list'>
      {cupomList.map((cupom, index) => (
        <CupomCard key={index} cupom={cupom} id={`cupom-${cupom.id}`} />
      ))}

      <style>
        {`
          .cupom-card-list {
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

export default CupomCardList;