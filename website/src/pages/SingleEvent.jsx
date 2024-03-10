import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import mockEventCardData from '../components/mockEventCardData';
import { useParams } from 'react-router-dom';
import EventCard from '../components/EventCard';


const SingleEvent = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const selectedEvent = mockEventCardData.find((event) => event.id === parseInt(id));
    console.log(selectedEvent);
    if (selectedEvent) {
      setEvent(selectedEvent);
    } else {
      setEvent(null);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className='single-event-page' data-testid="single-event-page">
      <Header/>
      <div className='single-event-body'>
        {event && <EventCard {...event} />}
				
			</div>

      <style>
        {`
          .single-event-page {
            width: 100%;
            max-width: 490px;
            margin: 50px auto 0 auto;
          }

          .single-event-body {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          @media (max-width: 900px) {
            .single-event-page {
              display: block;
              width: 100%;
              margin-top: 40px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SingleEvent;