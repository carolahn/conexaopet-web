import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import DateTimePicker from './DateTimePicker';
import { formatarData } from '../utils/formatarData';

const NewCupomForm = () => {
  const [images, setImages] = useState([]);
  const [valor, setValor] = useState('');
  const [dateHour, setDateHour] = useState({});

  const handleImagesChange = (selectedImages) => {
    setImages(selectedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      images: images,
      valor: valor,
      validade: formatarData(dateHour),
    };

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
  };

  return (
    <div className='new-cupom-form'>
      <ImageUploader label='Selecione a imagem' onChange={handleImagesChange}/>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="cupomValue" className="col col-form-label">Cupom</label>
          <div className="col">
            <input type="text" id="cupomValue" value={valor} onChange={(e) => setValor(e.target.value)} />
          </div>
        </div>

        <div className='row event-date'>
          <DateTimePicker setDateHour={setDateHour} showHour={false} dataLabel='Validade'/>
        </div>

        <button type="submit" className="btn w-100 btn-publish">Publicar</button>          

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
        `}
      </style>
    </div>
  );
};

export default NewCupomForm;