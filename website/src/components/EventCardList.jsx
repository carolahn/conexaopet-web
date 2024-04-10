import React, { useEffect } from 'react';
import EventCard from './EventCard';

const EventCardList = ({ eventList, targetId = '', setTargetId = null }) => {
  
  useEffect(() => {
    if (targetId) {
      setTimeout(() => {
        const eventCard = document.getElementById(`event-${targetId}`);
        if (eventCard) {
          eventCard.scrollIntoView({ behavior: 'smooth' });
        }
        setTargetId('');
        console.log("eventCard: ", eventCard)
      }, 1200); 
    
    }
    // eslint-disable-next-line
  }, [eventList, targetId]);
 
  return (
    <div className='event-card-list'>
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