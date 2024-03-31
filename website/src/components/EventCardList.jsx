import React from 'react';
import EventCard from './EventCard';

const EventCardList = ({ eventList }) => {
 
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