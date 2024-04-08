import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import PetCardList from '../components/PetCardList';
import EventCardList from '../components/EventCardList';
import Toast from '../components/Toast';
import InfiniteScroll from '../components/InfiniteScroll';
import ProtectorCardDashboard from '../components/ProtectorCardDashboard';
import { fetchPetListByProtector, getPetChoices } from '../redux/actions/petActions';
import { fetchEventListByProtector } from '../redux/actions/eventActions';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardProtector = ( props ) => {
  const [selectedTab, setSelectedTab] = useState('pet');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Alterações salvas');
  const [toastType, setToastType] = useState('success');
  const petListByProtector = useSelector((state) => state.pet.petListByProtector[props.user?.id]);
  const petNextPage = useSelector((state) => state.pet.nextPage);
  const petIsLoading = useSelector((state) => state.pet.isLoading);
  const eventListByProtector = useSelector((state) => state.event.eventListByProtector[props.user?.id]);
  const eventNextPage = useSelector((state) => state.event.nextPage);
  const eventIsLoading = useSelector((state) => state.event.isLoading);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    dispatch(fetchPetListByProtector(props.user.id));
    dispatch(fetchEventListByProtector(props.user.id));
    dispatch(getPetChoices(props.user.id));
    console.log("dispatch petChoices");
    // eslint-disable-next-line
  }, [dispatch]);

  const loadMorePets = () => {
    if (petNextPage) {
      const pageNumber = petNextPage.split('page=')[1];
      dispatch(fetchPetListByProtector(props.user.id, pageNumber));
    }
  };

  const loadMoreEvents = () => {
    if (eventNextPage) {
      const pageNumber = eventNextPage.split('page=')[1];
      dispatch(fetchEventListByProtector(props.user.id, pageNumber));
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
      <div className='profile-container'>
        <div className='profile-body'>
          <Header user={props.user} token={props.token} />
          <ProtectorCardDashboard protector={props.user} setSelectedTab={setSelectedTab} setToastType={setToastType} setToastMessage={setToastMessage} handleOpenToast={handleOpenToast} />

          {selectedTab === 'pet' && (
            <InfiniteScroll 
              itemList={petListByProtector || []}
              loadMore={loadMorePets}
              isLoading={petIsLoading}
            >
              <PetCardList petList={petListByProtector || []} />
            </InfiniteScroll>
          )}

          {selectedTab === 'event' && (
            <InfiniteScroll 
              itemList={eventListByProtector || []}
              loadMore={loadMoreEvents}
              isLoading={eventIsLoading}
            >
              <EventCardList eventList={eventListByProtector || []} />
            </InfiniteScroll>
          )}
        </div>

        {showToast && (
          <Toast message={toastMessage} type={toastType} onClose={handleCloseToast} />
        )}

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

export default DashboardProtector;