import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../components/Header";
import InfiniteScroll from "../components/InfiniteScroll";
import EventCardList from '../components/EventCardList';
import { searchEvents } from '../redux/actions';
import noResultsIcon from '../assets/images/no-results.png';
import FloatingButton from '../components/FloatingButton';

const SearchEventsResults = ({ user = {}, token = '' }) => {
  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.searchEvents.searchResults);
  const nextPage = useSelector((state) => state.searchEvents.nextPage);
  const petIsLoading = useSelector((state) => state.searchEvents.isLoading);
  const searchParams = useSelector((state) => state.searchEvents.searchParams);

  const loadMoreEvents = () => {
    if (nextPage) {
      dispatch(searchEvents(searchParams));
    }
  };

  
  return (
    <>
      <div className="search-results">
        <div className="search-body">
          <Header user={user} token={token} showLogo={false} title='Resultados da busca'/>
          {eventList && eventList.length > 0 ? (
            <>
              <InfiniteScroll itemList={eventList || []} loadMore={loadMoreEvents} isLoading={petIsLoading} >
                <EventCardList eventList={eventList || []}/>
              </InfiniteScroll>
            </>
          ) : (
            <div className="noresults-container">
              <img src={noResultsIcon} alt='Nenhum resultado foi encontrado'className="noresults-img"/>
            </div>
          )}
        </div>
      </div>

      <FloatingButton />

      <style>
        {`
          .search-results {
            width: 100%;
            margin-top: 70px;
          }

          .search-body {
            max-width: 900px;
            margin: 0 auto;
            height: 100vh;
          }

          .noresults-container {
            width: 100%;
            max-width: 900px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .noresults-img {
            object-fit: cover;
            max-width: inherit;
            width: 60%;
          }

          @media (max-width: 900px) {
            .search-results {
              margin-top: 50px;
            }
          }
        `}
      </style>
    </>
  );
};

export default SearchEventsResults;