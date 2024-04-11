import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CarouselHome from '../components/CarouselHome';
import Header from '../components/Header';
import PetCardList from '../components/PetCardList';
import InfiniteScroll from '../components/InfiniteScroll';
import Toast from '../components/Toast';
import FloatingButton from '../components/FloatingButton';
import { fetchPetList } from '../redux/actions/petActions';
import { fetchEventList } from '../redux/actions/eventActions';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchCupomList, fetchCupomListBySponsor, fetchFavoritePetList } from '../redux/actions';
import { fetchFavoriteEventList } from '../redux/actions/favoriteEventActions';


const Home = ( props ) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Alterações salvas');
  const [toastType, setToastType] = useState('success');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const petList = useSelector((state) => state.pet.petList);
  const petNextPage = useSelector((state) => state.pet.nextPage);
  const petIsLoading = useSelector((state) => state.pet.isLoading);
  const eventList = useSelector((state) => state.event.eventList);
  const eventNextPage = useSelector((state) => state.event.nextPage);
  const eventIsLoading = useSelector((state) => state.event.isLoading);

  useEffect(() => {
    dispatch(fetchPetList());
    dispatch(fetchEventList());
    if (props.token !== null) {
      dispatch(fetchFavoritePetList());
      dispatch(fetchFavoriteEventList());
      dispatch(fetchCupomList());
    }
    if (props.user && Object.keys(props.user).length !== 0 && props.user.type === 3) {
      dispatch(fetchCupomListBySponsor(props.user.id));
    }
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    showLoadingSpiner();
    // eslint-disable-next-line
  }, []);

  const showLoadingSpiner = () => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); 
  };

  const loadMorePets = () => {
    if (petNextPage) {
      const pageNumber = petNextPage.split('page=')[1];
      dispatch(fetchPetList(pageNumber));
    }
  };

  const loadMoreEvents = () => {
    if (eventNextPage) {
      const pageNumber = eventNextPage.split('page=')[1];
      dispatch(fetchEventList(pageNumber));
    }
  };

  const handleOpenToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className='home-page' data-testid="home-page">
        <div className='home-body'>
          <Header user={props.user} token={props.token} />
          <CarouselHome events={eventList} loadMore={loadMoreEvents} isLoading={eventIsLoading} />
          <InfiniteScroll itemList={petList || []} loadMore={loadMorePets} isLoading={petIsLoading}>
            <PetCardList petList={petList} />
          </InfiniteScroll>

        </div>

        {showToast && (
          <Toast message={toastMessage} type={toastType} onClose={handleCloseToast} />
        )}

        <FloatingButton />

        <style>
          {`
            .home-page {
              width: 100%;
              margin-top: 70px;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Home;