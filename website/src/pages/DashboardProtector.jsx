import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import PetCardList from '../components/PetCardList';
import EventCardList from '../components/EventCardList';
import mockPetCardData from '../components/mockPetCardData';
import mockEventCardData from '../components/mockEventCardData';
import { mockProtectorData } from '../components/mockProtectorData';
import Toast from '../components/Toast';
import InfiniteScroll from '../components/InfiniteScroll';
import ProtectorCardDashboard from '../components/ProtectorCardDashboard';
import { fetchPetListByProtector } from '../redux/actions/petActions';
import { fetchEventListByProtector } from '../redux/actions/eventActions';

const DashboardProtector = ( props ) => {
  const [selectedTab, setSelectedTab] = useState('pet');
  const { id } = useParams();
  const isOwner = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Alterações salvas');
  const [toastType, setToastType] = useState('success');
  const petListByProtector = useSelector((state) => state.pet.petListByProtector[props.user.id]);
  const petNextPage = useSelector((state) => state.pet.nextPage);
  const petIsLoading = useSelector((state) => state.pet.isLoading);
  const eventListByProtector = useSelector((state) => state.event.eventListByProtector[props.user.id]);
  const eventNextPage = useSelector((state) => state.event.nextPage);
  const eventIsLoading = useSelector((state) => state.event.isLoading);

  useEffect(() => {
    if (id === null || id === undefined) {
      navigate('/');
    } else if (props.user.id != id) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchPetListByProtector(props.user.id));
    dispatch(fetchEventListByProtector(props.user.id));
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
    <div className='profile-container'>
      <div className='profile-body'>
        <Header user={props.user} token={props.token} />
        <ProtectorCardDashboard protector={props.user} setSelectedTab={setSelectedTab} />

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

  );
};

export default DashboardProtector;