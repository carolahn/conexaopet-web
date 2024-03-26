import React from 'react';
import CarouselHome from '../components/CarouselHome';
import Header from '../components/Header';
import PetCardList from '../components/PetCardList';
import InfiniteScroll from '../components/InfiniteScroll';
import mockPetCardData from '../components/mockPetCardData';
import mockEventCardData from '../components/mockEventCardData';


const Home = ( props ) => {
  return (
    <div className='home-page' data-testid="home-page">
      <div className='home-body'>
				<Header user={props.user} token={props.token} />
				<CarouselHome events={mockEventCardData}/>
				{/* <button onClick={handleLogout}>Logout</button> */}
				<InfiniteScroll itemList={mockPetCardData}>
					{({ itemList, isLoading }) => (
						<PetCardList petList={itemList} />
					)}
				</InfiniteScroll>

			</div>

      <style>
        {`
          .home-page {
            width: 100%;
	          margin-top: 70px;
          }
        `}
      </style>
    </div>
  );
};

export default Home;