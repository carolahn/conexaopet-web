import React, { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { mockTypeData, mockGenderData, mockSizeData, mockBreedData, mockProtectorData, mockPersonalityData, mockGetAlong } from './mockFormData';
import MultiSelect from "./MultiSelect";

const NewPetForm = ({ initialValues = null }) => {
  const [weight, setWeight] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [breed, setBreed] = useState('');
  const [protector, setProtector] = useState('');
  const [personalities, setPersonalities] = useState([]);
  const [convivio, setConvivio] = useState([]);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);


  useEffect(() => {
    if (initialValues) {
      setImages(initialValues.imagens || []);
      setWeight(initialValues.peso || '');
      setName(initialValues.nome || '');
      setType(initialValues.tipo || '');
      setGender(initialValues.sexo || '');
      setYear(initialValues.idade.ano || '');
      setMonth(initialValues.idade.mes || '');
      setBreed(initialValues.raca || '');
      setProtector(initialValues.protetor || '');
      setPersonalities(initialValues.personalidade || []);
      setConvivio(initialValues.convivio || []);
      setDescription(initialValues.descricao || '');
    }
  }, [initialValues]);

  // Recuperar valores do localStorage ao iniciar
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'));

    if (storedData) {
      setWeight(storedData.peso || '');
      setSelectedSize(storedData.porte || '');
      setName(storedData.nome || '');
      setType(storedData.tipo || '');
      setGender(storedData.genero || '');
      setYear(storedData.idadeAnos || '');
      setMonth(storedData.idadeMeses || '');
      setBreed(storedData.raca || '');
      setProtector(storedData.protetor || '');
      setPersonalities(storedData.personalidades || []);
      setConvivio(storedData.convivio || '');
      setDescription(storedData.descricao || '');
    }
  }, []);

  // Armazenar valores no localStorage sempre que houver uma alteração
  useEffect(() => {
    const formData = {
      peso: weight,
      porte: selectedSize,
      nome: name,
      tipo: type,
      genero: gender,
      idadeAnos: year,
      idadeMeses: month,
      raca: breed,
      protetor: protector,
      personalidades: personalities,
      convivio: convivio,
      descricao: description,
      imagens: images,
    };

    localStorage.setItem('formData', JSON.stringify(formData));
  }, [weight, selectedSize, name, type, gender, year, month, breed, protector, personalities, convivio, description, images]);

  useEffect(() => {
    const calculateSizeFromWeight = () => {
      const weightValue = parseFloat(weight);

      if (weightValue <= 5) {
        setSelectedSize('1'); // Size 1: Miniatura
      } else if (weightValue <= 10) {
        setSelectedSize('2'); // Size 2: Pequeno
      } else if (weightValue <= 25) {
        setSelectedSize('3'); // Size 3: Médio
      } else if (weight > 25) {
        setSelectedSize('4'); // Size 4: Grande
      } else {
        setSelectedSize('');
      }
    };

    calculateSizeFromWeight();
  }, [weight]);

  const handlePersonalitiesChange = (selectedPersonalities) => {
    setPersonalities(selectedPersonalities);
  };

  const handleConvivioChange = (selectedConvivio) => {
    setConvivio(selectedConvivio);
  };

  const handleImagesChange = (selectedImages) => {
    setImages(selectedImages);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpando localStorage após o envio do formulário
    localStorage.removeItem('formData');

    const formData = {
      nome: name,
      tipo: type,
      genero: gender,
      idadeAnos: year,
      idadeMeses: month,
      peso: weight,
      porte: selectedSize,
      raca: breed,
      protetor: protector,
      personalidades: personalities,
      convivio: convivio,
      descricao: description,
      imagens: images,
    };

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
  };


  return (
    <div className='new-pet-form'>
      <ImageUploader label='Selecione as imagens' onChange={(selectedImages) => handleImagesChange(selectedImages)} initialValues={initialValues?.imagens}/>
      
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
              {mockTypeData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.tipo}
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
              {mockGenderData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.gender}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="petGender" className="col-sm-2 col-form-label">Idade</label>
          <div className="col-sm">
            <div className="input-group pet-idade">
              <input type="text" className="form-control" id="petYear" placeholder="anos" value={year} onChange={(e) => setYear(e.target.value)}/>
          
              <input type="text" className="form-control" id="petMonth" placeholder="meses" value={month} onChange={(e) => setMonth(e.target.value)}/>
            </div>
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="petWeight" className="col-sm-2 col-form-label">Porte</label>
          <div className="col-sm">
            <div className="input-group pet-porte">
              <input type="text" className="form-control" id="petWeight" placeholder="kg" value={weight} onChange={(e) => setWeight(e.target.value)}/>

      
              <select className="form-select" id="petSize" name="petSize" aria-label="Selecione o porte do animal" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} disabled>
                <option key='' value=''>porte</option>
                {mockSizeData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.porte}
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
              {mockBreedData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.raca}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-1">
          <label htmlFor="petProtector" className="col-sm-2 col-form-label">Protetor</label>
          <div className="col-sm-10">
            <select className="form-select" id="petProtector" name="petProtector" aria-label="Selecione o protetor" value={protector} onChange={(e) => setProtector(e.target.value)}>
              <option value=""></option>
              {mockProtectorData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nickname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-1">
          <MultiSelect options={mockPersonalityData} 
            placeholder={'Personalidade'} attribute={'personalidade'} 
            onChange={handlePersonalitiesChange} 
            initialValues={initialValues?.personalidade}/>
        </div>

        <div className="row mb-1">
          <MultiSelect options={mockGetAlong} 
            placeholder={'Convívio'} attribute={'convivio'} 
            onChange={handleConvivioChange}
            initialValues={initialValues?.convivio}/>
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