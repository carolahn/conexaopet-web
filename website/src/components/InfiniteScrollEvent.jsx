import React, { useEffect } from 'react';

const InfiniteScrollEvent = ({ children, itemList, loadCount, loadMoreItems, isLoading }) => {

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (!isLoading && scrollY + windowHeight >= documentHeight - 200) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, itemList]);

  return (
    <div>
      {children({ itemList: itemList })}
    </div>
  );
};

export default InfiniteScrollEvent;
