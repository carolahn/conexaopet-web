import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Carousel from '../components/Carousel';
import mockEventCardData from '../components/mockEventCardData';
import Header from '../components/Header';
import InfiniteScrollEvent from '../components/InfiniteScrollEvent';
import EventCardList from '../components/EventCardList';
import { fetchEventList } from '../redux/actions';

const Event = ({ user = {}, token = '' }) => {
	// const [eventList, setEventList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
  const [targetEventId, setTargetEventId] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
	const events = mockEventCardData;
	const loadCount = 6;
  const eventList = useSelector((state) => state.event.eventList);
  const eventNextPage = useSelector((state) => state.event.nextPage);
  const eventIsLoading = useSelector((state) => state.event.isLoading);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const eventId = queryParams.get('eventId');
    console.log("eventId: ", eventId)

    if (eventId) {
      setTargetEventId(eventId);
    }
  }, [location.search]);

  const loadMoreEvents = () => {
    if (eventNextPage) {
      const pageNumber = eventNextPage.split('page=')[1];
      dispatch(fetchEventList(pageNumber));
    }
  };

  return (
    <div className='event-container'>
			<div className='event-body'>
				<Header user={user} token={token} showLogo={false} title='Eventos'/>
				<Carousel events={eventList || []} loadMoreItems={loadMoreEvents} isLoading={eventIsLoading} />
				<InfiniteScrollEvent itemList={eventList || []} loadMore={loadMoreEvents} isLoading={eventIsLoading} >
          <EventCardList eventList={eventList || []} targetId={targetEventId} setTargetId={setTargetEventId} />
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