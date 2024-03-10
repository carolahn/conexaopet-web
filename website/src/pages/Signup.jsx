import React from 'react';
import SimpleHeader from '../components/SimpleHeader';
import RegisterForm from '../components/RegisterForm';

const Signup = () => {

  return (
    <div className='signup-page' data-testid="signup-page">
      <SimpleHeader title='Cadastrar' />
      <div className='signup-body'>
        <RegisterForm />
      </div>
      <style>
        {`
          
          .signup-page {
            width: 100%;
          }
          
          .signup-body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            max-width: 500px;
            margin: 70px auto 0 auto;
            height: 100vh;
            padding: 0 10px;
          }

          @media (max-width: 900px) {
            .signup-container {
              margin-top: 50px;
            }
          }
          
        `}
      </style>
    </div>
  );
};

export default Signup;
