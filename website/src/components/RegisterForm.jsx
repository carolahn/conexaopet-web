import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import ImageUploader from '../components/ImageUploader';
import Toast from '../components/Toast';
import { createUser, updateUser, login, clearUserError } from '../redux/actions';
import { mockUserTypeData } from '../components/mockFormData';


const RegisterForm = ({ initialValues = null, handleCloseModal }) => {
  const [userType, setUserType] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [images, setImages] = useState([]);
  const [pix, setPix] = useState([]);
  const [site, setSite] = useState([]);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Alterações salvas');
  const [toastType, setToastType] = useState('success');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userError = useSelector(state => state.userReducer.error);

  
  useEffect(() => {
    if (initialValues) {
      setUserType(initialValues.type || '');
      setName(initialValues.name || '');
      setUsername(initialValues.username || '');
      setPhone(initialValues.phone || '');
      setCity(initialValues.city || '');
      setUf(initialValues.uf || '');
      setImages(initialValues.image || []);
      setPix(initialValues.pix || '');
      setSite(initialValues.site || '');
      setPassword(initialValues.senha || '');
      setEmail(initialValues.email || '');
      setDescription(initialValues.description || '');
    }
  }, [initialValues]);

  // console.log('images: ', images);

  const handleImagesChange = (selectedImages) => {
    setImages(selectedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      image: images[0],
      type: userType,
      name: name,
      username: username,
      phone: phone,
      city: city,
      uf: uf,
      email: email,
      description: description,
    };

    if (!initialValues) {
      formData.password = password;
    }

    if (initialValues?.type == 2 || userType == 2) {
      formData.pix = pix;
    }

    if (initialValues?.type == 3 || userType == 3) {
      formData.site = site;
    }

    // console.log('formdata: ', formData);
    // console.log('images: ', images[0]);
    try {
      if (initialValues) {
        await dispatch(updateUser(initialValues.id, formData));
        setToastMessage('Alterações salvas');
        setToastType('success');
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
        handleOpenToast();
      } else {
        await dispatch(createUser(formData));
        if (!userError) {
          setToastMessage('Cadastro realizado');
          setToastType('success');
          dispatch(login(username, password));
          setTimeout(() => {
            navigate('/');
          }, 2000);
          handleOpenToast();
        } else {
          setToastMessage(`Erro ao enviar solicitação: ${JSON.stringify(userError)}`);
          setToastType('failure');
          handleOpenToast();
          dispatch(clearUserError());
        }
      }
      
    } catch (error) {
      setToastMessage(`Erro ao enviar solicitação: ${error.message}}`);
      setToastType('failure');
      handleOpenToast();
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
      {
        // eslint-disable-next-line 
        (userType == '2' || userType == '3') && (
          <ImageUploader label='Selecione o avatar' onChange={handleImagesChange} initialValues={[initialValues?.image]} required/>
      )}
      <form onSubmit={handleSubmit} aria-label="Cadastro de Usuário" encType="multipart/form-data" >

        
        <div className="row">
          <label htmlFor="userType" className="col col-form-label">Tipo</label>
          <div className="col col-form-input">
            <select className="form-select" placeholder="Selecione" id="userType" name="userType" 
              aria-label="Selecione o tipo de usuário"
              disabled={initialValues ? true : false} required
              value={userType} onChange={(e) => setUserType(e.target.value)}>
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
            <input type="text" id="userName" aria-label="Insira o nome do usuário" value={name} onChange={(e) => setName(DOMPurify.sanitize(e.target.value))} required/>
          </div>
        </div>

        <div className="row">
          <label htmlFor="userUsername" className="col col-form-label">Username</label>
          <div className="col col-form-input">
            <input type="text" id="userUsername" aria-label="Insira o apelido do usuário" value={username} onChange={(e) => setUsername(DOMPurify.sanitize(e.target.value))} required/>
          </div>
        </div>

        <div className="row">
          <label htmlFor="userEmail" className="col col-form-label">E-mail</label>
          <div className="col col-form-input">
            <input type="email" id="userEmail" aria-label="Insira o email do usuário" value={email} onChange={(e) => setEmail(DOMPurify.sanitize(e.target.value))} required/>
          </div>
        </div>

        <div className="row">
          <label htmlFor="userPhone" className="col col-form-label">Celular</label>
          <div className="col col-form-input">
            <input type="text" id="userPhone" aria-label="Insira o telefone do usuário" value={phone} onChange={(e) => setPhone(DOMPurify.sanitize(e.target.value))} required/>
          </div>
        </div>

        <div>
          <div className="row">
            <div className='label-cidade col-form-label'>
              <label htmlFor="userCity" className="col col-form-label">Cidade</label>
            </div>
            <div className='input-cidade-container col-form-input'>
              <div className="input-cidade">
                  <input type="text" id="userCity" aria-label="Insira a cidade" value={city} onChange={(e) => setCity(DOMPurify.sanitize(e.target.value))} required />
              </div>
              <div className='label-uf'>
                <label htmlFor="userUf" className="col col-form-label">UF</label>
              </div>
              <div className="input-uf">
                  <input type="text" id="userUf" aria-label="Insira a UF" value={uf} onChange={(e) => setUf(DOMPurify.sanitize(e.target.value))} required/>
              </div>

            </div>
          </div>
        </div>

        {!initialValues && (
          <div className="row">
            <label htmlFor="userPassword" className="col col-form-label">Senha</label>
            <div className="col col-form-input">
              <input type="password" id="userPassword" aria-label="Insira a senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
        )}

        { // eslint-disable-next-line
          (userType == '2') && (
            <>
              <div className="row">
                <label htmlFor="userPix" className="col col-form-label">Chave pix</label>
                <div className="col col-form-input">
                  <input type="text" id="userPix" aria-label="Insira a chave pix" value={pix} onChange={(e) => setPix(DOMPurify.sanitize(e.target.value))} required/>
                </div>
              </div>
            </>
        )}

        { // eslint-disable-next-line
          userType == '3' && (
            <div className="row">
              <label htmlFor="userSite" className="col col-form-label">Site</label>
              <div className="col col-form-input">
                <input type="text" id="userSite" aria-label="Insira o site" value={site} onChange={(e) => setSite(DOMPurify.sanitize(e.target.value))} required/>
                </div>
            </div>
        )}

        { // eslint-disable-next-line
          (userType == '2' || userType == '3') && (
            <div className="row">
              <div className="col">
                <div className="input-group">
                  <textarea type="text" id="userDescription" placeholder="Descrição" rows="3" style={{ resize: "none" }} value={description} onChange={(e) => setDescription(DOMPurify.sanitize(e.target.value))}/>
                </div>
              </div>
            </div>
          )
        }

        <button type="submit" className="btn w-100 btn-publish">{initialValues ? 'Salvar' : 'Cadastrar'}</button>
      </form>
     

      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={handleCloseToast} />
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

          input[type="text"], input[type="password"], input[type="email"] {
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
