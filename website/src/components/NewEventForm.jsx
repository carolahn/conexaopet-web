import React, { useState, useEffect} from 'react';
import { mockPetData, mockAddressData, mockProtectorData } from './mockFormData';
import ImageUploader from './ImageUploader';
import MultiSelect from './MultiSelect';
import DateTimePicker from './DateTimePicker';
import AddressForm from './AddressForm';

const NewEventForm = ({initialValues}) => {
  const [images, setImages] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [dateHour, setDateHour] = useState({});
  const [address, setAddress] = useState({});
  const [protector, setProtector] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialValues) {
      setImages(initialValues.images || []);
      setAnimals(initialValues.animals || []);
      setDateHour(initialValues.dateHour || {});
      setAddress(initialValues.address || {});
      setProtector(initialValues.protector || '');
      setDescription(initialValues.description || '');
    }
  }, [initialValues]);

  // Recuperar valores do localStorage ao iniciar
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('eventFormData'));

    if (storedData) {
      setImages(storedData.images || []);
      setAnimals(storedData.animals || []);
      setDateHour(storedData.dateHour || {});
      setAddress(storedData.address || {});
      setProtector(storedData.protector || '');
      setDescription(storedData.description || '');
    }
  }, []);

  // Armazenar valores no localStorage sempre que houver uma alteração
  useEffect(() => {
    const formData = {
      images: images,
      animals: animals,
      dateHour: dateHour,
      address: address,
      protector: protector,
      description: description,
    };

    localStorage.setItem('eventFormData', JSON.stringify(formData));
  }, [images, animals, dateHour, address, protector, description]);

  const handleImagesChange = (selectedImages) => {
    setImages(selectedImages);
  }

  const handleAnimalsChange = (selectedAnimals) => {
    setAnimals(selectedAnimals);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpando localStorage após o envio do formulário
    localStorage.removeItem('eventFormData');

    const formData = {
      images: images,
      animals: animals,
      dateHour: dateHour,
      address: address,
      protector: protector,
      description: description,
    };

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
  };

  return (
    <div className='new-event-form'>
      <ImageUploader label='Selecione as imagens' onChange={handleImagesChange}/>
      
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <MultiSelect options={mockPetData} placeholder={'Animais'} attribute={'nome'} onChange={handleAnimalsChange}/>
        </div>

        <div className='row event-date'>
          <DateTimePicker setDateHour={setDateHour} />
        </div>

        <div className='row event-place'>
          <AddressForm addressList={mockAddressData} setAddress={setAddress}/>
        </div>

        <div className="row new-event-protector">
          <label htmlFor="eventProtector" className="col-sm-2 col-form-label">Protetor</label>
          <div className="col" style={{ display: 'contents' }}>
            <select className="form-select" id="eventProtector" name="eventProtector" aria-label="Selecione o protetor" value={protector} onChange={(e) => setProtector(e.target.value)}>
              <option value=""></option>
              {mockProtectorData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nickname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <textarea type="text" id="eventDescription" placeholder="Descrição" aria-label="Insira a descrição" rows="3" style={{ resize: "none" }} value={description} onChange={(e) => setDescription(e.target.value)}/>
          </div>
        </div>

        <button type="submit" className="btn w-100 btn-publish">Publicar</button>          
      </form>

      <style>
        {`
          .new-event-form {
            width: 100%;
            max-width: 490px;
            padding-top: 15px;
            margin: 0 auto;
            font-family: 'Helvetica Neue', Arial, sans-serif;
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
            transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
          }
          
          .btn-publish:hover {
            background-color: var(--color-contrast-2) !important;
          }
          
          .placeholder-option {
            color: #6c757d;
          }
          
          .new-event-protector .form-select {
            width: 76%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            height: 38px;
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
            width: calc(100% - 1.5em);
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
            width: 100%;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            font-size: 1rem;
            line-height: 1.5;
            padding: 0.375rem 0.75rem;
          }

          @media (max-width: 900px) {
            .new-event-form {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default NewEventForm;