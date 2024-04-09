import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import PetCardList from '../components/PetCardList';
import EventCardList from '../components/EventCardList';
import mockPetCardData from '../components/mockPetCardData';
import mockEventCardData from '../components/mockEventCardData';
import { mockMemberData, mockCupomData } from '../components/mockFormData';
import InfiniteScroll from '../components/InfiniteScroll';
import MemberCardDashboard from '../components/MemberCardDashboard';
import CupomCardList from '../components/CupomCardList';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchFavoritePetList } from '../redux/actions/favoritePetActions';
import { fetchFavoriteEventList } from '../redux/actions/favoriteEventActions';
import { fetchCupomList } from '../redux/actions';


const DashboardMember = ( props ) => {
  const [selectedTab, setSelectedTab] = useState('pet');
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritePetList = useSelector((state) => state.favoritePet.favoritePetList);
  const favoritePetNextPage = useSelector((state) => state.favoritePet.nextPage);
  const favoritePetIsLoading = useSelector((state) => state.favoritePet.isLoading);
  const favoriteEventList = useSelector((state) => state.favoriteEvent.favoriteEventList);
  const favoriteEventNextPage = useSelector((state) => state.favoriteEvent.nextPage);
  const favoriteEventIsLoading = useSelector((state) => state.favoriteEvent.isLoading);
  const cupomList = useSelector((state) => state.cupom.cupomList);
  const cupomNextPage = useSelector((state) => state.cupom.nextPage);
  const cupomIsLoading = useSelector((state) => state.cupom.isLoading);

  console.log("favoritePetList: ", favoritePetList)
  useEffect(() => {
    if (id === null || id === undefined) {
      navigate('/');
    } else if (props.user.id != id) {
      navigate('/');
    }

    showLoadingSpiner();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    showLoadingSpiner();
  }, [selectedTab]);

  const showLoadingSpiner = () => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); 

  };

  // useEffect(() => {
  //   dispatch(fetchFavoritePetList());
  //   dispatch(fetchFavoriteEventList());
  //   dispatch(fetchCupomList());
  // }, [dispatch]);

  const loadMoreFavoritePets = () => {
    if (favoritePetNextPage) {
      const pageNumber = favoritePetNextPage.split('page=')[1];
      dispatch(fetchFavoritePetList(pageNumber));
    }
  };

  const loadMoreFavoriteEvents = () => {
    if (favoriteEventNextPage) {
      const pageNumber = favoriteEventNextPage.split('page=')[1];
      dispatch(fetchFavoriteEventList(pageNumber));
    }
  };

  const loadMoreCupons = () => {
    if (cupomNextPage) {
      const pageNumber = cupomNextPage.split('page=')[1];
      dispatch(fetchCupomList(pageNumber));
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className='profile-container'>
        <Header user={props.user} token={props.token} />
        <div className='profile-body'>
          <MemberCardDashboard member={props.user} setSelectedTab={setSelectedTab} />

          {selectedTab === 'pet' && (
            <InfiniteScroll 
              itemList={favoritePetList || []}
              loadMore={loadMoreFavoritePets}
              isLoading={favoritePetIsLoading}
            >
              <PetCardList petList={favoritePetList || []} />
            </InfiniteScroll>
          )}

          {selectedTab === 'event' && (
            <InfiniteScroll 
              itemList={favoriteEventList || []}
              loadMore={loadMoreFavoriteEvents}
              isLoading={favoriteEventIsLoading}
            >
              <EventCardList eventList={favoriteEventList || []}/>
            </InfiniteScroll>
          )}

          {selectedTab === 'cupom' && (
            <InfiniteScroll 
              itemList={cupomList || []}
              loadMore={loadMoreCupons}
              isLoading={cupomIsLoading}
            >
              <CupomCardList cupomList={cupomList || []}/>
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
    </>
  );
};

export default DashboardMember;