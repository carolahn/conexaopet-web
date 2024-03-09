import React, { useState, useEffect } from 'react';

const AddressForm = ({ addressList, setAddress }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [addressData, setAddressData] = useState({
    nome: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
  });

  useEffect(() => {
    setAddress(addressData);
  }, [addressData]);

  const handleNameChange = (e) => {
    const { value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      nome: value,
    }));

    setShowSuggestions(value.length >= 3); // Mostrar sugestões apenas quando o tamanho do nome for >= 3
  };

  const handleSuggestionSelect = (selectedAddress) => {
    setAddressData(selectedAddress);
    setShowSuggestions(false);
  };

  const suggestions = addressList.filter((address) =>
    address.nome.toLowerCase().includes(addressData.nome.toLowerCase())
  );

  return (
    <div style={{ position: 'relative', width: '100%' }}>
        <span style={nameContainerStyles}>
            <input
                type='text'
                placeholder='Local'
                value={addressData.nome}
                onChange={handleNameChange}
            />

            {showSuggestions && (
                <div style={suggestionContainerStyles}>
                {suggestions.map((suggestion, index) => (
                    <div
                    key={index}
                    style={suggestionItemStyles}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    >
                    {suggestion.nome}
                    </div>
                ))}
                </div>
            )}
        </span>
      <div className='street-container'>
        <div className='street'>
          <input
            className='input-street'
            type='text'
            placeholder='Rua'
            value={addressData.rua}
            onChange={(e) => setAddressData((prevData) => ({ ...prevData, rua: e.target.value }))}
          />
        </div>
        <div className='number'>
          <input
            className='input-number'
            type='text'
            placeholder='n°'
            value={addressData.numero}
            onChange={(e) => setAddressData((prevData) => ({ ...prevData, numero: e.target.value }))}
          />
        </div>
      </div>

      <div className='city-container'>
        <div className='district'>
          <input
            className='input-district'
            type='text'
            placeholder='Bairro'
            value={addressData.bairro}
            onChange={(e) =>
              setAddressData((prevData) => ({ ...prevData, bairro: e.target.value }))
            }
          />
        </div>
        <div className='city'>
          <input
            className='input-city'
            type='text'
            placeholder='Cidade'
            value={addressData.cidade}
            onChange={(e) => setAddressData((prevData) => ({ ...prevData, cidade: e.target.value }))}
          />
        </div>
        <div className='uf'>
          <input
            className='input-uf'
            type='text'
            placeholder='UF'
            value={addressData.uf}
            onChange={(e) => setAddressData((prevData) => ({ ...prevData, uf: e.target.value }))}
          />
        </div>
      </div>

      <style>
        {`
          .street-container, .city-container {
            display: flex;
            margin-bottom: .2rem;
          }

          .street, .number, .district, .city, .uf {
            display: contents;
          }

          .street input[type="text"].input-street {
            width: 78%;
            margin-right: .2rem;
          }

          .number input[type="text"].input-number {
            width: 20%;
          }

          .district input[type="text"].input-district {
            width: 35%;
            margin-right: .2rem;
          }

          .city input[type="text"].input-city {
            width: 35%;
            margin-right: .2rem;
          }

          .uf input[type="text"].input-uf {
            width: 20%;
          }

        `}
      </style>
    </div>
  );
};

const nameContainerStyles = {
  display: 'block',
  width: '100%',
  position: 'relative',
  marginBottom: '0.2rem',
}

const suggestionContainerStyles = {
  position: 'absolute',
  left: '0',
  zIndex: '1',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  maxHeight: '120px',
  overflowY: 'auto',
  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
  width: '100%',
};

const suggestionItemStyles = {
  padding: '8px',
  cursor: 'pointer',
  color: '#000000',
  fontSize: '.8rem',
  display: 'flex',
  justifyContent: 'start',
};

export default AddressForm;
