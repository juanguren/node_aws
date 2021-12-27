const { Router } = require('express');
const {
  createUser,
  retrieveUsers,
  activateUser,
} = require('../controllers/testController');

const testRouter = Router();

testRouter.get('/activate/:id', activateUser);
testRouter.get('/', retrieveUsers);
testRouter.post('/', createUser);

module.exports = testRouter;
