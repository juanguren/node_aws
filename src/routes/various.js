const { Router } = require('express');
const {
  createUser,
  retrieveUsers,
} = require('../controllers/testController');

const testRouter = Router();

testRouter.get('/', retrieveUsers);
testRouter.post('/', createUser);

module.exports = testRouter;
