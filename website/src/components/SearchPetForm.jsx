import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MultiSelect from "./MultiSelect";
import { fetchProtectorUsers, searchPets } from "../redux/actions";
import { getAlongChoices, personalityChoices, petBreedChoices, petGenderChoices, petSizeChoices } from "../utils/petData";
import { lifeStageChoices } from "../utils/petData";
import { petTypeChoices } from "../utils/petData";
import Toast from '../components/Toast';

const SearchPetForm = ({ closeModal = null }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [breed, setBreed] = useState('');
  const [protector, setProtector] = useState('');
  const [personality, setPersonality] = useState([]);
  const [getAlong, setGetAlong] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const protectorChoices = useSelector(state => state.userReducer.protectorUsers);
  const searchPetsError = useSelector(state => state.searchPets.error);

  useEffect(() => {
    dispatch(fetchProtectorUsers());
  }, [dispatch]);

  const handlePersonalityChange = (selectedPersonality) => {
    setPersonality(selectedPersonality);
  };

  const handleGetAlongChange = (selectedGetAlong) => {
    setGetAlong(selectedGetAlong);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      type: type,
      gender: gender,
      age: age,
      size: size,
      breed: breed,
      owner: protector,
      personality: personality,
      get_along: getAlong,
      city: city,
    };

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);

    const searchParams = Object.entries(formData)
    .filter(([key, value]) => value !== null && value !== '' && value !== undefined)
    .reduce((acc, [key, value]) => {
      
      let paramName = key;
      let paramValue = value;
      if (key === 'personality') {
        if (value.length > 0) {
          paramName = 'personality';
          paramValue = value.join(',');
        } else {
          return acc; // Excluir o campo personality
        }
      } else if (key === 'get_along') {
        if (value.length > 0) {
          paramName = 'get_along';
          paramValue = value.join(',');
        } else {
          return acc; // Excluir o campo get_along
        }
      }
      return { ...acc, [paramName]: paramValue };
    }, {});
   
    try {
      const action = await dispatch(searchPets(searchParams))
      const searchResults = action.payload;

      if (!searchPetsError) {
        if (searchResults.length === 0) {
          handleOpenToast();
        } else {
          navigate('/search/pet');
          closeModal();
        }
      }

    } catch (error) {
      console.error('Error searching pets:', error);
    }
  };

  const handleOpenToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };


  return (
    <>
      <div className='search-pet-form'>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="petType" className="col col-form-label">Tipo</label>
            <div className="col">
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

          <div className="row">
            <label htmlFor="petName" className="col col-form-label">Nome</label>
            <div className="col">
              <input type="text" className="form-control" id="petName" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <label htmlFor="petCity" className="col col-form-label">Cidade</label>
            <div className="col">
              <input type="text" className="form-control" id="petCity" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <label htmlFor="petGender" className="col col-form-label">Sexo</label>
            <div className="col">
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

          <div className="row">
            <label htmlFor="petAge" className="col col-form-label">Idade</label>
            <div className="col">
              <select className="form-select" id="petAge" name="petAge" aria-label="Selecione a idade do animal" value={age} onChange={(e) => setAge(e.target.value)}>
                <option value=""></option>
                {lifeStageChoices.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <label htmlFor="petSize" className="col col-form-label">Porte</label>
            <div className="col">
            <select className="form-select" id="petSize" name="petSize" aria-label="Selecione o porte do animal" value={size} onChange={(e) => setSize(e.target.value)}>
                <option value=""></option>
                {petSizeChoices.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <label htmlFor="petBreed" className="col col-form-label">Raça</label>
            <div className="col">
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

          <div className="row">
            <label htmlFor="petProtector" className="col col-form-label">Protetor</label>
            <div className="col">
              <select className="form-select" id="petProtector" name="petProtector" aria-label="Selecione o protetor" value={protector} onChange={(e) => setProtector(e.target.value)}>
                <option value=""></option>
                {protectorChoices.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.username}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <MultiSelect options={personalityChoices} 
              placeholder={'Personalidade'} attribute={'value'} 
              onChange={handlePersonalityChange} 
              initialValues={null}/>
          </div>

          <div className="row">
            <MultiSelect options={getAlongChoices} 
              placeholder={'Convívio'} attribute={'value'} 
              onChange={handleGetAlongChange}
              initialValues={null}/>
          </div>

          <button type="submit" className="btn w-100 btn-publish">Buscar</button>
        </form>
      </div>

      {showToast && (
        <Toast message='Nenhum animal foi encontrado' type='info' onClose={handleCloseToast} />
      )}

      <style>
        {`
          .search-pet-form {
            width: 100%;
            max-width: 490px;
            padding-top: 15px;
            margin: 0 auto;
            font-family: 'Helvetica Neue', Arial, sans-serif;
          }

          .row {
            display: flex;
            width: 100%;
            margin-bottom: .2rem;
          }

          .col {
            width: calc(100% - 1.5em);
          }
          
          .row .col-form-label {
            width: 24%;
            align-self: center;
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

          #petSize {
            width: 100%;
          }
    
        `}
      </style>
    </>
  );
};

export default SearchPetForm;