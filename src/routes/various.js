const { Router } = require('express');
const {
  createUser,
  retrieveUsers,
  retrieveUser,
  activateUser,
  deleteUser,
  createUserInCloud,
  deleteUserInCloud,
} = require('../controllers/testController');

const testRouter = Router();

testRouter.get('/', retrieveUsers);
testRouter.get('/user/:key', retrieveUser);
testRouter.post('/activate/:id', activateUser);
testRouter.post('/', createUser);
testRouter.post('/cloud', createUserInCloud);
testRouter.delete('/user/:id', deleteUser);
testRouter.delete('/cloud/:id', deleteUserInCloud);

module.exports = testRouter;
