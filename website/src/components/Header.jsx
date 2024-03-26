import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import userIcon from '../assets/images/user.png';
import userFilledIcon from '../assets/images/user-filled.png';
import searchIcon from '../assets/images/search.png';
import searchFilledIcon from '../assets/images/search-filled.png';
import UserModal from './UserModal';
import SearchModal from './SearchModal';

const Header = ( props ) => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
	const [userIconSrc, setUserIconSrc] = useState(userIcon);
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
	const [searchIconSrc, setSearchIconSrc] = useState(searchIcon);

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
			setIsSearchModalOpen(true);
			setSearchIconSrc(searchFilledIcon);
		}
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
		setSearchIconSrc(searchIcon);
  };

  return (
    <div className={`header ${isVisible ? 'visible' : 'hidden'}`}>
			<div className='header-body'>
				<Link to="/">
          <img src={logo} alt='Logo Conexão Pet' className='logo' />
        </Link>

				<div className='menu-options-container'>
					<div className='search-icon-container' onClick={openSearchModal}>
						<img src={searchIconSrc} alt='Buscar' className='search-icon' />
					</div>
					<div className='user-icon-container' onClick={openUserModal}>
						<img src={userIconSrc} alt='Perfil' className='user-icon' />
					</div>
				</div>
			</div>

			<UserModal isModalOpen={isUserModalOpen} closeModal={closeUserModal} user={props.user} token={props.token} isLoggedIn={true}>
				<h2>Opções do Usuário</h2>
        <button onClick={closeUserModal}>Fechar</button>
			</UserModal>

			<SearchModal isModalOpen={isSearchModalOpen} closeModal={closeSearchModal}>
				<h2>Opções do Usuário</h2>
        <button onClick={closeSearchModal}>Fechar</button>
			</SearchModal>

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
          
          .menu-options-container {
            display: flex;
            justify-content: space-between;
          
          }
          
          .user-icon {
            height: 24px;
            cursor: pointer;
          }
          
          .search-icon {
            height: 27px;
            cursor: pointer;
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
    </div>
  );
};

export default Header;
