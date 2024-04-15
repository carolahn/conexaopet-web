import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from '../hooks/useWindowSize';
import { getUser } from '../utils/selectors';
import starIcon from '../assets/images/star.png';
import starFilledIcon from '../assets/images/star-filled.png';
import moreIcon from '../assets/images/more.png';
import printIcon from '../assets/images/print.png';
import ribbonIcon from '../assets/images/ribbon.png';
import pinIcon from '../assets/images/pin.png';
import cakeIcon from '../assets/images/cake.png';
import weightIcon from '../assets/images/weight.png';
import infoIcon from '../assets/images/info.png';
import quoteIcon from '../assets/images/quote.png';
import editIcon from '../assets/images/edit.png';
import trashIcon from '../assets/images/trash.png';
import DiscartModal from './DiscartModal';
import NewPublicationModal from './NewPublicationModal';
import { imageCache } from './CupomCard';
import { getPersonalityString, getAlongString, getLifeStage, getPetType } from '../utils/petData';
import { addFavoritePet, deletePet, removeFavoritePet } from '../redux/actions';
import Toast from './Toast';


const PetCard = ({ pet }) => {
  const [ownerImage, setOwnerImage] = useState(null);
  const [petImages, setPetImages] = useState([]);
	const [isFavorite, setIsFavorite] = useState(false);
	const [starIconSrc, setStarIconSrc] = useState(starIcon);
	const [isMoreInfoVisible, setMoreInfoVisible] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
  const [width, height] = useWindowSize();
	const [isDiscartModalOpen, setIsDiscartModalOpen] = useState(false);
	const [isNewPublicationModalOpen, setIsNewPublicationModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Alterações salvas');
  const [toastType, setToastType] = useState('success');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const petError = useSelector(state => state.pet.error);
  const favoritePetList = useSelector((state) => state.favoritePet.favoritePetList);
  const favoritePetError = useSelector((state) => state.favoritePet.error);

  useEffect(() => {

    const fetchImage = async (imageURL, setImage) => {
      try {
        // Verifica se a imagem já está em cache
        if (imageCache[imageURL]) {
          setImage(imageCache[imageURL]);
          return;
        }
  
        const apiUrl = process.env.REACT_APP_API_URL.replace('api', '');
        const pathAfterMedia = imageURL.substring(imageURL.indexOf('media/'));
        const url = apiUrl + pathAfterMedia;
  
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image from ${url}`);
        }
        const blob = await response.blob();
        const file = new File([blob], imageURL.substring(imageURL.lastIndexOf('/') + 1));
  
        // Salva a imagem no cache
        imageCache[imageURL] = URL.createObjectURL(file);
        setImage(imageCache[imageURL]);
      } catch (error) {
        console.error(`Error fetching image from ${imageURL}:`, error);
      }
    };
  
    setPetImages([]);
    
    fetchImage(pet.owner?.image, setOwnerImage);
  
    pet.images?.forEach(image => {
      fetchImage(image.image, (cachedImage) => {
        setPetImages(prevImages => [...prevImages, cachedImage]);
      });
    });

  }, [pet?.owner?.image, pet?.images, pet]);


	useEffect(() => {
    // Atualizar o índice do slide para 0 ao redimensionar a janela
    setCurrentIndex(0);
  }, [width]);

  useEffect(() => {
    if (favoritePetList && favoritePetList?.length > 0) {
      const isPetFavorite = favoritePetList.some(favoritePet => favoritePet?.id === pet?.id);
      setIsFavorite(isPetFavorite);
      
      if(isPetFavorite) {
        setStarIconSrc(starFilledIcon);
      } else {
        setStarIconSrc(starIcon);
      }
    }

    // eslint-disable-next-line
  }, [favoritePetList])

	const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => {
      if (!prevIsFavorite) {
        try {
          dispatch(addFavoritePet(pet));
          if (!favoritePetError) {
            setStarIconSrc(starFilledIcon);
          }
        } catch (error) {
          console.error('Error adding favorite pet:', error);
        }

      } else {
        try {
          dispatch(removeFavoritePet(pet));
          if (!favoritePetError) {
            setStarIconSrc(starIcon);
          }
        } catch (error) {
          console.error('Error removing favorite pet:', error);
        }
      }
      return !prevIsFavorite;
    });
  };

	const handleMoreInfoClick = () => {
    setMoreInfoVisible(!isMoreInfoVisible);
  };

	const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pet.images?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + pet.images?.length) % pet.images?.length);
  };

	const handleChangeIndex = (index) => {
    setCurrentIndex(index);
  };

	const isAtBeginning = currentIndex === 0;
  const isAtEnd = currentIndex === pet.images?.length - 1;

	const openDiscartModal = () => {
    setIsDiscartModalOpen(!isDiscartModalOpen);
  };

	const closeDiscartModal = () => {
    setIsDiscartModalOpen(false);
  };

	const openNewPublicationModal = () => {
		setIsNewPublicationModalOpen(!isNewPublicationModalOpen);
	};

	const closeNewPublicationModal = () => {
		setIsNewPublicationModalOpen(false);
	};

  const handleOpenToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleDeletePet = (e) => {
    e.preventDefault();
    try {
      dispatch(deletePet(pet?.id));
      if (!petError) {
        setToastMessage('Publicação removida');
        setToastType('success');
        setTimeout(() => {
          closeDiscartModal();
        }, 1000);
        handleOpenToast();
      } else {
        setToastMessage(`Erro: ${petError}`);
        setToastType('failure');
        handleOpenToast();
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleGetOwner = (id) => {
    navigate(`/protector/${id}`);
  };

  return (
    <div className="pet-card" id={`pet-card=${pet?.id}`}>
			<div className='pet-card-header'>
				<div className='pet-header'>
					<div className='pet-avatar'>
						<img src={ownerImage} alt={`Avatar de ${pet.owner?.username}`} />
					</div>
					<h2 className='pet-header-owner' onClick={() => handleGetOwner(pet.owner?.id)}>{pet.owner?.username}</h2>
				</div>
				{user?.id === pet.owner?.id && (
					<div className='pet-options-container'>
						<div className='icon-container' onClick={openNewPublicationModal}>
							<img src={editIcon} alt='Buscar' className='edit-icon' />
						</div>
						<div className='icon-container' onClick={openDiscartModal}>
							<img src={trashIcon} alt='Perfil' className='trash-icon' />
						</div>
					</div>
				)}
			</div>

			<div className='pet-card-body'>
				<div className='pet-card-images-container'>
					{width >= 900 ? (
            <div className="pet-carousel" style={{ width: '500px', maxHeight: '500px', marginBottom: '8px' }}>
              <div className="pet-carousel-content" style={{ transform: `translateX(-${currentIndex * 500}px)` }}>
                {petImages.map((imagem, index) => (
                  <div key={index} style={{ width: '500px' }}>
                    <img src={imagem} alt={`Foto de ${pet.name}`} className='pet-image' style={{ height: '100%', objectFit: 'cover', maxWidth: '500px', display: 'block'}}/>
                  </div>
                ))}
              </div>
              <button className="pet-carousel-button left" onClick={prevSlide} disabled={isAtBeginning}>&#10094;</button>
              <button className="pet-carousel-button right" onClick={nextSlide} disabled={isAtEnd}>&#10095;</button>
            </div>

					) : (
						<div className="pet-carousel" style={{ height: `${width - 30}px`, width: `${width - 30}px` }}>
							<div className="pet-carousel-content" style={{ transform: `translateX(-${currentIndex * (width - 30)}px)` }}>
								{petImages.map((imagem, index) => (
									<div key={index} style={{ width: `${width - 30}px` }}>
										<img src={imagem} alt={`Foto de ${pet.name}`} className='pet-image' style={{ height: `${width - 30}px`, width: `${width - 30}px`, objectFit: 'cover' }}/>
									</div>
								))}
							</div>
							<button className="pet-carousel-button left mobile" onClick={prevSlide} disabled={isAtBeginning}>&#10094;</button>
							<button className="pet-carousel-button right mobile" onClick={nextSlide} disabled={isAtEnd}>&#10095;</button>
						</div>
					)}

				</div>
				<div className='pet-card-bar'>
					<div className='pet-card-summary'>
						<h2>{pet.name}</h2>
						<p className={`pet-label pet-${pet.gender?.toLowerCase()}`}>{pet.gender === 'M' ? 'macho' : 'fêmea'}</p>
						<p className='pet-label pet-age'>{getLifeStage(pet.age_year)}</p>
						<p className='pet-label pet-size'>{pet.size}</p>
					</div>
					<div className='pet-card-buttons'>
						<div className={`star-icon-container ${(user && user.type === 1) ? '' : 'disabled'}`} onClick={handleFavoriteClick}>
              <div className='pet-followers'>{pet.followers}</div>
							<img src={starIconSrc} alt='Favorito' className='star-icon' />
						</div>
						<div className='more-icon-container' onClick={handleMoreInfoClick}>
							<img src={moreIcon} alt='Saiba mais' className='more-icon' />
						</div>
					</div>
				</div>
				{isMoreInfoVisible && (
          <div className='pet-info'>
						<div className='pet-info-row'>
							<div className='pet-info-col'>
								<img src={pinIcon} alt='Cidade' className='pet-info-icon'/>
								<div className='pet-data'>{pet.owner.city}</div>
							</div>
						</div>
						<div className='pet-info-row'>
							<div className='pet-info-col'>
								<img src={printIcon} alt='Tipo de animal' className='pet-info-icon'/>
								<div className='pet-data'>{getPetType(pet.type)}</div>
							</div>
							<div className='pet-info-col'>
								<img src={ribbonIcon} alt='Raça' className='pet-info-icon'/>
								<div className='pet-data'>{pet.breed}</div>
							</div>
						</div>
						<div className='pet-info-row'>
							<div className='pet-info-col'>
								<img src={cakeIcon} alt='Idade' className='pet-info-icon'/>
								<div className='pet-data'>{pet.age_year > 0 ? `${pet.age_year} anos` : `${pet.age_month} meses`}</div>
							</div>
							<div className='pet-info-col'>
								<img src={weightIcon} alt='Peso' className='pet-info-icon'/>
								<div className='pet-data'>{pet.weight} kg</div>
							</div>
						</div>
						<div className='pet-info-line'>
							<img src={infoIcon} alt='Informações gerais' className='pet-info-icon'/>
							<div className='pet-data'>
								<p>{pet.personality?.length > 0 ? `Personalidade: ${getPersonalityString(pet.personality)}`: ''}</p>
								<p>{pet.get_along?.length > 0 ? `Convive bem com: ${getAlongString(pet.get_along)}` : `Não lida bem com animais e crianças`}</p>
							</div>
						</div>
						<div className='pet-info-line'>
							<img src={quoteIcon} alt='Descrição' className='pet-info-icon'/>
							<div className='pet-data'>{pet.description}</div>
						</div>
          </div>
        )}
			</div>

			<NewPublicationModal isModalOpen={isNewPublicationModalOpen} closeModal={closeNewPublicationModal} initialValues={pet} editType={'pet'} setToastType={setToastType} setToastMessage={setToastMessage} handleOpenToast={handleOpenToast}/>
			<DiscartModal isModalOpen={isDiscartModalOpen} closeModal={closeDiscartModal} handleConfirm={handleDeletePet} />

      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={handleCloseToast} />
      )}

      <style>
        {`
          .pet-card {
            width: 500px;
            display: flex;
            flex-direction: column;
            border: 1px solid #ddd;
            margin-bottom: 20px;
            padding: 15px;
          }
          
          .pet-card-header {
            display: flex;
            align-items: center;
            padding: 0 0 7px 3px;
            justify-content: space-between;
          }
          
          .pet-header {
            display: flex;
            align-items: center;
          }

          .pet-header-owner {
            cursor: pointer;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .pet-header-owner:hover {
            color: #666; 
          }
          
          .pet-avatar {
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 15px;
          }
            
          .pet-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .pet-options-container {
            display: flex;
            justify-content: space-between;
          
          }
          
          .edit-icon, .trash-icon {
            height: 20px;
            cursor: pointer;
          }
          
          .edit-icon {
            margin-right: 5px;
          }
          
          .pet-card-images-container {
            position: relative;
            width: 100%;
            overflow: hidden;
          }
          
          .pet-card-images-container img {
            width: 500px;
          }
          
          .pet-card-bar {
            display: flex;
          }
          
          .pet-card-summary {
            width: 80%;
          }
          
          .pet-card-buttons {
            width: 20%;
            display: flex;
            justify-content: end;
          }

          .pet-followers {
            margin-right: 3px;
            font-size: 1.2rem;
          }

          .star-icon-container {
            display: flex;
            align-items: center;
            height: fit-content;
            border: 0.4px solid #e1e7e8;
            border-radius: 15%;
            padding: 0 2px;
            cursor: pointer;
          }

          .star-icon-container.disabled {
            pointer-events: none;
            opacity: 0.5;
          }
          
          .star-icon, .more-icon {
            cursor: pointer;
            height: 24px;
          }
          
          .pet-label {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 15px;
            margin-right: 10px;
            font-weight: bold;
            background-color: var(--color-primary);
            color: var(--color-text-clear);
          }
          
          .pet-button {
            padding: 5px 10px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          
          .pet-info {
            flex-grow: 1;
            margin-top: 5px;
          }
          
          .pet-info-icon {
            height: 22px;
          }
          
          .pet-info-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 5px;
          }
          
          .pet-info-col {
            display: flex;
            align-items: center;
            width: 50%;
          }
          
          .pet-info-line {
            display: flex;
            padding: 5px;
          }
          
          .pet-data {
            padding-left: 5px;
          }
          
          .pet-carousel {
            position: relative;
            width: 100%;
            overflow: hidden;
          }
          
          .pet-carousel-content {
            display: flex;
            transition: transform 0.5s ease-in-out;
            width: 100%;
          }
          
          .active {
            opacity: 1;
          }
          
          .pet-carousel-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            font-size: 24px;
            color: white;
            cursor: pointer;
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
          }
          
          .pet-carousel-button:hover {
            background: rgba(0, 0, 0, 0.03);
          }
          
          .pet-carousel-button.mobile:hover {
            background-color: transparent;
          }
          
          .pet-carousel-button.left {
            left: 0;
            justify-content: start;
          }
          
          .pet-carousel-button.right {
            right: 0;
            justify-content: end;
          }
            
          @media (max-width: 900px) {
            .pet-card {
              width: calc(100% - 30px);
            }
          
            .pet-avatar {
              width: 32px;
              height: 32px;
            }
          
            .pet-card-images-container {
              margin-bottom: 5px;
            }
          }

          @media (max-width: 532px) {
            .pet-label {
              padding: 5px 7px;
              margin-right: 7px;
              font-size: 0.7rem;
            }
          }
            
        `}
      </style>
    </div>
  );
};

export default PetCard;
