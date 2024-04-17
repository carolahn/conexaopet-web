import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import InfiniteScroll from '../components/InfiniteScroll';
import CupomCardList from '../components/CupomCardList';
import SponsorCardDashboard from '../components/SponsorCardDashboard';
import { fetchCupomListBySponsor } from '../redux/actions/cupomActions';
import { fetchProfileUser } from '../redux/actions';
import Toast from '../components/Toast';
import FloatingButton from '../components/FloatingButton';


const ProfileSponsor = ( props ) => {
  const [selectedTab, setSelectedTab] = useState('cupom');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Alterações salvas');
  const [toastType, setToastType] = useState('success');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cupomListBySponsor = useSelector((state) => state.cupom.cupomListBySponsor[id]);
  const nextPage = useSelector((state) => state.cupom.nextPage);
  const isLoading = useSelector((state) => state.cupom.isLoading);
  const profileUser = useSelector((state) => state.userReducer.profileUser);


  useEffect(() => {
    dispatch(fetchCupomListBySponsor(id));
    dispatch(fetchProfileUser(id));
    // eslint-disable-next-line
  }, [dispatch]);

  const loadMoreItems = () => {
    if (nextPage) {
      const pageNumber = nextPage.split('page=')[1];
      dispatch(fetchCupomListBySponsor(id, pageNumber));
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
      <div className='profile-container'>
        <Header user={props.user} token={props.token} showLogo={false} title='Perfil do patrocinador' />
        <div className='profile-body'>
          <SponsorCardDashboard sponsor={profileUser} setSelectedTab={setSelectedTab} setToastType={setToastType} setToastMessage={setToastMessage} handleOpenToast={handleOpenToast}/>

          <InfiniteScroll
            itemList={cupomListBySponsor || []}
            loadMore={loadMoreItems}
            isLoading={isLoading}
          >
            <CupomCardList cupomList={cupomListBySponsor || []} />
          </InfiniteScroll>
        </div>
      </div>

      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={handleCloseToast} />
      )}

      <FloatingButton />

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
    </>
  );
};

export default ProfileSponsor;