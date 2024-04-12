import React, { useEffect } from 'react';
import EventCard from './EventCard';

const EventCardList = ({ eventList, targetId = '', setTargetId = null }) => {

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20;
  
    const scrollIfElementExists = () => {
      const eventCard = document.getElementById(`event-${targetId}`);
      if (eventCard) {
        eventCard.scrollIntoView({ behavior: 'smooth' });
        setTargetId('');
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(scrollIfElementExists, 500);
        } else {
          console.log(`Elemento com ID "event-${targetId}" não encontrado após ${maxAttempts} tentativas.`);
          setTargetId('');
        }
      }
    };
  
    if (targetId) {
      setTimeout(scrollIfElementExists, 1000); 
    }
  }, [eventList, targetId]);
 
  return (
    <div className='event-card-list' key={`event-list-${targetId}`}>
      {eventList.map((event, index) => (
        <EventCard key={index} event={event} id={`event-${event.id}`} />
      ))}

      <style>
        {`
          .event-card-list {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px auto;
          }
        `}
      </style>
    </div>
  );
};

export default EventCardList;