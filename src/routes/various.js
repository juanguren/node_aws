const { Router } = require('express');
const {
  createUser,
  retrieveUsers,
  retrieveUser,
  activateUser,
  deleteUser,
  createUserInCloud
} = require('../controllers/testController');

const testRouter = Router();

testRouter.get('/', retrieveUsers);
testRouter.get('/user/:state', retrieveUser);
testRouter.post('/activate/:id', activateUser);
testRouter.post('/', createUser);
testRouter.post('/cloud', createUserInCloud);
testRouter.delete('/user/:id', deleteUser);

module.exports = testRouter;
