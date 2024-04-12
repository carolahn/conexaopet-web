import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploader from './ImageUploader';
import MultiSelect from './MultiSelect';
import DateTimePicker from './DateTimePicker';
import AddressForm from './AddressForm';
import isEqual from 'lodash/isEqual';
import { fetchProtectorUsers, getAddressList, createAddress, createEvent, updateEvent, getPetChoices } from "../redux/actions";
import { fetchImage } from '../utils/imageUtils';

const NewEventForm = ({ user, initialValues = null, setToastType, setToastMessage, handleOpenToast, handleCloseModal }) => {
  const [images, setImages] = useState([]);
  const [pets, setPets] = useState([]);
  const [dateHour, setDateHour] = useState({});
  const [address, setAddress] = useState({});
  const [owner, setOwner] = useState(user?.id);
  const [protector, setProtector] = useState('');
  const [description, setDescription] = useState('');
  // const [petChoices, setPetChoices] = useState([]);
  const dispatch = useDispatch();
  const protectorChoices = useSelector(state => state.userReducer.protectorUsers);
  const addressChoices = useSelector(state => state.address.addressList);
  const eventError = useSelector(state => state.event.error);
  const eventFromStore = useSelector(state => state.event?.eventList.length > 0 ? state.event?.eventList[initialValues?.id] : {});
  const eventListByProtectorFromStore = useSelector(state => state.event?.eventListByProtector);
  const petListByProtector = useSelector((state) => state.pet.petListByProtector[user?.id]);
  const petChoices = useSelector(state => state.pet.petChoices);


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('eventFormData'));
   
    setPets(initialValues ? initialValues.pets : (storedData ? storedData.pets : []));
    setDateHour(initialValues ? initialValues.date_hour : (storedData ? storedData.dateHour : ''));
    setAddress(initialValues ? initialValues.address : (storedData ? storedData.address : {}));
    setDescription(initialValues ? initialValues.description : (storedData ? storedData.description : ''));

    if (initialValues && initialValues.owner) {
      setOwner(initialValues.owner.id);
    }

    if (initialValues && initialValues.images) {
      setImages(initialValues.images);
    }
    // eslint-disable-next-line
  }, []);

  // Armazenar valores no localStorage sempre que houver uma alteração
  useEffect(() => {
    if (!initialValues) {
      const formDataObject = {
        pets: pets,
        dateHour: dateHour,
        address: address,
        owner: owner,
        description: description,
        images: [],
      };

      const promises = [];
      for (const image of images) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        promises.push(
          new Promise((resolve) => {
            reader.onload = () => {
              formDataObject.images.push(reader.result);
              resolve();
            };
          })
        );
      }
    
      Promise.all(promises).then(() => {
        localStorage.setItem('eventFormData', JSON.stringify(formDataObject));
      });
    }
    // eslint-disable-next-line
  }, [images, pets, dateHour, address, owner, description]);

  useEffect(() => {
    dispatch(fetchProtectorUsers());
    dispatch(getAddressList());
  }, [dispatch]);

  const handleImagesChange = (selectedImages) => {
    setImages(selectedImages);
  }

  const handleAnimalsChange = (selectedAnimals) => {
    if (selectedAnimals !== null && !isEqual(pets, selectedAnimals)) {
      setPets(selectedAnimals);
    }
  };

  useEffect(() => {
    if (eventFromStore && !isEqual(initialValues, eventFromStore)) {
      eventFromStore?.images?.forEach(image => {
        fetchImage(image.image, (cachedImage) => {
          setImages(prevImages => [...prevImages, cachedImage]);
        });
      });

    }
    // eslint-disable-next-line
  }, [eventFromStore, eventListByProtectorFromStore]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address?.id) {
      dispatch(createAddress(address))
        .then((createdAddress) => { 
          
          setAddress(createdAddress); 
    
          const formData = new FormData();
          formData.append('date_hour_initial', dateHour.date_hour_initial);
          formData.append('date_hour_end', dateHour.date_hour_end);
          formData.append('address', createdAddress.id); 
          formData.append('owner', owner);
          formData.append('description', description);
      
          pets.forEach((value) => {
            formData.append('pet[]', value);
          });
      
          images.forEach((value) => {
            formData.append('image[]', value);
          });
          
          try {
            if (initialValues) {
              dispatch(updateEvent(initialValues.id, formData));
              if (!eventError) {
                localStorage.removeItem('eventFormData');
                setToastMessage('Evento atualizado');
                setToastType('success');
                setTimeout(() => {
                  handleCloseModal();
                }, 2000);
                handleOpenToast();
                // Limpando localStorage após o envio do formulário
                localStorage.removeItem('eventFormData');
              } else {
                setToastMessage(`Erro: ${eventError}`);
                setToastType('failure');
                handleOpenToast();
              }

            } else {
              dispatch(createEvent(owner, formData));
              if (!eventError) {
                localStorage.removeItem('eventFormData');
                setToastMessage('Evento criado');
                setToastType('success');
                setTimeout(() => {
                  handleCloseModal();
                }, 2000);
                handleOpenToast();
              } else {
                setToastMessage(`Erro: ${eventError}`);
                setToastType('failure');
                handleOpenToast();
              }
            }

          } catch(error) {
            console.error('Error creating event:', error);
          }
        });
        
    } else {
      const formData = new FormData();
      formData.append('date_hour_initial', dateHour.date_hour_initial);
      formData.append('date_hour_end', dateHour.date_hour_end);
      formData.append('address', address.id); // Use the address ID
      formData.append('owner', owner);
      formData.append('description', description);
  
      pets.forEach((value) => {
        formData.append('pet[]', value);
      });
  
      images.forEach((value) => {
        formData.append('image[]', value);
      });
      
      try {
        if (initialValues) {
          dispatch(updateEvent(initialValues.id, formData));
          if (!eventError) {
            localStorage.removeItem('eventFormData');
            setToastMessage('Evento atualizado');
            setToastType('success');
            setTimeout(() => {
              handleCloseModal();
            }, 2000);
            handleOpenToast();
          } else {
            setToastMessage(`Erro: ${eventError}`);
            setToastType('failure');
            handleOpenToast();
          }

        } else {
          dispatch(createEvent(owner, formData));
          if (!eventError) {
            // Limpando localStorage após o envio do formulário
            localStorage.removeItem('eventFormData');
            setToastMessage('Evento criado');
            setToastType('success');
            setTimeout(() => {
              handleCloseModal();
            }, 2000);
            handleOpenToast();
          } else {
            setToastMessage(`Erro: ${eventError}`);
            setToastType('failure');
            handleOpenToast();
          }
        }

      } catch(error) {
        console.error('Error creating event:', error);
      }
    }

  

  };

  return (
    <div className='new-event-form'>
      <ImageUploader label='Selecione as imagens' onChange={(selectedImages) => handleImagesChange(selectedImages)} initialValues={initialValues?.images.map(image =>  image.image )} dataRecovered={images}/>
      
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <MultiSelect options={petChoices || []} 
          placeholder={'Animais'} attribute={'name'} 
          onChange={handleAnimalsChange}
          initialValues={initialValues?.pets ? initialValues.pets.map(pet => pet.id) : (JSON.parse(localStorage.getItem('eventFormData'))?.pets ? JSON.parse(localStorage.getItem('eventFormData'))?.pets : [])} />
        </div>
        
        <div className="row new-event-protector">
          <label htmlFor="eventProtector" className="col-sm-2 col-form-label">Protetor</label>
          <div className="col" style={{ display: 'contents' }}>
            <select className="form-select" id="eventProtector" name="eventProtector" aria-label="Selecione o protetor" value={owner} onChange={(e) => setProtector(e.target.value)} disabled>
              <option value=""></option>
              {protectorChoices.map((item) => (
                <option key={`${item.username}-${item.id}`} value={item.id}>
                  {item.username}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='row event-date'>
          <DateTimePicker setDateHour={setDateHour} initialValues={initialValues ? { date_hour_initial: initialValues.date_hour_initial, date_hour_end: initialValues.date_hour_end } : (JSON.parse(localStorage.getItem('eventFormData')) ? JSON.parse(localStorage.getItem('eventFormData')).dateHour : null)} />
        </div>

        <div className='row event-place'>
          <AddressForm addressList={addressChoices} setAddress={setAddress} initialValues={initialValues?.address || {}}/>
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

          .btn-publish:active {
            transform: translateY(2px);
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
            padding: 0.375rem 0.7rem;
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