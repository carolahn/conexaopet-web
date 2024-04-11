import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from '../hooks/useWindowSize';
import { formatarData, formatarHora } from '../utils/formatarData';
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
import clockIcon from '../assets/images/clock.png';
import editIcon from '../assets/images/edit.png';
import trashIcon from '../assets/images/trash.png';
import { imageCache } from './CupomCard';
import { getPersonalityString, getAlongString, getLifeStage, getPetType } from '../utils/petData';
import Toast from './Toast';
import DiscartModal from './DiscartModal';
import NewPublicationModal from './NewPublicationModal';
import { deleteEvent } from '../redux/actions';
import { addFavoriteEvent, removeFavoriteEvent } from '../redux/actions/favoriteEventActions';


const EventCard = ( props ) => {
  const [ownerImage, setOwnerImage] = useState(null);
	const [isFavorite, setIsFavorite] = useState(false);
	const [starIconSrc, setStarIconSrc] = useState(starIcon);
	const [isMoreInfoVisible, setMoreInfoVisible] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
  const [width, height] = useWindowSize();
	const [currentAnimal, setCurrentAnimal] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [sortedImages, setSortedImages] = useState([]);
  const [isDiscartModalOpen, setIsDiscartModalOpen] = useState(false);
	const [isNewPublicationModalOpen, setIsNewPublicationModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Alterações salvas');
  const [toastType, setToastType] = useState('success');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const eventError = useSelector(state => state.event.error);
  const favoriteEventList = useSelector((state) => state.favoriteEvent.favoriteEventList);
  const favoriteEventError = useSelector((state) => state.favoriteEvent.error);

  
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
  
    fetchImage(props.event.owner.image, setOwnerImage);

    props.event.images.forEach(image => {
      fetchImage(image.image, (cachedImage) => {
        setAllImages(prevImages => {
          const newImages = [...prevImages, { petId: null, image: cachedImage }];
          return newImages;
        });
      });
    });
  
    props.event.pets.forEach(pet => {
      fetchImage(pet.images[0]?.image, (cachedImage) => {
        setAllImages(prevImages => [...prevImages, { petId: pet.id, image: cachedImage }]);
      });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const nullPetImages = allImages.filter(imageObj => imageObj.petId === null);
    const petImagesWithId = allImages.filter(imageObj => imageObj.petId !== null);
    setSortedImages([...nullPetImages, ...petImagesWithId]);
  }, [allImages]);

	useEffect(() => {
    setCurrentIndex(0);
  }, [width]);

	useEffect(() => {
    updateCurrentAnimal();
    // eslint-disable-next-line
	}, [currentIndex]);

  useEffect(() => {
    if (favoriteEventList && favoriteEventList.length > 0) {
      const isEventFavorite = favoriteEventList.some(favoriteEvent => favoriteEvent.id === props.event.id);
      setIsFavorite(isEventFavorite);
      
      if(isEventFavorite) {
        setStarIconSrc(starFilledIcon);
      } else {
        setStarIconSrc(starIcon);
      }
    }

    // eslint-disable-next-line
  }, [favoriteEventList])

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => {
      if (!prevIsFavorite) {
        try {
          dispatch(addFavoriteEvent(props.event));
          if (!favoriteEventError) {
            setStarIconSrc(starFilledIcon);
          }
        } catch (error) {
          console.error('Error adding favorite event:', error);
        }

      } else {
        try {
          dispatch(removeFavoriteEvent(props.event));
          if (!favoriteEventError) {
            setStarIconSrc(starIcon);
          }
        } catch (error) {
          console.error('Error removing favorite event:', error);
        }
      }
      return !prevIsFavorite;
    });
  };

	const handleMoreInfoClick = () => {
    setMoreInfoVisible(!isMoreInfoVisible);
  };

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => {
			const newIndex = (prevIndex + 1) % sortedImages.length;
			updateCurrentAnimal(newIndex);
			return newIndex;
		});
	};

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sortedImages.length) % sortedImages.length);
  };
	
  const updateCurrentAnimal = () => {
    const currentImage = sortedImages[currentIndex];
    if (currentImage) {
      setCurrentAnimal(currentImage.petId !== null ? props.event.pets.find(animal => animal.id === currentImage.petId) : null);
    }
  };

	const isAtBeginning = currentIndex === 0;
  const isAtEnd = currentIndex === sortedImages.length - 1;

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

  const handleDeleteEvent = (e) => {
    e.preventDefault();
    try {
      dispatch(deleteEvent(props.event.id));
      if (!eventError) {
        setToastMessage('Publicação removida');
        setToastType('success');
        setTimeout(() => {
          closeDiscartModal();
        }, 1000);
        handleOpenToast();
      } else {
        setToastMessage(`Erro: ${eventError}`);
        setToastType('failure');
        handleOpenToast();
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleGetPetCard = (id) => {
    navigate(`/pet/${id}`);
  };

  return (
    <div className="event-card" id={props.id}>
			<div className='event-card-header'>
        <div className='event-header'>
          <div className='event-avatar'>
            <img src={ownerImage} alt={`Avatar de ${props.event.owner.username}`} />
          </div>
          <h2>{props.event.owner.username}</h2>
        </div>
        {user?.id === props.event.owner.id && (
          <div className='event-options-container'>
            <div className='icon-container' onClick={openNewPublicationModal}>
              <img src={editIcon} alt='Buscar' className='edit-icon' />
            </div>
            <div className='icon-container' onClick={openDiscartModal}>
              <img src={trashIcon} alt='Perfil' className='trash-icon' />
            </div>
          </div>
        )}
      </div>

			<div className='event-card-body'>
				<div className='event-card-images-container'>
					{width >= 900 ? (
						<div className="event-carousel" style={{ width: '500px', maxHeight: '500px', marginBottom: '8px' }}>
							<div className="event-carousel-content" style={{ transform: `translateX(-${currentIndex * 500}px)` }}>
								{sortedImages?.map((imageObj, index) => (
									<div key={index} style={{ width: '500px' }}>
										<img src={imageObj.image} alt={`Foto do evento`} className='event-image' style={{ height: '100%', objectFit: 'cover', maxWidth: '500px', display: 'block'}}/>
									</div>
								))}
							</div>
							<button className="event-carousel-button left" onClick={prevSlide} disabled={isAtBeginning} >&#10094;</button>
							<button className="event-carousel-button right" onClick={nextSlide} disabled={isAtEnd} >&#10095;</button>
						</div>

					) : (
						<div className="event-carousel" style={{ height: `${width - 30}px`, width: `${width - 30}px` }}>
							<div className="event-carousel-content" style={{ transform: `translateX(-${currentIndex * (width - 30)}px)` }}>
								{sortedImages?.map((imageObj, index) => (
									<div key={index} style={{ width: `${width - 30}px` }}>
										<img src={imageObj.image} alt={`Foto do evento`} className='event-image' style={{ height: `${width - 30}px`, width: `${width - 30}px`, objectFit: 'cover' }}/>
									</div>
								))}
							</div>
							<button className="event-carousel-button left mobile" onClick={prevSlide} disabled={isAtBeginning} >&#10094;</button>
							<button className="event-carousel-button right mobile" onClick={nextSlide} disabled={isAtEnd} >&#10095;</button>
						</div>
					)}
				</div>

				{!currentAnimal && (
					<div>
					<div className='event-card-bar'>
						<div className='event-card-summary'>
							<h2>{formatarData(props.event.date_hour_initial)}</h2>
							<p className='event-label'>{props.event.address.city}, {props.event.address.uf}</p>
							<p className='event-label'>{props.event.address.name}</p>
						</div>
						<div className='event-card-buttons'>
							<div className={`star-icon-container ${user ? '' : 'disabled'}`} onClick={handleFavoriteClick}>
                <div className='event-followers'>{props.event.followers}</div>
								<img src={starIconSrc} alt='Favorito' className='star-icon' />
							</div>
							<div className='more-icon-container' onClick={handleMoreInfoClick}>
								<img src={moreIcon} alt='Saiba mais' className='more-icon' />
							</div>
						</div>
					</div>
					{isMoreInfoVisible && (
						<div className='event-info'>
							<div className='event-info-line'>
								<img src={pinIcon} alt='Endereço' className='event-info-icon'/>
								<div className='event-data'>
									<p>{props.event.address.street}, {props.event.address.number} - {props.event.address.district}</p>
								</div>
							</div>
							<div className='event-info-line'>
								<img src={clockIcon} alt='Horário' className='event-info-icon'/>
								<div className='event-data'>
									<p>das {formatarHora(props.event.date_hour_initial)} às {formatarHora(props.event.date_hour_end)}</p>
								</div>
							</div>
							<div className='event-info-line'>
								<img src={quoteIcon} alt='Descrição' className='event-info-icon'/>
								<div className='event-data'>{props.event.description}</div>
							</div>
						</div>
					)}
					</div>
				)}

				{currentAnimal && (
					<div>
						<div className='pet-card-bar'>
							<div className='pet-card-summary'>
								<h2 className='pet-card-name' onClick={() => handleGetPetCard(currentAnimal.id)}>{currentAnimal.name}</h2>
								<p className='pet-label'>{currentAnimal.gender === 'M' ? 'macho' : 'fêmea'}</p>
								<p className='pet-label pet-age'>{getLifeStage(currentAnimal.age_year)}</p>
								<p className='pet-label pet-size'>{currentAnimal.size}</p>
							</div>
							<div className='pet-card-buttons'>
								<div className='star-icon-container' onClick={handleFavoriteClick}>
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
										<div className='pet-data'>{currentAnimal.owner.city}</div>
									</div>
								</div>
								<div className='pet-info-row'>
									<div className='pet-info-col'>
										<img src={printIcon} alt='Tipo de animal' className='pet-info-icon'/>
										<div className='pet-data'>{getPetType(currentAnimal.type)}</div>
									</div>
									<div className='pet-info-col'>
										<img src={ribbonIcon} alt='Raça' className='pet-info-icon'/>
										<div className='pet-data'>{currentAnimal.breed}</div>
									</div>
								</div>
								<div className='pet-info-row'>
									<div className='pet-info-col'>
										<img src={cakeIcon} alt='Idade' className='pet-info-icon'/>
										<div className='pet-data'>{currentAnimal.age_year > 0 ? `${currentAnimal.age_year} anos` : `${currentAnimal.age_month} meses`}</div>
									</div>
									<div className='pet-info-col'>
										<img src={weightIcon} alt='Peso' className='pet-info-icon'/>
										<div className='pet-data'>{currentAnimal.wheight} kg</div>
									</div>
								</div>
								<div className='pet-info-line'>
									<img src={infoIcon} alt='Informações gerais' className='pet-info-icon'/>
									<div className='pet-data'>
										<p>{currentAnimal.get_along.length > 0 ? `Convive bem com: ${getAlongString(currentAnimal.get_along)}` : `Não lida bem com animais e crianças`}</p>
										<p>{currentAnimal.personality.length > 0 ? `Personalidade: ${getPersonalityString(currentAnimal.personality)}`: ''}</p>
									</div>
								</div>
								<div className='pet-info-line'>
									<img src={quoteIcon} alt='Descrição' className='pet-info-icon'/>
									<div className='pet-data'>{currentAnimal.description}</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>

      <NewPublicationModal isModalOpen={isNewPublicationModalOpen} closeModal={closeNewPublicationModal} initialValues={props.event} editType={'event'} setToastType={setToastType} setToastMessage={setToastMessage} handleOpenToast={handleOpenToast}/>
			<DiscartModal isModalOpen={isDiscartModalOpen} closeModal={closeDiscartModal} handleConfirm={handleDeleteEvent} />

      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={handleCloseToast} />
      )}

      <style>
        {`
          .event-card {
            width: 500px;
            display: flex;
            flex-direction: column;
            border: 1px solid #ddd;
            margin-bottom: 20px;
            padding: 15px;
          }
          
          .event-card-header {
            display: flex;
            align-items: center;
            padding: 0 0 7px 3px;
            justify-content: space-between;
          }

          .event-header {
            display: flex;
            align-items: center;
          }
            
          .event-avatar {
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 15px;
          }
            
          .event-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .event-options-container {
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
          
          .event-card-images-container {
            position: relative;
            width: 100%;
            overflow: hidden;
          }
          
          .event-card-images-container img {
            width: 500px;
          }
          
          .event-card-bar {
            display: flex;
          }
          
          .event-card-summary {
            width: 80%;
          }

          .pet-card-name {
            cursor: pointer
          }

          .event-followers {
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
          
          .event-card-buttons {
            width: 20%;
            display: flex;
            justify-content: end;
          }
          
          .star-icon, .more-icon {
            cursor: pointer;
            height: 24px;
          }
          
          .event-label {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 15px;
            margin-right: 10px;
            font-weight: bold;
            background-color: var(--color-primary);
            color: var(--color-text-clear);
          }
          
          .event-button {
            padding: 5px 10px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          
          .event-info {
            flex-grow: 1;
            margin-top: 5px;
          }
          
          .event-info-icon {
            height: 22px;
          }
          
          .event-info-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 5px;
          }
          
          .event-info-col {
            display: flex;
            align-items: center;
            width: 50%;
          }
          
          .event-info-line {
            display: flex;
            padding: 5px;
          }
          
          .event-data {
            padding-left: 5px;
          }
          
          .event-carousel {
            position: relative;
            width: 100%;
            overflow: hidden;
          }
          
          .event-carousel-content {
            display: flex;
            transition: transform 0.5s ease-in-out;
            width: 100%;
          }
          
          .active {
            opacity: 1;
          }
          
          .event-carousel-button {
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
          
          .event-carousel-button:hover {
            background: rgba(0, 0, 0, 0.03);
          }
          
          .event-carousel-button.mobile:hover {
            background-color: transparent;
          }
          
          .event-carousel-button.left {
            left: 0;
            justify-content: start;
          }
          
          .event-carousel-button.right {
            right: 0;
            justify-content: end;
          }

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
            .event-card {
              width: calc(100% - 30px);
            }
          
            .event-avatar {
              width: 32px;
              height: 32px;
            }
          
            .event-card-images-container {
              margin-bottom: 5px;
            }

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
            
        `}
      </style>
    </div>
  );
};

export default EventCard;
