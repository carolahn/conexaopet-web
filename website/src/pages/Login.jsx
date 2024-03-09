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
          <div className="row mb-1">
            <label htmlFor="user" className="col-sm-2 col-form-label">Usuário</label>
            <div className="col-sm">
              <div className="input-group">
                <input type="text" className="form-control" id="user" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="row mb-1">
            <label htmlFor="password" className="col-sm-2 col-form-label">Senha</label>
            <div className="col-sm">
              <div className="input-group">
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </div>

          <button type="submit" className="btn w-100 btn-publish">Entrar</button>
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

          input[type="text"], input[type="password"] {
            border: 1px solid #ced4da;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            width: calc(100% - 1.6em);
          }

          @media (max-width: 900px) {
            .login-container {
              margin-top: 50px;
            }
          }

        `}
      </style>
    </div>
  );
};

export default Login;
