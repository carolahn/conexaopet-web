import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DateTimePicker from "./DateTimePicker";
import { fetchProtectorUsers, searchEvents } from "../redux/actions";
import Toast from '../components/Toast';


const SearchEventForm = ({ closeModal }) => {
  const [date, setDate] = useState('');
  const [pets, setPets] = useState('');
  const [protector, setProtector] = useState('');
  const [city, setCity] = useState('');
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const protectorChoices = useSelector(state => state.userReducer.protectorUsers);
  const searchEventsError = useSelector(state => state.searchEvents.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProtectorUsers());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      date: date,
      pets: pets,
      owner: protector,
      city: city,
    };

    // const jsonData = JSON.stringify(formData);
    // console.log(jsonData);

    const searchParams = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== null && value !== '' && value !== undefined)
    );

    try {
      const action = await dispatch(searchEvents(searchParams))
      const searchResults = action.payload;
      
      if (!searchEventsError) {
        if (searchResults.length === 0) {
          handleOpenToast();
        } else {
          navigate('/search/event');
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
      <div className='search-event-form'>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <DateTimePicker setDateHour={setDate} showHour={false} dataLabel='Data' isRequired={false} />
          </div>

          <div className="row">
            <label htmlFor="petCity" className="col-sm-2 col-form-label">Cidade</label>
            <div className="col" style={{ width: '76%'}}>
              <input type="text" className="form-control" id="petCity" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <label htmlFor="petNames" className="col-sm-2 col-form-label">Animais</label>
            <div className="col" style={{ width: '76%'}}>
              <input type="text" className="form-control" id="petNames" value={pets} onChange={(e) => setPets(e.target.value)} />
            </div>
          </div>

          <div className="row new-event-protector">
            <label htmlFor="petProtector" className="col-sm-2 col-form-label">Protetor</label>
            <div className="col col-select">
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

          <button type="submit" className="btn w-100 btn-publish">Buscar</button>          
        </form>
      </div>

      {showToast && (
        <Toast message='Nenhum evento foi encontrado' type='info' onClose={handleCloseToast} />
      )}

      <style>
        {`
          .search-event-form {
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
          
          .col-select {
            width: 76%;
          }

          .row .col-form-label {
            width: 24%;
            align-self: center;
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

          .input-container {
            display: flex;
            width: 100%;
            margin-bottom: .2rem;
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
        `}
      </style>
    </>
  );
};

export default SearchEventForm;