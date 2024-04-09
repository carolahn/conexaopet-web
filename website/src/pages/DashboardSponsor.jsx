import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import InfiniteScroll from '../components/InfiniteScroll';
import CupomCardList from '../components/CupomCardList';
import SponsorCardDashboard from '../components/SponsorCardDashboard';
import { fetchCupomListByProtector } from '../redux/actions/cupomActions';
import Toast from '../components/Toast';


const DashboardSponsor = ( props ) => {
  const [selectedTab, setSelectedTab] = useState('cupom');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Alterações salvas');
  const [toastType, setToastType] = useState('success');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cupomListByProtector = useSelector((state) => state.cupom.cupomListByProtector[props.user?.id]);
  const nextPage = useSelector((state) => state.cupom.nextPage);
  const isLoading = useSelector((state) => state.cupom.isLoading);


  useEffect(() => {
    if (id === null || id === undefined) {
      navigate('/');
    } else if (props.user.id != id) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchCupomListByProtector(props.user.id));
    // eslint-disable-next-line
  }, [dispatch]);

  const loadMoreItems = () => {
    if (nextPage) {
      const pageNumber = nextPage.split('page=')[1];
      dispatch(fetchCupomListByProtector(props.user.id, pageNumber));
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
      <Header user={props.user} token={props.token} />
      <div className='profile-body'>
        <SponsorCardDashboard user={props.user} setSelectedTab={setSelectedTab} setToastType={setToastType} setToastMessage={setToastMessage} handleOpenToast={handleOpenToast}/>

        <InfiniteScroll
          itemList={cupomListByProtector || []}
          loadMore={loadMoreItems}
          isLoading={isLoading}
        >
          <CupomCardList cupomList={cupomListByProtector} />
        </InfiniteScroll>
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

export default DashboardSponsor;