import axios from 'axios';

const instance = createAxiosInstance(process.env.REACT_APP_API_URL);

function createAxiosInstance(baseURL) {
  const instance = axios.create({
    baseURL: baseURL,
  });

  instance.interceptors.request.use(
    function (config) {
      const token = sessionStorage.getItem('kafkaPulse');
      if (token) {
        config.headers.Authorization = token ? `Bearer ${token}` : null;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
}

export default instance;
