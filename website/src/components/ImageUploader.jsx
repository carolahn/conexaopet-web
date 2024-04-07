import React, { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { useWindowSize } from '../hooks/useWindowSize';
import trashIcon from '../assets/images/trash.png'

const ImageUploader = ({ label, onChange, initialValues=[], dataRecovered=[] }) => {
  // eslint-disable-next-line
  const [width, height] = useWindowSize();
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const prevSelectedImages = useRef(selectedImages);
  

  useEffect(() => {
    if (!isEqual(selectedImages, prevSelectedImages.current)) {
      prevSelectedImages.current = selectedImages;
      onChange(selectedImages);
    }
  }, [selectedImages, onChange]);

  useEffect(() => {
    if (initialValues && initialValues.length > 0 && initialValues[0]) {
      const loadInitialImages = async () => {
        try {
          const files = await Promise.all(
            initialValues.map(async (path) => {
              // if (path == undefined) return '';
              
              const apiUrl = process.env.REACT_APP_API_URL.replace('api', '');
              const pathAfterMedia = path?.substring(path.indexOf('media/'));
              const url = apiUrl + pathAfterMedia;
              
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error(`Failed to fetch image from ${url}`);
              }
              const blob = await response.blob();
              const file = new File([blob], path.substring(path.lastIndexOf('/') + 1));
              return file;
            })
          );
          setSelectedImages(files);
        } catch (error) {
          console.error('Error loading initial images:', error);
        }
      };
      loadInitialImages();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('initialValues: ', initialValues)
    console.log('dataRecovered: ', dataRecovered)
    if (initialValues.length === 0 && dataRecovered && dataRecovered.length > 0 && !isEqual(selectedImages, dataRecovered)) {
      setSelectedImages(dataRecovered);
      console.log("datarecovered")
    }
    // eslint-disable-next-line
  }, [dataRecovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageSelection = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    for (const file of files) {
      if (file !== '') {
        newImages.push(file);
      }
    }

    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newOrder = [...selectedImages];
    const draggedImage = newOrder[draggedIndex];

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, draggedImage);

    setSelectedImages(newOrder);
    setDraggedIndex(index);
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const buttonStyle = {
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    color: '#fff',
    backgroundColor:  isHovered ? 'var(--color-primary)' : 'var(--color-secondary)',
    border: '1px solid var(--color-secondary)',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'block',
    transition: 'background-color 0.3s ease',
    width: '100%',
  };
  

  return (
    <div style={containerStyles}>
      
      <button style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> 
        <label htmlFor="fileInput" style={fileInputLabelStyles}>
          {label}
        </label>
      </button>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageSelection}
        id="fileInput"
        style={fileInputStyles}
      />
      <div
        style={dropzoneStyles}
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={handleDragEnd}
      >
        {selectedImages.map((file, index) => (
          file && (
            <div
              key={index}
              style={width > 900 ? imageContainerStyles : imageContainerMobileStyles}
              onDragOver={() => handleDragOver(index)}
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              draggable
            >
              <img
                src={file ? URL.createObjectURL(file) : ''}
                onError={(e) => console.error('Erro ao carregar imagem:', e)}
                alt={`Imagem ${index + 1}`}
                style={width > 900 ? imagePreviewStyles : imagePreviewMobileStyles} 
                onClick={() => console.log(`Clicou na miniatura ${index + 1}`)}
              />
              <button onClick={() => removeImage(index)} style={removeButtonStyles}>
                <img src={trashIcon} alt="Remover" style={trashIconStyles} />
              </button>
            </div>

          )
        ))}
      </div>
    </div>
  );
};

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const fileInputLabelStyles = {
  display: 'block',
  cursor: 'pointer',
  width: '100%',
};

const fileInputStyles = {
  display: 'none',
};

const dropzoneStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '10px',
  width: '100%',
};

const imageContainerStyles = {
  position: 'relative',
  marginRight: '10px',
  marginBottom: '10px',
  maxWidth: '100px',
  maxHeight: '100px',
};

const imagePreviewStyles = {
  width: '100px',
  height: '100px',
  display: 'block',
  objectFit: 'cover',
};

const imageContainerMobileStyles = {
  position: 'relative',
  marginRight: '10px',
  marginBottom: '10px',
  maxWidth: '70px',
  maxHeight: '70px',
};

const imagePreviewMobileStyles = {
  width: '70px',
  height: '70px',
  display: 'block',
  objectFit: 'cover',
};

const removeButtonStyles = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  border: 'none',
  padding: '4px',
  cursor: 'pointer',
};

const trashIconStyles = {
  width: '16px',
  height: '16px',
};

export default ImageUploader;
