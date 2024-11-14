import axios from 'axios';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.resolve(error?.response || { status: 404 });
  }
);

export { axiosClient };
