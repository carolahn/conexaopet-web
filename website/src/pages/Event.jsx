import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import mockEventCardData from '../components/mockEventCardData';
import Header from '../components/Header';
import InfiniteScrollEvent from '../components/InfiniteScrollEvent';
import EventCardList from '../components/EventCardList';

const Event = () => {
	const [eventList, setEventList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const events = mockEventCardData;
	const loadCount = 6;

  useEffect(() => {
    // Carrega alguns itens iniciais ao montar o componente
    loadMoreItems();
  }, []);

	const loadMoreItems = () => {
    if (!isLoading) {
      setIsLoading(true);

      // Simulação de uma requisição assíncrona (pode ser substituído por uma chamada de API real)
      setTimeout(() => {
        setEventList((prevItems) => {
          const nextItems = events.slice(prevItems.length, prevItems.length + loadCount);
          return [...prevItems, ...nextItems];
        });
      
        setIsLoading(false);
      }, 1000); // Aguarda 1 segundo para simular o carregamento assíncrono
    }
  };

  return (
    <div className='event-container'>
			<div className='event-body'>
				<Header/>
				<Carousel events={eventList} loadCount={loadCount} loadMoreItems={loadMoreItems} isLoading={isLoading} />
				<InfiniteScrollEvent itemList={eventList} loadCount={loadCount} loadMoreItems={loadMoreItems} isLoading={isLoading} >
					{({ itemList, isLoading }) => (
						<EventCardList eventList={itemList} />
					)}
				</InfiniteScrollEvent>

			</div>

      <style>
        {`
          .event-container {
            width: 100%;
            margin-top: 70px;
          }
          
          .event-body {
            max-width: 900px;
            margin: 0 auto;
            height: 100vh;
          }
          
          @media (max-width: 900px) {
            .event-container {
              margin-top: 50px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Event;