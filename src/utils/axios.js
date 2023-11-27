import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from storage
    const jwtToken = localStorage.getItem('accessToken');
    // If token exists, add it to request headers
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 500 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data: { token } } = await axiosInstance.post('/auth/refresh_token');

        localStorage.setItem('accessToken', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
  );

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------
