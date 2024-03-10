import React, { useState } from 'react';
import SimpleHeader from '../components/SimpleHeader';

const Login = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      nickname: nickname,
      senha: password,
    };

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);
  };

  return (
    <div className='login-container'>
      <SimpleHeader title='Login' />
      <div className='login-body'>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="user" className="col col-form-label">Usuário</label>
            <div className="col">
              <input type="text" className="form-control" id="user" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <label htmlFor="password" className="col col-form-label">Senha</label>
            <div className="col">
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn btn-publish">Entrar</button>
        </form>
      </div>

      <style>
        {`
          .login-container {
            width: 100%;
          }
          
          .login-body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            max-width: 500px;
            margin: 70px auto 0 auto;
            height: 100vh;
            padding: 0 10px;
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

          input[type="text"], input[type="password"] {
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
    </div>
  );
};

export default Login;
