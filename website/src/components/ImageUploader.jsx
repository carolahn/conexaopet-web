import React, { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import { useWindowSize } from '../hooks/useWindowSize';
import trashIcon from '../assets/images/trash.png'

const ImageUploader = ({ label, onChange, initialValues=[] }) => {
  // eslint-disable-next-line
  const [width, height] = useWindowSize();
  const [selectedImages, setSelectedImages] = useState([]);
  const [blobData, setBlobData] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const prevBlobData = useRef(blobData);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const urls = selectedImages.map((image) => {
      return image.blob
        ? URL.createObjectURL(new Blob([image.blob], { type: image.type }))
        : URL.createObjectURL(image);
    });

    setImageUrls(urls);
  }, [selectedImages]);

  useEffect(() => {
    if (!isEqual(blobData, prevBlobData.current)) {
      prevBlobData.current = blobData;
      onChange(blobData);
    }
  }, [blobData, onChange]);

  useEffect(() => {
    if (initialValues && initialValues.length > 0) {
      const loadInitialImages = async () => {
        const newImages = [];

        for (const image of initialValues) {
          if (typeof image === 'string') {
            // Se for uma string, presume-se que é uma URL da imagem
            const blob = await fetch(image).then((response) => response.blob());
            const base64String = await convertBlobToBase64(blob);
            newImages.push({ blob: base64String, type: blob.type });
          } else if (image.blob && image.type) {
            // Se já é um objeto com blob e type, não faz conversão
            newImages.push(image);
          }
        }

        console.log('Loaded initial images:', newImages);

        setSelectedImages(newImages);
        setBlobData(newImages);
      };

      loadInitialImages();
    }
    // eslint-disable-next-line
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageSelection = async (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
    
    const newImages = [];
  
    for (const file of files) {
      const blob = await getBlobFromImageFile(file);
      
      // Convertendo Blob para base64
      const base64String = await convertBlobToBase64(blob);
  
      newImages.push({ blob: base64String, type: file.type });
      console.log('blob: ', base64String);
    }
    setBlobData((prevBlobData) => [...prevBlobData, ...newImages]);
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Base64:', reader.result.split(',')[1]);
        resolve(reader.result.split(',')[1]);
      }
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  const getBlobFromImageFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const blob = new Blob([arrayBuffer], { type: file.type });
        resolve(blob);
      };
  
      reader.readAsArrayBuffer(file);
    });
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
    setBlobData((prevBlobData) => prevBlobData.filter((_, i) => i !== index));
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
        {selectedImages.map((_, index) => (

          <div
            key={index}
            style={width > 900 ? imageContainerStyles : imageContainerMobileStyles}
            onDragOver={() => handleDragOver(index)}
            onDragStart={() => handleDragStart(index)}
            onDragEnd={handleDragEnd}
            draggable
          >
            <img
              src={imageUrls[index]}
              onError={(e) => console.error('Erro ao carregar imagem:', e)}
              alt={`Imagem ${index + 1}`}
              style={width > 900 ? imagePreviewStyles : imagePreviewMobileStyles} 
              onClick={() => console.log(`Clicou na miniatura ${index + 1}`)}
            />
            <button onClick={() => removeImage(index)} style={removeButtonStyles}>
              <img src={trashIcon} alt="Remover" style={trashIconStyles} />
            </button>
          </div>
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










