import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Verificar se a requisição é para a rota de createUser
    if (config.url.endsWith('/users/register/') && config.method === 'post') {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    if (config.url.includes('/users/update/') && config.method === 'put') {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    if (config.url.includes('/cupons') && config.method === 'post') {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    if (config.url.includes('/cupons/update/') && config.method === 'put') {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

