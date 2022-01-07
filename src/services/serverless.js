const dotenv = require('dotenv');
const { default: axios } = require('axios');

dotenv.config();

const buildUrl = (action, param) => {
    const { GLOBAL_ARRAY_URL } = process.env;
    const endpoints = {
        post: `${GLOBAL_ARRAY_URL}/data`,
        get: `${GLOBAL_ARRAY_URL}/data/${param}`,
        delete: `${GLOBAL_ARRAY_URL}/data/${param}`,
    }
    return endpoints[action];
}

const fetchArrayAPI = async (method, param = '', body) => {
    const { GLOBAL_ARRAY_KEY } = process.env;
    try {
        const url = buildUrl(method, param);
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
                api_key: GLOBAL_ARRAY_KEY
            },
        });
        return await response.data;
    } catch (error) {
        return error;
    }
}

module.exports = { fetchArrayAPI, buildUrl };