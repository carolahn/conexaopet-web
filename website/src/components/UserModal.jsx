import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../assets/images/close.png';
import { Link } from 'react-router-dom';
import EditUserModal from './EditUserModal';
import { logout } from '../redux/store';
import { resetAddressState } from '../redux/reducers/addressSlice';
import { resetCupomState } from '../redux/reducers/cupomSlice';
import { resetEventState } from '../redux/reducers/eventSlice';
import { resetPetState } from '../redux/reducers/petSlice';
import { resetFavoritePetState } from '../redux/reducers/favoritePetSlice';
import { resetFavoriteEventState } from '../redux/reducers/favoriteEventSlice';
import { fetchEventList, fetchPetList } from '../redux/actions';
import { resetSearchPetsState } from '../redux/reducers/searchPetSlice';
import { resetSearchEventsState } from '../redux/reducers/searchEventSlice';
import { resetUserState } from '../redux/reducers/userReducer';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const UserModal = ({ isModalOpen, closeModal, user, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [modalStyle, setModalStyle] = useState({
    content: {
        inset: '50px calc((100% - 900px)/2) auto auto',
        width: '200px',
    },
  });

  useEffect(() => {
    const handleResize = () => {
      
      const newStyle = window.innerWidth < 900
        ? { content: { 
            inset: '40px 0 auto auto',
            width: '200px',
         } }
        : { content: { 
            inset: '50px calc((100% - 900px)/2) auto auto',
            width: '200px',
         } };

      setModalStyle(newStyle);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openEditUserModal = () => {
    setIsEditUserModalOpen(!isEditUserModalOpen);
  };

  const closeEditUserModal = () => {
    setIsEditUserModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAddressState());
    dispatch(resetCupomState());
    dispatch(resetEventState());
    dispatch(resetPetState());
    dispatch(resetFavoritePetState());
    dispatch(resetFavoriteEventState());
    closeModal();
    dispatch(fetchEventList());
    dispatch(fetchPetList());
    dispatch(resetSearchPetsState());
    dispatch(resetSearchEventsState());
    dispatch(resetUserState());
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user) {
      if (user.type === 1) {
        return `/dashboard/member/${user.id}`;
      } else if (user.type === 2) {
        return `/dashboard/protector/${user.id}`;
      } else if (user.type === 3) {
        return `/dashboard/sponsor/${user.id}`;
      } else {
        return '/';
      }
    } else {
      return '/';
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel='User Modal'
      style={modalStyle}
      aria={{
        labelledby: 'modal-title',
        describedby: 'modal-description'
      }}
      shouldCloseOnEsc={true}
      shouldFocusAfterRender={true}
    >
      <div className="modal-header" style={{ display: 'flex', justifyContent: 'end'}}>
        <div className='close-icon-container' onClick={closeModal} tabIndex={0} role="button" aria-label="Fechar modal" onKeyDown={(e) => {if (e.key === 'Enter') closeModal();}}>
          <img src={closeIcon} alt='Fechar' className='close-icon' style={{ height: '15px', cursor: 'pointer' }} />
        </div>
      </div>

      {token ? (
        <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'column' }}>
          <Link to='/' style={{ marginBottom: '8px'}} onClick={closeModal} onKeyDown={(e) => {if (e.key === 'Enter') {navigate('/');closeModal();}}}>Home</Link>
          <Link to={getDashboardLink()} style={{ marginBottom: '8px'}} onClick={closeModal} onKeyDown={(e) => {if (e.key === 'Enter') {navigate(getDashboardLink());closeModal();}}}>Minha conta</Link>
          <div className='edit-user-link' onClick={openEditUserModal} tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === 'Enter') openEditUserModal();}}>Editar conta</div>
          <Link to='/' onClick={handleLogout} onKeyDown={(e) => {if (e.key === 'Enter') {navigate('/');handleLogout();}}}>Sair</Link>
        </div>
      ) : (
        <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'column' }}>
          <Link to='/' style={{ marginBottom: '8px'}} onClick={closeModal}>Home</Link>
          <Link to='/login' style={{ marginBottom: '8px'}}>Entrar</Link>
          <Link to='/signup'>Cadastrar</Link>
        </div>

      )}

      <EditUserModal isModalOpen={isEditUserModalOpen} closeModal={() => {closeEditUserModal(); closeModal();}} user={user} />
      
      <style>
        {`
          .edit-user-link {
            margin-bottom: 8px;
            color: -webkit-link;
            cursor: pointer;
            text-decoration: underline;
          }
        `}
      </style>
    </Modal>
  );
};

export default UserModal;
