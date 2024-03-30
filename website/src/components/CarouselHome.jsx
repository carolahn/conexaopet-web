import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowSize } from '../hooks/useWindowSize';
import { formatarData } from '../utils/formatarData';
import { imageCache } from './CupomCard';

const CarouselHome = ({ events, loadMore, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
	const [lastClick, setLastClick] = useState();
	const [eventList, setEventList] = useState([]);
	const [loadCount, setLoadCount] = useState(6);
	// const [isLoading, setIsLoading] = useState(false);
	const [isAtEnd, setIsAtEnd] = useState(false);
  const [width, height] = useWindowSize(events?.length);
  const dispatch = useDispatch();


  useEffect(() => {
    console.log('events: ',events)
    const fetchImage = async (imageURL) => {
      try {
        // Verifica se a imagem já está em cache
        if (imageCache[imageURL]) {
          return imageCache[imageURL];
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
        return imageCache[imageURL];
      } catch (error) {
        console.error(`Error fetching image from ${imageURL}:`, error);
        return null;
      }
    };

    const fetchImages = async () => {
      const newEventList = await Promise.all(
        events.map(async (event) => {
          const eventImages = await Promise.all(
            event.images.map(async (item) => await fetchImage(item.image))
          );
          return { ...event, eventImages };
        })
      );
      setEventList(newEventList);
    };
    if (events && events.length > 0) {
      fetchImages();

    }
  }, [events]);

  console.log('eventList: ',eventList)

	useEffect(() => {
		if (width >= 900) {
			const eventsShown = Math.floor(900 / (height * 0.22));
			const numCanClick = eventList?.length - eventsShown;
			setLastClick(numCanClick);

		} else {
			const eventsShown = Math.floor(width / (height * 0.22));
			const numCanClick = eventList?.length - eventsShown;
			setLastClick(numCanClick);
		}
	}, [currentIndex]);

	// useEffect(() => {
  //   // Atualiza os items quando a propriedade itemList é alterada
  //   setEventList(events.slice(0, loadCount));
  // }, [events, loadCount]);

  // useEffect(() => {
  //   // Carrega alguns itens iniciais ao montar o componente
  //   loadMoreItems();
  // }, []);

	// const loadMoreItems = () => {
	// 	if (!isLoading) {
  //     setIsLoading(true);

  //     // Simulação de uma requisição assíncrona (pode ser substituído por uma chamada de API real)
  //     setTimeout(() => {
  //       setEventList((prevItems) => {
  //         const nextItems = events.slice(prevItems.length, prevItems.length + loadCount);

	// 				if (nextItems.length === 0) {
	// 					setIsAtEnd(true);
	// 				}
  //         return [...prevItems, ...nextItems];
  //       });

  //       setIsLoading(false);
  //     }, 1000); // Aguarda 1 segundo para simular o carregamento assíncrono
  //   }
	// }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % eventList?.length);
	
		if (currentIndex === lastClick - 1) {
			loadMore();
		}
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + eventList?.length) % eventList?.length);
		setIsAtEnd(false);
  };

  const isAtBeginning = currentIndex === 0;

  return (
    <>
    	{width >= 900 ? (
				<div className="carousel" style={{ width: '900px' }}>
					<div className="carousel-content" style={{ transform: `translateX(-${currentIndex * height * 0.22}px)` }}>
						{eventList?.map((event, index) => (
							<div key={index} className="carousel-item" style={{ height: `${height * 0.2}px`, width: `${height * 0.2}px`, position: 'relative', marginRight: `${height * 0.02}px`, paddingBottom: '1.5rem' }}>
								<img src={event.eventImages[0]} alt={`event ${index + 1}`} style={{ height: '100%', objectFit: 'cover', maxWidth: `${height * 0.2}px`, display: 'block' }} />
								<p>{formatarData(event.date_hour_initial)}</p>
							</div>
						))}
					</div>
					<button className="carousel-button left" onClick={prevSlide} disabled={isAtBeginning}>&#10094;</button>
					<button className="carousel-button right" onClick={nextSlide} disabled={isAtEnd}>&#10095;</button>
				</div>
			) : (

				<div className="carousel" style={{ width: '100%' }}>
					<div className="carousel-content" style={{ transform: `translateX(-${currentIndex * height * 0.22}px)` }}>
						{eventList?.map((event, index) => (
							<div key={index} className="carousel-item" style={{ height: `${height * 0.2}px`, width: `${height * 0.2}px`, position: 'relative', marginRight: `${height * 0.02}px`, paddingBottom: '1.5rem' }}>
								<img src={event.eventImages[0]} alt={`event ${index + 1}`} style={{ height: '100%', objectFit: 'cover', maxWidth: `${height * 0.2}px`, display: 'block' }} />
								<p>{formatarData(event.date_hour_inital)}</p>
							</div>
						))}
					</div>
					<button className="carousel-button left mobile" onClick={prevSlide} disabled={isAtBeginning}>&#10094;</button>
					<button className="carousel-button right mobile" onClick={nextSlide} disabled={isAtEnd}>&#10095;</button>

				</div>
			)}
      <style>
        {`
          /* SquareCarousel.css */

          .carousel {
            position: relative;
            width: 100%;
            overflow: hidden;
            margin: 0 auto;
          }
          
          .carousel-content {
            display: flex;
            transition: transform 0.5s ease-in-out;
          }
          
          .carousel-item {
            /* flex: 0 0 100%; */
            /* width: 250px;
            margin-right: 50px; */
          }
          
          .active {
            opacity: 1;
          }
          
          .carousel-button {
            position: absolute;
            top: calc((100% - 1em)/2);
            transform: translateY(-50%);
            background: transparent;
            border: none;
            font-size: 24px;
            color: white;
            cursor: pointer;
            /* height: calc(100% - 1rem); */
            /* width: 50%; */
            height: 100%;
            display: flex;
            align-items: center;
          }
          
          .left {
            left: 0;
            justify-content: start;
          }
          
          .right {
            right: 0;
            justify-content: end;
          }
          
          .carousel-button:hover {
            background: rgba(0, 0, 0, 0.03);
          }
          
          .event-carousel-button.mobile:hover {
            background-color: transparent;
          }
          
          .carousel-content {
            display: flex;
            width: 100%;
          }
          
        `}
      </style>
    </>
  );
};

export default CarouselHome;