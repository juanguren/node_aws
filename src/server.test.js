const app = require('./server');
const request = require('supertest');
const { list, getUserIndex } = require('./controllers/utils/utils');
const dotenv = require('dotenv');

dotenv.config();

describe('Endpoint tests', () => {
  const { GLOBAL_ARRAY_URL, GLOBAL_ARRAY_KEY } = process.env;
  const BASE_URL = '/tests';
  const GET = `${BASE_URL}/`;

  const headers = { api_key: GLOBAL_ARRAY_KEY };

  describe('GET', () => {
    it('Should retrieve user data', async () => {
      const mockListLength = list.length;
      const response = await request(app).get(GET);

      expect(response.body.list).toEqual(expect.any(Array));
      expect(response.body.list).toHaveLength(mockListLength);
    });
  });

  describe('GET BY KEY', () => {
    it('Should retrieve user data by key', async () => {
      const mockKey = 'testKey199';
      const GET_BY_KEY = `${BASE_URL}//user/${mockKey}`;

      const response = await request(app)
        .get(GET_BY_KEY)
        .set(headers);

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('user');
    });
  });
});
