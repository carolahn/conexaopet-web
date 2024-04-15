import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import webIcon from '../assets/images/web.png';
import editIcon from '../assets/images/edit.png';
import trashIcon from '../assets/images/trash.png';
import copyIcon from '../assets/images/copy.png';
import { formatarData } from '../utils/formatarData';
import { getUser } from '../utils/selectors';
import { deleteCupom } from '../redux/actions/cupomActions';
import NewCupomModal from './NewCupomModal';
import Toast from '../components/Toast';
import DiscartModal from './DiscartModal';

// Objeto para armazenar cache de imagens
export const imageCache = {};

const CupomCard = ({ cupom }) => {
  const [ownerImage, setOwnerImage] = useState(null);
  const [cupomImage, setCupomImage] = useState(null);
  const [isNewCupomModalOpen, setIsNewCupomModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Alterações salvas');
  const [toastType, setToastType] = useState('success');
  const [isDiscartModalOpen, setIsDiscartModalOpen] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleOpenWebsite = () => {
    window.open(cupom.owner.site, "_blank");
  };

  const openNewCupomModal = () => {
    setIsNewCupomModalOpen(!isNewCupomModalOpen);
  };

  const closeNewCupomModal = () => {
    setIsNewCupomModalOpen(false);
  };

  const handleOpenToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    const fetchImage = async (imageURL, setImage) => {
      try {
        // Verifica se a imagem já está em cache
        if (imageCache[imageURL]) {
          setImage(imageCache[imageURL]);
          return;
        }

        const apiUrl = process.env.REACT_APP_API_URL.replace('api', '');
        const pathAfterMedia = imageURL.substring(imageURL.indexOf('media/'));
        const url = apiUrl + pathAfterMedia;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image from ${url}`);
        }
        const blob = await response.blob();
        const file = new File([blob], imageURL.substring(imageURL.lastIndexOf('/') + 1));
        
        // Salva a imagem no cache
        imageCache[imageURL] = URL.createObjectURL(file);
        setImage(imageCache[imageURL]);
      } catch (error) {
        console.error(`Error fetching image from ${imageURL}:`, error);
      }
    };

    fetchImage(cupom.owner.image, setOwnerImage);
    fetchImage(cupom.image, setCupomImage);
  }, [cupom.owner.image, cupom.image]);

  useEffect(() => {
    if (isDeleteConfirmed) {
      handleDeleteCupom();
    }
  }, [isDeleteConfirmed]);

  const openDiscartModal = () => {
    setIsDiscartModalOpen(!isDiscartModalOpen);
  };

  const closeDiscartModal = () => {
    setIsDiscartModalOpen(false);
  };

  const handleDeleteCupom = () => {
    try {
      dispatch(deleteCupom(cupom.owner.id, cupom.id));
      setToastMessage('Cupom removido');
      setToastType('success');
      handleOpenToast();
      setIsDeleteConfirmed(false); 
    } catch (error) {
      setToastMessage(`Erro: ${error.message}}`);
      setToastType('failure');
      handleOpenToast();
    }
  };

  const confirmDelete = () => {
    setIsDeleteConfirmed(true); 
    setIsDiscartModalOpen(false); 
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cupom.value);
    setIsCopied(true);

    // Resetar o estado de 'copiado' após 3 segundos
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const handleGetOwner = (id) => {
    navigate(`/sponsor/${id}`);
  };

  return (
    <div className='cupom-card' id={cupom.id}>
      <div className='cupom-card-header'>
        <div className='cupom-card-username'>
          <div className='cupom-avatar'>
            <img src={ownerImage} alt={`Avatar de ${cupom.owner.username}`} />
          </div>
          <h2 className='cupom-header-owner' onClick={() => handleGetOwner(cupom.owner?.id)}>{cupom.owner.username}</h2>
        </div>
        <div className='cupom-card-edit-buttons'>
          {cupom.owner.id === user?.id && (
            <>
              <div className='edit-icon-container' onClick={openNewCupomModal}>
                <img src={editIcon} alt='Editar cupom' className='edit-icon' />
              </div>
              <div className='trash-icon-container' onClick={openDiscartModal}>
                <img src={trashIcon} alt='Excluir cupom' className='trash-icon' />
              </div>
            </>
          )}
        </div>
      </div>

      <div className='cupom-card-images-container'>
        <img src={cupomImage} alt={`Cupom`} className='cupom-image'/>
      </div>

      <div className='cupom-card-bar'>
        <div className='cupom-card-summary'>
          <input className='cupom-value' type="text" value={cupom.value.toUpperCase()} readOnly style={{ height: '1.2rem'}} />
          <div className='copy-icon-container' onClick={copyToClipboard} style={{ marginLeft: '7px'}}>
            <img src={copyIcon} alt='Copiar o cupom' className='copy-icon' style={{ height: '24px', cursor: 'pointer' }} />
            <span>{isCopied && ' Copiado '}</span>
          </div>
          
        </div>
        <div className='cupom-card-buttons'>
          <div className='web-icon-container' onClick={handleOpenWebsite}>
            <img src={webIcon} alt='Saiba mais' className='web-icon' />
          </div>
        </div>
      </div>

      <div className='cupom-card-expiration'>
        <div>Validade: {formatarData(cupom.expiration)}</div>
      </div>

      <div className='cupom-card-description'>
        { cupom.description }
      </div>

      <NewCupomModal user={user} isModalOpen={isNewCupomModalOpen} closeModal={closeNewCupomModal} initialValues={cupom} setToastType={setToastType} setToastMessage={setToastMessage} handleOpenToast={handleOpenToast} style={{ zIndex: '3'}}/>

      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={handleCloseToast} />
      )}

      <DiscartModal isModalOpen={isDiscartModalOpen} closeModal={closeDiscartModal} handleConfirm={confirmDelete} />

      <style>
        {`
          .cupom-card{
            width: 500px;
            display: flex;
            flex-direction: column;
            border: 1px solid #ddd;
            margin-bottom: 20px;
            padding: 15px;
          }

          .cupom-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 0 7px 3px;
          }

          .cupom-header-owner {
            cursor: pointer;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .cupom-header-owner:hover {
            color: #666; 
          }
            
          .cupom-avatar {
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 15px;
          }
            
          .cupom-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .cupom-card-username {
            display: flex;
            align-items: center;
          }

          .cupom-value {
            width: 70%;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 15px;
            border: none;
            font-weight: bold;
            text-align: center !important;
            background-color: var(--color-primary);
            color: var(--color-text-clear);
            text-transform: capitalize;
            font-size: 1rem;
          }

          .cupom-card-edit-buttons {
            display: flex;
          }

          .cupom-card-images-container {
            position: relative;
            width: 100%;
            overflow: hidden;
          }

          .cupom-image {
            width: 100%;
            object-fit: cover;
          }

          .cupom-card-bar {
            display: flex;
          }
          
          .cupom-card-summary {
            width: 80%;
            display: flex;
            align-items: center;
          }

          .copy-icon-container {
            display: flex;
            align-items: center;
          }
          
          .cupom-card-buttons {
            width: 20%;
            display: flex;
            justify-content: end;
          }
          
          .star-icon, .more-icon, .web-icon, .edit-icon, .trash-icon {
            cursor: pointer;
            height: 24px;
          }

          .web-icon {
            height: 30px;
          }
          
          .cupom-card-expiration {
            padding: 10px 5px;
          }

          .cupom-card-description {
            padding-left: 5px;
            font-size: 1.3rem;
          }

          @media (max-width: 900px) {
            .cupom-card {
              width: calc(100% - 32px);
            }
          }
          
        `}
      </style>
      
    </div>
  );
};

export default CupomCard;

      