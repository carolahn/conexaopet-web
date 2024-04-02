import React, { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { useDispatch, useSelector } from 'react-redux';
import { mockTypeData, mockGenderData, mockSizeData, mockBreedData, mockProtectorData, mockPersonalityData, mockGetAlong } from './mockFormData';
import MultiSelect from "./MultiSelect";
import { petTypeChoices, petGenderChoices, petBreedChoices, personalityChoices, getAlongChoices, petSizeChoices, getPetSize } from '../utils/petData';
import { fetchProtectorUsers, createPet } from "../redux/actions";

const NewPetForm = ({ user, initialValues = null, setToastType, setToastMessage, handleOpenToast, handleCloseModal }) => {
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
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


  // useEffect(() => {
  //   if (initialValues) {
  //     setImages(initialValues.imagens || []);
  //     setWeight(initialValues.peso || '');
  //     setName(initialValues.nome || '');
  //     setType(initialValues.tipo || '');
  //     setGender(initialValues.sexo || '');
  //     setYear(initialValues.idade.ano || '');
  //     setMonth(initialValues.idade.mes || '');
  //     setBreed(initialValues.raca || '');
  //     setProtector(initialValues.protetor || '');
  //     setPersonalities(initialValues.personalidade || []);
  //     setConvivio(initialValues.convivio || []);
  //     setDescription(initialValues.descricao || '');
  //   }
  // }, [initialValues]);

  // Recuperar valores do localStorage ao iniciar
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'));

    if (storedData) {
      setWeight(storedData.weight || '');
      setName(storedData.name || '');
      setType(storedData.type || '');
      setGender(storedData.gender || '');
      setAgeYear(storedData.ageYear || '');
      setAgeMonth(storedData.ageMonth || '');
      setBreed(storedData.breed || '');
      setPersonality(storedData.personality || []);
      setGetAlong(storedData.getAlong || []);
      setDescription(storedData.description || '');
    }

    if (storedData && storedData.images) {
      const promises = storedData.images.map((imageUrl) => {
        return new Promise((resolve) => {
          fetch(imageUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], `image${Date.now()}.jpg`, { type: 'image/jpeg' });
              resolve(file);
            });
        });
      });
  
      Promise.all(promises)
        .then((files) => {
          setImages(files);
        })
        .catch((error) => {
          console.error('Error loading images:', error);
        });
    }
  }, []);

  // Armazenar valores no localStorage sempre que houver uma alteração
  useEffect(() => {
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
  }, [weight, name, type, gender, ageYear, ageMonth, breed, owner, personality, getAlong, description, images]);

  // useEffect(() => {
  //   const calculateSizeFromWeight = () => {
  //     const weightValue = parseFloat(weight);

  //     if (weightValue <= 5) {
  //       setSelectedSize('1'); // Size 1: Miniatura
  //     } else if (weightValue <= 10) {
  //       setSelectedSize('2'); // Size 2: Pequeno
  //     } else if (weightValue <= 25) {
  //       setSelectedSize('3'); // Size 3: Médio
  //     } else if (weight > 25) {
  //       setSelectedSize('4'); // Size 4: Grande
  //     } else {
  //       setSelectedSize('');
  //     }
  //   };

  //   calculateSizeFromWeight();
  // }, [weight]);

  useEffect(() => {
    dispatch(fetchProtectorUsers());
  }, [dispatch])

  useEffect(() => {
    setSize(getPetSize(weight));
  }, [weight]);

  const handlePersonalitiesChange = (selectedPersonalities) => {
    setPersonality(selectedPersonalities);
  };

  const handleConvivioChange = (selectedConvivio) => {
    setGetAlong(selectedConvivio);
  };

  const handleImagesChange = (selectedImages) => {
    setImages(selectedImages);
  }

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

    personality.forEach((value, index) => {
      formData.append('personality[]', value);
    });

    getAlong.forEach((value, index) => {
      formData.append('get_along[]', value);
    });

    images.forEach((value, index) => {
      formData.append('image[]', value);
    });
   
    try {
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
    } catch (error) {
      console.error('Error: ', error);
    }
  };


  return (
    <div className='new-pet-form'>
      <ImageUploader label='Selecione as imagens' onChange={(selectedImages) => handleImagesChange(selectedImages)} initialValues={initialValues?.images} dataRecovered={images} />
      
      <form onSubmit={handleSubmit}>

        <div className="row mb-1">
          <label htmlFor="petName" className="col-sm-2 col-form-label">Nome</label>
          <div className="col-sm">
            <div className="input-group">
              <input type="text" className="form-control" id="petName" value={name} onChange={(e) => setName(e.target.value)} />
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
              <input type="text" className="form-control" id="petYear" placeholder="anos" value={ageYear} onChange={(e) => setAgeYear(e.target.value)}/>
          
              <input type="text" className="form-control" id="petMonth" placeholder="meses" value={ageMonth} onChange={(e) => setAgeMonth(e.target.value)}/>
            </div>
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="petWeight" className="col-sm-2 col-form-label">Porte</label>
          <div className="col-sm">
            <div className="input-group pet-porte">
              <input type="text" className="form-control" id="petWeight" placeholder="kg" value={weight} onChange={(e) => setWeight(e.target.value)}/>

      
              <select className="form-select" id="petSize" name="petSize" aria-label="Selecione o porte do animal" value={size} onChange={(e) => setSize(e.target.value)} disabled>
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
            initialValues={initialValues?.personality ? initialValues.personality : (personality ? personality : [])}/>
        </div>

        <div className="row mb-1">
          <MultiSelect options={getAlongChoices} 
            placeholder={'Convívio'} attribute={'value'} 
            onChange={handleConvivioChange}
            initialValues={initialValues?.getAlong ? initialValues.getAlong : (getAlong ? getAlong : [])}/>
        </div>

        <div className="row mb-1">
          <div className="col-sm">
            <div className="input-group">
              <textarea type="text" className="form-control" id="petDescription" placeholder="Descrição" rows="3" style={{ resize: "none" }} value={description} onChange={(e) => setDescription(e.target.value)}/>
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