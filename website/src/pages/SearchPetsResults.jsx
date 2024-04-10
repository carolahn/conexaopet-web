import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../components/Header";
import InfiniteScroll from "../components/InfiniteScroll";
import PetCardList from "../components/PetCardList";
import { searchPets } from '../redux/actions';
import noResultsIcon from '../assets/images/no-results.png';

const SearchPetsResults = ({ user = {}, token = '', pets = []}) => {
  const dispatch = useDispatch();
  const petList = useSelector((state) => state.searchPets.searchResults);
  const nextPage = useSelector((state) => state.searchPets.nextPage);
  const petIsLoading = useSelector((state) => state.searchPets.isLoading);
  const searchParams = useSelector((state) => state.searchPets.searchParams);

  const loadMorePets = () => {
    if (nextPage) {
      console.log("dispatch searchpets")
      dispatch(searchPets(searchParams));
    }
  };

  
  return (
    <div className="search-results">
      <div className="search-body">
        <Header user={user} token={token} showLogo={false} title='Resultados da busca'/>
        {petList && petList.length > 0 ? (
          <>
            <InfiniteScroll itemList={petList || []} loadMore={loadMorePets} isLoading={petIsLoading} >
              <PetCardList petList={petList || []}/>
            </InfiniteScroll>
          </>
        ) : (
          <div className="noresults-container">
            <img src={noResultsIcon} alt='Nenhum resultado foi encontrado'className="noresults-img"/>
          </div>
        )}
      </div>

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
    </div>
  );
};

export default SearchPetsResults;