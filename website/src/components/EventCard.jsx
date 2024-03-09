import React, { useState, useEffect } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { formatarData, formatarHora } from '../utils/formatarData';
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

const EventCard = ({
  protetor,
  imagens,
  animais,
  dataHoraInicio,
  dataHoraFim,
  local,
  descricao,
	id,
}) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [starIconSrc, setStarIconSrc] = useState(starIcon);
	const [isMoreInfoVisible, setMoreInfoVisible] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
  const [width, height] = useWindowSize();
	const [currentAnimal, setCurrentAnimal] = useState(null);

	useEffect(() => {
    setCurrentIndex(0);
  }, [width]);

	useEffect(() => {
    updateCurrentAnimal();
    // eslint-disable-next-line
	}, [currentIndex]);

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => {
      setStarIconSrc(prevIsFavorite ? starIcon : starFilledIcon);
      return !prevIsFavorite;
    });
  };

	const handleMoreInfoClick = () => {
    setMoreInfoVisible(!isMoreInfoVisible);
  };

	const allImages = [
		...imagens.map(imagem => ({ animalId: null, imagem: imagem })),
		...animais.map(animal => ({
			animalId: animal.id,
			imagem: animal.imagens.length > 0 ? animal.imagens[0] : null
		}))
	].filter(item => item.imagem !== null);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => {
			const newIndex = (prevIndex + 1) % allImages.length;
			updateCurrentAnimal(newIndex);
			return newIndex;
		});
	};

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };
	
  const updateCurrentAnimal = () => {
    const currentImage = allImages[currentIndex];
    setCurrentAnimal(currentImage.animalId !== null ? animais.find(animal => animal.id === currentImage.animalId) : null);
  };

	const isAtBeginning = currentIndex === 0;
  const isAtEnd = currentIndex === allImages.length - 1;


  return (
    <div className="event-card" id={id}>
			<div className='event-card-header'>
				<div className='event-avatar'>
					<img src={protetor.imagem} alt={`Avatar de ${protetor.nickname}`} />
				</div>
				<h2>{protetor.nickname}</h2>
			</div>

			<div className='event-card-body'>
				<div className='event-card-images-container'>
					{width >= 900 ? (
						<div className="event-carousel" style={{ width: '500px' }}>
							<div className="event-carousel-content" style={{ transform: `translateX(-${currentIndex * 500}px)` }}>
								{allImages?.map((imageObj, index) => (
									<div key={index} style={{ width: '500px' }}>
										<img src={imageObj.imagem} alt={`Foto do evento`} className='event-image'/>
									</div>
								))}
							</div>
							<button className="event-carousel-button left" onClick={prevSlide} disabled={isAtBeginning} >&#10094;</button>
							<button className="event-carousel-button right" onClick={nextSlide} disabled={isAtEnd} >&#10095;</button>
						</div>

					) : (
						<div className="event-carousel" style={{ height: `${width - 30}px`, width: `${width - 30}px` }}>
							<div className="event-carousel-content" style={{ transform: `translateX(-${currentIndex * (width - 30)}px)` }}>
								{allImages?.map((imageObj, index) => (
									<div key={index} style={{ width: `${width - 30}px` }}>
										<img src={imageObj.imagem} alt={`Foto do evento`} className='event-image' style={{ height: `${width - 30}px`, width: `${width - 30}px`, objectFit: 'cover' }}/>
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
							<h2>{formatarData(dataHoraInicio)}</h2>
							<p className='event-label'>{local.cidade}, {local.uf}</p>
							<p className='event-label'>{local.nome}</p>
						</div>
						<div className='event-card-buttons'>
							<div className='star-icon-container' onClick={handleFavoriteClick}>
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
									<p>{local.rua}, {local.numero} - {local.bairro}</p>
								</div>
							</div>
							<div className='event-info-line'>
								<img src={clockIcon} alt='Horário' className='event-info-icon'/>
								<div className='event-data'>
									<p>das {formatarHora(dataHoraInicio)} às {formatarHora(dataHoraFim)}</p>
								</div>
							</div>
							<div className='event-info-line'>
								<img src={quoteIcon} alt='Descrição' className='event-info-icon'/>
								<div className='event-data'>{descricao}</div>
							</div>
						</div>
					)}
					</div>
				)}

				{currentAnimal && (
					<div>
						<div className='pet-card-bar'>
							<div className='pet-card-summary'>
								<h2>{currentAnimal.nome}</h2>
								<p className='pet-label'>{currentAnimal.sexo}</p>
								<p className='pet-label pet-age'>{currentAnimal.idade}</p>
								<p className='pet-label pet-size'>{currentAnimal.porte}</p>
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
										<div className='pet-data'>{currentAnimal.cidade}</div>
									</div>
								</div>
								<div className='pet-info-row'>
									<div className='pet-info-col'>
										<img src={printIcon} alt='Tipo de animal' className='pet-info-icon'/>
										<div className='pet-data'>{currentAnimal.tipo}</div>
									</div>
									<div className='pet-info-col'>
										<img src={ribbonIcon} alt='Raça' className='pet-info-icon'/>
										<div className='pet-data'>{currentAnimal.raca}</div>
									</div>
								</div>
								<div className='pet-info-row'>
									<div className='pet-info-col'>
										<img src={cakeIcon} alt='Idade' className='pet-info-icon'/>
										<div className='pet-data'>{currentAnimal.idade}</div>
									</div>
									<div className='pet-info-col'>
										<img src={weightIcon} alt='Peso' className='pet-info-icon'/>
										<div className='pet-data'>{currentAnimal.porte}</div>
									</div>
								</div>
								<div className='pet-info-line'>
									<img src={infoIcon} alt='Informações gerais' className='pet-info-icon'/>
									<div className='pet-data'>
										<p>{currentAnimal.convivio}</p>
										<p>{currentAnimal.personalidade}</p>
									</div>
								</div>
								<div className='pet-info-line'>
									<img src={quoteIcon} alt='Descrição' className='pet-info-icon'/>
									<div className='pet-data'>{currentAnimal.descricao}</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>

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
