import React, { useState, useEffect } from 'react';

const InfiniteScroll = ({ children, itemList }) => {
  const [items, setItems] = useState([]);
  const [loadCount, setLoadCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreItems = () => {
    if (!isLoading) {
      setIsLoading(true);

      // Simulação de uma requisição assíncrona (pode ser substituído por uma chamada de API real)
      setTimeout(() => {
        setItems((prevItems) => {
          const nextItems = itemList.slice(prevItems.length, prevItems.length + loadCount);
          return [...prevItems, ...nextItems];
        });
        setIsLoading(false);
      }, 1000); // Aguarda 1 segundo para simular o carregamento assíncrono
    }
  };

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
  }, [isLoading, items]);

  useEffect(() => {
    // Atualiza os items quando a propriedade itemList é alterada
    setItems(itemList.slice(0, loadCount));
  }, [itemList, loadCount]);

  useEffect(() => {
    // Carrega alguns itens iniciais ao montar o componente
    loadMoreItems();
  }, []);

  return (
    <div>
      {children({ itemList: items })}
    </div>
  );
};

export default InfiniteScroll;