import React, { useState, useEffect, useRef } from 'react';


const AddressForm = ({ addressList, setAddress, initialValues }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [addressData, setAddressData] = useState({
    name: '',
    street: '',
    number: '',
    district: '',
    city: '',
    uf: '',
  });
  const suggestionsRef = useRef(null);


  useEffect(() => {
    // Fechar o dropdown
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('eventFormData'));
  
    // Verificar se os campos do endereço já estão preenchidos
    const isAddressFilled = Object.keys(addressData).some(key => addressData[key] !== '');
  
    if (!isAddressFilled) {
      if (initialValues && Object.keys(initialValues).length !== 0) {
        // Preencher os campos com os valores de initialValues.address
        setAddressData(initialValues);
      } else if (storedData && Object.keys(storedData.address).length !== 0) {
        // Preencher os campos com os valores do localStorage
        setAddressData(storedData.address);
      }
    }
  }, [initialValues, addressData]);

  useEffect(() => {
    setAddress(addressData);
    // eslint-disable-next-line
  }, [addressData]);

  useEffect(() => {
    if (addressData && Object.keys(addressData).length !== 0 && addressData?.id && addressList.length > 0) {
      // Se for um novo name, deve remover o address.id
      if (addressData?.id && !addressList.some(address => address.name.toLowerCase() === addressData.name.toLowerCase())) {
        const { id, ...newAddressData } = addressData; 
        setAddressData(newAddressData);
      }
  
      // Se name já existir, mas não for selecionado da lista
      if (addressList.find((address) => address.name.toLowerCase() === addressData.name.toLowerCase())) {
        setAddressData(addressList.find((address) => address.name.toLowerCase() === addressData.name.toLowerCase()));
      }

    }
    // eslint-disable-next-line
  }, [addressData]);

  const handleNameChange = (e) => {
    const { value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      name: value,
    }));

    setShowSuggestions(value.length >= 3); // Mostrar sugestões apenas quando o tamanho do nome for >= 3
  };

  const handleSuggestionSelect = (selectedAddress) => {
    setAddressData(selectedAddress);
    setShowSuggestions(false);
  };

  const suggestions = (showSuggestions && addressList) ? addressList.filter((address) =>
    address?.name.toLowerCase().includes(addressData?.name.toLowerCase())
  ) : [];


  return (
    <div style={{ position: 'relative', width: '100%' }}>
        <span style={nameContainerStyles}>
            <input
                type='text'
                placeholder='Local'
                value={addressData?.name}
                onChange={handleNameChange}
            />

            {showSuggestions && (
                <div ref={suggestionsRef} style={suggestionContainerStyles}>
                {suggestions.map((suggestion, index) => (
                    <div
                    key={index}
                    style={suggestionItemStyles}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    >
                    {suggestion.name}
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
            value={addressData?.street}
            onChange={(e) => setAddressData((prevData) => ({ ...prevData, street: e.target.value }))}
            disabled={addressData?.id}
          />
        </div>
        <div className='number'>
          <input
            className='input-number'
            type='text'
            placeholder='n°'
            value={addressData?.number}
            onChange={(e) => setAddressData((prevData) => ({ ...prevData, number: e.target.value }))}
            disabled={addressData?.id}
          />
        </div>
      </div>

      <div className='city-container'>
        <div className='district'>
          <input
            className='input-district'
            type='text'
            placeholder='Bairro'
            value={addressData?.district}
            onChange={(e) => setAddressData((prevData) => ({ ...prevData, district: e.target.value }))}
            disabled={addressData?.id}
          />
        </div>
        <div className='city'>
          <input
            className='input-city'
            type='text'
            placeholder='Cidade'
            value={addressData?.city}
            onChange={(e) => setAddressData((prevData) => ({ ...prevData, city: e.target.value }))}
            disabled={addressData?.id}
          />
        </div>
        <div className='uf'>
          <input
            className='input-uf'
            type='text'
            placeholder='UF'
            value={addressData?.uf}
            onChange={(e) => setAddressData((prevData) => ({ ...prevData, uf: e.target.value }))}
            disabled={addressData?.id}
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
