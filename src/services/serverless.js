const dotenv = require('dotenv');
const { default: axios } = require('axios');

dotenv.config();

const buildRequest = async (action, param, body) => {
  const { GLOBAL_ARRAY_URL, GLOBAL_ARRAY_KEY } = process.env;

  const headers = {
    'Content-Type': 'application/json',
    api_key: GLOBAL_ARRAY_KEY,
  };
  const endpoints = {
    post: (body, param) =>
      axios.post(`${GLOBAL_ARRAY_URL}/data`, body, { headers }),
    get: (body, param) =>
      axios.get(`${GLOBAL_ARRAY_URL}/data/${param}`, {
        headers,
      }),
    delete: (body, param) =>
      axios.delete(`${GLOBAL_ARRAY_URL}/data/${param}`, {
        headers,
      }),
  };

  return await endpoints[action](body, param);
};

const fetchArrayAPI = async (method, param = '', body = {}) => {
  try {
    const response = await buildRequest(method, param, body);
    return await response.data;
  } catch (error) {
    return error;
  }
};

module.exports = { fetchArrayAPI, buildRequest };
