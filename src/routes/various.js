const { Router } = require('express');
const {
  createUser,
  retrieveUsers,
  activateUser,
} = require('../controllers/testController');

const testRouter = Router();

testRouter.get('/', retrieveUsers);
testRouter.post('/activate/:id', activateUser);
testRouter.post('/', createUser);
testRouter.delete('/user/:id');

module.exports = testRouter;
