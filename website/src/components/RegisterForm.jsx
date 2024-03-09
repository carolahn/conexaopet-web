import React, { useState, useEffect } from 'react';
import ImageUploader from '../components/ImageUploader';
import Toast from '../components/Toast';
import { mockUserTypeData } from '../components/mockFormData';

const RegisterForm = ({ initialValues = null }) => {
  const [userType, setUserType] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [password, setPassword] = useState('');
  const [images, setImages] = useState([]);
  const [pix, setPix] = useState([]);
  const [site, setSite] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setUserType(initialValues.tipo || '');
      setName(initialValues.nome || '');
      setNickname(initialValues.nickname || '');
      setPhone(initialValues.celular || '');
      setCity(initialValues.cidade || '');
      setUf(initialValues.uf || '');
      setPassword(initialValues.senha || '');
      setImages(initialValues.avatar || []);
      setPix(initialValues.pix || '');
      setSite(initialValues.site || '');
    }
  }, [initialValues]);

  const handleImagesChange = (selectedImages) => {
    setImages(selectedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      images: images,
      tipo_usuario: userType,
      nome: name,
      nickname: nickname,
      celular: phone,
      cidade: city,
      uf: uf,
      senha: password,
      pix: pix,
      site: site,
    };

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
    handleOpenToast();
  
  };

  const handleOpenToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };


  return (
    <>
      {
        // eslint-disable-next-line 
        (userType == '2' || userType == '3') && (
          <ImageUploader label='Selecione o avatar' onChange={handleImagesChange} initialValues={initialValues?.imagens}/>
      )}
      <form onSubmit={handleSubmit} aria-label="Cadastro de Usuário">

        
        <div className="row">
          <label htmlFor="userType" className="col col-form-label">Tipo</label>
          <div className="col col-form-input">
            <select className="form-select" placeholder="Selecione" id="userType" name="userType" aria-label="Selecione o tipo de usuário" value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value=""></option>
              {mockUserTypeData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.tipo}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <label htmlFor="userName" className="col col-form-label">Nome</label>
          <div className="col col-form-input">
            <input type="text" id="userName" aria-label="Insira o nome do usuário" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>

        <div className="row">
          <label htmlFor="userNickname" className="col col-form-label">Nickname</label>
          <div className="col col-form-input">
            <input type="text" id="userNickname" aria-label="Insira o apelido do usuário" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </div>
        </div>

        <div className="row">
          <label htmlFor="userPhone" className="col col-form-label">Celular</label>
          <div className="col col-form-input">
            <input type="text" id="userPhone" aria-label="Insira o telefone do usuário" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <div>
          <div className="row">
            <div className='label-cidade col-form-label'>
              <label htmlFor="userCity" className="col col-form-label">Cidade</label>
            </div>
            <div className='input-cidade-container col-form-input'>
              <div className="input-cidade">
                  <input type="text" id="userCity" aria-label="Insira a cidade" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className='label-uf'>
                <label htmlFor="userUf" className="col col-form-label">UF</label>
              </div>
              <div className="input-uf">
                  <input type="text" id="userUf" aria-label="Insira a UF" value={uf} onChange={(e) => setUf(e.target.value)} />
              </div>

            </div>
          </div>
        </div>

        <div className="row">
          <label htmlFor="userPassword" className="col col-form-label">Senha</label>
          <div className="col col-form-input">
            <input type="text" id="userPassword" aria-label="Insira a senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        { // eslint-disable-next-line
          (userType == '2' || userType == '3') && (
            <div className="row">
              <label htmlFor="userPix" className="col col-form-label">Chave pix</label>
              <div className="col col-form-input">
                <input type="text" id="userPix" aria-label="Insira a chave pix" value={pix} onChange={(e) => setPix(e.target.value)} />
            </div>
            </div>
        )}

        { // eslint-disable-next-line
          userType == '3' && (
            <div className="row">
              <label htmlFor="userSite" className="col col-form-label">Site</label>
              <div className="col col-form-input">
                <input type="text" id="userSite" aria-label="Insira o site" value={site} onChange={(e) => setSite(e.target.value)} />
                </div>
            </div>
        )}

        <button type="submit" className="btn w-100 btn-publish">{initialValues ? 'Salvar' : 'Cadastrar'}</button>
      </form>
     

      {showToast && (
        <Toast message={initialValues ? 'Alterações salvas' : 'Cadastro realizado' } type='success' onClose={handleCloseToast} />

      )}

      <style>
        {`
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

          input[type="text"] {
            /* Adicione estilos desejados aqui */
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
            transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
          }
          
          .btn-publish:hover {
            background-color: var(--color-contrast-2) !important;
          }
          
          .label-cidade {
            display: flex;
            align-items: center;
            width: 24%;
          }

          .input-cidade-container {
            display: flex;
            width: 95%;
          }

          .input-cidade {
            width: 70%
          }

          .label-uf {
            display: flex;
            align-items: center;
            justify-content: end;
            width: 10%;
            padding-right: 16px;
          }

          .input-uf {
            width: 20%
          }     

          @media (max-width: 900px) {
            .row .col-form-label {
              width: 30%;
            }
            .col-form-input {
              width: 70%;
            }
          }
        `}
      </style>
    </>
  );
};

export default RegisterForm;
