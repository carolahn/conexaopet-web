import React, { useState, useEffect } from 'react';

const InfiniteScroll = ({ children, loadMore, isLoading }) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 20 && !isFetching && !isLoading) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (isFetching) {
      loadMore();
      setIsFetching(false);
    }
  }, [isFetching, loadMore]);

  return <>{children}</>;
};

export default InfiniteScroll;
