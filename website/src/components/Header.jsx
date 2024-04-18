import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import userIcon from '../assets/images/user.png';
import userFilledIcon from '../assets/images/user-filled.png';
import searchIcon from '../assets/images/search.png';
import searchFilledIcon from '../assets/images/search-filled.png';
import returnIcon from '../assets/images/return.png';
import UserModal from './UserModal';
import SearchModal from './SearchModal';
import { resetSearchEventsState } from '../redux/reducers/searchEventSlice';
import { resetSearchPetsState } from '../redux/reducers/searchPetSlice';

const Header = ({ user, token, showLogo = true, title = '' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
	const [userIconSrc, setUserIconSrc] = useState(userIcon);
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
	const [searchIconSrc, setSearchIconSrc] = useState(searchIcon);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setIsVisible(!isScrollingDown);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

	const openUserModal = () => {
		closeSearchModal();
    if (isUserModalOpen) {
			setIsUserModalOpen(false);
			setUserIconSrc(userIcon);
		} else {
			setIsUserModalOpen(true);
			setUserIconSrc(userFilledIcon);
		}
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
		setUserIconSrc(userIcon);
  };

	const openSearchModal = () => {
		closeUserModal();
    if (isSearchModalOpen) {
			setIsSearchModalOpen(false);
			setSearchIconSrc(searchIcon);
		} else {
      dispatch(resetSearchEventsState());
      dispatch(resetSearchPetsState());
			setIsSearchModalOpen(true);
			setSearchIconSrc(searchFilledIcon);
		}
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
		setSearchIconSrc(searchIcon);
  };

  return (
    <>
      <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
        <div className='header-body'>
          {showLogo ? (
            <Link to="/" aria-label="Home">
              <img src={logo} alt='Logo Conexão Pet' className='logo' />
            </Link>
          ) : (
            <div className='header-title-container'>
              <div className='return-icon-container'>
                <button aria-label="Voltar" className='return-button' onClick={() => window.history.back()}>
                  <img src={returnIcon} alt='Voltar' className='return-icon' />
                </button>
              </div>
              <h2>{title}</h2>
            </div>
          )}

          <div className='menu-options-container'>
            <div className='search-icon-container' onClick={openSearchModal} aria-label="Abrir Busca" tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === 'Enter') openSearchModal();}}>
              <img src={searchIconSrc} alt='Buscar' className='search-icon' />
            </div>
            <div className='user-icon-container' onClick={openUserModal} aria-label="Abrir Perfil" tabIndex={0} role="button"onKeyDown={(e) => {if (e.key === 'Enter') openUserModal();}}>
              <img src={userIconSrc} alt='Perfil' className='user-icon' />
            </div>
          </div>
        </div>
      </header>

      <UserModal isModalOpen={isUserModalOpen} closeModal={closeUserModal} user={user} token={token} />

      <SearchModal isModalOpen={isSearchModalOpen} closeModal={closeSearchModal} />

      <style>
        {`
          .header {
            position: fixed;
            top: 0;
            left: 0;
            height: 49px;
            width: 100%;
            padding: 0;
            color: #333;
            transition: transform 0.3s ease-in-out;
            z-index: 2;
            background-color: #FFF;
            border-bottom: 1px solid var(--color-detail);
          }
          
          .header-body {
            max-width: 900px;
            margin: 0 auto;
            padding-top: 3px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .logo {
            height: 45px;
            cursor: pointer;
          }

          button {
            appearance: none; 
            background-color: transparent; 
            border: none; 
            padding: 0; 
            margin: 0; 
            cursor: pointer; 
          }

          .return-icon-container {
            height: 100%;
            padding: 15px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          
          .return-icon {
            height: 15px;
          }
          
          .header-title-container {
            height: 49px;
            display: flex;
            align-items: center;
          }

          .menu-options-container {
            display: flex;
            justify-content: space-between;
          
          }
          
          .user-icon {
            height: 24px;
            cursor: pointer;
            padding: 0 3px;
          }
          
          .search-icon {
            height: 27px;
            cursor: pointer;
            padding: 0 3px;
          }
          
          .visible {
            transform: translateY(0);
          }
          
          .hidden {
            transform: translateY(-100%);
          }
            
          @media (max-width: 900px) {
            .header {
              height: 39px;
              margin: 0;
              /* padding-top: 2px; */
            }
          
            .header-body {
              font-size: 1rem;
            }
          
            .logo {
              height: 35px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
