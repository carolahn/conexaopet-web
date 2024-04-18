import React, { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
import ImageUploader from "./ImageUploader";
import { useDispatch, useSelector } from 'react-redux';
import MultiSelect from "./MultiSelect";
import isEqual from 'lodash/isEqual';
import { petTypeChoices, petGenderChoices, petBreedChoices, personalityChoices, getAlongChoices, petSizeChoices, getPetSize, getBreedId } from '../utils/petData';
import { fetchProtectorUsers, createPet, updatePet } from "../redux/actions";
import { fetchImage } from '../utils/imageUtils';

const NewPetForm = ({ user, initialValues = null, setToastType, setToastMessage, handleOpenToast, handleCloseModal }) => {
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [ageYear, setAgeYear] = useState('');
  const [ageMonth, setAgeMonth] = useState('');
  const [breed, setBreed] = useState('');
  const [owner, setOwner] = useState(user?.id);
  const [personality, setPersonality] = useState([]);
  const [getAlong, setGetAlong] = useState([]);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const protectorChoices = useSelector(state => state.userReducer.protectorUsers);
  const petError = useSelector(state => state.pet.error);
  const petFromStore = useSelector(state => state.pet?.petList.length > 0 ? state.pet?.petList[initialValues?.id] : {});
  const petListByProtectorFromStore = useSelector(state => state.pet?.petListByProtector);

  // Recuperar valores do localStorage ao iniciar, se for criação de novo pet
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'));

    setWeight(initialValues? initialValues.weight : (storedData ? storedData.weight : ''));
    setName(initialValues? initialValues.name : (storedData ? storedData.name : ''));
    setType(initialValues? initialValues.type : (storedData ? storedData.type : ''));
    setGender(initialValues? initialValues.gender : (storedData ? storedData.gender : ''));
    setAgeYear(initialValues? initialValues.age_year : (storedData ? storedData.ageYear : ''));
    setAgeMonth(initialValues? initialValues.age_month : (storedData ? storedData.ageMonth : ''));
    setBreed(initialValues? getBreedId(initialValues.breed) : (storedData ? storedData.breed : ''));
    setPersonality(initialValues? initialValues.personality : (storedData ? storedData.personality : []));
    setGetAlong(initialValues? initialValues.get_along : (storedData ? storedData.getAlong : []));
    setDescription(initialValues? initialValues.description : (storedData ? storedData.description : ''));

    if (initialValues && initialValues.owner) {
      setOwner(initialValues.owner.id);
    }
    
    if (initialValues && initialValues.images) {
      setImages(initialValues.images);
    }
    // let petImages = [];
    // if (initialValues && initialValues.images) {
    //   petImages = initialValues.images.map(image =>  image.image );
    // } else if (storedData && storedData.images) {
    //   petImages = storedData.images;
    // }

    // if (petImages.length > 0) {
    //   const promises = petImages.map((imageUrl) => {
    //     return new Promise((resolve) => {
    //       fetch(imageUrl)
    //         .then((res) => res.blob())
    //         .then((blob) => {
    //           const file = new File([blob], `image${Date.now()}.jpg`, { type: 'image/jpeg' });
    //           resolve(file);
    //         });
    //     });
    //   });
  
    //   Promise.all(promises)
    //     .then((files) => {
    //       setImages(files);
    //     })
    //     .catch((error) => {
    //       console.error('Error loading images:', error);
    //     });
    // }
    // eslint-disable-next-line
  }, []);
  
  // Armazenar valores no localStorage sempre que houver uma alteração
  useEffect(() => {
    if (!initialValues) {
      const formDataObject = {
        weight: weight,
        name: name,
        type: type,
        gender: gender,
        ageYear: ageYear,
        ageMonth: ageMonth,
        breed: breed,
        personality: personality,
        getAlong: getAlong,
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
        localStorage.setItem('formData', JSON.stringify(formDataObject));
      });

    }
    // eslint-disable-next-line
  }, [weight, name, type, gender, ageYear, ageMonth, breed, owner, personality, getAlong, description, images]);


  useEffect(() => {
    dispatch(fetchProtectorUsers());
  }, [dispatch]);

  useEffect(() => {
    setSize(getPetSize(weight));
  }, [weight]);

  const handlePersonalitiesChange = (selectedPersonalities) => {
    // setPersonality(selectedPersonalities);
    if (selectedPersonalities !== null && !isEqual(personality, selectedPersonalities)) {
      setPersonality(selectedPersonalities);
    }
  };

  const handleConvivioChange = (selectedConvivio) => {
    if (selectedConvivio !== null && !isEqual(selectedConvivio, getAlong)) {
      setGetAlong(selectedConvivio);
    }
  };

  const handleImagesChange = (selectedImages) => {
    setImages(selectedImages);
  };

  useEffect(() => {
    if (petFromStore && !isEqual(initialValues, petFromStore)) {
      petFromStore?.images?.forEach(image => {
        fetchImage(image.image, (cachedImage) => {
          setImages(prevImages => [...prevImages, cachedImage]);
        });
      });

    }
    
    // eslint-disable-next-line
  }, [petFromStore, petListByProtectorFromStore]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('gender', gender);
    formData.append('age_year', ageYear);
    formData.append('age_month', ageMonth);
    formData.append('weight', weight);
    formData.append('breed', breed);
    formData.append('owner', owner);
    formData.append('description', description);

    personality?.forEach((value, index) => {
      formData.append('personality[]', value);
    });

    getAlong?.forEach((value, index) => {
      formData.append('get_along[]', value);
    });

    images?.forEach((value, index) => {
      formData.append('image[]', value);
    });
   
    try {
      if (initialValues) {
        dispatch(updatePet(initialValues.id, formData));
        if (!petError) {
          setToastMessage('Pet atualizado');
          setToastType('success');
          setTimeout(() => {
            handleCloseModal();
          }, 2000);
          handleOpenToast();
        } else {
          setToastMessage(`Erro: ${petError}`);
          setToastType('failure');
          handleOpenToast();
        }

      } else {
        dispatch(createPet(user.id, formData));
        if (!petError) {
          // Limpa localStorage após o envio do formulário
          localStorage.removeItem('formData');
  
          setToastMessage('Publicação criada');
          setToastType('success');
          setTimeout(() => {
            handleCloseModal();
          }, 2000);
          handleOpenToast();
  
        } else {
          setToastMessage(`Erro: ${petError}`);
          setToastType('failure');
          handleOpenToast();
        }
      }
      
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className='new-pet-form'>
      <ImageUploader label='Selecione as imagens' onChange={(selectedImages) => handleImagesChange(selectedImages)} initialValues={initialValues?.images.map(image =>  image.image )} dataRecovered={images} />
      
      <form onSubmit={handleSubmit}>

        <div className="row mb-1">
          <label htmlFor="petName" className="col-sm-2 col-form-label">Nome</label>
          <div className="col-sm">
            <div className="input-group">
              <input type="text" className="form-control" id="petName" value={name} onChange={(e) => setName(DOMPurify.sanitize(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="petType" className="col-sm-2 col-form-label">Tipo</label>
          <div className="col-sm-10">
            <select className="form-select" placeholder="Selecione" id="petType" name="petType" aria-label="Selecione o tipo de animal" value={type} onChange={(e) => setType(e.target.value)}>
              <option value=""></option>
              {petTypeChoices.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="petGender" className="col-sm-2 col-form-label">Sexo</label>
          <div className="col-sm-10">
            <select className="form-select" id="petGender" name="petGender" aria-label="Selecione o sexo do animal" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value=""></option>
              {petGenderChoices.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="petGender" className="col-sm-2 col-form-label">Idade</label>
          <div className="col-sm">
            <div className="input-group pet-idade">
              <input type="text" className="form-control" id="petYear" placeholder="anos" value={ageYear} onChange={(e) => setAgeYear(DOMPurify.sanitize(e.target.value))}/>
          
              <input type="text" className="form-control" id="petMonth" placeholder="meses" value={ageMonth} onChange={(e) => setAgeMonth(DOMPurify.sanitize(e.target.value))}/>
            </div>
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="petWeight" className="col-sm-2 col-form-label">Porte</label>
          <div className="col-sm">
            <div className="input-group pet-porte">
              <input type="text" className="form-control" id="petWeight" placeholder="kg" value={weight} onChange={(e) => setWeight(DOMPurify.sanitize(e.target.value))}/>

      
              <select className="form-select" id="petSize" name="petSize" aria-label="Selecione o porte do animal" value={size} onChange={(e) => setSize(DOMPurify.sanitize(e.target.value))} disabled>
                <option key='' value=''>porte</option>
                {petSizeChoices.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="petBreed" className="col-sm-2 col-form-label">Raça</label>
          <div className="col-sm-10">
            <select className="form-select" id="petBreed" name="petBreed" aria-label="Selecione a raça do animal" value={breed} onChange={(e) => setBreed(e.target.value)}>
              <option value=""></option>
              {petBreedChoices.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="petProtector" className="col-sm-2 col-form-label">Protetor</label>
          <div className="col-sm-10">
            <select className="form-select" id="petProtector" name="petProtector" aria-label="Selecione o protetor" value={owner} onChange={(e) => setOwner(e.target.value)} disabled >
              <option value=""></option>
              {protectorChoices.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.username}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-1">
          <MultiSelect options={personalityChoices} 
            placeholder={'Personalidade'} attribute={'value'} 
            onChange={handlePersonalitiesChange} 
            initialValues={initialValues?.personality ? initialValues.personality : (JSON.parse(localStorage.getItem('formData'))?.personality ? JSON.parse(localStorage.getItem('formData'))?.personality : [])}/>
        </div>

        <div className="row mb-1">
          <MultiSelect options={getAlongChoices} 
            placeholder={'Convívio'} attribute={'value'} 
            onChange={handleConvivioChange}
            initialValues={initialValues?.get_along ? initialValues.get_along : (JSON.parse(localStorage.getItem('formData'))?.getAlong ? JSON.parse(localStorage.getItem('formData'))?.getAlong : [])}/>
        </div>

        <div className="row mb-1">
          <div className="col-sm">
            <div className="input-group">
              <textarea type="text" className="form-control" id="petDescription" placeholder="Descrição" rows="3" style={{ resize: "none" }} value={description} onChange={(e) => setDescription(DOMPurify.sanitize(e.target.value))}/>
            </div>
          </div>
        </div>

        <button type="submit" className="btn w-100 btn-publish">Publicar</button>
      </form>

      <style>
        {`
          .new-pet-form {
            width: 100%;
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
          
          .form-control-custom {
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          
          .form-select {
            width: 100%;
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
          }
          
          .row .col-form-label {
            width: 24%;
            align-self: center;
          }
          
          .col-sm-10, .col-sm {
            width: calc(100% - 1.5em);
          }
          
          input[type="text"] {
            /* Adicione estilos desejados aqui */
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
          
          .mb-1 {
            margin-bottom: .2rem;
          }
          
          #petYear, #petMonth, #petWeight {
            width: 100%;
          }
          
          #petYear, #petWeight {
            margin-right: 1rem;
          }
          
          #petSize {
            width: calc(100% + 1.3em);
          }
          
          .pet-idade, .pet-porte {
            display: flex;
            justify-content: space-between;
          }
        `}
      </style>
    </div>
  );
};

export default NewPetForm;