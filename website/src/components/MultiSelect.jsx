import React, { useState, useRef, useEffect } from 'react';
import isEqual from 'lodash/isEqual';

const MultiSelect = ({ options, placeholder, attribute, onChange, initialValues=[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isEqual(initialValues, selectedOptions) && selectedOptions.length > 0) {
      onChange(selectedOptions);
    }
  }, [selectedOptions, onChange]);

  useEffect(() => {
    if (initialValues && initialValues.length > 0 && !isEqual(initialValues, selectedOptions) ) {
      setSelectedOptions(initialValues);
    }
  }, []);

  const handleOptionChange = (id) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(id)) {
        return prevSelectedOptions.filter((optionId) => optionId !== id);
      } else {
        return [...prevSelectedOptions, id];
      }
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target.tagName !== 'INPUT'
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  return (
    <div style={containerStyles}>
      <input
      
        type="text"
        placeholder={selectedOptions.length > 0 ? '' : placeholder}
        value={selectedOptions
          .map((id) => options.find((item) => item.id === id)?.[attribute])
          .filter(Boolean)
          .join(', ')}
        onChange={handleInputChange}
        onClick={toggleDropdown}
        style={inputStyles}
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: '#ffffff',
            border: '1px solid #ccc',
            width: '100%',
            maxHeight: '120px',
            overflowY: 'auto',
            marginTop: '5px',
            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
          }}
        >
          {options.map((option, index) => (
            //////////
            <div
              key={`multiselect-${option.id}-${index}`}
              style={optionContainerStyles}
              onClick={() => handleOptionChange(option.id)} // Manipula o clique na div
            >
              <input
                type="checkbox"
                id={`${option.id}-${index}`}
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
                style={checkboxStyles}
                onClick={(e) => e.stopPropagation()} // Impede a propagação do clique para a div pai
              />
              <label htmlFor={option.id} style={labelStyles}>
                {option[attribute]}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyles = {
  position: 'relative',
  display: 'inline-block',
  width: '100%',
};

const inputStyles = {
  padding: '10px 12px',
};

const optionContainerStyles = {
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  color: '#000000',
  fontSize: '1rem',
  cursor: 'pointer',
};

const checkboxStyles = {
  marginRight: '5px',
  cursor: 'pointer',
};

const labelStyles = {
  margin: '0',
  color: '#000000',
  cursor: 'pointer',
};

export default MultiSelect;
