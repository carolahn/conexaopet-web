import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploader from './ImageUploader';
import DateTimePicker from './DateTimePicker';
import { createCupom, updateCupom } from '../redux/actions/cupomActions';


const NewCupomForm = ({ user, initialValues = null , handleCloseModal, setToastType, setToastMessage, handleOpenToast }) => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [expiration, setExpiration] = useState('');
  const dispatch = useDispatch();
  const cupomError = useSelector(state => state.cupom.error);

  useEffect(() => {
    if (initialValues) {
      setImages(initialValues.image || []);
      setValue(initialValues.value || '');
      setDescription(initialValues.description || '');
      setExpiration(initialValues.expiration || '');
    }
  }, [initialValues]);

  const handleImagesChange = (selectedImages) => {
    setImages(selectedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length < 0 || !images[0]) {
      setToastMessage(`Erro: selecione uma imagem`);
      setToastType('failure');
      handleOpenToast();
      return;
    };

    const formData = {
      image: images[0],
      value: value,
      expiration: expiration,
      description: description
    };

    try {
      if (initialValues) {
        dispatch(updateCupom(initialValues.id, formData));
        if (!cupomError) {
          setToastMessage('Cupom alterado');
          setToastType('success');
          setTimeout(() => {
            handleCloseModal();
          }, 2000);
          handleOpenToast();
        } else {
          setToastMessage(`Erro: ${cupomError}`);
          setToastType('failure');
          handleOpenToast();
        }

      } else {
        dispatch(createCupom(formData));
        if (!cupomError) {
          setToastMessage('Cupom criado');
          setToastType('success');
          setTimeout(() => {
            handleCloseModal();
          }, 2000);
          handleOpenToast();
        } else {
          setToastMessage(`Erro: ${cupomError}`);
          setToastType('failure');
          handleOpenToast();
        }
      }
      

    } catch (error) {
      console.error('Error:', error);
      setToastMessage(`Erro: ${error.message}`);
      setToastType('failure');
      handleOpenToast();
    }
  };

  return (
    <div className='new-cupom-form'>
      <ImageUploader label='Selecione a imagem' onChange={handleImagesChange} initialValues={[initialValues?.image]} required/>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="cupomValue" className="col col-form-label">Cupom</label>
          <div className="col">
            <input type="text" id="cupomValue" value={value} onChange={(e) => setValue(DOMPurify.sanitize(e.target.value))} required />
          </div>
        </div>

        <div className='row event-date'>
          <DateTimePicker dateHour={expiration} setDateHour={setExpiration} showHour={false} dataLabel='Validade' required/>
        </div>

        <div className="row">
          <label htmlFor="cupomDescription" className="col col-form-label">Descrição</label>
          <div className="col">
            <textarea type="text" id="cupomDescription" rows="3" style={{ resize: "none" }} value={description} onChange={(e) => setDescription(DOMPurify.sanitize(e.target.value))} required />
          </div>
          
          
        </div>

        <button type="submit" className="btn w-100 btn-publish">{initialValues ? 'Salvar' : 'Publicar'}</button>          

      </form>

      <style>
        {`
          .new-cupom-form {
            width: 100%;
            padding-top: 15px;
            margin: 0 auto;
            font-family: 'Helvetica Neue', Arial, sans-serif;
          }

          .row {
            display: flex;
            width: 100%;
            margin-bottom: .2rem;
          }
          
          .row .col-form-label {
            width: 24%;
            align-self: center;
          }

          .col {
            width: 76%;
          }

          input[type="text"] {
            border: 1px solid #ced4da;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            width: calc(100% - 1.6em);
          }

          textarea {
            width: calc(100% - 1.6em);
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            font-size: 1rem;
            line-height: 1.5;
            padding: 0.375rem 0.75rem;
          }

          .btn-publish {
            width: 100%;
            background-color: var(--color-contrast) !important;
            border: 1px solid var(--color-contrast-2) !important;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            cursor: pointer;
            margin-top: 10px;
            transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
          }
          
          .btn-publish:hover {
            background-color: var(--color-contrast-2) !important;
          }

          .btn-publish:active {
            transform: translateY(2px);
          }
        `}
      </style>
    </div>
  );
};

export default NewCupomForm;