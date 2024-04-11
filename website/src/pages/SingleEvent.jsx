import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import mockEventCardData from '../components/mockEventCardData';
import { useParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { fetchSingleEvent } from '../redux/actions';


const SingleEvent = ({ user = {}, token = "" }) => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchSingleEvent(id));
        if (result) {
          setEvent(result);
        }
      } catch (error) {
        console.error('Error getting event data:', error);
      }
    };

    fetchData();
  }, []);

  
  // useEffect(() => {
  //   const selectedEvent = mockEventCardData.find((event) => event.id === parseInt(id));
  //   console.log(selectedEvent);
  //   if (selectedEvent) {
  //     setEvent(selectedEvent);
  //   } else {
  //     setEvent(null);
  //   }
  //   // eslint-disable-next-line
  // }, [id]);

  return (
    <div className='single-event-page' data-testid="single-event-page">
      <Header user={user} token={token} showLogo={false} title='Informações do evento'/>
      <div className='single-event-body'>
        {event && <EventCard event={event} />}
				
			</div>

      <style>
        {`
          .single-event-page {
            width: 100%;
            max-width: 490px;
            margin: 70px auto 0 auto;
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
              margin-top: 50px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SingleEvent;